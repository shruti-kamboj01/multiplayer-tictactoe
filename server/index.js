const http = require("http")
const express = require("express")
const app = express()
const {Server} = require("socket.io")

const server = http.createServer(app)
const cors = require('cors')

app.use(cors())
const socketIO = new Server(server, {
    cors: "http://localhost:5173",
    
});

const allUsers = []


socketIO.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("request_to_play", (data) => {
        console.log(data)
    })
    // socket.on('disconnect', () => {
    //   console.log('🔥: A user disconnected');
    // });
});

server.listen(9000, () => console.log('Server started'))