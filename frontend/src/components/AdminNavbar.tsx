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

import { ThemeToggle } from "@/components/theme-toggle";
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
        <Link
          href="/admin"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient shadow-[0_0_16px_-2px_rgba(194,112,10,0.55)] transition-transform duration-300 group-hover:scale-105">
            <Goal className="h-4.5 w-4.5 text-background" strokeWidth={2.5} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-gold-gradient">
            GoalLine
          </span>
        </Link>

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
                    ? "gap-1.5 shadow-[0_0_20px_-6px_rgba(194,112,10,0.6)]"
                    : "gap-1.5 text-foreground/65 hover:text-foreground hover:bg-foreground/5"
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

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <span className="text-sm font-semibold text-foreground/80">
            {user?.username}
          </span>

          <Button
            variant="danger"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-gold-gradient text-background shadow-[0_0_16px_-2px_rgba(194,112,10,0.45)] transition-all hover:scale-105 hover:opacity-90"
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
                <div className="mb-4 flex items-center gap-2 rounded-2xl border border-gold/20 bg-gradient-to-br from-amber-600/10 to-orange-600/5 p-4">
                  <ShieldCheck className="h-5 w-5 text-amber-500" />

                  <div className="flex flex-col leading-tight">
                    <p className="font-bold text-foreground">
                      {user?.username}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-500/80">
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
                          : "justify-start gap-2.5 w-full text-foreground/75 hover:bg-foreground/5"
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
                  onClick={logout}
                  className="w-full gap-2 bg-red-900 text-white hover:bg-red-950"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}