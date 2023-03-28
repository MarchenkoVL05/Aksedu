import styles from "./ErrorBox.module.scss";

function ErrorBox({ message }) {
  return (
    <div className={styles.box}>
      <p className={styles.text}>{message}</p>
    </div>
  );
}

export default ErrorBox;
