import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { config, chains } from "./wagmiCreateConfig";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import {  RainbowKitProvider } from "@rainbow-me/rainbowkit";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
    <RainbowKitProvider chains={chains}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
