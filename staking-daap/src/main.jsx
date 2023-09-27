import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { config, chains } from "./wagmiCreateConfig";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={midnightTheme({ accentColor: "#204FFE" })}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
