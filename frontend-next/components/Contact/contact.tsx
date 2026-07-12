"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/src/scss/contact.module.scss";
import { Globe, X, LogOut, MapPin, Mail, Send } from "lucide-react";
import Image from "next/image";
import logo from "@/public/bere-har-2.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuthContext } from "@/app/AuthProvider";
type ContactProps = {
  onClose?: () => void;
};

export default function Contact({ onClose }: ContactProps) {
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
            <div className={styles.logo}>
              <Link href="/">
                <Image src={logo} alt="logo" width={80} height={30} />
              </Link>
            </div>
            <div>
              <X size={28} onClick={onClose} />
            </div>
          </div>
          <div className={styles.con}>
            <p>Contact Us</p>
          </div>

          <ul>
            <div className={styles.nav}>
              <li className={styles.logout}>
                <Mail size={18} />
                <Link href="mailto:ebateshale40@gmail.com" onClick={onClose}>
                  Send an Email
                </Link>
              </li>

              <li className={styles.logout}>
                <Mail size={18} />
                <Link
                  href="https://wa.me/2519XXXXXXXX"
                  target="_blank"
                  onClick={onClose}
                >
                  WhatsApp
                </Link>
              </li>
              <li className={styles.logout}>
                <Send size={18} />
                <Link
                  href="https://t.me/gpspace_tech"
                  target="_blank"
                  onClick={onClose}
                >
                  Telegram
                </Link>
              </li>
            </div>
          </ul>
          <hr />
          <ul>
            <div className={styles.nav}>
              <li className={styles.langItem}>
                <MapPin size={14} />
                <a
                  href="https://maps.google.com/?q=Addis+Ababa,Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  Find A Store | Map
                </a>
              </li>
              <li className={styles.logout}>
                <Globe size={14} />
                <Link
                  href="https://bere-harv1.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  Website | English
                </Link>
              </li>

              <li></li>
              {isLoggedIn ? (
                <li className={styles.logout} onClick={onClose}>
                  <Link href="/">Logout</Link>
                  <LogOut size={14} />
                </li>
              ) : (
                ""
              )}
            </div>
            <div className={styles.hours}>
              <h4>Service Hours</h4>
              <p>Monday – Saturday</p>
              <p>09:00 AM – 06:00 PM </p>
              <small>Closed on Sundays and Public Holidays</small>
            </div>
          </ul>
        </motion.div>
      </>
    </>
  );
}
