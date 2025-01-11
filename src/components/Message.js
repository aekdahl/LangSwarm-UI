import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageContainer = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  max-width: 80%;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isUser ? "#d1e7dd" : "#f8d7da")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
`;

const MarkdownMessage = styled.div`
  font-family: Arial, sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;

  h1,
  h2,
  h3 {
    margin: 0.5em 0;
  }

  p {
    margin: 0.5em 0;
  }

  code {
    background-color: #f1f1f1;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: "Courier New", Courier, monospace;
  }

  pre {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: "Courier New", Courier, monospace;
  }
`;

const Message = ({ text, isUser, typingSpeed = 50, onTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState(isUser ? text : ""); // Display full text for user messages immediately

  useEffect(() => {
    if (isUser) return; // Skip typewriter effect for user messages

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        if (onTypingComplete) onTypingComplete(); // Notify parent when typing is complete
      }
    }, typingSpeed);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [text, isUser, typingSpeed, onTypingComplete]);

  return (
    <div>Test</div>
  );
};

export default Message;
