"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navigation() {
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
    { label: "Fixtures", href: "/" },
    { label: "My Bets", href: "/bets" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <header className="border-b bg-background px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex h-16 items-center justify-between">

        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          GoalLine
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-3">
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

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-5">

          <Badge variant="secondary" className="px-3 py-1">
            {user?.points ?? 0} pts
          </Badge>

          <DropdownMenu>

            <DropdownMenuTrigger className="outline-none">

              <Avatar className="cursor-pointer transition-transform hover:scale-105">
                <AvatarFallback>
                  {user?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 mt-1">

              <DropdownMenuItem disabled className="font-medium">
                {user?.username}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>

        {/* Mobile */}

        <Sheet>

          <SheetTrigger asChild>

            <Button
              size="icon"
              variant="ghost"
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

              <div className="px-2">
                <Badge className="w-fit px-3 py-1">
                  {user?.points ?? 0} pts
                </Badge>
              </div>

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