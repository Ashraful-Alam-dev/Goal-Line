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
        return <Trophy className="h-4.5 w-4.5 text-amber-400" />;
      case 2:
        return <Medal className="h-4.5 w-4.5 text-zinc-300" />;
      case 3:
        return <Medal className="h-4.5 w-4.5 text-orange-600" />;
      default:
        return null;
    }
  };

  const getPodiumStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-amber-500/10 to-transparent";
      case 2:
        return "bg-gradient-to-r from-zinc-400/5 to-transparent";
      case 3:
        return "bg-gradient-to-r from-orange-600/5 to-transparent";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card overflow-hidden shadow-lg shadow-black/20">
      <div className="bg-gold-gradient px-5 py-3 flex justify-between items-center">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
          <Goal className="h-3.5 w-3.5" />
          Rank &amp; Username
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground">
          Score
        </span>
      </div>

      <div className="divide-y divide-border">
        {leaderboard.map((user) => {
          const isMe = currentUser?.username === user.username;
          return (
            <div
              key={user.rank}
              className={`p-4 flex justify-between items-center transition-colors duration-200 ${
                isMe
                  ? "bg-amber-500/10 font-medium"
                  : `${getPodiumStyles(user.rank)} hover:bg-foreground/5`
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-6 flex justify-center items-center font-bold text-sm text-muted-foreground tabular">
                  {getRankIcon(user.rank) || `#${user.rank}`}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-sm text-foreground ${isMe ? "font-bold" : "font-medium"}`}>
                    {user.username}
                  </span>
                  {isMe && (
                    <Badge className="bg-gold-gradient text-background text-[10px] px-1.5 py-0 font-bold tracking-wide uppercase">
                      You
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className={`text-sm font-bold tabular ${isMe ? "text-amber-400" : "text-foreground"}`}>
                  {user.points} <span className="text-xs font-normal text-muted-foreground">pts</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {currentUser && currentUser.rank > 10 && (
        <div className="bg-secondary p-4 flex justify-between items-center border-t border-border">
          <div className="flex items-center gap-3.5">
            <div className="w-6 text-center font-bold text-sm text-amber-400 tabular">
              #{currentUser.rank}
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Position</p>
              <p className="text-sm font-bold text-foreground">{currentUser.username}</p>
            </div>
          </div>

          <Badge className="font-bold px-2.5 py-1">
            {currentUser.points} pts
          </Badge>
        </div>
      )}
    </div>
  );
}