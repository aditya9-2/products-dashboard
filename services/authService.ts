import { apiClient } from "@/lib/axios";
import { LoginCredentials, User } from "@/types/auth";

export const authService = {
    login: async (credentials: LoginCredentials): Promise<User> => {
        const { data } = await apiClient.post<User>("/auth/login", credentials);
        return data;
    },
    getCurrentUser: async (): Promise<User> => {
        const { data } = await apiClient.get<User>("/auth/me");
        return data;
    },
};