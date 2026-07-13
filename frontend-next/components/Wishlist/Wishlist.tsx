"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/product.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "@/components/Heading";
import Button from "../Button";
import { useWishlistContext } from "@/app/WishlistContext";
import { Heart } from "lucide-react";
import { getWishlist } from "@/src/api/wishlist";

export default function Wishlist() {
  const [active, setActive] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5);
  const { favorites, toggleWishlist, isWishlisted } = useWishlistContext();

  useEffect(() => {
    setVisibleCount(5);
  }, [active]);

  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea}>
            <div className={styles.content}>
              <p>
                <Heading text="Your Favorites" />
              </p>
            </div>
            <div>
              <div className={styles.collections}>
                {favorites.slice(0, visibleCount).map((item: any) => (
                  <div key={item.id} className={styles.card}>
                    <motion.div
                      className={styles.imageWrapper}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={item.image.image}
                        alt={item.title}
                        fill
                        className={styles.mainImage}
                      />
                    </motion.div>

                    <div className={styles.cardInfo}>
                      <div className={styles.tf}>
                        <h4>{item.title}</h4>

                        <button onClick={() => toggleWishlist(item.image.id)}>
                          <Heart
                            fill={isWishlisted(item.image.id) ? "red" : "none"}
                            color={
                              isWishlisted(item.image.id)
                                ? "red"
                                : "currentColor"
                            }
                          />
                        </button>
                      </div>

                      {item.variants.length > 0 ? (
                        <>
                          <p>Size: {item.variants[0].size}</p>
                          <p>${item.variants[0].price}</p>
                        </>
                      ) : (
                        <p>${item.price}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {favorites.length > visibleCount && (
                <div className={styles.btn}>
                  <Button
                    text="View More"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
