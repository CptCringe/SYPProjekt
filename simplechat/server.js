const io = require('socket.io')(63342)

//wir speichern die users als Objekte
const users = {}

io.on('connection', socket => {
    socket.on('new-user', name =>{
        users[socket.id] = name //Der ID = name der User
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message =>{
        //Benutzer die mit dem Server verbunden sind, bekommen die gleiche Nachricht außer der Sender selbst.
        socket.broadcast.emit('chat-message', {message :message, name : users[socket.id]})
    })
    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})