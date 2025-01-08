import React, { useState, useEffect, useRef } from "react";
import BACKEND_URL from "../config"; // Import the BACKEND_URL from config.js

const ChatWorkspace = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, { // Use BACKEND_URL here
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
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {isLoading && <p className="loading">Agent is typing...</p>}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={isLoading}>
          🤖
        </button>
      </div>
    </div>
  );
};

export default ChatWorkspace;
