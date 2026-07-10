import api from "./axios";

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("accounts/register/", userData);
  return response.data;
};
