import { createClient } from '@supabase/supabase-js';

// Supabase client — graceful fallback in demo/preview mode
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[NeuroFit Labs] Supabase env vars not set. Running in demo mode — ' +
    'auth and database features will be disabled. ' +
    'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local to enable them.'
  );
}

// Lazily create client only when env vars are available
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/** Returns true when Supabase is configured */
export const isSupabaseEnabled = !!supabase;

// ─── Database types ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserScore {
  id: string;
  user_id: string;
  score: number;
  test_type: 'memory' | 'focus' | 'reaction';
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  badge_name: string;
  unlocked_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  stripe_session_id: string | null;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// ─── Auth helpers ──────────────────────────────────────────────────────────────

export async function signUp(email: string, password: string, fullName: string) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) throw new Error('Supabase is not configured');
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

// ─── Database queries ──────────────────────────────────────────────────────────

export async function getUserScores(userId: string) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase
    .from('user_scores')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as UserScore[];
}

export async function getUserAchievements(userId: string) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data as UserAchievement[];
}

export async function getLeaderboard(limit = 10) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase.rpc('get_leaderboard', { limit_count: limit });

  if (error) {
    // Fallback: compute from raw scores
    const { data: scores, error: scoresError } = await supabase
      .from('user_scores')
      .select('user_id, score');
    if (scoresError) throw scoresError;

    const userScores = (scores as UserScore[]).reduce(
      (acc, score) => {
        if (!acc[score.user_id]) acc[score.user_id] = { totalScore: 0, count: 0 };
        acc[score.user_id].totalScore += score.score;
        acc[score.user_id].count += 1;
        return acc;
      },
      {} as Record<string, { totalScore: number; count: number }>
    );

    return Object.entries(userScores)
      .map(([userId, { totalScore, count }]) => ({
        user_id: userId,
        average_score: Math.round(totalScore / count),
      }))
      .sort((a, b) => b.average_score - a.average_score)
      .slice(0, limit);
  }

  return data;
}

export async function addUserScore(
  userId: string,
  score: number,
  testType: 'memory' | 'focus' | 'reaction'
) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase
    .from('user_scores')
    .insert({ user_id: userId, score, test_type: testType });
  if (error) throw error;
  return data;
}

export async function getUserPurchases(userId: string) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Purchase[];
}

export async function createPurchase(
  userId: string,
  productId: string,
  stripeSessionId?: string
) {
  if (!supabase) throw new Error('Supabase is not configured');
  const { data, error } = await supabase.from('purchases').insert({
    user_id: userId,
    product_id: productId,
    stripe_session_id: stripeSessionId,
    status: 'pending',
  });
  if (error) throw error;
  return data;
}
