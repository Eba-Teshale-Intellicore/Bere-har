"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProduct } from "@/src/api/product";
import styles from "@/src/scss/productDetail.module.scss";
import { Minus, Plus } from "lucide-react";

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
              height={600}
            />
          </div>
        ))}
      </div>

      {/* RIGHT INFORMATION */}

      <div className={styles.info}>
        <div className={styles.stickyContent}>
          <h1>{product.p_title}</h1>
          <div>
            <h3>Description</h3>

            <p>{product.p_description}</p>
          </div>
          <div>
            <h3>Price</h3>

            <p>${selectedVariant?.price}</p>
          </div>
          <h3>Size</h3>
          <div>
            <div className={styles.sizes}>
              {product.variants.map((variant: any) => (
                <button
                  key={variant.id}
                  className={
                    selectedVariant?.id === variant.id ? styles.activeSize : ""
                  }
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.size.name}
                </button>
              ))}
            </div>
          </div>

          <p>Color: {selectedVariant?.color}</p>

          <p>Stock: {selectedVariant?.quantity}</p>
          <div className={styles.quantity}>
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Minus size={18} />
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity((q) => q + 1)}>
              <Plus size={18} />
            </button>
          </div>
          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
