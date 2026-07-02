"use client";

import Image from "next/image";
import Link from "next/link";
import { Goal, Lightbulb, Wrench } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import profile from "@/assets/ashraful.jpeg";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const techStack = [
  "NestJS",
  "PostgreSQL",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "TanStack Query",
  "React Hook Form",
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full border border-gold/10 blur-3xl" />
        <div className="absolute right-0 top-96 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="h-[2px] w-full bg-gold-gradient" />

      <div className="container relative mx-auto max-w-5xl px-4 py-12">
        <section className="flex flex-col items-center text-center">
          <Card className="group overflow-hidden rounded-3xl border-gold/20 bg-card shadow-[0_0_40px_-18px_rgba(194,112,10,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_55px_-15px_rgba(194,112,10,0.45)]">
            <div className="relative">
              <Image
                src={profile}
                alt="Developer"
                width={280}
                height={280}
                className="h-72 w-72 object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </Card>

          <h1 className="mt-8 text-4xl font-black tracking-tight text-gold-gradient">
            Ashraful Alma
          </h1>

          <p className="mt-2 text-lg font-semibold text-foreground">
            Software Engineering Student
          </p>

          <p className="mt-3 max-w-xl text-muted-foreground">
            Passionate about building modern, performant and elegant systems with clean architecture and intuitive user
            experiences to solve real world problems.
          </p>
        </section>

        <div className="mt-12 space-y-6">
          <Card className="rounded-2xl border-border bg-card/70 p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_24px_-12px_rgba(194,112,10,0.35)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
                <Goal className="h-5 w-5 text-background" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground">
                  What Is Built
                </h2>
                <p className="text-sm text-muted-foreground">
                  Project Introduction
                </p>
              </div>
            </div>

            <p className="leading-8 text-muted-foreground">
              GoalLine is a modern football prediction league where players
              compete by predicting football match outcomes across multiple
              betting markets. Users earn points based on prediction accuracy,
              climb a live leaderboard, and compete with others. The platform also features a dedicated administrator
              dashboard for fixture management, match progression, settlement,
              and overall competition administration.
            </p>
          </Card>

          <Card className="rounded-2xl border-border bg-card/70 p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_24px_-12px_rgba(194,112,10,0.35)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
                <Lightbulb className="h-5 w-5 text-background" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Why Is It Built
                </h2>
                <p className="text-sm text-muted-foreground">
                  Reasoning
                </p>
                <p className="text-sm text-muted-foreground">
                </p>
              </div>
            </div>

            <blockquote className="rounded-xl border-l-4 border-amber-500 bg-secondary/40 px-5 py-4 italic text-muted-foreground">
              Let’s face it: betting can be a dangerous habit that drains your wallet and ruins the joy of the sport. But the urge to predict the game and brag to your friends is completely natural. 
              That’s why we built a system that cuts out the financial danger entirely. By trading cash for points, you can still feel the adrenaline of every matchday and prove your status as the ultimate fan, 
              without the financial hangover. It’s time to prove your ball knowledge based on your skill, not the size of your bank account
            </blockquote>
          </Card>

          <Card className="rounded-2xl border-border bg-card/70 p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_24px_-12px_rgba(194,112,10,0.35)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
                <Wrench className="h-5 w-5 text-background" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground">
                  How Is It Built
                </h2>
                <p className="text-sm text-muted-foreground">
                  Technology Stack
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <Badge
                  key={tech}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all hover:scale-105"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        <section className="mt-14 flex flex-col items-center">
          <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Connect With Me
          </h3>

          <div className="flex items-center gap-5">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gold/20 hover:border-gold hover:bg-amber-500/10 hover:scale-110"
            >
              <Link
                href="https://github.com/Ashraful-Alam-dev"
                target="_blank"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gold/20 hover:border-gold hover:bg-amber-500/10 hover:scale-110"
            >
              <Link
                href="https://www.linkedin.com/in/ashraful-alam-521103333"
                target="_blank"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gold/20 hover:border-gold hover:bg-amber-500/10 hover:scale-110"
            >
              <Link
                href="https://www.facebook.com/ashraful.alam.931253"
                target="_blank"
              >
                <FaFacebookF className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}