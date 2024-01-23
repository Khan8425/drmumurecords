function deleteRecord(button) {
  var row = button.parentNode.parentNode;

  // Add animation class for row deletion
  row.style.animation = "rowDeleteAnimation 0.5s ease";

  // Remove the row after the animation completes
  setTimeout(function () {
    row.parentNode.removeChild(row);
  }, 500);
}
// Connect to the server using Socket.IO
const socket = io();

// Listen for the 'record' event from the server
socket.on("record", (data) => {
  // Update the UI with the received data
  updateUI(data);
});

// Function to update the UI
function updateUI(data) {
  // Modify the DOM elements as needed
  // For example, update a list of records
  const recordList = document.getElementById("recordList");
  const newRecordItem = document.createElement("li");
  newRecordItem.textContent = data;
  recordList.appendChild(newRecordItem);
}

// Example: Send data to the server when a user enters a record
function enterRecord() {
  const userInput = document.getElementById("recordInput").value;
  socket.emit("record", userInput);
}
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// Serve your HTML, CSS, and JavaScript files
app.use(express.static("public"));

// Listen for WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for the 'record' event from clients and broadcast it to all clients
  socket.on("record", (data) => {
    io.emit("record", data);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Set up socket.io event handlers here

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
const socket = io();

// Listen for the 'message' event from the server
socket.on("message", (data) => {
  updateUI(data);
});

// Handle form submission
document.getElementById("messageForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  if (message !== "") {
    // Send the message to the server
    socket.emit("message", message);
    messageInput.value = "";
  }
});

// Update the UI with the received message
function updateUI(message) {
  const messageList = document.getElementById("messageList");
  const newMessageItem = document.createElement("li");
  newMessageItem.textContent = message;
  messageList.appendChild(newMessageItem);
}
// ... (previous code)

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for the 'message' event from clients and broadcast it to all clients
  socket.on("message", (data) => {
    io.emit("message", data);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// ... (remaining code)
