"use client";

import React, { useState } from "react";
import styles from "@/src/scss/herowomenfea.module.scss";
import Paragraph from "../Paragraph";
import Image from "next/image";
import img1 from "@/public/flow1.jpeg";
import men1 from "@/public/men1.jpg";
import menh1 from "@/public/menh1.jpg";
import men2 from "@/public/men2.jpg";
import menh2 from "@/public/menh2.jpg";

import men3 from "@/public/men3.jpg";
import menh3 from "@/public/menh3.jpg";
import men4 from "@/public/men3.jpg";
import menh4 from "@/public/menh4.jpg";
import img2 from "@/public/flow2.jpeg";
import { motion } from "framer-motion";

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
          <div className={styles.herowfea}>
            <div className={styles.content}>
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
            </div>
            {active == "men" && (
              <div className={styles.collections}>
                {menCollections.map((item) => (
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
                      {/* <Paragraph text={`$${item.price}`} /> */}
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
