import styles from "@/src/scss/heading.module.scss";

type HeadingProps = {
  text: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  color?: "primary" | "secondary" | "muted" | "inverse" | "brand";
};

export default function Heading({
  text,
  size = "lg",
  color = "primary",
}: HeadingProps) {
  return (
    <h1 className={`${styles.heading} ${styles[size]} ${styles[color]}`}>
      {text}
    </h1>
  );
}
