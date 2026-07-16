import api from "./axios";
import { RegisterData, LoginData } from "@/src/types/auth";

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("accounts/register/", data);

  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post("accounts/token/", data);
  localStorage.setItem("accessToken", response.data.access);
  localStorage.setItem("refreshToken", response.data.refresh);
  return response.data;
};

export async function getProfile() {
  const response = await api.get("accounts/profile/");

  return response.data;
}
