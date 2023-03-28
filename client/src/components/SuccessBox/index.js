import styles from "./SuccessBox.module.scss";

function SuccessBox({ message }) {
  return (
    <div className={styles.box}>
      <p className={styles.text}>{message}</p>
    </div>
  );
}

export default SuccessBox;
