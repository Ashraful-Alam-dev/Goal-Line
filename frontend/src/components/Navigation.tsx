"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Goal, Trophy, Ticket, ChevronDown, LogOut } from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const LINK_ICONS: Record<string, React.ElementType> = {
  Fixtures: Goal,
  "My Bets": Ticket,
  Leaderboard: Trophy,
};

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
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70 px-4 sm:px-6 lg:px-8 text-foreground">
      {/* floodlight accent line */}
      <div className="h-[2px] w-full bg-gold-gradient" />

      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient shadow-[0_0_16px_-2px_rgba(245,158,11,0.55)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Goal className="h-4.5 w-4.5 text-background" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-gold-gradient">
            GoalLine
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((link) => {
            const Icon = LINK_ICONS[link.label];
            const active = pathname === link.href;
            return (
              <Button
                key={link.href}
                asChild
                variant={active ? "default" : "ghost"}
                className={
                  active
                    ? "gap-1.5 shadow-[0_0_20px_-6px_rgba(245,158,11,0.6)]"
                    : "gap-1.5 text-foreground/65 hover:text-foreground hover:bg-white/5"
                }
              >
                <Link href={link.href}>
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          <Badge className="gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wide shadow-[0_0_14px_-4px_rgba(245,158,11,0.5)]">
            <Trophy className="h-3.5 w-3.5" />
            {user?.points ?? 0} pts
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger className="group flex items-center gap-1 outline-none">
              <Avatar className="h-9 w-9 cursor-pointer border-2 border-gold/70 shadow-[0_0_0_3px_rgba(245,158,11,0.08)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_0_4px_rgba(245,158,11,0.18)]">
                <AvatarFallback className="bg-secondary font-bold text-amber-400">
                  {user?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-3.5 w-3.5 text-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 mt-2 border-border bg-popover/95 backdrop-blur-md"
            >
              <DropdownMenuItem
                disabled
                className="font-semibold text-foreground opacity-100"
              >
                {user?.username}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="gap-2 text-red-400 focus:bg-red-500 focus:text-white"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden text-foreground/80 hover:bg-white/5"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="p-0 border-border bg-background"
          >
            <div className="h-[3px] w-full bg-gold-gradient" />

            <div className="flex flex-col gap-1 p-5">
              {/* Profile card */}
              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-4">
                <Avatar className="h-11 w-11 border-2 border-gold/70">
                  <AvatarFallback className="bg-secondary font-bold text-amber-400">
                    {user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-foreground leading-none">
                    {user?.username}
                  </p>
                  <Badge className="w-fit gap-1 px-2 py-0.5 text-[11px]">
                    <Trophy className="h-3 w-3" />
                    {user?.points ?? 0} pts
                  </Badge>
                </div>
              </div>

              {links.map((link) => {
                const Icon = LINK_ICONS[link.label];
                const active = pathname === link.href;
                return (
                  <Button
                    key={link.href}
                    asChild
                    variant={active ? "default" : "ghost"}
                    className={
                      active
                        ? "justify-start gap-2.5 w-full"
                        : "justify-start gap-2.5 w-full text-foreground/75 hover:bg-white/5"
                    }
                  >
                    <Link href={link.href}>
                      {Icon && <Icon className="h-4 w-4" />}
                      {link.label}
                    </Link>
                  </Button>
                );
              })}

              <div className="my-3 border-t border-border" />

              <Button
                className="w-full gap-2 bg-red-600 text-white hover:bg-red-700"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}