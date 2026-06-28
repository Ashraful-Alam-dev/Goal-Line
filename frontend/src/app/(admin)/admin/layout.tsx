"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminNavbar from "@/components/AdminNavbar";
import Footer from "@/components/Footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="min-h-screen flex flex-col">

        <AdminNavbar />

        <main className="container mx-auto flex-1 py-8 px-4">
          {children}
        </main>

        <Footer />

      </div>
    </ProtectedRoute>
  );
}