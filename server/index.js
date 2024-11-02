const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");

const server = http.createServer(app);
const cors = require("cors");

app.use(cors());
const socketIO = new Server(server, {
  cors: "http://localhost:5173",
});

const allUsers = {};

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  allUsers[socket.id] = {
    socket: socket,
    online: true,
  };
  socket.on("request_to_play", (data) => {
    // console.log(data)
    const currentUser = allUsers[socket.id];
    currentUser.playerName = data.playerName;
    currentUser.roomId = data.roomId;

    let opponentPlayer;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && socket.id != key) {
        opponentPlayer = user;
        break;
      }
    }
    if (opponentPlayer) {
      currentUser.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName,
      });
      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currentUser.playerName,
      });

      opponentPlayer.socket.on("PlayerMoveFromClient", (data) => {
        console.log(data);
        currentUser.socket.emit("PlayerMoveFromServer", {
          ...data,
        });
      });
      currentUser.socket.on("PlayerMoveFromClient", (data) => {
        opponentPlayer.socket.emit("PlayerMoveFromServer", {
          ...data,
        });
      });
    } else {
      currentUser.socket.emit("OpponentNotFound");
    }
  });
  socket.on("disconnect", () => {
    const currentUser = allUsers[socket.id];
    currentUser.online = false;
    currentUser.playing = false;
  });
});

server.listen(9000, () => console.log("Server started"));
