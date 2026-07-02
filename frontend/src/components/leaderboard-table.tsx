"use client";

import { Trophy, Medal, Goal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type LeaderboardUser = {
  rank: number;
  username: string;
  points: number;
};

interface Props {
  leaderboard: LeaderboardUser[];
  currentUser: LeaderboardUser | null;
}

export function LeaderboardTable({
  leaderboard,
  currentUser,
}: Props) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4.5 w-4.5 text-orange-400" />;
      case 2:
        <Medal className="h-4.5 w-4.5 text-slate-500 dark:text-zinc-300" />
      case 3:
        return <Medal className="h-4.5 w-4.5 text-orange-600" />;
      default:
        return null;
    }
  };

  const getPodiumStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent";
      case 2:
        return "bg-gradient-to-r from-zinc-400/8 to-transparent";
      case 3:
        return "bg-gradient-to-r from-orange-700/10 to-transparent";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl border border-amber-600/20 bg-card shadow-[0_18px_50px_-20px_rgba(194,112,10,0.45)]">
      <div className="bg-gradient-to-r from-orange-700 via-amber-600 to-orange-500 px-5 py-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white">
          <Goal className="h-3.5 w-3.5" />
          Rank &amp; Username
        </span>

        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
          Score
        </span>
      </div>

      <div className="divide-y divide-border/70">
        {leaderboard.map((user) => {
          const isMe = currentUser?.username === user.username;

          return (
            <div
              key={user.rank}
              className={`group flex items-center justify-between p-4 transition-all duration-200 ${
                isMe
                  ? "border-l-4 border-orange-500 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent"
                  : `${getPodiumStyles(user.rank)} hover:bg-orange-500/5`
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex w-7 justify-center font-bold text-sm tabular text-muted-foreground">
                  {getRankIcon(user.rank) || `#${user.rank}`}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm text-foreground ${
                      isMe ? "font-bold" : "font-medium"
                    }`}
                  >
                    {user.username}
                  </span>

                  {isMe && (
                    <Badge className="bg-gradient-to-r from-orange-700 to-amber-600 px-1.5 py-0 text-[10px] font-bold uppercase tracking-wide text-white">
                      You
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-sm font-bold tabular ${
                    isMe ? "text-orange-400" : "text-foreground"
                  }`}
                >
                  {user.points}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    pts
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {currentUser && currentUser.rank > 10 && (
        <div className="flex items-center justify-between border-t border-amber-600/20 bg-gradient-to-r from-orange-600/10 to-amber-500/5 p-4">
          <div className="flex items-center gap-3.5">
            <div className="w-6 text-center font-bold text-sm tabular text-orange-400">
              #{currentUser.rank}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Position
              </p>
              <p className="text-sm font-bold text-foreground">
                {currentUser.username}
              </p>
            </div>
          </div>

          <Badge className="bg-gradient-to-r from-orange-700 to-amber-600 px-2.5 py-1 font-bold text-white">
            {currentUser.points} pts
          </Badge>
        </div>
      )}
    </div>
  );
}