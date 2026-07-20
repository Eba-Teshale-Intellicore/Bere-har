"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/hero.module.scss";
import Image from "next/image";
import Paragraph from "@/components/Paragraph";
import hero1 from "@/public/flow5.jpeg";
import hero2 from "@/public/flow4.jpeg";
import hero3 from "@/public/flow6.jpeg";
import hero4 from "@/public/flow3.jpeg";
import men1 from "@/public/bere-har-2.png";
import men2 from "@/public/bere-har.png";
import men3 from "@/public/file2.jpg";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import {
  FaTelegram,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import Heading from "../Heading";

function SocialLinks() {
  return (
    <div className={styles.socials}>
      <Link
        href="https://t.me/gpspace_tech"
        target="_blank"
        aria-label="Telegram"
      >
        <FaTelegram size={32} color="#229ED9" />
      </Link>

      <Link
        href="https://instagram.com/yourusername"
        target="_blank"
        aria-label="Instagram"
      >
        <FaInstagram size={32} color="#E4405F" />
      </Link>

      <Link
        href="https://tiktok.com/@yourusername"
        target="_blank"
        aria-label="TikTok"
      >
        <FaTiktok size={32} color="#000000" />
      </Link>

      <Link
        href="https://youtube.com/@yourchannel"
        target="_blank"
        aria-label="YouTube"
      >
        <FaYoutube size={32} color="#FF0000" />
      </Link>

      <Link
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={32} color="#0A66C2" />
      </Link>

      <Link href="https://x.com/yourusername" target="_blank" aria-label="X">
        <FaXTwitter size={32} color="#000000" />
      </Link>
    </div>
  );
}

const womencoll = [hero1, hero2, hero3, hero4];
const mencoll = [men1, men2, men3];

export default function Hero() {
  const [active, setActive] = useState<"women" | "men">("women");
  const [current, setCurrent] = useState(0);
  const images = active === "women" ? womencoll : mencoll;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.overlay} />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={styles.imagebg}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={images[current]}
                  alt="Hero"
                  fill
                  priority={current === 0}
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    // objectPosition: "center center",
                  }}
                />
              </motion.div>
              <motion.div
                className={styles.content}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.8 }}
              >
                <div className={styles.contentInfo}>
                  <div className={styles.heroTitle}>
                    <Heading
                      text="HandMade Ethiopian Silk "
                      size="xxl"
                      color="primary"
                    />
                  </div>
                  <div className={styles.heroSubtitle}>
                    <Heading
                      text="Timeless elegance inspired by Ethiopian culture, crafted for the modern world."
                      size="md"
                      color="secondary"
                    />
                  </div>
                  <SocialLinks />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={styles.pagination}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={
                    current === index ? styles.active : styles.inactive
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
            <div className={styles.pagination2}>
              <button
                onClick={() => setActive("women")}
                className={active === "women" ? styles.active : styles.inactive}
              >
                Women
              </button>

              <button
                onClick={() => setActive("men")}
                className={active === "men" ? styles.active : styles.inactive}
              >
                Men
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
