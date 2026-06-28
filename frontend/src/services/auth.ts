import { api } from "@/lib/api";

export type AuthResponse = {
  access_token: string;
  user: {
    id: string;
    username: string;
    role: "USER" | "ADMIN";
    points: number;
  };
};

export type CurrentUser = {
  id: string;
  username: string;
  role: "USER" | "ADMIN";
  points: number;
  createdAt: string;
};

export const authService = {
  register: async (data: {
    username: string;
    password: string;
  }) => {
    const res = await api.post<AuthResponse>(
      "/auth/register",
      data
    );

    return res.data;
  },

  login: async (data: {
    username: string;
    password: string;
  }) => {
    const res = await api.post<AuthResponse>(
      "/auth/login",
      data
    );

    return res.data;
  },

  me: async () => {
    const res = await api.get<CurrentUser>(
      "/auth/me"
    );

    return res.data;
  },

  logout() {
    localStorage.removeItem("token");
  },
};