import "./App.css";

import { Footer } from "./components/header-footer/footer/footer";
import { Header } from "./components/header-footer/header/header";
import { MainBar } from "./components/main bar/main-bar";
import { StakeMenu } from "./components/stake manu/stake-menu";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

export const App = () => {
  return (
    <>
      <WagmiConfig config={config}>
      <Header />
      <MainBar />
      <StakeMenu />
      <Footer />
      </WagmiConfig>
    </>
  );
};
