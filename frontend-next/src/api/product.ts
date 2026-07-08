import React from "react";
import api from "./axios";

export const getProduct = async () => {
  const response = await api.get("products");
  return response.data;
};
