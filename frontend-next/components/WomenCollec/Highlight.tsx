"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/highlight.module.scss";
import Paragraph from "@/components/Paragraph";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "@/components/Heading";
import { getCategories } from "@/src/api/category";
import { getProducts } from "@/src/api/product";
// export interface Category {
//   id: number;
//   category_name: string;
//   category_slug: string;
// }

// export interface Gender {
//   id: number;
//   title: string;
// }

// export interface Variant {
//   id: number;
//   image: string;
//   price: string;
//   quantity: number;
//   color: string;
//   alt_text: string;
// }

// export interface Product {
//   id: number;
//   p_title: string;
//   main_thumbnail: string;
//   category: Category;
//   gender: Gender[];
//   variants: Variant[];
// }

// const [products, setProducts] = useState<Product[]>([]);
export default function Highlight() {
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

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

  // && p_status="published"
  // ).order_by("-created_at")[:8]

  const filteredProducts =
    active === "all"
      ? products.filter((p) => p.gender?.some((g: any) => g.title === "women"))
      : products.filter(
          (p) =>
            p.gender?.some((g: any) => g.title === "women") &&
            p.category.category_slug === active,
        );

  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea}>
            <div className={styles.content}>
              <h1>
                <Heading text="Women_Collection" />
              </h1>
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
                  {!loaded && <div className={styles.skeleton} />}
                  <motion.div
                    className={styles.imageWrapper}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={
                        product.main_thumbnail ||
                        // product.images?.[0]?.image ||
                        "/placeholder.jpg"
                      }
                      alt={product.p_title}
                      fill
                      className={styles.mainImage}
                      style={{ objectFit: "cover" }}
                      placeholder="blur"
                      onLoad={() => setLoaded(true)}
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
                      src={product.variants?.[0]?.image || "/placeholder.jpg"}
                      alt={product.variants?.[0]?.alt_text || product.p_title}
                      fill
                      className={styles.mainImage}
                      style={{ objectFit: "cover" }}
                      placeholder="blur"
                    />
                  </motion.div>
                  <div className={styles.cardContent}>
                    {product.variants?.length > 0 ? (
                      <>
                        <div className={styles.info}>
                          <h4>{product.p_title}</h4>
                        </div>
                      </>
                    ) : (
                      // <p>No variants available</p>
                      <p></p>
                    )}
                  </div>

                  <Paragraph text={product.p_title} />
                </div>

                {/* SMALL 2 */}
                <div className={styles.card} style={{ gridArea: "thir" }}>
                  <motion.div
                    className={styles.imageWrapper}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={product.variants?.[1]?.image || "/placeholder.jpg"}
                      alt={product.variants?.[1]?.alt_text || product.p_title}
                      fill
                      className={styles.mainImage}
                      style={{ objectFit: "cover" }}
                      placeholder="blur"
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
