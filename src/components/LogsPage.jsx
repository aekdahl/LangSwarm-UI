import React, { useState } from "react";
import "./logs.css";

const LogsPage = () => {
  const [selectedJob, setSelectedJob] = useState("build");

  const jobs = [
    {
      id: "build",
      name: "Build",
      steps: [
        { id: "checkout", name: "Checkout Code", status: "success" },
        { id: "install", name: "Install Dependencies", status: "success" },
        { id: "build", name: "Build Application", status: "error" },
      ],
    },
    {
      id: "test",
      name: "Test",
      steps: [
        { id: "unit", name: "Run Unit Tests", status: "running" },
        { id: "integration", name: "Run Integration Tests", status: "pending" },
      ],
    },
  ];

  const logs = {
    build: [
      "[12:34:56] ✓ Step 1: Checkout Code",
      "[12:35:10] ✓ Step 2: Install Dependencies",
      "[12:36:05] ✖ Error in Step 3: Build Application - Cannot find module 'some-package'",
    ],
    test: [
      "[12:40:15] ⚙ Running Step 1: Run Unit Tests",
      "[12:41:00] Pending Step 2: Run Integration Tests",
    ],
  };

  return (
    <div className="logs-container">
      <header className="logs-header">
        <h1>Workflow Logs</h1>
      </header>
      <div className="logs-body">
        <aside className="logs-sidebar">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`job ${selectedJob === job.id ? "active" : ""}`}
              onClick={() => setSelectedJob(job.id)}
            >
              <h3>{job.name}</h3>
              <ul>
                {job.steps.map((step) => (
                  <li key={step.id} className={`step ${step.status}`}>
                    {step.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
        <main className="logs-content">
          {logs[selectedJob]?.map((log, idx) => (
            <p key={idx} className="log-line">
              {log}
            </p>
          ))}
        </main>
      </div>
    </div>
  );
};

export default LogsPage;
