'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Flame } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  score: number;
  streak: number;
  isCurrentUser?: boolean;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  isLoading?: boolean;
}

const RANK_MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export function LeaderboardTable({ data, isLoading }: LeaderboardTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Global Leaderboard</CardTitle>
            <CardDescription>Top performers this month</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-16 font-semibold">Rank</TableHead>
                <TableHead className="font-semibold">Athlete</TableHead>
                <TableHead className="text-right font-semibold">Score</TableHead>
                <TableHead className="text-right font-semibold">Streak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-8" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-10 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                    <Trophy className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p>No leaderboard data yet. Start training!</p>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((entry) => (
                  <TableRow
                    key={entry.userId}
                    className={`transition-colors ${
                      entry.isCurrentUser
                        ? 'bg-primary/5 hover:bg-primary/10 font-medium'
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {RANK_MEDAL[entry.rank] ? (
                          <span className="text-lg leading-none">{RANK_MEDAL[entry.rank]}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground font-mono">
                            #{entry.rank}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {entry.userName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium text-sm">{entry.userName}</span>
                          {entry.isCurrentUser && (
                            <Badge className="ml-2 bg-primary/10 text-primary border-primary/20 text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-primary tabular-nums">
                        {entry.score.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Flame
                          className={`h-4 w-4 ${
                            entry.streak >= 5 ? 'text-orange-500' : 'text-muted-foreground'
                          }`}
                        />
                        <span className="tabular-nums font-medium">{entry.streak}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
