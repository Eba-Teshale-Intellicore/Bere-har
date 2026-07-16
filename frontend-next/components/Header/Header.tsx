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
  Gift,
  Gem,
  ListPlus,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
import logo from "@/public/bere-har-2.png";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/app/AuthProvider";

import Contact from "../Contact/contact";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

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
                <div
                  className={`${styles.menu} ${scrolled ? styles.menus : ""}`}
                >
                  <CircleUserRound size={24} />
                  {/* <span>{user?.username}</span> */}
                  <Heart size={24} />
                  <Button text="Contact Us" onClick={() => setContact(true)} />
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
      <AnimatePresence>
        {contact && <Contact onClose={() => setContact(false)} />}
      </AnimatePresence>
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
                <div>
                  <X size={28} onClick={() => setOpen(false)} />
                </div>
                <div className={styles.logo2}>
                  <Link href="/">
                    <Image src={logo} alt="logo" width={80} height={30} />
                  </Link>
                </div>
              </div>

              <ul className={styles.nav}>
                <li>
                  <Link
                    href="/women-collections"
                    onClick={() => setOpen(false)}
                  >
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
                  <div className={styles.logout}>
                    <Gift size={14} />
                    <div className={styles.menuItem}>
                      Gifts & Personalization{" "}
                      {openGift ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </div>
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

                <li className={styles.logout} onClick={() => setOpen(false)}>
                  <ListPlus size={14} />
                  New Arrival
                </li>
                <li className={styles.logout} onClick={() => setOpen(false)}>
                  <Gem size={14} />
                  Jewelry
                </li>
              </ul>

              <ul className={styles.nav}>
                <li className={styles.logout}>
                  <MapPin size={14} />
                  <Link
                    href="https://maps.app.goo.gl/GHKTEiWRyNLqqnqU9"
                    onClick={() => setOpen(false)}
                  >
                    {" "}
                    Find A Store
                  </Link>
                </li>

                <li>{/* <h1>{t.header.about}</h1> */}</li>
                {isLoggedIn ? (
                  <li
                    className={styles.logout}
                    onClick={() => {
                      setOpen(false);
                      setContact(true);
                    }}
                  >
                    <Contact2 size={14} />
                    <span>Contact Us</span>
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
                  <li
                    className={styles.logout}
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
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
