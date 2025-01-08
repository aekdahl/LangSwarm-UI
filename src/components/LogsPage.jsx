import React from "react";

const LogsPage = () => {
  const mockLogs = [
    "Starting build process...",
    "Fetching dependencies...",
    "Building project...",
    "Build successful!",
    "Deploying application...",
    "Deployment completed successfully.",
    "---",
    "Starting build process...",
    "Fetching dependencies...",
    "Building project...",
    "Build successful!",
    "Deploying application...",
    "Deployment completed successfully.",
    "---",
    "Starting build process...",
    "Fetching dependencies...",
    "Building project...",
    "Build successful!",
    "Deploying application...",
    "Deployment completed successfully.",
    "---",
    "Starting build process...",
    "Fetching dependencies...",
    "Building project...",
    "Build successful!",
    "Deploying application...",
    "Deployment completed successfully.",
  ];

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <header
        style={{
          height: "60px",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Logs</h1>
      </header>
      <main
        style={{
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#fff",
          color: "#333",
          height: "calc(100vh - 60px)",
        }}
      >
        {mockLogs.map((log, index) => (
          <pre
            key={index}
            style={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              fontFamily: "monospace",
            }}
          >
            {log}
          </pre>
        ))}
      </main>
    </div>
  );
};

export default LogsPage;
