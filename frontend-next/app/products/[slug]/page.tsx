import React from "react";
import DetailProduct from "@/components/Products/Detail";
interface Props {
  params: Promise<{
    slug: string;
  }>;
}
export default async function Product({ params }: Props) {
  const { slug } = await params;
  return (
    <div>
      <DetailProduct slug={slug} />
    </div>
  );
}
