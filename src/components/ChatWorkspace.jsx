import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed
import "./styles.css";

const ChatWorkspace = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();
        const agentMessage = { role: "agent", content: data.reply };
        setMessages((prev) => [...prev, agentMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "agent", content: "Error: Unable to fetch a response." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "Error: Network issue or invalid backend URL." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <h2>Chat with LLM</h2>
      <div
        style={{
          width: "80%",
          height: "60vh",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#fff",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, idx) => (
          <p key={idx} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <b>{msg.role === "user" ? "You" : "Agent"}:</b> {msg.content}
          </p>
        ))}
        {isLoading && <p style={{ color: "#007bff", fontStyle: "italic" }}>Agent is typing...</p>}
      </div>
      <div style={{ display: "flex", width: "80%" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{
            flex: 3,
            padding: "10px",
            marginRight: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          style={{
            flex: 1,
            backgroundColor: !input.trim() || isLoading ? "#ddd" : "#000",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: !input.trim() || isLoading ? "not-allowed" : "pointer",
            opacity: !input.trim() || isLoading ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Link to="/logs" style={{ color: "#007bff", textDecoration: "none", fontSize: "1rem" }}>
          View Logs
        </Link>
      </div>
    </div>
  );
};

export default ChatWorkspace;
