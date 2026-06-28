"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      <div className="min-h-screen flex flex-col">

        <Navigation />

        <main className="container mx-auto flex-1 py-8 px-4">
          {children}
        </main>

        <Footer />

      </div>
    </ProtectedRoute>
  );
}