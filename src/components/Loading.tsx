import styles from '../libs/css/loading.module.css';
export default function Loading() {
  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <div className={styles.dot}></div>
        <span className={styles.text}>Loading</span>
      </div>
    </div>
  );
}
