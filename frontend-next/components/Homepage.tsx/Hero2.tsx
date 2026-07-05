import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styles from "@/src/scss/hero.module.scss";
import Image from "next/image";
import hero1 from "@/public/flow5.jpeg";
import Paragraph from "../Paragraph";
export default function Hero2() {
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.overlay} />
            <AnimatePresence mode="wait">
              <motion.div
                className={styles.imagebg}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={hero1}
                  alt="Hero"
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    // objectPosition: "center center",
                  }}
                />
              </motion.div>
            </AnimatePresence>
            <div className={styles.content}>
              <p>
                <Paragraph
                  text="HandMade Ethiopian Silk "
                  size="lg"
                  color="white"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
