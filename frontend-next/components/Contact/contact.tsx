"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/src/scss/contact.module.scss";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Menu,
  Search,
  X,
  LogOut,
  Contact2,
  Map,
  MapPin,
  CircleUserRound,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
// import logo from "@/public/bere-har.png";
import logo from "@/public/bere-har-2.png";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
// import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
// import { useTranslations } from "next-intl";
import Register from "@/components/Acoount/register";
import { AuthContext } from "@/app/AuthProvider";
type ContactProps = {
  onClose?: () => void;
};

export default function Contact({ onClose }: ContactProps) {
  const [open, setOpen] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useContext(AuthContext)!;

  // const t = useTranslations();

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
      {/* Sidebar */}
      {/* <AnimatePresence> */}
      <>
        <div className={styles.overlay} onClick={onClose} />

        <motion.div
          className={styles.sidebar}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.sidebarHeader}>
            <X size={28} onClick={onClose} />
          </div>

          <ul className={styles.nav}>
            <li>
              <Link href="/women-collections" onClick={() => setOpen(false)}>
                Women
              </Link>
            </li>

            <li>
              <Link href="/men-collections" onClick={() => setOpen(false)}>
                Men
              </Link>
            </li>

            <li
              onMouseEnter={() => setOpenGift(true)}
              onMouseLeave={() => setOpenGift(false)}
            >
              <div className={styles.menuItem}>
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

            <li onClick={() => setOpen(false)}>New Arrival</li>
            <li onClick={() => setOpen(false)}>Jewelry</li>
          </ul>

          <ul className={styles.nav}>
            <li className={styles.logout}>
              <MapPin size={14} />
              <Link href="/" onClick={() => setOpen(false)}>
                {" "}
                Find A Store
              </Link>
            </li>
            <li>{/* <h1>{t.header.about}</h1> */}</li>
            {isLoggedIn ? (
              <li className={styles.logout}>
                <Contact2 size={14} />
                <Link href="/" onClick={() => setOpen(false)}>
                  Contact Us
                </Link>
              </li>
            ) : (
              ""
            )}
            <li className={styles.langItem}>
              <Globe size={14} />
              <span>
                Rest of the World | English{/* <LanguageSwitcher /> */}
              </span>
            </li>
            <li></li>
            {isLoggedIn ? (
              <li className={styles.logout} onClick={() => setOpen(false)}>
                <Link href="/">Logout</Link>
                <LogOut size={14} />
              </li>
            ) : (
              ""
            )}
          </ul>
        </motion.div>
      </>
      {/* </AnimatePresence> */}
    </>
  );
}
