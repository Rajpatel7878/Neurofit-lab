import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/leaderboard?limit=10
 * Fetches top users ranked by average score
 * 
 * Query params:
 * - limit: number (default: 10)
 * - timeframe: 'week' | 'month' | 'all' (default: 'month')
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const timeframe = searchParams.get('timeframe') || 'month';

    if (limit > 100) {
      return NextResponse.json(
        { error: 'Limit cannot exceed 100' },
        { status: 400 }
      );
    }

    // In production, this would:
    // 1. Query user_scores table
    // 2. Calculate average score per user
    // 3. Filter by timeframe
    // 4. Sort by score descending
    // 5. Limit results

    // For now, return mock data
    const mockLeaderboard = [
      { rank: 1, userId: '1', userName: 'Alex Chen', score: 8650, streak: 6 },
      { rank: 2, userId: '2', userName: 'Jordan Smith', score: 8200, streak: 4 },
      { rank: 3, userId: '3', userName: 'Casey Moore', score: 7900, streak: 3 },
      { rank: 4, userId: '4', userName: 'Morgan Lee', score: 7650, streak: 2 },
      { rank: 5, userId: '5', userName: 'Taylor White', score: 7400, streak: 5 },
    ].slice(0, limit);

    return NextResponse.json({
      data: mockLeaderboard,
      timeframe,
      count: mockLeaderboard.length,
    });
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
