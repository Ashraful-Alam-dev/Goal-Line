"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/auth";
import { setToken, setRole } from "@/lib/token";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const schema = z.object({
  username: z.string().min(2),
  password: z.string().min(4),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
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
      const res = await authService.login(data);

      // 1. Save the token
      setToken(res.access_token);

      // 2. Extract and store the role from your NestJS response object structure
      if (res.user && res.user.role) {
        setRole(res.user.role);

        // 3. Conditional routing based on the role
        if (res.user.role === "ADMIN") {
          router.push("/admin");
          return;
        }
      }

      // Default redirect for normal users
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <Card className="p-6 w-[400px] space-y-4 border-slate-800 bg-slate-900 text-slate-50">
        <h1 className="text-xl font-bold tracking-tight">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input 
            placeholder="username" 
            {...register("username")} 
            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
          />
          <Input 
            type="password" 
            placeholder="password" 
            {...register("password")} 
            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
          />

          <Button className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-slate-500">or</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <Link href="/signup" passHref>
          <Button variant="outline" className="w-full border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white font-medium">
            Create an Account
          </Button>
        </Link>
      </Card>
    </div>
  );
}