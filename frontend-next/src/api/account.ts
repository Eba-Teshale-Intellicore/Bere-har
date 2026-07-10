import api from "./axios";

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}) => {
  const response = await api.post("accounts/register/", userData);

  return response.data;
};

export const loginUser = async (userData: {
  username: string;
  password: string;
}) => {
  const response = await api.post("accounts/token/", userData);

  return response.data;
};
