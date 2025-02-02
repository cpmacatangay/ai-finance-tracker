import React, { useState, useEffect } from "react";
import ws from "./api";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };
  }, []);

  return (
    <div>
      <h1>Real-Time WebSocket Updates</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
