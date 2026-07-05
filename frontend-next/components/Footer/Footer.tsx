"use client";

import styles from "@/src/scss/footer.module.scss";
import { ArrowUpCircle } from "lucide-react";
import Image from "next/image";
import logo from "@/public/bere-har-2.png";
import Button from "@/components/Button";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h1>DISCOVER BERU HAR</h1>

          <div className={styles.footerItem}>
            <div className={styles.footerlist}>
              <h2>Navigation</h2>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Women</a>
                </li>
                <li>
                  <a href="#">Men</a>
                </li>
                <li>
                  <a href="#">Collections</a>
                </li>
                <li>
                  <a href="#">Journal</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerlist}>
              <h2>Social</h2>
              <ul>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Pinterest</a>
                </li>
                <li>
                  <a href="#">TikTok</a>
                </li>
                <li>
                  <a href="#">YouTube</a>
                </li>
              </ul>
            </div>

            <div className={styles.footerlist}>
              <h2>Resources</h2>
              <ul>
                <li>
                  <a href="#">Shipping</a>
                </li>
                <li>
                  <a href="#">Returns</a>
                </li>
                <li>
                  <a href="#">Size Guide</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerlist}>
              <h2>Stay Inspired</h2>

              <p>
                Receive exclusive collections, new arrivals, and handcrafted
                stories.
              </p>

              <form className={styles.newsletter}>
                <input
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                />

                <button type="submit">Subscribe</button>
              </form>
            </div>
            <div className={styles.footerlist}>
              <h2>Contact</h2>

              <ul>
                <li>info@beruhar.com</li>
                <li>+251 900 000 000</li>
                <li>Addis Ababa, Ethiopia</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className={styles.footerBottom}>
        <div className={`${styles.copyright} `}>
          <span>© {new Date().getFullYear()} BERU HAR</span>
        </div>
        <div className={styles.logo}>
          <div>
            <Image src={logo} alt="logo" width={80} height={60} />
          </div>
        </div>
        <div className={styles.backTop}>
          <button
            aria-label="Back to top"
            className={styles.scrollTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUpCircle size={28} />
          </button>
        </div>
      </div>
    </>
  );
}
