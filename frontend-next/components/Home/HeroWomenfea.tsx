"use client";

import React, { useState } from "react";
import styles from "@/src/scss/herowomenfea.module.scss";
import Paragraph from "../Paragraph";
import Image from "next/image";
import img1 from "@/public/flow1.jpeg";
import women1 from "@/public/women1.jpg";
import women2 from "@/public/women2.jpg";
import womenh2 from "@/public/womenh2.jpg";
import women3 from "@/public/women3.jpg";
import womenh3 from "@/public/womenh3.jpg";
import women4 from "@/public/women4.jpg";
import womenh4 from "@/public/womenh4.jpg";

import img2 from "@/public/flow2.jpeg";
import { AnimatePresence, motion } from "framer-motion";
const womenCollections = [
  {
    title: "Her Signature",
    price: 19,
    image: women1,
    hover: women1,
  },
  {
    title: "Elegant Heritage",
    price: 25,
    image: women2,
    hover: womenh2,
  },
  {
    title: "Tradition Reimagined",
    price: 5,
    image: women3,
    hover: womenh3,
  },
  {
    title: "The Progress",
    price: 32,
    image: women4,
    hover: womenh4,
  },
];

export default function HeroWomenFea() {
  const [active, setActive] = useState("women");
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <AnimatePresence mode="wait">
            <div className={styles.herowfea}>
              <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <ul>
                  <li
                    onClick={() => setActive("women")}
                    className={active === "women" ? styles.active : ""}
                  >
                    Women
                  </li>
                </ul>
                <p>
                  <Paragraph text="Inspired by Ethiopia's rich textile heritage, our women's collection blends luxurious fabrics, elegant silhouettes, and meticulous craftsmanship to create effortless sophistication." />
                </p>
              </motion.div>
              {active == "women" && (
                <div className={styles.collections}>
                  {womenCollections.map((item) => (
                    <div key={item.title} className={styles.card}>
                      <div className={styles.overlay} />
                      <motion.div
                        className={styles.imageWrapper}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, amount: 0.3 }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className={styles.mainImage}
                          style={{
                            objectFit: "cover",
                            objectPosition: "top center",
                          }}
                        />

                        <Image
                          src={item.hover}
                          alt={item.title}
                          fill
                          className={styles.hoverImage}
                          style={{
                            objectFit: "cover",
                            objectPosition: "top center",
                          }}
                        />
                      </motion.div>
                      <div className={styles.cardInfo}>
                        <p>
                          <Paragraph text={item.title} />
                        </p>
                        {/* <Paragraph text={`$${item.price}`} /> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
