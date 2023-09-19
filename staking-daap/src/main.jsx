import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { config } from "./wagmiCreateConfig";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig } from "wagmi";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>
);
