// Message.js
import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: #f1f1f1;
  max-width: 80%;
`;

const UserMessage = styled(MessageContainer)`
  background-color: #d1e7dd;
  align-self: flex-end;
`;

const BotMessage = styled(MessageContainer)`
  background-color: #f8d7da;
  align-self: flex-start;
`;

const Message = ({ text, isUser }) => {
  return isUser ? (
    <UserMessage>{text}</UserMessage>
  ) : (
    <BotMessage>{text}</BotMessage>
  );
};

export default Message;
