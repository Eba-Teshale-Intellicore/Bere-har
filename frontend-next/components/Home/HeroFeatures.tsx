"use client";

import React, { useEffect, useState } from "react";
import styles from "@/src/scss/herofeatues.module.scss";
import Paragraph from "../Paragraph";
import Image from "next/image";
import fea1 from "@/public/fea1.jpeg";
import img1 from "@/public/flow1.jpeg";
import fea2 from "@/public/fea2.jpeg";
import feah2 from "@/public/feah2.jpeg";

import img2 from "@/public/flow2.jpeg";
import { motion } from "framer-motion";
// import { getProducts } from "@/src/api/product";
const womenCollections = [
  {
    title: "Handbags",
    image: fea1,
    hover: fea1,
  },
  {
    title: "Ready-to-Wear",
    image: fea2,
    hover: feah2,
  },
  {
    title: "Exclusive Jewelry",
    image: img1,
    hover: img2,
  },
  {
    title: "Elegant Footwear",
    image: img1,
    hover: img2,
  },
];
const menCollections = [
  {
    title: "Luxury Accessories",
    image: img1,
    hover: img2,
  },
  {
    title: "Men's Couture",
    image: img1,
    hover: img2,
  },
  {
    title: "Fine Jewelry",
    image: img1,
    hover: img2,
  },
  {
    title: "Designer Footwear",
    image: img1,
    hover: img2,
  },
];

export default function HeroFeatures() {
  const [active, setActive] = useState("women");
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const data = await getProducts();
  //       setProducts(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

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
                <li
                  onClick={() => setActive("women")}
                  className={active === "women" ? styles.active : ""}
                >
                  Women
                </li>

                <li
                  onClick={() => setActive("men")}
                  className={active === "men" ? styles.active : ""}
                >
                  Men
                </li>
              </ul>
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
                        placeholder="blur"
                        className={styles.mainImage}
                        style={{ objectFit: "cover" }}
                      />

                      <Image
                        src={item.hover}
                        alt={item.title}
                        fill
                        placeholder="blur"
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
            )}
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
                        placeholder="blur"
                        className={styles.mainImage}
                        style={{ objectFit: "cover" }}
                      />

                      <Image
                        src={item.hover}
                        alt={item.title}
                        fill
                        className={styles.hoverImage}
                        placeholder="blur"
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
