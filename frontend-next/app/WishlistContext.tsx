"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { addWishlist, deleteWishlist, getWishlist } from "@/src/api/wishlist";

interface WishlistContextType {
  favorites: any[];
  loading: boolean;

  isWishlisted: (id: number) => boolean;

  addToWishlist: (id: number) => Promise<void>;

  removeFromWishlist: (id: number) => Promise<void>;

  toggleWishlist: (id: number) => Promise<void>;

  fetchWishlist: () => Promise<void>;
}
interface WishlistItem {
  id: number;

  product: {
    id: number;
    p_title: string;
  };
}
const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlistContext = () => useContext(WishlistContext);

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setFavorites([]);
        return;
      }

      const data = await getWishlist();

      setFavorites(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId: number) => {
    try {
      const response = await addWishlist(productId);

      console.log("Added:", response);

      await fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE IMAGE FROM WISHLIST
  const removeFromWishlist = async (productId: number) => {
    try {
      const item = favorites.find(
        (favorite: any) => favorite.product.id === productId,
      );

      if (!item) return;

      await deleteWishlist(item.id);

      await fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // CHECK HEART STATUS
  const isWishlisted = (productId: number) => {
    return favorites.some((item: any) => item.product.id === productId);
  };

  const toggleWishlist = async (productId: number) => {
    if (isWishlisted(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        favorites,

        loading,

        isWishlisted,

        addToWishlist,

        removeFromWishlist,

        toggleWishlist,

        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
