import { StatusBar } from "../status-bar/status-bar";
import styles from "./header.module.css";
import logo from "./logo.png";

export const Header = () => {
  const scrollToForm = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

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
          <button>Connect wallet</button>
        </div>
      </header>
    </>
  );
};
