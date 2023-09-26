import {
    configureChains,
    createConfig,
    sepolia,
  } from "wagmi";
  import { infuraProvider } from "wagmi/providers/infura";
  import { publicProvider } from "wagmi/providers/public";
  import { InjectedConnector } from "wagmi/connectors/injected";
  import { MetaMaskConnector } from "wagmi/connectors/metaMask";
  import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
  import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
  

const { chains, publicClient } = configureChains(
    [sepolia],
    [
      infuraProvider({ apiKey: "b0f4f2bdbc524cf3b57cd014475e319d" }),
      publicProvider(),
    ]
  );

export const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: "d1ed4a8b1d08ee63e62097023077970f",
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    publicClient,
  });