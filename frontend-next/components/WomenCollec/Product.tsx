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

export default function Product() {
  const router = useRouter();

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
            <div>
              <div className={styles.collections}>
                {filteredProducts.slice(0, visibleCount).map((product) => {
                  const liked = isWishlisted(product.id);
                  return (
                    <div key={product.id} className={styles.card}>
                      <motion.div
                        className={styles.imageWrapper}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={
                            product.variants?.[0]?.image || "/placeholder.jpg"
                          }
                          alt={
                            product.variants?.[0]?.alt_text || product.p_title
                          }
                          fill
                          className={styles.mainImage}
                          style={{ objectFit: "cover" }}
                        />
                      </motion.div>

                      <div className={styles.cardInfo}>
                        <div className={styles.tf}>
                          <h4>{product.p_title}</h4>

                          <button
                            type="button"
                            aria-label="Add to wishlist"
                            onClick={() => handleWishlist(product.id)}
                          >
                            <Heart
                              fill={liked ? "red" : "none"}
                              color={liked ? "red" : "currentColor"}
                            />
                          </button>
                        </div>

                        {product.variants?.length > 0 ? (
                          <>
                            <p>Size: {product.variants[0].size.name}</p>
                            <p>Price: ${product.variants[0].price}</p>
                          </>
                        ) : (
                          <p>No variants available</p>
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
            {/* inner div */}
          </div>{" "}
          {/* herofea */}
        </div>{" "}
        {/* container */}
      </div>{" "}
      {/* sticky */}
    </>
  );
}
