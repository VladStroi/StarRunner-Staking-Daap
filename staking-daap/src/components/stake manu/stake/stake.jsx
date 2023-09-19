import styles from "./stake.module.css";
import { useState } from "react";
import { useAccount } from "wagmi";

import { useTokenBalance } from "../../token/tokenAPI";
import {
  usePeriodFinish,
  useStakingBalance,
  useTotalSupply,
  useRewardRate,
} from "./../../contract/contractAPI";

export const Stake = () => {
  const { isConnected } = useAccount();
  const [depositValue, setDepositValue] = useState("");

  //Rewards rate
  const { data: stakingBalance } = useStakingBalance();
  const { data: periodFinish } = usePeriodFinish();
  const { data: rewardRate } = useRewardRate();
  const { data: totalSupply } = useTotalSupply();

  const stakedBalance = Number(stakingBalance) / 10 ** 18;
  const currentTimestamp = Math.floor(Date.now()) / 1000;
  const remaining = Number(periodFinish) - currentTimestamp;
  const available = remaining * Number(rewardRate);

  const rate =
    (stakedBalance * available) / Number(totalSupply) + stakedBalance;
  //

  //Available
  const { data: dataTokenBalance } = useTokenBalance();

  const tokenBalance = isConnected ? Number(dataTokenBalance) / 10 ** 18 : null;
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

  //stake btn
  const stake = () => {

    alert("Oops, something's wrong")
    // if (depositValue > tokenBalance) {
    //   console.error("not enough tokens");
    // } else {
    //   const { data: dataStake } = useContractWrite({
    //     address: tokenAddress,
    //     abi: tokenABI,
    //     functionName: "stake",
    //     args: [address],
    //   });
    // }
  };
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
