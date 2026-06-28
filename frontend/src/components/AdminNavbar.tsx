"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { authService } from "@/services/auth";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const logout = () => {
    authService.logout();
    queryClient.clear();
    router.replace("/login");
  };

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
    },
    {
      href: "/admin/fixture",
      label: "New Fixture",
    },
    {
      href: "/admin/history",
      label: "History",
    },
    {
      href: "/admin/bets",
      label: "All Bets",
    },
    {
      href: "/admin/leaderboard",
      label: "Leaderboard",
    },
  ];

  return (
    <header className="border-b bg-background px-4 sm:px-6 lg:px-8">

      <div className="container mx-auto flex h-16 items-center justify-between">

        <Link
          href="/admin"
          className="text-xl font-bold tracking-tight"
        >
          GoalLine
        </Link>

        {/* Desktop */}

        <nav className="hidden md:flex gap-3">

          {links.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={
                pathname === link.href
                  ? "default"
                  : "ghost"
              }
            >
              <Link href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}

        </nav>

        <div className="hidden md:flex items-center gap-4">

          <span className="text-sm font-medium">
            {user?.username}
          </span>

          <Button
            variant="outline"
            onClick={logout}
          >
            Logout
          </Button>

        </div>

        {/* Mobile */}

        <Sheet>

          <SheetTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

          </SheetTrigger>

          <SheetContent side="right" className="p-6">

            <div className="mt-8 flex flex-col gap-3">

              <p className="font-semibold px-2">
                {user?.username}
              </p>

              <div className="my-4 border-t" />

              {links.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant={
                    pathname === link.href
                      ? "default"
                      : "ghost"
                  }
                  className="justify-start w-full"
                >
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </Button>
              ))}

              <Button
                variant="destructive"
                className="mt-6 w-full"
                onClick={logout}
              >
                Logout
              </Button>

            </div>

          </SheetContent>

        </Sheet>

      </div>

    </header>
  );
}