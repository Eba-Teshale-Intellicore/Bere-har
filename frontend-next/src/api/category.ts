import React from "react";
import api from "./axios";

export const getCategories = async () => {
  try {
    const response = await api.get("categories/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get Categories");
  }
};
