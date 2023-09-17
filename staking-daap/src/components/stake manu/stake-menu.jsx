import { useState } from "react";
import styles from "./stake-menu.module.css";
import { Route, Link, Routes } from "react-router-dom";

import { Stake } from "./stake/stake";
import { Withdraw } from "./withdraw/withdraw";
import { ClaimRewards } from "./claim-rewards/claim-rewards";

import { useAccount } from "wagmi";
import { NotConnect } from "./not-connect-wallet/not-connect";


export const StakeMenu = () => {
  const [activeButton, setActiveButton] = useState(0);
  
  const { isConnected } = useAccount();

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  if (isConnected)

  return (
    <section className={styles.stakingMenu}>
      <div className={styles.navigation}>
        {["Stake", "Withdraw", "Claim rewards"].map((text, index) => (
          <Link
            key={index}
            to={`/${text}`}
            className={`${styles.navButton} ${
              index === activeButton ? styles.active : ""
            }`}
            onClick={() => handleButtonClick(index)}
          >
            <span className={styles.buttonText}>{text}</span>
          </Link>
        ))}
      </div>
      <Routes>
        <Route path="/" element={<Stake />} />
        <Route path="/Stake" element={<Stake />} />
        <Route path="/Withdraw" element={<Withdraw />} />
        <Route path="/Claim rewards" element={<ClaimRewards />} />
        <Route path="*" element={<span>error</span>} />
      </Routes>
    </section>
  );

  return (
    <section className={styles.stakingMenu}>
      <div className={styles.navigation}>
        {["Stake", "Withdraw", "Claim rewards"].map((text, index) => (
          <Link
            key={index}
            to={`/${text}`}
            className={`${styles.navButton} ${
              index === activeButton ? styles.active : ""
            }`}
            onClick={() => handleButtonClick(index)}
          >
            <span className={styles.buttonText}>{text}</span>
          </Link>
        ))}
      </div>
      <NotConnect/>
    </section>
  );
};
