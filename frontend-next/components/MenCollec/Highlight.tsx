"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/highlight.module.scss";
import Paragraph from "@/components/Paragraph";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "@/components/Heading";
import { getCategories } from "@/src/api/category";
import { getProducts } from "@/src/api/product";

export default function Highlight() {
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
    active === "all"
      ? products.filter((p) => p.gendercollection?.title === "mencollection")
      : products.filter(
          (p) =>
            p.gendercollection?.title === "mencollection" &&
            p.category.category_slug === active,
        );

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
                {categories.map((e: any) => (
                  <li
                    key={e.id}
                    onClick={() => setActive(e.category_slug)}
                    className={active === e.category_slug ? styles.active : ""}
                  >
                    {e.category_name}
                  </li>
                ))}
              </ul>
            </div>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.collections}>
                {/* LARGE */}
                <div className={styles.card} style={{ gridArea: "fir" }}>
                  <motion.div
                    className={styles.imageWrapper}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={
                        product.campaign?.banner ||
                        // product.images?.[0]?.image ||
                        "/placeholder.jpg"
                      }
                      alt={product.p_title}
                      fill
                      className={styles.mainImage}
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>

                  <Paragraph text={product.p_title} />
                </div>

                {/* SMALL 1 */}
                <div className={styles.card} style={{ gridArea: "sec" }}>
                  <motion.div
                    className={styles.imageWrapper}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={product.images?.[0]?.image}
                      alt={product.p_title}
                      fill
                      className={styles.mainImage}
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>

                  <Paragraph text={product.p_title} />
                </div>

                {/* SMALL 2 */}
                <div className={styles.card} style={{ gridArea: "thir" }}>
                  <motion.div
                    className={styles.imageWrapper}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={product.images?.[1]?.image}
                      alt={product.p_title}
                      fill
                      className={styles.mainImage}
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>

                  <Paragraph text={product.p_title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
