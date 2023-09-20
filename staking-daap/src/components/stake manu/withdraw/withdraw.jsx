import styles from "./withdraw.module.css";
import {
  useStakingBalance,
  usePeriodFinish,
  useRewardRate,
  useTotalSupply,
  useWithdraw,
} from "./../../contract/contractAPI";
import { useState } from "react";
import { useWaitForTransaction } from "wagmi";

export const Withdraw = () => {
  const [withdrawValue, setWithdrawValue] = useState("");

  // Staked Balance
  const { data: stakingBalance } = useStakingBalance();

  const stakedBalance = Number(stakingBalance) / 10 ** 18;
  //
  //Rewards rate
  const { data: periodFinish } = usePeriodFinish();
  const { data: rewardRate } = useRewardRate();
  const { data: totalSupply } = useTotalSupply();

  const currentTimestamp = Math.floor(Date.now()) / 1000;
  const remaining = Number(periodFinish) - currentTimestamp;
  const available = remaining * Number(rewardRate);

  const rate =
    (stakedBalance * available) / Number(totalSupply) + stakedBalance;
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
      setWithdrawValue(nextUserInput);
    }
  };
  //

  //withdraw btn
  const { data, write } = useWithdraw(BigInt(withdrawValue * 10 ** 18));

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  const withdraw = async () => {
    try {
      if (withdrawValue > stakedBalance) {
        console.error("not enough tokens");
      } else {
        const withdrawTransaction = write();
      }
    } catch (error) {
      console.error("test: ", error);
    }
  };
  //
  return (
    <section className={styles.sectionWindow}>
      <div className={styles.header}>
        <h1>Withdraw</h1>
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
            placeholder="Enter withdraw amount"
            onChange={(e) => {
              enforcer(e.target.value);
            }}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            value={withdrawValue}
          />
        </div>
        <div className={styles.available}>
          <span>Available:</span>
          <h2 className={styles.amount}>{stakedBalance}</h2>
          <h3>STRU</h3>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={withdraw}>withdraw</button>
        <span>withdraw all & Claim rewards</span>
      </div>
    </section>
  );
};
