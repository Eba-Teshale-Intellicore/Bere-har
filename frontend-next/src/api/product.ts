import api from "./axios";

export const getProducts = async () => {
  try {
    const response = await api.get("products/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (slug: string) => {
  try {
    const res = await api.get(`products/${slug}/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
