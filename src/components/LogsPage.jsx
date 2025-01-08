import React from "react";
import "./logs.css";

const LogsPage = () => {
  // Mock log data
  const logs = [
    "[2025-01-08T12:00:00Z] Starting build process...",
    "[2025-01-08T12:01:00Z] Installing dependencies...",
    "[2025-01-08T12:02:00Z] Build successful.",
    "[2025-01-08T12:03:00Z] Deploying to production...",
    "[2025-01-08T12:04:00Z] Deployment successful. Application is live!",
  ];

  return (
    <div className="logs-container">
      <h1>Logs</h1>
      {logs.map((log, idx) => (
        <div key={idx} className="log-entry">
          {log}
        </div>
      ))}
    </div>
  );
};

export default LogsPage;
