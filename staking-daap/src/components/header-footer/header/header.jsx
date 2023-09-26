import React from "react";
import styles from "./header.module.css";

import { useWeb3Modal } from '@web3modal/react'

import { useAccount, useBalance, useConnect } from "wagmi";
// import { InjectedConnector } from "wagmi/connectors/injected";

import { tokenContractRead } from "../../token/tokenAPI";
import { LogoDexola } from "./logo-dexola";

export const Header = () => {

  const { open, close } = useWeb3Modal()

  const { address, isConnected } = useAccount();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });

  const { data: mainTokenBalance } = useBalance({
    address: address,
  });
  const dataTokenBalance = tokenContractRead("balanceOf", [address]);

  const tokenBalance = isConnected
    ? Number(dataTokenBalance.data) / 10 ** 18
    : "not connect wallet";

  if (isConnected)
    return (
      <>
        <header className={styles.header}>
          <div>
            <a href="https://dexola.com/" target="_blank">
              <LogoDexola />
            </a>
          </div>
          <div className={styles.balanceWallet}>
            <div className={styles.struToken}>
              <div className={styles.logo}></div>
              <span>{tokenBalance.toFixed(2)} STRU</span>
            </div>
            <div className={styles.dataWallet}>
              <div className={styles.logo}></div>
              <span>
                {Number(mainTokenBalance.formatted).toFixed(2)} {mainTokenBalance.symbol}
              </span>
              <span className={styles.hiddenMobile}>|</span>
              <span className={styles.hiddenMobile}>
                {address.substring(0, 16)}...
              </span>
            </div>
          </div>
        </header>
      </>
    );

  return (
    <>
      <header className={styles.header}>
        <div>
          <a href="https://dexola.com/" target="_blank">
            <LogoDexola />
          </a>
        </div>
        <div>
          <button onClick={() => open()}>Connect Wallet</button>
        </div>
      </header>
    </>
  );
};
