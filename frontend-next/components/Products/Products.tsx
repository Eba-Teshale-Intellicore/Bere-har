"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/product.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "@/components/Heading";
import { getCategories } from "@/src/api/category";
import { getProducts } from "@/src/api/product";
import Button from "../Button";
import { useWishlistContext } from "@/app/WishlistContext";
import { Heart } from "lucide-react";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function Products() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const { toggleWishlist, isWishlisted } = useWishlistContext();

  const { isLoggedIn } = useAuth();

  const handleWishlist = async (id: number) => {
    if (!isLoggedIn) {
      router.push("/account/login");
      return;
    }

    await toggleWishlist(id);
  };

  useEffect(() => {
    setVisibleCount(5);
  }, [active]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const product = products.filter((p) => p.p_status === "published");

  const filteredProducts =
    active === "all"
      ? product
      : product.filter((p) => p.category.category_slug === active);
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea2}>
            <div className={styles.content}>
              <h1>
                <Heading text="Our_Products" />
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
            <div>
              <div className={styles.collections}>
                {loading
                  ? Array.from({ length: 10 }).map((_, index) => (
                      <ProductSkeleton key={index} />
                    ))
                  : filteredProducts.slice(0, visibleCount).map((product) => {
                      const liked = isWishlisted(product.id);
                      return (
                        <div key={product.id} className={styles.card}>
                          <div className={styles.overlay} />

                          <motion.div
                            className={styles.imageWrapper}
                            whileHover={{ scale: 1.04 }}
                          >
                            <motion.button
                              type="button"
                              aria-label="Add to wishlist"
                              onClick={() => handleWishlist(product.id)}
                            >
                              <Heart
                                fill={liked ? "red" : "none"}
                                color={liked ? "red" : "currentColor"}
                                className={styles.favorites}
                                size={24}
                              />
                            </motion.button>
                            <div>
                              <Image
                                src={
                                  product.variants?.[0]?.image ||
                                  "/placeholder.jpg"
                                }
                                alt={
                                  product.variants?.[0]?.alt_text ||
                                  product.p_title
                                }
                                fill
                                className={styles.mainImage}
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </motion.div>

                          <div className={styles.cardContent}>
                            {product.variants?.length > 0 ? (
                              <>
                                <div className={styles.info}>
                                  <p className={styles.price}>
                                    ${product.variants[0].price} USD
                                  </p>
                                  <p>{product.variants[0].size.name}</p>
                                </div>
                                <div className={styles.info2}>
                                  <h4>{product.p_title}</h4>
                                </div>
                              </>
                            ) : (
                              // <p>No variants available</p>
                              <p></p>
                            )}
                          </div>
                        </div>
                      );
                    })}
              </div>
              <div className={styles.btn}>
                {visibleCount < filteredProducts.length && (
                  <Button
                    text="View More"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                  />
                )}
              </div>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
