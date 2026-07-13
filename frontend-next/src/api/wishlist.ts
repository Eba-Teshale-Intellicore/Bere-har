import api from "./axios";
import axios from "axios";

export async function getWishlist(token: string) {
  try {
    const res = await api.get("wishlists/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }

    throw error;
  }
}

export async function addWishlist(productId: number, token: string) {
  try {
    const res = await api.post(
      "wishlists/",
      {
        product_id: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }

    throw error;
  }
}

export async function deleteWishlist(id: number, token: string) {
  try {
    await api.delete(`wishlists/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }

    throw error;
  }
}
