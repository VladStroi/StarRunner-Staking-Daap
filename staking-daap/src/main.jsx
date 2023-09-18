import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  sepolia,
} from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { createPublicClient, http } from "viem";

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    infuraProvider({ apiKey: "b0f4f2bdbc524cf3b57cd014475e319d" }),
    publicProvider(),
  ]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
});

// const config = createConfig({
//   autoConnect: true,
//   publicClient: createPublicClient({
//     chain: sepolia,
//     transport: http(),
//   }),
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>
);
