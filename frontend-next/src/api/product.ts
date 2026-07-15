import api from "./axios";

export const getProducts = async () => {
  try {
    const response = await api.get("products/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
