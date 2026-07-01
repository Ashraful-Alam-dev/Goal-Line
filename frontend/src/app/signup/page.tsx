"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/auth";
import { setToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, Loader2, Goal, ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const schema = z.object({
  username: z.string().min(2),
  password: z.string().min(4),
});

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await authService.register(data);
      setToken(res.access_token);
      router.push("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-background overflow-hidden px-4">
      {/* ambient gradient glows */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-orange-600/15 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-amber-500/15 blur-[110px]" />
      {/* faint pitch center-circle motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.06]"
      />
      {isSubmitting && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] z-50 flex items-center justify-center transition-all animate-fade-in">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-card border border-border px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            Provisioning profile instance...
          </div>
        </div>
      )}
      <Card
        className={`relative z-10 p-0 overflow-hidden w-full max-w-[400px] shadow-2xl shadow-black/40 border-gold/10 transition-all duration-300 ${
          isSubmitting ? "opacity-60 scale-[0.99] pointer-events-none" : ""
        }`}
      >
        <div className="h-[3px] w-full bg-gold-gradient" />

        <div className="p-6 space-y-4">
          <div className="text-center space-y-2 pb-1">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient shadow-[0_0_22px_-4px_rgba(245,158,11,0.6)]">
              <Goal className="h-6 w-6 text-background" strokeWidth={2.5} />
            </div>
            <p className="text-2xl font-extrabold tracking-tight text-gold-gradient">
              GoalLine
            </p>
            <h1 className="text-sm font-medium text-foreground/60">
              Create your account and get in the game
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Username"
                {...register("username")}
                disabled={isSubmitting}
                className="pl-9 h-11"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                disabled={isSubmitting}
                className="pl-9 h-11"
              />
            </div>

            <Button className="w-full h-11 font-semibold" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              or
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <Link href="/login">
            {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
            }
            <Button
              variant="outline"
              className="w-full h-11 font-semibold"
              disabled={isSubmitting}
            >
              Already have an account? Log in
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}