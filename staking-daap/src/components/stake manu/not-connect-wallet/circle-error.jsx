import styles from "./not-connect.module.css";

export const CircleError = () => {
  return (
    <svg
      className={styles.circleError}
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
    >
      <path
        d="M14.5 24.9375C20.5406 24.9375 25.4375 20.0406 25.4375 14C25.4375 7.95939 20.5406 3.0625 14.5 3.0625C8.45939 3.0625 3.5625 7.95939 3.5625 14C3.5625 20.0406 8.45939 24.9375 14.5 24.9375Z"
        fill="#EB3795"
        stroke="#EB3795"
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4375 10.0625L10.5625 17.9375L18.4375 10.0625ZM10.5625 10.0625L18.4375 17.9375L10.5625 10.0625Z"
        fill="#EB3795"
      />
      <path
        d="M18.4375 10.0625L10.5625 17.9375M10.5625 10.0625L18.4375 17.9375"
        stroke="white"
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
