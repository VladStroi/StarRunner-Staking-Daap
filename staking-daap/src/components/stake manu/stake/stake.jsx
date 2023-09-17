import styles from "./stake.module.css";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { tokenAddress } from "./../../token/tokenADDRESS";
import tokenABI from "./../../token/tokenABI.json";
import { useState } from "react";


export const Stake = () => {

  const [depositValue, setDepositValue] = useState("");

  //available
  const { address, isConnected } = useAccount();
  
  const { data: dataTokenBalance } = useContractRead({
    address: tokenAddress,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
  });
  
  const tokenBalance = isConnected
  ? Number(dataTokenBalance / 10n ** 18n)
  : "null";
  //

  // number input validation
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
  }
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
    if (depositValue > tokenBalance) {
      console.error('not enough tokens');
    } else {
      const { data: dataStake } = useContractWrite({
        address: tokenAddress,
        abi: tokenABI,
        functionName: "stake",
        args: [address],
      });
    }
  }

  return (
    <section className={styles.sectionWindow}>
      <div className={styles.header}>
        <h1>Stake</h1>
        <div className={styles.rate}>
          <span>Reward rate:</span>
          <h2 className={styles.amount}>1</h2>
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
