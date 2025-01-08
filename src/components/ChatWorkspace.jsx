import React, { useState } from "react";

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
      const response = await fetch("https://your-backend-url/api/chat", {
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
    <div>
      <h2>Chat with LLM</h2>
      <div style={{ height: "60vh", overflowY: "scroll", border: "1px solid #ccc", padding: "1rem" }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <b>{msg.role === "user" ? "You" : "Agent"}:</b> {msg.content}
          </p>
        ))}
        {isLoading && <p>Agent is typing...</p>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        style={{ width: "80%", marginRight: "1rem" }}
      />
      <button onClick={sendMessage} disabled={isLoading}>
        Send
      </button>
    </div>
  );
};

export default ChatWorkspace;
