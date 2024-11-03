const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");

const server = http.createServer(app);
const cors = require("cors");

app.use(cors());
const socketIO = new Server(server, {
  cors:["http://localhost:3000","https://multiplayer-tictactoe-qo2g.vercel.app/"],
});

const allUsers = {};
const allRooms = [];

socketIO.on("connection", (socket) => {
  //console.log(`⚡: ${socket.id} user just connected!`);
  allUsers[socket.id] = {
    socket: socket,
    online: true,
  };
  socket.on("request_to_play", (data) => {
    // console.log("req to play data",data)
    const currentUser = allUsers[socket.id];
    currentUser.playerName = data.playerName;

    let opponentPlayer;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && socket.id != key) {
        opponentPlayer = user;
        break;
      }
    }
    if (opponentPlayer) {
      // Both players are now in a room
      allRooms.push({
        player1: opponentPlayer,
        player2: currentUser,
      });

      // Notify both players of their opponent and role
      currentUser.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName,
        playingAs: "circle",
      });
      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currentUser.playerName,
        playingAs: "cross",
      });
      // Set players as 'playing' to avoid rematching them
      if (currentUser && opponentPlayer) {
        currentUser.playing = true;
        opponentPlayer.playing = true;
      }

      opponentPlayer.socket.on("PlayerMoveFromClient", (data) => {
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

  socket.on("disconnect", function () {
    const currentUser = allUsers[socket.id];
    currentUser.online = false;
    currentUser.playing = false;

    for (let index = 0; index < allRooms.length; index++) {
      const { player1, player2 } = allRooms[index];
      if (player1.socket.id === socket.id) {
       // console.log(socket.id, "left the match");
        player2.socket.emit("opponentLeftMatch");
        break;
      }

      if (player2.socket.id === socket.id) {
       // console.log(socket.id, "left the match");
        player1.socket.emit("opponentLeftMatch");
        break;
      }
    }
  });
});

server.listen(9000, () => console.log("Server started"));
