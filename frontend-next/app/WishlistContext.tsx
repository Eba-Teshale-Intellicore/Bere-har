"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { addWishlist, deleteWishlist, getWishlist } from "@/src/api/wishlist";
interface WishlistItem {
  id: number;

  product?: {
    id: number;
    p_title: string;

    variants?: {
      image: string;
      price: number;
      size: {
        name: string;
      };
    }[];
  };
}

interface WishlistContextType {
  favorites: WishlistItem[];
  loading: boolean;
  isWishlisted: (id: number) => boolean;
  addToWishlist: (id: number) => Promise<void>;
  removeFromWishlist: (id: number) => Promise<void>;
  toggleWishlist: (id: number) => Promise<void>;
  fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("WishlistProvider is missing");
  }
  return context;
};

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
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchWishlist();
    }
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
    try {
      if (isWishlisted(productId)) {
        const item = favorites.find((item) => item.product.id === productId);

        if (!item) return;

        await deleteWishlist(item.id);

        setFavorites((prev) => prev.filter((x) => x.id !== item.id));
      } else {
        await addWishlist(productId);

        await fetchWishlist();
      }
    } catch (error) {
      console.log(error);
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
