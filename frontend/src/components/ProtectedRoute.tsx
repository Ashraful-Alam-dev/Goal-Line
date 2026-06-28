"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
  allowedRoles?: ("USER" | "ADMIN")[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const router = useRouter();

  const {
    loading,
    isAuth,
    role,
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuth) {
      router.replace("/login");
      return;
    }

    if (
      allowedRoles &&
      role &&
      !allowedRoles.includes(role)
    ) {
      router.replace(role === "ADMIN" ? "/admin" : "/");
    }
  }, [
    loading,
    isAuth,
    role,
    allowedRoles,
    router,
  ]);

  if (loading) return null;

  if (!isAuth) return null;

  if (
    allowedRoles &&
    role &&
    !allowedRoles.includes(role)
  ) {
    return null;
  }

  return <>{children}</>;
}