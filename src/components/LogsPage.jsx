import React from "react";
import "./logs.css";

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
    <div className="logs-container">
      <header className="logs-header">
        <h1>Logs</h1>
      </header>
      <main className="logs-main">
        {mockLogs.map((log, index) => (
          <pre key={index} className="log-entry">
            {log}
          </pre>
        ))}
      </main>
    </div>
  );
};

export default LogsPage;

