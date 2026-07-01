import React from "react";
import styles from "@/src/scss/hero.module.scss";
import Button from "@/components/Button";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Paragraph from "../Paragraph";
import Heading from "../Heading";

export default function Hero() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.grid}>
            <div className={`${styles.firblock} ${styles.block1}`}>
              <h1>
                <Heading text="LUXURY LIVING" />
              </h1>
            </div>
            <div
              className={`${styles.secblock} ${styles.block2} ${styles.herocon}`}
            >
              <p>
                {" "}
                <Paragraph
                  text="We are dedicated to helping you find the perfect property that
                meets your needs and lifestyles. With a passion for real estate
                and a commitment to exceleence, we connect buyers sellerrs, and
                investories with the best oppurtunities in the market."
                  size="sm"
                />
              </p>
              <Button text="View Properties" icon={<MoveUpRight size={18} />} />
            </div>
            <div className={`${styles.thiblock} ${styles.block3}`}>
              <Image
                src="/hero1.svg"
                alt="Luxury home"
                width={400}
                height={200}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className={`${styles.foublock} ${styles.block4}`}>
              <Image
                src="/hero2.svg"
                alt="Worthy Homes"
                width={400}
                height={200}
                style={{
                  width: "98%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
