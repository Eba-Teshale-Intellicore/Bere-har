// components/ProductSkeleton.tsx

import styles from "@/src/scss/ProductSkeleton.module.scss";

export default function ProductSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>

      <div className={styles.info}>
        <div className={styles.title}></div>
        <div className={styles.line}></div>
        <div className={styles.lineSmall}></div>
      </div>
    </div>
  );
}
