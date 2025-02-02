import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  console.log("Connected to WebSocket Server");
  ws.send(JSON.stringify({ event: "Hello Server!" }));
};

ws.onmessage = (event) => {
  console.log("WebSocket message received:", JSON.parse(event.data));
};

ws.onclose = () => {
  console.log("Disconnected from WebSocket Server");
};

export default API;
