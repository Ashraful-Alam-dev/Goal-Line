"use client";

import { Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";
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
  return (
    <div className="space-y-4">

      {leaderboard.map((user) => (
        <Card
          key={user.rank}
          className={`p-4 flex justify-between items-center ${
            currentUser?.username === user.username
              ? "border-primary"
              : ""
          }`}
        >
          <div className="flex items-center gap-3">
            {user.rank <= 3 && (
              <Trophy className="h-5 w-5 text-yellow-500" />
            )}

            <div>
              <p className="font-semibold">
                #{user.rank} {user.username}
              </p>

              <p className="text-sm text-muted-foreground">
                {user.points} pts
              </p>
            </div>
          </div>

          {currentUser?.username === user.username && (
            <Badge>You</Badge>
          )}
        </Card>
      ))}

      {currentUser && currentUser.rank > 10 && (
        <Card className="p-4 flex justify-between">
          <div>
            <p className="font-semibold">
              Your Position
            </p>

            <p>{currentUser.username}</p>
          </div>

          <Badge>
            #{currentUser.rank} • {currentUser.points} pts
          </Badge>
        </Card>
      )}
    </div>
  );
}