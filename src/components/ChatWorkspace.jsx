import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const backendUrl = window._env_.REACT_APP_BACKEND_URL || "http://localhost:8080";

const ChatWorkspace = () => {
  const chatWindowRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);


  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const sender = "sessions_1234567879"; // Replace with dynamic sender info later

    const currentInput = input; // Store the current input value
    const userMessage = { role: "user", content: currentInput };
    //setMessages([...messages, userMessage]);
    setMessages((prev) => [...prev, userMessage]); // Append user message to the array
    setInput(""); // Clear the input field
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify({ message: input }),
        body: JSON.stringify({ sender: sender, content: currentInput }),
      });

      if (response.ok) {
        const data = await response.text();
        const agentMessage = { role: "agent", content: data };
        //setMessages((prev) => [...prev, agentMessage]);
        setMessages((prev) => [...prev, agentMessage]); // Append user message to the array
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2>Chat with LLM</h2>
      <div
        ref={chatWindowRef}
        className="chat-window"
      >
        {messages.map((msg, idx) => (
          <p key={idx} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <b>{msg.role === "user" ? "You" : "Agent"}:</b> {msg.content}
          </p>
        ))}
        {isLoading && <p style={{ color: "#007bff", fontStyle: "italic" }}>Agent is typing...</p>}
      </div>
      <div style={{ display: "flex", width: "100%", maxWidth: "800px" }}>
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
