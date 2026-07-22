import api from "./axios";

export const getStoreLocations = async () => {
  try {
    const response = await api.get("store-location/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
