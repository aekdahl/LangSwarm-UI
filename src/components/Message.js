import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  max-width: 80%;
  white-space: pre-wrap;
`;

const UserMessage = styled(MessageContainer)`
  background-color: #d1e7dd;
  align-self: flex-end;
`;

const BotMessage = styled(MessageContainer)`
  background-color: #f8d7da;
  align-self: flex-start;
`;

const TypingMessage = styled.div`
  font-style: italic;
  color: #007bff;
  align-self: flex-start;
`;

const Messages = ({ messages, isLoading }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", overflowY: "auto", padding: "10px" }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}
        >
          {msg.role === "user" ? (
            <UserMessage>{msg.content}</UserMessage>
          ) : (
            <BotMessage>{msg.content}</BotMessage>
          )}
        </div>
      ))}
      {isLoading && <TypingMessage>Agent is typing...</TypingMessage>}
    </div>
  );
};

export default Messages;
