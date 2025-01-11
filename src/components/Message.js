// Messages.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components for Messages
const MessageContainer = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  max-width: 80%;
  white-space: pre-wrap; /* Preserves formatting like line breaks */
`;

const UserMessage = styled(MessageContainer)`
  background-color: #d1e7dd;
  align-self: flex-end;
`;

const BotMessage = styled(MessageContainer)`
  background-color: #f8d7da;
  align-self: flex-start;
`;

// Typewriter effect for smoother message rendering
const TypewriterMessage = ({ message, onComplete, chunkSize = 5, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message.slice(index, index + chunkSize));
        index += chunkSize;
      } else {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [message, chunkSize, speed, onComplete]);

  return <div>{displayedText}</div>;
};

// Messages Component
const Messages = ({ messages }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}
        >
          {msg.role === "user" ? (
            <UserMessage>
              <TypewriterMessage message={msg.content} />
            </UserMessage>
          ) : (
            <BotMessage>
              <TypewriterMessage message={msg.content} />
            </BotMessage>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
