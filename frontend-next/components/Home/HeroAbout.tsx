"use client";
import React from "react";
import styles from "@/src/scss/heroAbout.module.scss";
import img1 from "@/public/flow1.jpeg";
import her1 from "@/public/heritage.jpg";
import mlu from "@/public/mluxury.jpg";
import molus from "@/public/moluxury.jpg";
import img2 from "@/public/flow2.jpeg";
import { motion } from "framer-motion";
import Image from "next/image";
import Paragraph from "../Paragraph";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

const historyCollections = [
  {
    title: "Our Heritage",
    description:
      "Since 1996, BERU HAR has celebrated Ethiopian craftsmanship by transforming traditional artistry into timeless luxury fashion.",
    image: her1,
    hover: her1,
    button: "Discover Our Story",
  },
  {
    title: "Design Show",
    description:
      "Experience BERU HAR's signature collections through exclusive fashion presentations that celebrate timeless elegance, Ethiopian heritage, and contemporary design.",
    image: img1,
    hover: img2,
    button: "Explore the Show",
  },
  {
    title: "Modern Ethiopian Luxury",
    description:
      "Inspired by Ethiopia's rich cultural heritage, our collections blend authentic tradition with contemporary design for today's global lifestyle.",
    image: mlu,
    hover: molus,
    button: "View Collections",
  },
];
export default function HeroAbout() {
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.heroabout}>
            <div className={styles.content}>
              <h1>
                <Heading text="A Legacy of Ethiopian Craftsmanship" size="md" />
              </h1>
              <p>
                <Paragraph text="Founded in 1996, BERU HAR is dedicated to preserving Ethiopia's rich textile heritage through handcrafted luxury fashion. Every collection reflects timeless elegance, exceptional craftsmanship, and contemporary sophistication." />
              </p>
            </div>
            <div className={styles.collections}>
              {historyCollections.map((item) => (
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
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                  <div className={styles.cardContent}>
                    <Heading text={item.title} size="sm" />
                    <Paragraph text={item.description} />
                    <Button text={item.button} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
