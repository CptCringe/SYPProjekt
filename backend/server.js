const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const app = express();
const http = require('http');
const sqllite3 = require('sqlite3');
let db = new sqllite3.Database('../DB/VocaBattleDB.db', sqllite3.OPEN);
const fs = require('fs');


var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(jsonParser)
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Fabians application." });
});
//routes
require('./routes/auth.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/friends.routes.js')(app);
require('./routes/voclists.routes.js')(app);

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server,{cors: {
    origin: "*"
    }});

let numClients = {};
let questions = [
    {question: 'Was heißt Hund auf Englisch?', choices:['dog', 'cat', 'seal']},
    {question: 'Was heißt Haus auf Englisch?', choices:['house', 'yacht', 'tank']},
    {question: 'Was heißt Baum auf Englisch?', choices:['tree', 'flower', 'grass']},
    {question: 'Was heißt Kerze auf Englisch?', choices:['candle', 'torch', 'fire']},
    {question: 'Was heißt Glühbirne auf Englisch?', choices:['lightbulb', 'light', 'candle']},
    {question: 'Was heißt Tür auf Englisch?', choices:['door', 'window', 'car']},
    {question: 'Was heißt Auto auf Englisch?', choices:['car', 'train', 'plane']},
    {question: 'Was heißt Flugzeug auf Englisch?', choices:['airplane', 'ship', 'bus']},
    {question: 'Was heißt Mond auf Englisch?', choices:['moon', 'earth', 'uranus']},
    {question: 'Was heißt Bildschirm auf Englisch?', choices:['display', 'notebook', 'computer']}
];
io.of("/battle").on('connection', async (socket) => {
    console.log("A user has connected to battle socket!");

    io.emit('Message', `server: This is a test Broadcast!`)

    socket.on('disconnect', () => {
        console.log("A user has disconnected from battle socket!");
        numClients[roomName]--;
        console.log(`People in Room ${roomName}: ${numClients[roomName]}`);
    });

    let roomName = "";
    // TODO BATTLE LOGIK EINBAUEN
    socket.on('joinRoom', (room) => {
        console.log(room.user + " joined room " + room.roomName);
        socket.join(room.roomName);
        roomName = room.roomName;

        //check if room existing
        if(numClients[roomName] == undefined){
            numClients[roomName] = 1;
        }else{
            numClients[roomName]++;
        }
        console.log(`People in Room ${roomName}: ${numClients[roomName]}`);

        let message = "Joined the room!"
        io.of("/battle").to(roomName).emit('SERVER_MESSAGE',{user: room.user , message: message});

        socket.on('RoomMessage', (msg) => {
            io.sockets.in(roomName).emit('NewMessage', msg);
        });
    });

    let selectedQuestion = 0;

    socket.on('startGame', () => {
       console.log('startGame')
       // schauen wie viele in dem Raum sind
       // bei user >= 2 starten
       // random choices schicken (zuerst nur einmal)
        if(numClients[roomName] >= 2){
            io.of("/battle").to(roomName).emit('STARTED_GAME', {started: true ,question: questions[selectedQuestion]});
        }else{
            io.of("/battle").to(roomName).emit('STARTED_GAME', {started: false ,question: null});
        }
    });

    function nextQuestion(){
        selectedQuestion++;

        if(questions[selectedQuestion] != undefined){
            io.of("/battle").to(roomName).emit('NEW_QUESTION', {question: questions[selectedQuestion]});
        }else{
            io.of("/battle").to(roomName).emit('GAME_ENDED', {message: "Game ended!"});
        }
    }

    socket.on('GAME_RESULT', (data) => {

        io.of("/battle").to(roomName).emit('USER_RESULT', {username: data.user, message: ' hat ' + data.points + ' Punkte.'});
    })

    socket.on('MADE_SELECTION', (data)=>{
        let username = data.username;
        let selection = data.selection;
        console.log(username + " Selection " + selection);
        // Erstes element ist immer richtig
        if(selection == 0){
            io.of("/battle").to(roomName).emit('SELECTION_RESULT', {user: username, message: "hat es erraten. Richtig war " + questions[selectedQuestion].choices[0]});
            nextQuestion();
        }else{
            io.of("/battle").to(roomName).emit('SELECTION_RESULT', {user: username, message: "hat es leider nicht erraten :("});
        }

    });

    socket.on('leaveRoom', (data) => {
        socket.leave(roomName);
        console.log(data.user + ' left room ' + roomName)

        numClients[roomName]--;
        console.log(`People in Room ${roomName}: ${numClients[roomName]}`);

        let message = "Left the room!"
        io.of("/battle").to(roomName).emit('SERVER_MESSAGE',{user: data.user , message: message});
    });
});

io.of("/chat").on('connection',async (socket) => {
    console.log("A user has connected to chat socket!");

    io.emit('Message', `server: This is a test Broadcast!`)

    socket.on('disconnect', () => {
        console.log("A user has disconnected from chat socket!");
    });

    // CHAT HANDLING
    let allMessages=[];
    allMessages = JSON.parse(fs.readFileSync("messagelog.txt","utf-8"));
    socket.emit('INITIAL_MESSAGES', allMessages);

    socket.on('SEND_MESSAGE', function (data) {
        let allMessages2=[];
        allMessages2 = JSON.parse(fs.readFileSync("messagelog.txt","utf-8"));
        if(allMessages2.length == 10){
            allMessages2.shift();
        }
        allMessages2.push(data);
        fs.writeFileSync("messagelog.txt", JSON.stringify(allMessages2));

        console.log(data);
        io.of("/chat").emit('MESSAGE', data);
    });
})

// set port, listen for requests
const PORT = process.env.PORT || 8081;
server.listen(8081, '0.0.0.0',() => {
    console.log(`Server is running on port ${PORT}.`);
});