"use client";

import React, { useState } from "react";
import styles from "@/src/scss/herowomenfea.module.scss";
import Paragraph from "../Paragraph";
import Image from "next/image";
import men1 from "@/public/men1.jpg";
import menh1 from "@/public/menh1.jpg";
import men2 from "@/public/men2.jpg";
import menh2 from "@/public/menh2.jpg";

import men3 from "@/public/men3.jpg";
import menh3 from "@/public/menh3.jpg";
import men4 from "@/public/men4.jpg";
import menh4 from "@/public/menh4.jpg";
import { AnimatePresence, motion } from "framer-motion";

const menCollections = [
  {
    title: "Signature Details",
    price: 23,
    image: men1,
    hover: menh1,
  },
  {
    title: "Modern Heritage",
    price: 20,
    image: men2,
    hover: menh2,
  },
  {
    title: "Crafted for Generations",
    price: 10,
    image: men3,
    hover: menh3,
  },
  {
    title: "National Treasure",
    price: 35,
    image: men4,
    hover: menh4,
  },
];

export default function HeroWomenFea() {
  const [active, setActive] = useState("men");
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
                    onClick={() => setActive("men")}
                    className={active === "men" ? styles.active : ""}
                  >
                    Men
                  </li>
                </ul>
                <p>
                  <Paragraph text="Inspired by Ethiopia's rich textile heritage, our men's collection showcases premium materials, clean tailoring, and timeless craftsmanship, delivering effortless sophistication for every occasion." />
                </p>
              </motion.div>
              {active == "men" && (
                <div className={styles.collections}>
                  {menCollections.map((item) => (
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
                          style={{ objectFit: "cover" }}
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
                        <Paragraph text={item.title} />
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
