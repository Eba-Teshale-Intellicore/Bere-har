// src/api/wishlist.ts

import api from "./axios";

export async function getWishlist() {
  const res = await api.get("wishlists/");
  return res.data;
}

export async function addWishlist(imageId: number) {
  const res = await api.post("wishlists/", {
    image_id: imageId,
  });

  return res.data;
}

export async function deleteWishlist(id: number) {
  await api.delete(`wishlists/${id}/`);
}
