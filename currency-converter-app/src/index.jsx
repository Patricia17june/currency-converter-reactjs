// src/index.jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth"; // Ensure correct path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
