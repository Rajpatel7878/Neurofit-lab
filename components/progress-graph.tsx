'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ProgressData {
  date: string;
  memory: number;
  focus: number;
  reaction: number;
}

interface ProgressGraphProps {
  data: ProgressData[];
  isLoading?: boolean;
}

const TIMEFRAMES = [
  { label: 'Week', value: 7 },
  { label: 'Month', value: 30 },
  { label: 'All', value: Infinity },
];

// Custom tooltip for a polished look
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl shadow-lg p-3 text-sm min-w-[160px]">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name}</span>
          </div>
          <span className="font-bold" style={{ color: entry.color }}>
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ProgressGraph({ data, isLoading }: ProgressGraphProps) {
  const [timeframe, setTimeframe] = useState('All');

  const visibleData = data.slice(
    -Math.min(data.length, TIMEFRAMES.find((t) => t.label === timeframe)?.value ?? data.length)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Cognitive training metrics</CardDescription>
            </div>
          </div>

          {/* Timeframe toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            {TIMEFRAMES.map((tf) => (
              <Button
                key={tf.label}
                variant="ghost"
                size="sm"
                onClick={() => setTimeframe(tf.label)}
                className={`rounded-none h-8 px-3 text-xs font-medium transition-colors ${
                  timeframe === tf.label
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tf.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        ) : visibleData.length === 0 ? (
          <div className="h-[300px] flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <TrendingUp className="h-12 w-12 opacity-20" />
            <p>No data yet — start training to see your progress!</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={visibleData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReaction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                stroke="var(--muted-foreground)"
                style={{ fontSize: '12px' }}
                tick={{ fill: 'var(--muted-foreground)' }}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                style={{ fontSize: '12px' }}
                tick={{ fill: 'var(--muted-foreground)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }}
                formatter={(value) => (
                  <span style={{ color: 'var(--muted-foreground)', textTransform: 'capitalize' }}>
                    {value}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="memory"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                fill="url(#colorMemory)"
                dot={{ fill: 'var(--chart-1)', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--card)' }}
                name="Memory"
              />
              <Area
                type="monotone"
                dataKey="focus"
                stroke="var(--chart-2)"
                strokeWidth={2.5}
                fill="url(#colorFocus)"
                dot={{ fill: 'var(--chart-2)', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--card)' }}
                name="Focus"
              />
              <Area
                type="monotone"
                dataKey="reaction"
                stroke="var(--chart-3)"
                strokeWidth={2.5}
                fill="url(#colorReaction)"
                dot={{ fill: 'var(--chart-3)', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--card)' }}
                name="Reaction"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
