"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/highlight.module.scss";
import Paragraph from "@/components/Paragraph";
import Image from "next/image";
import img1 from "@/public/flow1.jpeg";
import img2 from "@/public/flow2.jpeg";
import { motion } from "framer-motion";
import Heading from "@/components/Heading";
import { getCategories } from "@/src/api/category";

const womenCollections = [
  {
    title: "Shoes",
    image: img1,
    area: "fir",
  },
  {
    title: "Dress",
    image: img2,
    area: "sec",
  },
  {
    title: "Jewelry",
    image: img2,
    area: "thir",
  },
];

export default function Highlight() {
  // const [active, setActive] = useState("all");
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea}>
            <div className={styles.content}>
              <p>
                <Heading text="Women_Collection" />
              </p>
              <ul>
                <li
                  onClick={() => setActive("all")}
                  className={active === "all" ? styles.active : ""}
                >
                  All
                </li>
                {categories.map((item: any) => (
                  <li
                    key={item.id}
                    onClick={() => setActive(item.category_slug)}
                    className={
                      active === item.category_slug ? styles.active : ""
                    }
                  >
                    {item.category_name}
                  </li>
                ))}

                {/* <li
                  onClick={() => setActive("jew")}
                  className={active === "jew" ? styles.active : ""}
                >
                  Jewelery
                </li>

                <li
                  onClick={() => setActive("bags")}
                  className={active === "bags" ? styles.active : ""}
                >
                  Bags
                </li> */}
              </ul>
            </div>
            {active == "all" && (
              <div className={styles.collections}>
                {womenCollections.map((item) => (
                  <div
                    key={item.title}
                    className={styles.card}
                    style={{ gridArea: item.area }}
                  >
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
                    </motion.div>
                    <Paragraph text={item.title} />
                  </div>
                ))}
              </div>
            )}
            {(active == "all" || active == "shoes") && (
              <div className={styles.collections}>
                {womenCollections.map((item) => (
                  <div
                    key={item.title}
                    className={styles.card}
                    style={{ gridArea: item.area }}
                  >
                    <motion.div
                      className={styles.imageWrapper}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`${styles.mainImage}`}
                        style={{ objectFit: "cover" }}
                      />
                    </motion.div>
                    <Paragraph text={item.title} />
                  </div>
                ))}
              </div>
            )}
            {(active == "all" || active == "jew") && (
              <div className={styles.collections}>
                {womenCollections.map((item) => (
                  <div
                    key={item.title}
                    className={styles.card}
                    style={{ gridArea: item.area }}
                  >
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
                    </motion.div>
                    <Paragraph text={item.title} />
                  </div>
                ))}
              </div>
            )}
            {(active == "all" || active == "bags") && (
              <div className={styles.collections}>
                {womenCollections.map((item) => (
                  <div
                    key={item.title}
                    className={styles.card}
                    style={{ gridArea: item.area }}
                  >
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
