import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatWorkspace from "./components/ChatWorkspace";
import LogsPage from "./components/LogsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatWorkspace />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
