"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProduct } from "@/src/api/product";
import styles from "@/src/scss/productDetail.module.scss";

interface DetailProductProps {
  slug: string;
}

export default function DetailProduct({ slug }: DetailProductProps) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any | null>(null);

  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

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
            />
          </div>
        ))}
      </div>

      {/* RIGHT INFORMATION */}

      <div className={styles.info}>
        <div className={styles.stickyContent}>
          <h1>{product.p_title}</h1>

          <p>{product.p_description}</p>

          <h3>Price</h3>

          <p>${selectedVariant?.price}</p>

          <h3>Size</h3>

          <div className={styles.sizes}>
            {product.variants.map((variant: any) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.size.name}
              </button>
            ))}
          </div>

          <p>Color: {selectedVariant?.color}</p>

          <p>Stock: {selectedVariant?.quantity}</p>

          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
