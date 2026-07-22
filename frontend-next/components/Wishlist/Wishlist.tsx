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

interface WishlistItem {
  id: number;

  product: {
    id: number;
    p_title: string;
    variants: {
      image: string;
      price: number;
      size?: {
        name: string;
      };
    }[];
  };
}

export default function Wishlist() {
  const [active, setActive] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5);
  const { favorites, toggleWishlist, isWishlisted } = useWishlistContext();

  const handleWishlist = async (id: number) => {
    await toggleWishlist(id);
  };

  useEffect(() => {
    setVisibleCount(5);
  }, [active]);

  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea2}>
            <div className={styles.content}>
              <h1>
                <Heading text="Your Favorites" />
              </h1>
            </div>
            <div>
              <div className={styles.collections}>
                {favorites.slice(0, visibleCount).map((item: any) => {
                  const liked = isWishlisted(item.product.id);
                  return (
                    <div key={item.id} className={styles.card}>
                      <motion.div
                        className={styles.imageWrapper}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.button
                          type="button"
                          aria-label="Add to wishlist"
                          onClick={() => handleWishlist(item.product.id)}
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
                              item.product.variants?.[0]?.image ||
                              "/placeholder.jpg"
                            }
                            alt={item.product.p_title}
                            fill
                            className={styles.mainImage}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </motion.div>

                      <div className={styles.cardContent}>
                        {item.product.variants?.length > 0 ? (
                          <>
                            <div className={styles.info}>
                              <p className={styles.price}>
                                ${item.product.variants[0]?.price} USD
                              </p>
                              <p>
                                Size:
                                {item.product.variants[0]?.size?.name}
                              </p>
                            </div>
                            <div className={styles.info2}>
                              <h4>{item.product.p_title}</h4>
                            </div>
                          </>
                        ) : (
                          <p>No Wishlist Availlable</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.btn}>
                {visibleCount < favorites.length && (
                  <Button
                    text="View More"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
