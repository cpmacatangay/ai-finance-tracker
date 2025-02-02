const WebSocket = require("ws");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Create WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send a welcome message
  ws.send(
    JSON.stringify({ message: "Welcome to AI Finance Tracker WebSocket" })
  );

  // Listen for messages from the client
  ws.on("message", (data) => {
    console.log("Received:", data.toString());

    // Broadcast the received data to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
