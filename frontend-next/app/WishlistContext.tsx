"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { addWishlist, deleteWishlist, getWishlist } from "@/src/api/wishlist";

const WishlistContext = createContext<any>(null);

export const useWishlistContext = () => useContext(WishlistContext);

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<any[]>([]);
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

  // ADD IMAGE TO WISHLIST
  // const addToWishlist = async (imageId: number) => {
  //   if (isWishlisted(imageId)) return;

  //   try {
  //     const token = localStorage.getItem("accessToken");

  //     if (!token) return;

  //     await addWishlist(imageId);

  //     await fetchWishlist();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const addToWishlist = async (imageId: number) => {
    try {
      const response = await addWishlist(imageId);

      console.log("Added:", response);

      await fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE IMAGE FROM WISHLIST
  const removeFromWishlist = async (imageId: number) => {
    try {
      const item = favorites.find(
        (favorite: any) => favorite.image.id === imageId,
      );

      if (!item) return;

      await deleteWishlist(item.id);

      await fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // CHECK HEART STATUS
  const isWishlisted = (imageId: number) => {
    return favorites.some((item: any) => item.image.id === imageId);
  };

  const toggleWishlist = async (imageId: number) => {
    console.log("Clicked image:", imageId);

    if (isWishlisted(imageId)) {
      console.log("Removing");
      await removeFromWishlist(imageId);
    } else {
      console.log("Adding");
      await addToWishlist(imageId);
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
