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
        className={`${styles.button} ${styles[props.variant || "primary"]} ${props.className || ""}`}
        onClick={props.onClick}
      >
        <motion.span
          initial={{ opacity: 0, y: -80 }}
          whileHover={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {props.text}
        </motion.span>
        <motion.span
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ opacity: 0, y: 80 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {props.text}
        </motion.span>

        {props.icon && <span className={styles.icon}>{props.icon}</span>}
      </motion.button>
    </>
  );
}
