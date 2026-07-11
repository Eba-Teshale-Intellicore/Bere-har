"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/product.module.scss";
import Paragraph from "@/components/Paragraph";
import Image from "next/image";
import img1 from "@/public/flow1.jpeg";
import img2 from "@/public/flow2.jpeg";
import { motion } from "framer-motion";
import Heading from "@/components/Heading";
import { getCategories } from "@/src/api/category";
import { getProducts } from "@/src/api/product";
import Button from "../Button";

const womenCollections = [
  {
    title: "Women's Shoes",
    image: img2,
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
    title: "Women's Jewelry",
    image: img1,
  },
  {
    title: "Women's Jewelry",
    image: img1,
  },
];

export default function Product() {
  // const [active, setActive] = useState("all");
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
      ? products.filter((p) => p.gendercollection?.title === "womencollection")
      : products.filter(
          (p) =>
            p.gendercollection?.title === "womencollection" &&
            p.category.category_slug === active,
        );
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea}>
            <div className={styles.content}>
              <p>
                <Heading text="Women Collection" />
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

            <div className={styles.collections}>
              {filteredProducts.map((product) => (
                <React.Fragment key={product.id}>
                  {product.images.map((img: any) => (
                    <div key={img.id} className={styles.card}>
                      <motion.div
                        className={styles.imageWrapper}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={img.image}
                          alt={product.p_title}
                          fill
                          className={styles.mainImage}
                          style={{ objectFit: "cover" }}
                        />
                      </motion.div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div>
              <Button
                text={
                  active === "all"
                    ? "More"
                    : (filteredProducts[0]?.category?.category_name ??
                      "Category")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
