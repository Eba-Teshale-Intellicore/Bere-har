"use client";

import styles from "./footer.module.scss";
import { ArrowUpCircle } from "lucide-react";
import Image from "next/image";
import logo from "@/public/bere-har-2.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h1>GET IN TOUCH</h1>

        <div className={styles.footerItem}>
          <div className={styles.footerlist}>
            <h2>Navigation</h2>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Works</a>
              </li>
              <li>
                <a href="#">Reviews</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerlist}>
            <h2>Social</h2>
            <ul>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">YouTube</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Telegram</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerlist}>
            <h2>Resources</h2>
            <ul>
              <li>
                <a href="#">Wikipedia</a>
              </li>
              <li>
                <a href="#">Tikva Eth</a>
              </li>
              <li>
                <a href="#">Journal</a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} All rights reserved</span>

          <div className={styles.time}>
            <p>Local Time</p>
          </div>
          <button className={styles.scrollTop}>
            <a href="#">
              <ArrowUpCircle size={28} />
            </a>
          </button>
        </div> */}
        <div className={`${styles.header} `}>
          <div className={`${styles.menu} `}>
            <span>© {new Date().getFullYear()} All rights reserved</span>
          </div>
          <div className={styles.logo}>
            <div>
              <Image src={logo} alt="logo" width={80} height={60} />
            </div>
          </div>
          <div className={styles.contact}>
            <button className={styles.scrollTop}>
              <a href="#">
                <ArrowUpCircle size={28} />
              </a>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
