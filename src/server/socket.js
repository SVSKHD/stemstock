// server/socket.js
const { Server } = require("socket.io");

const createSocketServer = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = createSocketServer;
