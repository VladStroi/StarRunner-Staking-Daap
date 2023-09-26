import "./App.css";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

import { Footer } from "./components/header-footer/footer/footer";
import { Header } from "./components/header-footer/header/header";
import { MainBar } from "./components/main bar/main-bar";
import { StakeMenu } from "./components/stake manu/stake-menu";

const chains = [sepolia];
const projectId = "d1ed4a8b1d08ee63e62097023077970f";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export const App = () => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Header />
        <MainBar />
        <StakeMenu />
        <Footer />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};
