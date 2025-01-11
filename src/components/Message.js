import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Ensure messages start at the bottom */
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  max-width: 50%; /* Limit messages to half the chat window width */
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isUser ? "#d1e7dd" : "#f8d7da")};
  white-space: pre-wrap;
  text-align: ${(props) => (props.isUser ? "right" : "left")};
`;

const TypingMessage = styled.div`
  font-style: italic;
  color: #007bff;
  margin: 5px 0;
`;

const Messages = ({ messages, isLoading }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <MessagesContainer ref={containerRef}>
      {messages.map((msg, index) => (
        <MessageWrapper key={index} isUser={msg.role === "user"}>
          <MessageBubble isUser={msg.role === "user"}>{msg.content}</MessageBubble>
        </MessageWrapper>
      ))}
      {isLoading && <TypingMessage>Agent is typing...</TypingMessage>}
    </MessagesContainer>
  );
};

export default Messages;
