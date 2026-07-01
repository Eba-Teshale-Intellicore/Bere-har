import React from "react";
import styles from "@/src/scss/aboutlegacy.module.scss";
import Paragraph from "../Paragraph";
import Heading from "../Heading";
import Image from "next/image";
import Pic1 from "@/public/aboutlegacy.svg";
import { MoveUpRight } from "lucide-react";
import Button from "../Button";

export default function AboutLegacy() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.aboutLegacy}>
          <div className={styles.hacontent}>
            <Heading text="About Us" />

            <div className={styles.grid}>
              <div className={`${styles.firblock} ${styles.block1}`}>
                <p>
                  <Paragraph text="Founded 2010 in Addis Ababa, ET" size="sm" />
                </p>
                <p>
                  <Paragraph
                    text="Expanding real estate services across continents"
                    size="sm"
                  />
                </p>
                <p>
                  <Paragraph text="300+ Rental agreements closed" size="sm" />
                </p>
                <p>
                  <Paragraph
                    text="More than 60% of buyers prefer suburban homes"
                    size="sm"
                  />
                </p>
              </div>

              <div className={`${styles.secblock} ${styles.block2}`}>
                <p>
                  <Paragraph
                    text="Over the years, we have helped countless families, investors,
                and businesses find properties that match their dreams and
                goals. With a deep understanding of market trends and a
                client-first approach, we have expanded our services, built
                lasting relationships, and earned a reputation for integrity and
                reliability."
                    size="sm"
                  />
                </p>
              </div>

              <div className={`${styles.thiblock} ${styles.block3}`}>
                <div className={styles.secbox}>
                  <div
                    className={`${styles.imagecontainer} ${styles.blockimg}`}
                  >
                    <Image src={Pic1} alt="Luxury home" fill />
                  </div>
                  <div
                    className={`${styles.textcontainer} ${styles.blocktext}`}
                  >
                    <p>
                      <Paragraph
                        text="We work only with reliable developers"
                        size="lg"
                      />
                    </p>{" "}
                    <Paragraph
                      text="   The gap between what gets built and what’s actually needed — for teachers, nurses, service workers, families — keeps widening across cities everywhere. Not for lack of commitment. But for lack of execution."
                      size="sm"
                    />{" "}
                    <Paragraph
                      text="   Worthy Homes was founded to close that gap: a private development firm operating with the speed, discipline, and accountability to deliver affordable housing at the scale and quality residents deserve."
                      size="sm"
                    />
                    <Button
                      text="More About Us"
                      icon={<MoveUpRight size={18} />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
