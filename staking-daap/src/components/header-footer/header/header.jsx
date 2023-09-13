import { StatusBar } from "../status-bar/status-bar";
import styles from "./header.module.css";
import logo from "./logo.png";

import { useAccount, useBalance, useConnect, useToken   } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data, isError, isLoading } = useBalance({
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  });
  const { token, isError2, isLoading2 } = useToken({
    address: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
  })
  if (isConnected)
    return (
      <>
        <StatusBar />
        <header className={styles.header}>
          <div>
            <a href="https://dexola.com/" target="_blank">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div>
            <div>
              {data?.symbol} {data?.formatted.substring(0, 6)} 
            </div>
            {/* btn or address with address*/}
            <span>{address.substring(0, 16)}...</span>
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
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div>
          {/* btn or address with address*/}
          <button onClick={() => connect()}>Connect Wallet</button>
        </div>
      </header>
    </>
  );
};
