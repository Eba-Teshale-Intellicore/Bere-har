"use client";

import { useEffect, useState } from "react";
import { getProduct } from "@/src/api/product";
import styles from "@/src/scss/contactus.module.scss";
import Image from "next/image";

interface DetailProductProps {
  slug: string;
}

export default function DetailProduct({ slug }: DetailProductProps) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct(slug);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <div className={styles.herofea2}>
            <div className={styles.storelocations}>
              <div className={styles.contact2}>
                <div className={styles.map}>
                  <div className={styles.img}>
                    <Image
                      src={product.main_thumbnail || "/placeholder.jpg"}
                      alt={product.p_title}
                      width={800}
                      height={1000}
                      className={styles.mainImage}
                    />
                  </div>
                </div>
                <div className={styles.storeList}>
                  <h1 className={styles.storeTitle}>{product.p_title}</h1>
                  <p>{product.p_description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
