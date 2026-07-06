"use client";

import React, { useState } from "react";
import styles from "@/src/scss/womencoll.module.scss";
import Highlight from "@/components/WomenCollec/Highlight";
import Product from "@/components/WomenCollec/Product";

export default function WomenColl() {
  const [active, setActive] = useState("highlight");

  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.wcontent}>
            <div className={styles.wheader}>
              <ul>
                <li
                  className={active === "highlight" ? styles.active : ""}
                  onClick={() => setActive("highlight")}
                >
                  HighLight
                </li>
                <li
                  className={active === "product" ? styles.active : ""}
                  onClick={() => setActive("product")}
                >
                  Product
                </li>
              </ul>
            </div>

            <div>{active == "highlight" && <Highlight />}</div>
            <div>{active == "product" && <Product />}</div>
          </div>
        </div>
      </div>
    </>
  );
}
