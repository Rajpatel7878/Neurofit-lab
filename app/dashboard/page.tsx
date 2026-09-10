'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeaderboardTable } from '@/components/leaderboard-table';
import { ProgressGraph } from '@/components/progress-graph';
import { AchievementBadges } from '@/components/achievement-badges';
import { LogOut, Zap, Target, Clock, Brain } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// Demo data — in production this would be fetched from Supabase
const MOCK_USER = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  avatar: 'A',
};

const MOCK_SCORES = [
  { date: 'Day 1', memory: 7200, focus: 7800, reaction: 7100 },
  { date: 'Day 2', memory: 7450, focus: 8100, reaction: 7300 },
  { date: 'Day 3', memory: 7800, focus: 8400, reaction: 7600 },
  { date: 'Day 4', memory: 8100, focus: 8700, reaction: 7900 },
  { date: 'Day 5', memory: 8350, focus: 8900, reaction: 8150 },
  { date: 'Day 6', memory: 8650, focus: 9200, reaction: 8400 },
];

const MOCK_LEADERBOARD = [
  { rank: 1, userId: '1', userName: 'Alex Chen', score: 8650, streak: 6, isCurrentUser: true },
  { rank: 2, userId: '2', userName: 'Jordan Smith', score: 8200, streak: 4 },
  { rank: 3, userId: '3', userName: 'Casey Moore', score: 7900, streak: 3 },
  { rank: 4, userId: '4', userName: 'Morgan Lee', score: 7650, streak: 2 },
  { rank: 5, userId: '5', userName: 'Taylor White', score: 7400, streak: 5 },
];

const MOCK_ACHIEVEMENTS = ['first_100', 'top_10', 'streak_7days', 'memory_master'];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const currentScore = MOCK_SCORES[MOCK_SCORES.length - 1];
  const avgMemory = Math.round(
    MOCK_SCORES.reduce((sum, s) => sum + s.memory, 0) / MOCK_SCORES.length
  );
  const avgFocus = Math.round(
    MOCK_SCORES.reduce((sum, s) => sum + s.focus, 0) / MOCK_SCORES.length
  );

  const handleLogout = async () => {
    // In production: await signOut() from lib/supabase
    toast.success('Signed out successfully', {
      description: 'Come back soon to keep your streak!',
    });
  };

  const STAT_CARDS = [
    {
      icon: Zap,
      label: 'Latest Score',
      value: currentScore.memory.toLocaleString(),
      unit: 'pts',
      color: 'text-primary',
    },
    {
      icon: Brain,
      label: 'Avg Memory',
      value: avgMemory.toLocaleString(),
      unit: 'pts',
      color: 'text-primary',
    },
    {
      icon: Target,
      label: 'Avg Focus',
      value: avgFocus.toLocaleString(),
      unit: 'pts',
      color: 'text-accent',
    },
    {
      icon: Clock,
      label: 'Day Streak',
      value: '6',
      unit: 'days 🔥',
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Dashboard Header */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-36" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
                    <p className="text-muted-foreground">
                      Welcome back,{' '}
                      <span className="font-medium text-foreground">{MOCK_USER.name}</span>! 👋
                    </p>
                  </>
                )}
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STAT_CARDS.map((stat, idx) => (
                <Card key={idx} className="border shadow-sm">
                  <CardContent className="p-6">
                    {isLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-7 w-24" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                          <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">
                          {stat.value}{' '}
                          <span className="text-sm font-normal text-muted-foreground">
                            {stat.unit}
                          </span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <ProgressGraph data={MOCK_SCORES} isLoading={isLoading} />

                {/* Training Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Training Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="text-center p-4 rounded-lg bg-muted/30 space-y-2">
                            <Skeleton className="h-10 w-10 rounded-md mx-auto" />
                            <Skeleton className="h-4 w-32 mx-auto" />
                            <Skeleton className="h-8 w-16 mx-auto" />
                          </div>
                        ))
                      ) : (
                        [
                          { label: 'Sessions Completed', value: '47', icon: '🎯' },
                          { label: 'Total Training Hours', value: '23.5', icon: '⏱️' },
                          { label: 'Performance Improvement', value: '+32%', icon: '📈' },
                        ].map((item, idx) => (
                          <div key={idx} className="text-center p-4 rounded-lg bg-muted/30">
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                            <p className="text-2xl font-bold text-primary">{item.value}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard">
                <LeaderboardTable data={MOCK_LEADERBOARD} isLoading={isLoading} />
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <AchievementBadges unlockedBadges={MOCK_ACHIEVEMENTS} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Upgrade Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Unlock Advanced Features</h3>
                    <p className="text-muted-foreground mb-6">
                      Upgrade to Pro to get access to advanced analytics, personalized coaching, and
                      exclusive training programs.
                    </p>
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8"
                    >
                      <Link href="/shop">Upgrade Now</Link>
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Custom AI coaching plans',
                      'Advanced neural feedback analytics',
                      'Priority support',
                      'Exclusive competitive events',
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                        <span className="font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
