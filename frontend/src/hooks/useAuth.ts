"use client";

import { useQuery } from "@tanstack/react-query";

import { authService } from "@/services/auth";
import { queryKeys } from "@/lib/query-keys";

export function useAuth() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.me,
    queryFn: authService.me,
    enabled: !!token,
    retry: false,
  });

  return {
    loading: !!token && isLoading,

    isAuth: !!token && !!user && !isError,

    token,

    user,

    role: user?.role,

    username: user?.username,

    points: user?.points,

    refetch,
  };
}