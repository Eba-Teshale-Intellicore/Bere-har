"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/src/scss/header.module.scss";
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

export default function Header() {
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
                <Link href="/">
                  <Image src={logo} alt="logo" width={80} height={60} />
                </Link>
              </div>
            </div>
            <div className={styles.contact}>
              {isLoggedIn ? (
                <div className={styles.menu}>
                  <CircleUserRound size={28} />
                  <Link href="/account/register">
                    <Button text="Contact Us" />
                  </Link>
                </div>
              ) : (
                <Link href="/account/register">
                  <Button text="Register" />
                </Link>
              )}
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
                <li>
                  <Link href="/women-collections">Women</Link>
                </li>

                <li>
                  <Link href="/men-collections">Men</Link>
                </li>

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
                <li className={styles.logout}>
                  <MapPin size={14} />
                  <Link href="/"> Find A Store</Link>
                </li>
                <li>{/* <h1>{t.header.about}</h1> */}</li>
                {isLoggedIn ? (
                  <li className={styles.logout}>
                    <Contact2 size={14} />
                    <Link href="/">Contact Us</Link>
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
                  <li className={styles.logout}>
                    <Link href="/">Logout</Link>
                    <LogOut size={14} />
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
