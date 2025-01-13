import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "./Message";
import LoadingIndicator from "./LoadingIndicator"; // Adjust the import path
import "../styles.css";

const backendUrl = window._env_.REACT_APP_BACKEND_URL || "http://localhost:8080";

const ChatWorkspace = () => {
  const chatWindowRef = useRef(null);
  const textareaRef = useRef(null); // Create a ref for the textarea
  
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

    // Keep focus on the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    try {
      const response = await fetch(`${backendUrl}/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify({ message: input }),
        body: JSON.stringify({ sender: sender, content: currentInput }),
      });

      if (response.ok) {
        const rawData = await response.text();
        console.log("Raw response from backend:", rawData); // Log raw response

        // Parse the response (if needed) and log parsed content
        let parsedData;
        try {
          parsedData = JSON.parse(rawData);
          console.log("Parsed data from backend:", parsedData);
        } catch (parseError) {
          console.error("Error parsing backend response as JSON:", parseError);
        }
        
        // Add the agent's response to the chat
        const agentMessage = { role: "agent", content: parsedData?.reply || rawData };
        // const agentMessage = { role: "agent", content: data };
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

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
      <div ref={chatWindowRef} className="chat-window">
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            text={msg.content}
            isUser={msg.role === "user"}
            typingSpeed={30} // Customize the typing speed if needed
          />
        ))}
        {isLoading && <LoadingIndicator isUser={false} />}
      </div>
      <div style={{ display: "flex", width: "100%", maxWidth: "800px" }}>
        <textarea
          ref={textareaRef} // Attach the ref to the textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyPress}
          placeholder="Type your message... (Shift + Enter for new line)"
          disabled={isLoading}
          style={{
            flex: 3,
            padding: "10px",
            marginRight: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            resize: "none",
            height: "80px", // Adjust for consistent height
            lineHeight: "1.5",
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
