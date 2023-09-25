import styles from "./stake.module.css";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { contractAddress } from "../../contract/contractADDRESS";

import { tokenContractRead, tokenContractWrite } from "../../token/tokenAPI";
import {
  smartContractRead,
  smartContractWrite,
} from "../../contract/contractAPI";

import { useWaitForTransaction } from "wagmi";

export const Stake = () => {
  const { isConnected } = useAccount();
  const { address } = useAccount();
  const [depositValue, setDepositValue] = useState("");

  //Rewards rate
  const stakingBalance = smartContractRead("balanceOf", [address]);
  const periodFinish = smartContractRead("periodFinish");
  const rewardRate = smartContractRead("rewardRate");
  const totalSupply = smartContractRead("totalSupply");

  const stakedBalance = Number(stakingBalance.data) / 10 ** 18;
  const currentTimestamp = Math.floor(Date.now()) / 1000;
  const remaining = Number(periodFinish.data) - currentTimestamp;
  const available = remaining * Number(rewardRate.data);

  const rate =
    (stakedBalance * available) / Number(totalSupply.data) + stakedBalance;
  //

  //Available
  const dataTokenBalance = tokenContractRead("balanceOf", [address]);

  const tokenBalance = isConnected
    ? (Number(dataTokenBalance.data) / 10 ** 18).toFixed(2)
    : null;
  //

  //Input validation
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  const enforcer = (nextUserInput) => {
    const inputLength = nextUserInput.length;
    const inputRegex = RegExp("^\\d*(?:\\\\[.])?\\d*$");

    if (inputLength > 20) {
      return;
    }

    if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
      if (nextUserInput[0] === "0" && nextUserInput[1] === "0") {
        let num =
          Number(nextUserInput.split(".")[0]) +
          "." +
          (nextUserInput.split(".")[1] || "");
        nextUserInput = num.toString();
      }
      setDepositValue(nextUserInput);
    }
  };
  //

  //approve & stake btn
  const [hash, setHash] = useState("");

  const approveToken = tokenContractWrite();

  const stakeToken = smartContractWrite();

  const res = useWaitForTransaction({
    hash,
  });

  const stake = async () => {
    if (Number(depositValue) > Number(tokenBalance)) {
      console.error("not enough tokens");
    } else {
      const sendApprove = await approveToken.writeAsync({
        functionName: "approve",
        args: [contractAddress, BigInt(depositValue * 10 ** 18)],
      });
      setHash(sendApprove.hash);
    }
  };

  useEffect(() => {
    if (res.isSuccess) {
      stakeToken.write({
        functionName: "stake",
        args: [BigInt(depositValue * 10 ** 18)],
      });
    }
  }, [res.status]);
  //

  return (
    <section className={styles.sectionWindow}>
      <div className={styles.header}>
        <h1>Stake</h1>
        <div className={styles.rate}>
          <span>Reward rate:</span>
          <h2 className={styles.amount}>{Math.floor(rate)}</h2>
          <h3>STRU/week</h3>
        </div>
      </div>
      <div className={styles.stakeSetting}>
        <div className={styles.inputBlock}>
          <input
            className={styles.enteringAmount}
            placeholder="Enter stake amount"
            onChange={(e) => {
              enforcer(e.target.value);
            }}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            value={depositValue}
          />
        </div>
        <div className={styles.available}>
          <span>Available:</span>
          <h2 className={styles.amount}>{tokenBalance}</h2>
          <h3>STRU</h3>
        </div>
      </div>
      <button onClick={stake}>stake</button>
    </section>
  );
};
