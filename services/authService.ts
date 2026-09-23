import { apiClient } from "@/lib/axios";

export const loginUser = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    username,
    password,  
    expiresInMins: 60,
  });
  return response.data;
};