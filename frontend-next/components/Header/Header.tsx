"use client";
import React, { useEffect, useState } from "react";
import styles from "@/src/scss/header.module.scss";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Menu,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
// import logo from "@/public/bere-har.png";
import logo from "@/public/bere-har-2.png";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div
            className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
          >
            <div className={`${styles.menu} ${scrolled ? styles.menus : ""}`}>
              <Menu size={28} strokeWidth={1.5} onClick={() => setOpen(true)} />
              <Search size={28} />
            </div>
            <div className={styles.logo}>
              <div>
                <Image src={logo} alt="logo" width={80} height={60} />
              </div>
            </div>
            <div className={styles.contact}>
              <Button text="Contact Us" />
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <div className={styles.overlay} onClick={() => setOpen(false)} />

            <motion.div
              className={styles.sidebar}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.sidebarHeader}>
                <X size={28} onClick={() => setOpen(false)} />
              </div>

              <ul className={styles.nav}>
                <li>Women</li>
                <li>Men</li>

                <li>
                  <div
                    className={styles.menuItem}
                    onClick={() => setOpenGift((prev) => !prev)}
                  >
                    Gifts & Personalization{" "}
                    {openGift ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </div>

                  <AnimatePresence>
                    {openGift && (
                      <motion.ul
                        className={styles.subMenu}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <li>For her</li>
                        <li>For him</li>
                        <li>For kids</li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                <li>New Arrival</li>
                <li>Jewelry</li>
              </ul>

              <ul className={styles.nav}>
                <li>Find a Store</li>
                <li>Contact Us</li>
                <li className={styles.langItem}>
                  <Globe size={14} />
                  <span>Rest of the World | English</span>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
