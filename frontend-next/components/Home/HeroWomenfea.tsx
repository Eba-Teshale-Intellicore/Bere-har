"use client";

import React, { useState } from "react";
import styles from "@/src/scss/herowomenfea.module.scss";
import Paragraph from "../Paragraph";
import Image from "next/image";
import img1 from "@/public/flow1.jpeg";
import women1 from "@/public/women1.jpg";
import women2 from "@/public/women2.jpg";
import womenh2 from "@/public/womenh2.jpg";

import img2 from "@/public/flow2.jpeg";
import { motion } from "framer-motion";
const womenCollections = [
  {
    title: "Women's Accessories",
    price: 19,
    image: women1,
    hover: women1,
  },
  {
    title: "her Dress",
    price: 25,
    image: women2,
    hover: womenh2,
  },
  {
    title: "Jewelry for hand",
    price: 5,
    image: img1,
    hover: img2,
  },
  {
    title: "Women's Shoes '34",
    price: 32,
    image: img1,
    hover: img2,
  },
];

export default function HeroWomenFea() {
  const [active, setActive] = useState("women");
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herowfea}>
            <div className={styles.content}>
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
            </div>
            {active == "women" && (
              <div className={styles.collections}>
                {womenCollections.map((item) => (
                  <div key={item.title} className={styles.card}>
                    <motion.div
                      className={styles.imageWrapper}
                      whileHover={{ scale: 1.05 }}
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
                          objectPosition: "center center",
                        }}
                      />
                    </motion.div>
                    <div className={styles.cardInfo}>
                      <Paragraph text={item.title} />
                      <Paragraph text={`$${item.price}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
