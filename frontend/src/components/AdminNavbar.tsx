"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Goal,
  ShieldCheck,
  LayoutDashboard,
  CalendarPlus,
  History,
  ClipboardList,
  Trophy,
  LogOut,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { authService } from "@/services/auth";
import { useAuth } from "@/hooks/useAuth";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const LINK_ICONS: Record<string, React.ElementType> = {
  Dashboard: LayoutDashboard,
  "New Fixture": CalendarPlus,
  "Match History": History,
  "All Bets": ClipboardList,
  Leaderboard: Trophy,
};

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
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/fixture", label: "New Fixture" },
    { href: "/admin/history", label: "Match History" },
    { href: "/admin/bets", label: "All Bets" },
    { href: "/admin/leaderboard", label: "Leaderboard" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70 px-4 sm:px-6 lg:px-8 text-foreground">
      <div className="h-[2px] w-full bg-gold-gradient" />

      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/admin"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient shadow-[0_0_16px_-2px_rgba(245,158,11,0.55)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Goal className="h-4.5 w-4.5 text-background" strokeWidth={2.5} />
          </span>
          <span className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-gold-gradient">
            GoalLine
            <Badge
              variant="outline"
              className="gap-1 border-gold text-[10px] font-bold tracking-wider text-amber-400"
            >
              <ShieldCheck className="h-3 w-3" />
              ADMIN
            </Badge>
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
          <span className="text-sm font-semibold text-foreground/80">
            {user?.username}
          </span>

          <Button
            onClick={logout}
            className="gap-2 border border-red-500/40 bg-red-500/10 text-red-400 hover:border-red-500 hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Mobile trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
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
              <div className="mb-4 flex items-center gap-2 rounded-2xl border border-gold/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-4">
                <ShieldCheck className="h-5 w-5 text-amber-400" />
                <div className="flex flex-col leading-tight">
                  <p className="font-bold text-foreground">{user?.username}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/80">
                    Admin
                  </p>
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