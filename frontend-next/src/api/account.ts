import api from "./axios";
import { RegisterData, LoginData } from "@/src/types/auth";

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("accounts/register/", data);

  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post("accounts/token/", data);

  return response.data;
};
