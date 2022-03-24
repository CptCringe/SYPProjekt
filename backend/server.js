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
io.on('connection', async (socket) => {
    console.log("A user has connected!");

    io.emit('Message', `server: This is a test Broadcast!`)



    socket.on('disconnect', () => {
        console.log("A user has disconnected!");
    });

    // CHAT HANDLING
    let allMessages=[];
    allMessages = JSON.parse(fs.readFileSync("messagelog.txt","utf-8"));
    socket.emit('INITIAL_MESSAGES', allMessages);

    socket.on('SEND_MESSAGE', function (data) {
        let allMessages2=[];
        allMessages2 = JSON.parse(fs.readFileSync("messagelog.txt","utf-8"));
        if(allMessages2.length ==10){
            allMessages2.shift();
        }
        allMessages2.push(data);
        fs.writeFileSync("messagelog.txt", JSON.stringify(allMessages2));

        console.log(data);
        io.emit('MESSAGE', data)
    });

    // BATTLE HANDLING
    socket.on('createRoom', (room) => {
        console.log("join");
        socket.join(room);
        socket.on('RoomMessage', (msg) => {
            io.sockets.in(room).emit('NewMessage', msg);
        });
    });


    socket.on('joinRoom', (room) => {
        console.log("join");
        socket.join(room);
        socket.on('RoomMessage', (msg) => {
            io.sockets.in(room).emit('NewMessage', msg);
        });
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
server.listen(8081, '0.0.0.0',() => {
    console.log(`Server is running on port ${PORT}.`);
});