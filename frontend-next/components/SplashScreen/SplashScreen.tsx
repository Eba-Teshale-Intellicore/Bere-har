"use client";

import Image from "next/image";
import logo from "@/public/bere-har-2.png";
import styles from "@/src/scss/splash.module.scss";
import Paragraph from "@/components/Paragraph";

export default function SplashScreen() {
  return (
    <div className={styles.splash}>
      <Image src={logo} alt="Bere Har" width={180} height={180} priority />
      <Paragraph text="Loaing..." color="white" />
    </div>
  );
}
