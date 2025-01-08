import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        style={{
          width: "100%",
          maxWidth: "800px",
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
          <p key={idx} style={{ textAlign: msg.role === "user"
