import React from "react";
import styles from "@/src/scss/heroAbout.module.scss";
import img1 from "@/public/flow1.jpeg";
import img2 from "@/public/flow2.jpeg";
import { motion } from "framer-motion";
import Image from "next/image";
import Paragraph from "../Paragraph";
const womenCollections = [
  {
    title: "Women's Accessories",
    image: img1,
    hover: img2,
  },
  {
    title: "Women's Ready-to-Wear",
    image: img1,
    hover: img2,
  },
  {
    title: "Women's Jewelry",
    image: img1,
    hover: img2,
  },
  {
    title: "Women's Shoes",
    image: img1,
    hover: img2,
  },
];
export default function HeroAbout() {
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.heroabout}>
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
                  <Paragraph text={item.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
