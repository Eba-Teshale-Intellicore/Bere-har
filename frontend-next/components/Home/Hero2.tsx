"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styles from "@/src/scss/hero2.module.scss";
import Image from "next/image";
import hero1 from "@/public/flow1.jpeg";
import hero2 from "@/public/hero2.jpg";
import Button from "../Button";
import Link from "next/link";
export default function Hero2() {
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.hero2}>
            <div className={styles.overlay} />
            <AnimatePresence mode="wait">
              <motion.div
                className={styles.imagebg}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <Image
                  src={hero2}
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
                <Link href="/women-collections">
                  <Button text="Discover the Collection" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
