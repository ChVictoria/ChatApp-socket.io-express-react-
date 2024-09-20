const express = require('express');
const app = express();
const PORT = 3000

const http = require("http");

const cors = require("cors");
const { Server } = require('socket.io');


//Creating a http server
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>'); 
});

io.on("connection", (socket)=>{

    socket.on("get userID", (username) => {
        const resp = {username: username,
                      userID: null}

        for (let [id, user] of io.of("/").sockets){
            if (user.username == username) {
                resp.userID = id
                break
            }
        }
   
        socket.emit("userID by username response", resp)
        console.log(`${resp.username}:${resp.userID}`)
    })
    
    socket.on("private message", ({ text, to }) => {
        socket.to(to).emit("private message", {
          text,
          userID: socket.id,
          username: socket.username
        });
      });

    socket.on("disconnect", () => {
        console.log(`user with ID ${socket.id} disconnected`)
    })
})

io.use((socket, next)=> {
    socket.username = socket.handshake.auth.username
    console.log(`user ${socket.username} with ID ${socket.id} connected`)
    next();
})

server.listen(PORT, ()=> {
    console.log("SERVER IS RUNNING");
});
