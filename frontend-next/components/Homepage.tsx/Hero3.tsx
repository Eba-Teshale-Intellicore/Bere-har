"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styles from "@/src/scss/hero2.module.scss";
import Image from "next/image";
import hero1 from "@/public/flow3.jpeg";
import Button from "../Button";
export default function Hero3() {
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.hero2}>
            <div className={styles.overlay} />
            <AnimatePresence mode="wait">
              <motion.div
                className={styles.imagebg}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <Image
                  src={hero1}
                  alt="Hero"
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </AnimatePresence>
            <div className={styles.content}>
              <p>
                <Button text="Discover the Collection" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
