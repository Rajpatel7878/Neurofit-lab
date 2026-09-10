'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_100',
    name: 'Century Start',
    description: 'Complete your first 100 training sessions',
    icon: '🚀',
    unlocked: false,
  },
  {
    id: 'top_10',
    name: 'Elite Mind',
    description: 'Reach top 10 on the global leaderboard',
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'streak_7days',
    name: 'Week Warrior',
    description: 'Maintain a 7-day training streak',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'memory_master',
    name: 'Memory Master',
    description: 'Score 9000+ on memory training',
    icon: '🧠',
    unlocked: false,
  },
  {
    id: 'focus_king',
    name: 'Focus King',
    description: 'Score 9000+ on focus training',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Score 9000+ on reaction time training',
    icon: '⚡',
    unlocked: false,
  },
];

interface AchievementBadgesProps {
  unlockedBadges?: string[];
  isLoading?: boolean;
}

export function AchievementBadges({ unlockedBadges = [], isLoading }: AchievementBadgesProps) {
  const achievements = ALL_ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlocked: unlockedBadges.includes(achievement.id),
  }));

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle>Achievements</CardTitle>
          </div>
          <Badge variant="secondary">
            {unlockedCount} / {achievements.length}
          </Badge>
        </div>
        <CardDescription>
          {unlockedCount === 0
            ? 'Start training to unlock your first badge!'
            : `${unlockedCount} of ${achievements.length} badges unlocked`}
        </CardDescription>

        {/* Progress bar */}
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-lg border-2 border-muted space-y-2">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? 'border-accent bg-accent/5 hover:bg-accent/10 hover:scale-105 cursor-default'
                    : 'border-muted bg-muted/20 opacity-50 grayscale'
                }`}
                title={achievement.unlocked ? 'Unlocked!' : 'Locked — keep training!'}
              >
                <div className="text-4xl mb-2 transition-transform group-hover:scale-110">
                  {achievement.icon}
                </div>
                <div className="text-sm font-semibold text-center">{achievement.name}</div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {achievement.description}
                </p>
                {!achievement.unlocked && (
                  <Lock className="h-3 w-3 text-muted-foreground mt-2" />
                )}
                {achievement.unlocked && (
                  <Badge className="mt-2 bg-accent/20 text-accent border-accent/30 text-xs">
                    Unlocked
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
