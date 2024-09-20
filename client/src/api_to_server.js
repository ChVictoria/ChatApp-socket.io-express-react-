import { io } from 'socket.io-client'

const serverURL = 'http://localhost:3000'

var socket = io(serverURL, { autoConnect: false });

const connectToServer = (username) => {
    socket.auth = { username }
    socket.connect()
}

const sendPrivateMessage = (message, recipientID) => {
    socket.emit('private message', {
        text: message,
        to: recipientID
    })
    
}

async function requestUserID (username, setResponse) {
    socket.emit("get userID", username)
    socket.on('userID by username response', (r)=> {
        setResponse(r)
     })
}

async function waitOnPrivateMessage (setMessage) {
    socket.on("private message", (msg) => setMessage(msg))
}

export {connectToServer, sendPrivateMessage, requestUserID, waitOnPrivateMessage}