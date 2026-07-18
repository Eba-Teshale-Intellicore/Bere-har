import styles from "@/src/scss/button.module.scss";
import { motion } from "framer-motion";
import React from "react";

type ButtonProps = {
  text: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  return (
    <>
      <motion.button
        className={`${styles.button} ${styles[props.variant || "primary"]}`}
        onClick={props.onClick}
        whileHover="hover"
      >
        <span className={styles.textWrapper}>
          <motion.span
            className={styles.text}
            variants={{
              hover: {
                y: -40,
              },
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {props.text}
          </motion.span>

          <motion.span
            className={styles.text}
            variants={{
              hover: {
                y: 0,
              },
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {props.text}
          </motion.span>
        </span>

        {props.icon && <span className={styles.icon}>{props.icon}</span>}
      </motion.button>
    </>
  );
}
