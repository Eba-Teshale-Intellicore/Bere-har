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
                        src={
                          item.product.variants?.[0]?.image ||
                          "/placeholder.jpg"
                        }
                        alt={item.product.p_title}
                        fill
                        className={styles.mainImage}
                      />
                    </motion.div>

                    <div className={styles.cardInfo}>
                      <div className={styles.tf}>
                        <h4>{item.product.p_title}</h4>

                        <button onClick={() => toggleWishlist(item.product.id)}>
                          <Heart
                            fill={
                              isWishlisted(item.product.id) ? "red" : "none"
                            }
                            color={
                              isWishlisted(item.product.id)
                                ? "red"
                                : "currentColor"
                            }
                          />
                        </button>
                      </div>

                      {item.product.variants?.length > 0 ? (
                        <>
                          <p>
                            Size:
                            {item.product.variants[0]?.size?.name}
                          </p>

                          <p>${item.product.variants[0]?.price}</p>
                        </>
                      ) : (
                        <p>No price</p>
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
