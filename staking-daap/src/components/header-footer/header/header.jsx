import React from "react";
import { StatusBar } from "../status-bar/status-bar";
import styles from "./header.module.css";
// import logoDexola from "./logo.png";

import { useAccount, useBalance, useConnect, useContractRead } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { tokenAddress } from "./../../token/tokenADDRESS";
import tokenABI from "./../../token/tokenABI.json";
import { LogoDexola } from "./logo-dexola";

export const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  
  const { data } = useBalance({
    address: address,
  });
  const { data: dataTokenBalance } = useContractRead({
    address: tokenAddress,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
  });

  
  const tokenBalance = isConnected
  ? Number(dataTokenBalance) / 10 ** 18
  : 'not connect wallet';
  
  if (isConnected)
    return (
      <>
        <StatusBar />
        <header className={styles.header}>
          <div>
            <a href="https://dexola.com/" target="_blank">
              <LogoDexola />
            </a>
          </div>
          <div className={styles.balanceWallet}>
            <div className={styles.struToken}>
              <div className={styles.logo}></div>
              <span>{tokenBalance} STRU</span>
            </div>
            <div className={styles.dataWallet}>
              <div className={styles.logo}></div>
              <span>
                {data?.formatted.substring(0, 6)} {data?.symbol}
              </span>
              <span>|</span>
              <span>{address.substring(0, 16)}...</span>
            </div>
          </div>
        </header>
      </>
    );

  return (
    <>
      <StatusBar />
      <header className={styles.header}>
        <div>
          <a href="https://dexola.com/" target="_blank">
            <LogoDexola />
          </a>
        </div>
        <div>
          <button onClick={() => connect()}>Connect Wallet</button>
        </div>
      </header>
    </>
  );
};
