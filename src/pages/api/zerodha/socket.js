import { createRouter } from "next-connect";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";

// Create a Next.js API route
const App = createRouter();

// Initialize a Socket.IO server
const httpServer = new Server(App);

const io = new SocketServer(httpServer, {
  // Your Socket.IO options here
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Handle custom events here
  socket.on("customEvent", (data) => {
    console.log("Received custom event:", data);
    // Broadcast to all connected clients
    io.emit("customEvent", data);
  });
});

export default App.handler();
