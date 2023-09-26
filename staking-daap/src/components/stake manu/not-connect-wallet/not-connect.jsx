import styles from "./not-connect.module.css";
import { CircleError } from "./circle-error";
import { WalletIcon } from "./wallet-icon";

import { useWeb3Modal } from "@web3modal/react";

import { sepolia, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const NotConnect = () => {
  const { connect } = useConnect({
    connector:
      // new MetaMaskConnector({ chains: [sepolia] }),
      // new CoinbaseWalletConnector({
      //           chain: sepolia,

      //   options: {
      //     appName: "wagmi",
      //   },
      // }),
      // new WalletConnectConnector({
      //   options: {
      //     projectId: "d1ed4a8b1d08ee63e62097023077970f",
      //   },
      // }),
    new InjectedConnector({
      chain: sepolia,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  });

  return (
    <section className={styles.sectionWindow}>
      <div className={styles.icon}>
        <WalletIcon />
        <CircleError />
      </div>
      <span>To start staking you need to connect you wallet first</span>
      <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
      {/* <ConnectButton.Custom>
      {()=> {
        return (
          <button onClick={() => connect()}>Connect Wallet</button>
        )
      }}
      </ConnectButton.Custom> */}
    </section>
  );
};
