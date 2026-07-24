"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProduct } from "@/src/api/product";
import styles from "@/src/scss/productDetail.module.scss";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/Button";

interface DetailProductProps {
  slug: string;
}

export default function DetailProduct({ slug }: DetailProductProps) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any | null>(null);

  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct(slug);

        setProduct(data);

        setSelectedVariant(data.variants?.[0]);
      } catch (error) {
        console.log(error);
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
    return <div>Product not found</div>;
  }

  const images = [
    {
      id: "main",
      image: product.main_thumbnail,
    },
    ...product.variants.map((variant: any) => ({
      id: variant.id,
      image: variant.image,
    })),
  ];

  return (
    <div className={styles.detail}>
      {/* LEFT IMAGE GALLERY */}

      <div className={styles.gallery}>
        {images.map((item: any) => (
          <div key={item.id} className={styles.galleryImage}>
            <Image
              src={item.image}
              alt={product.p_title}
              width={800}
              height={1000}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {/* RIGHT INFORMATION */}

      <div className={styles.info}>
        <div className={styles.stickyContent}>
          <h1 className={styles.productTitle}>{product.p_title}</h1>
          <div>
            <h3 className={styles.sectionTitle}>Description</h3>

            <p className={styles.description}>{product.p_description}</p>
          </div>
          <div className={styles.section2}>
            <div>
              <div>
                <h3 className={styles.sectionTitle}>Price</h3>

                <p className={styles.price}>${selectedVariant?.price}</p>
              </div>
              <div>
                <h3 className={styles.sectionTitle}>Size</h3>

                <div className={styles.sizes}>
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      className={
                        selectedVariant?.id === variant.id
                          ? styles.activeSize
                          : ""
                      }
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.size.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p>
                <span className={styles.sectionTitle}>Color:</span>{" "}
                {selectedVariant?.color}
              </p>

              <p>
                <span className={styles.sectionTitle}>Stock:</span>{" "}
                {selectedVariant?.quantity}
              </p>
              <div className={styles.quantity}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Minus size={18} />
                </button>

                <span>{quantity}</span>

                <button onClick={() => setQuantity((q) => q + 1)}>
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
          <Button text="Add To Cart" />
        </div>
      </div>
    </div>
  );
}
