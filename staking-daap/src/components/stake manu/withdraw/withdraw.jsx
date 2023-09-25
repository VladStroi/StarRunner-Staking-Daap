import styles from "./withdraw.module.css";
import { useState } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  smartContractWrite,
  smartContractRead,
} from "../../contract/contractAPI";

export const Withdraw = () => {
  const [withdrawValue, setWithdrawValue] = useState("");
  const { address } = useAccount();

  // Staked Balance
  const stakingBalance = smartContractRead("balanceOf", [address]);
  const stakedBalance = (Number(stakingBalance.data) / 10 ** 18).toFixed(2);
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
  const withdrawToken = smartContractWrite();

  // const { isLoading, isSuccess, isError } = useWaitForTransaction({
  //   hash: withdrawToken.data?.hash,
  // });

  const withdraw = async () => {
    try {
      if (withdrawValue > stakedBalance) {
        console.error("not enough tokens");
      } else {
        const withdrawTransaction = withdrawToken.write({
          functionName: "withdraw",
          args: [BigInt(withdrawValue * 10 ** 18)],
        });
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
