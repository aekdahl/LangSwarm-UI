import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy } from "react-icons/fa"; // Import copy icon from react-icons

const MessageContainer = styled.div`
  padding: 5px 10px;
  margin: 5px;
  border-radius: 10px;
  max-width: ${(props) => (props.isUser ? "50%" : "100%")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isUser ? "#EAEAEA" : "#f8f9fa")};
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
  word-wrap: break-word;
  margin-left: ${(props) => (props.isUser ? "auto" : "0")};
  margin-right: ${(props) => (props.isUser ? "0" : "auto")};
  text-align: ${(props) => (props.isUser ? "right" : "left")};
  float: ${(props) => (props.isUser ? "right" : "left")};
  clear: both; /* Ensure each message starts on a new line */
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

  ul, ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
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

const Message = ({ text, isUser, typingSpeed = 50, onTypingComplete, chatWindowRef }) => {
  const [displayedText, setDisplayedText] = useState(isUser ? text : "");
  const [copied, setCopied] = useState(false); // Track copy state

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  useEffect(() => {
    // console.log("Text received by Message component:", text);
    if (isUser) {
      setDisplayedText(text); // User messages display immediately
      return;
    }

    const words = text.split(" "); // Split the text into words
    let index = 0;
    let accumulated = ""; // Accumulate text progressively

    const interval = setInterval(() => {
      // Use these for word by word output
      if (index < words?.length) {
        accumulated += (index > 0 ? " " : "") + words[index];
      // Use these for char by char output
      //if (index < text?.length) {
      //  accumulated += text[index];

      // Do not edit below for the setting above
        setDisplayedText(accumulated);

        // Scroll chat window
        if (chatWindowRef?.current) {
          chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
        
        index++;
      } else {
        clearInterval(interval);
        if (onTypingComplete) onTypingComplete(); // Notify when typing is complete
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, isUser, typingSpeed, onTypingComplete, chatWindowRef]);
    
  return (    
    <MessageContainer isUser={isUser}>
      <MarkdownMessage>
        {isUser ? (
          // Directly display user text without Markdown parsing
          <p>{displayedText}</p>
        ) : (
          // Use ReactMarkdown for agent responses
          <ReactMarkdown
            remarkPlugins={[remarkGfm]} // Enables GitHub Flavored Markdown
            components={{
              code({ node, inline, className, children, ...props }) { 
                const codeContent = String(children).replace(/\\(.)/g, "$1");
                //console.log("inline:", inline);
                //console.log("className:", className);
                const match = /language-(\w+)/.exec(className || "");
                //console.log("match:", match);
                
                return !inline && match ? (
                  <div style={{ position: "relative", padding: "10px 0" }}>
                    <button
                      onClick={() => handleCopy(codeContent)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: copied ? "#4caf50" : "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        zIndex: 1,
                      }}
                    >
                      {copied ? "Copied!" : <>
                        <FaCopy size={14} />
                        Copy
                      </>}
                    </button>
                    <SyntaxHighlighter
                      style={github}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\\(.)/g, "$1")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code {...props}>{String(children).replace(/\\(.)/g, "$1")}</code>
                );
              },
              paragraph({ node, children }) {
                return <p>{children}</p>; // Handle paragraphs explicitly
              },
              break() {
                return <br />; // Handle line breaks (\n)
              },
            }}
          >
            {typeof displayedText === "string" ? displayedText.replace(/\\n/g, "\n") : ""}
          </ReactMarkdown>
        )}
      </MarkdownMessage>
    </MessageContainer>
  );
};

export default Message;
