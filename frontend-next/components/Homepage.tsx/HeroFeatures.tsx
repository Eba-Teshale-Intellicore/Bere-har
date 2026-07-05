"use client";
import React, { useState } from "react";
import styles from "@/src/scss/herofeatues.module.scss";
import Paragraph from "../Paragraph";
import Image from "next/image";
import img1 from "@/public/flow1.jpeg";
const womenCollections = [
  {
    title: "Women's Accessories",
    image: img1,
  },
  {
    title: "Women's Ready-to-Wear",
    image: img1,
  },
  {
    title: "Women's Jewelry",
    image: img1,
  },
  {
    title: "Women's Shoes",
    image: img1,
  },
];
const menCollections = [
  {
    title: "men's Accessories",
    image: img1,
  },
  {
    title: "men's Ready-to-Wear",
    image: img1,
  },
  {
    title: "men's Jewelry",
    image: img1,
  },
  {
    title: "men's Shoes",
    image: img1,
  },
];

export default function HeroFeatures() {
  const [active, setActive] = useState("women");
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea}>
            <div className={styles.content}>
              <p>
                <Paragraph text="Essential volumes, natural materials and functional details define the new season, reinterpreting the codes of summer style." />
              </p>
              <ul>
                <li onClick={() => setActive("women")}>Women</li>
                <li onClick={() => setActive("men")}>Men</li>
              </ul>
            </div>
            {active == "women" && (
              <div className={styles.collections}>
                {womenCollections.map((item) => (
                  <div key={item.title} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <Paragraph text={item.title} />
                  </div>
                ))}
              </div>
            )}
            {active == "women" && (
              <div className={styles.collections}>
                {menCollections.map((item) => (
                  <div key={item.title} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <Paragraph text={item.title} />
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
