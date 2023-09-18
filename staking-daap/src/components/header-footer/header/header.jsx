import React from "react";
import { StatusBar } from "../status-bar/status-bar";
import styles from "./header.module.css";
// import logoDexola from "./logo.png";

import { useAccount, useBalance, useConnect, useContractRead } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { tokenAddress } from "./../../token/tokenADDRESS";
import tokenABI from "./../../token/tokenABI.json";

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
    ? Number(dataTokenBalance / 10n ** 18n)
    : "null";

  if (isConnected)
    return (
      <>
        <StatusBar />
        <header className={styles.header}>
          <div>
            <a href="https://dexola.com/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="20"
                viewBox="0 0 15 20"
                fill="none"
              >
                <g clip-path="url(#clip0_4669_689)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.40677 19.5C2.77965 19.5 2.20338 19.348 1.67796 19.0442C1.16949 18.7234 0.762713 18.3098 0.457626 17.8032C0.152542 17.2968 0 16.7312 0 16.1065V8.20522C0 7.58051 0.152542 7.01493 0.457626 6.50844C0.762713 6.00195 1.16949 5.59675 1.67796 5.29285C2.20338 4.97208 2.77965 4.81168 3.40677 4.81168H11.9745V0H15V19.5H3.40677ZM3.53389 16.4864H11.4915C11.6271 16.4864 11.7372 16.4442 11.822 16.3597C11.9237 16.2584 11.9745 16.1402 11.9745 16.0052V8.30651C11.9745 8.17143 11.9237 8.06166 11.822 7.97727C11.7372 7.87598 11.6271 7.82529 11.4915 7.82529H3.53389C3.39829 7.82529 3.27965 7.87598 3.17796 7.97727C3.09321 8.06166 3.05084 8.17143 3.05084 8.30651V16.0052C3.05084 16.1402 3.09321 16.2584 3.17796 16.3597C3.27965 16.4442 3.39829 16.4864 3.53389 16.4864Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4669_689">
                    <rect width="15" height="19.5" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_4669_693)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.5 13.5556L10.3889 7.99999L16.5 2.44444L14.3611 0.5L8.24996 6.05555L2.13889 0.5L0 2.44444L6.11108 7.99999L0 13.5556L2.13889 15.5L8.24996 9.94442L14.3611 15.5L16.5 13.5556Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4669_693">
                    <rect
                      width="16.5"
                      height="15"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {/* <img src={logoDexola} alt="logo" /> */}
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
          <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="20"
                viewBox="0 0 15 20"
                fill="none"
              >
                <g clip-path="url(#clip0_4669_689)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.40677 19.5C2.77965 19.5 2.20338 19.348 1.67796 19.0442C1.16949 18.7234 0.762713 18.3098 0.457626 17.8032C0.152542 17.2968 0 16.7312 0 16.1065V8.20522C0 7.58051 0.152542 7.01493 0.457626 6.50844C0.762713 6.00195 1.16949 5.59675 1.67796 5.29285C2.20338 4.97208 2.77965 4.81168 3.40677 4.81168H11.9745V0H15V19.5H3.40677ZM3.53389 16.4864H11.4915C11.6271 16.4864 11.7372 16.4442 11.822 16.3597C11.9237 16.2584 11.9745 16.1402 11.9745 16.0052V8.30651C11.9745 8.17143 11.9237 8.06166 11.822 7.97727C11.7372 7.87598 11.6271 7.82529 11.4915 7.82529H3.53389C3.39829 7.82529 3.27965 7.87598 3.17796 7.97727C3.09321 8.06166 3.05084 8.17143 3.05084 8.30651V16.0052C3.05084 16.1402 3.09321 16.2584 3.17796 16.3597C3.27965 16.4442 3.39829 16.4864 3.53389 16.4864Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4669_689">
                    <rect width="15" height="19.5" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_4669_693)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.5 13.5556L10.3889 7.99999L16.5 2.44444L14.3611 0.5L8.24996 6.05555L2.13889 0.5L0 2.44444L6.11108 7.99999L0 13.5556L2.13889 15.5L8.24996 9.94442L14.3611 15.5L16.5 13.5556Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4669_693">
                    <rect
                      width="16.5"
                      height="15"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>

            {/* <img src={logoDexola} alt="logo" /> */}
          </a>
        </div>
        <div>
          <button onClick={() => connect()}>Connect Wallet</button>
        </div>
      </header>
    </>
  );
};
