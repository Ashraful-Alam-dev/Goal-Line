"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/auth";
import { setToken } from "@/lib/token";
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
    const res = await authService.register(data);

    setToken(res.access_token);

    router.push("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <Card className="p-6 w-[400px] space-y-4 border-slate-800 bg-slate-900 text-slate-50">
        <h1 className="text-xl font-bold tracking-tight">Signup</h1>

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
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-slate-500">or</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <Link href="/login" passHref>
          <Button variant="outline" className="w-full border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white font-medium">
            Already have an account? Log in
          </Button>
        </Link>
      </Card>
    </div>
  );
}