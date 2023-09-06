import styles from "./status-bar.module.css";
import sec from "./sec.png";

export const StatusBar = () => {
  return (
    <>
      <div className={styles.statusBar}>
        <div className={styles.left}>10:00</div>
        <div className={styles.reserveZone}></div>
        <div className={styles.right}>
          <img className={styles.items} src={sec} alt="logo" />
        </div>
      </div>
    </>
  );
};