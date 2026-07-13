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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId: number) => {
    if (isWishlisted(productId)) return;
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) return;

      await addWishlist(productId);

      // Refresh the wishlist after adding
      await fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  };
  const removeFromWishlist = async (productId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
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
  const isWishlisted = (productId: number) => {
    return favorites.some((item: any) => item.product.id === productId);
  };

  const toggleWishlist = async (productId: number) => {
    console.log("Clicked:", productId);

    if (isWishlisted(productId)) {
      console.log("Removing");
      await removeFromWishlist(productId);
    } else {
      console.log("Adding");
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

// const {
//     toggleWishlist,
//     isWishlisted,
// } = useWishlistContext();

// <button
//     onClick={() => toggleWishlist(product.id)}
// >
//     {isWishlisted(product.id)
//         ? <Heart fill="red" />
//         : <Heart />}
// </button>
