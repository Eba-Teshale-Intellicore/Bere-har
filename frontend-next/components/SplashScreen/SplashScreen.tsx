"use client";

import Image from "next/image";
import logo from "@/public/bere-har-2.png";
import styles from "@/src/scss/splash.module.scss";

export default function SplashScreen() {
  return (
    <div className={styles.splash}>
      <Image src={logo} alt="Bere Har" width={180} height={180} priority />

      <div className={styles.loading}>
        Loading
        <span className={styles.dots}></span>
      </div>
    </div>
  );
}
