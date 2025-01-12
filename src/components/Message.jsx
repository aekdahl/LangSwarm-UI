import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

  h1, h2, h3 {
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
  const [displayedText, setDisplayedText] = useState(isUser ? text : "");

  useEffect(() => {
    if (isUser) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        if (onTypingComplete) onTypingComplete();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, isUser, typingSpeed, onTypingComplete]);

  return (
    <MessageContainer isUser={isUser}>
      <MarkdownMessage>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={materialLight}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props}>{children}</code>
              );
            },
          }}
        >
          {displayedText}
        </ReactMarkdown>
      </MarkdownMessage>
    </MessageContainer>
  );
};

export default Message;
