const socket = io('http://localhost:63342')
const messageContainer = document.getElementById('nachricht-box')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//Bentuzername
const name = prompt('What is your name?')
appendMessage('you joined') //erscheint nachdem der Benutzername eingegeben wurde

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

//Event für Nachricht senden
messageForm.addEventListener('submit', e => {
    e.preventDefault() //verhindert das refreshen von der Webseite wenn das Event nicht ausgelöst wird.
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-nachricht', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}