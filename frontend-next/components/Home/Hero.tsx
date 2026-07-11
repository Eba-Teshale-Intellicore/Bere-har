"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/hero.module.scss";
import Image from "next/image";
import Paragraph from "@/components/Paragraph";
import hero1 from "@/public/flow5.jpeg";
import hero2 from "@/public/flow4.jpeg";
import hero3 from "@/public/flow6.jpeg";
import hero4 from "@/public/flow3.jpeg";

import { AnimatePresence, motion } from "framer-motion";

const images = [hero1, hero2, hero3, hero4];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.overlay} />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={styles.imagebg}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={images[current]}
                  alt="Hero"
                  fill
                  priority={current === 0}
                  sizes="100vw"
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
              {/* <div className={styles.xscroll}>fgn</div> */}
            </div>
            <div className={styles.pagination}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={
                    current === index ? styles.active : styles.inactive
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
