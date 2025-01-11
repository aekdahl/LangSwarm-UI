import React from "react";
import styled from "styled-components";

// Styled components
const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  margin: 5px 0;
`;

const MessageBubble = styled.div`
  background-color: ${({ isUser }) => (isUser ? "#d1e7dd" : "#f8d7da")};
  color: ${({ isUser }) => (isUser ? "#000" : "#000")};
  border-radius: 10px;
  padding: 10px;
  max-width: 50%;
  word-wrap: break-word;
`;

const Messages = ({ messages }) => {
  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array", messages);
    return null; // Prevent rendering if `messages` is invalid
  }

  return (
    <>
      {messages.map((msg, index) => (
        <MessageWrapper key={index} isUser={msg.role === "user"}>
          <MessageBubble isUser={msg.role === "user"}>
            {msg.content || "Message content is missing"} {/* Fallback if content is undefined */}
          </MessageBubble>
        </MessageWrapper>
      ))}
    </>
  );
};

export default Messages;
