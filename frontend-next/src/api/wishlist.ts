// src/api/wishlist.ts

import api from "./axios";

export async function getWishlist() {
  const res = await api.get("wishlists/");
  return res.data;
}

export async function addWishlist(productId: number) {
  const res = await api.post("wishlists/", {
    product_id: productId,
  });

  return res.data;
}

export async function deleteWishlist(id: number) {
  await api.delete(`wishlists/${id}/`);
}
