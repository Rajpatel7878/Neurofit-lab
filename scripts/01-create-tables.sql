-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  avatar_url TEXT
);

-- Create user_scores table
CREATE TABLE IF NOT EXISTS user_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  test_type TEXT NOT NULL CHECK (test_type IN ('memory', 'focus', 'reaction')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_name TEXT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_name)
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  stripe_session_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_scores_user_id ON user_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_scores_created_at ON user_scores(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session ON purchases(stripe_session_id);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can read their own scores
CREATE POLICY "Users can read own scores" ON user_scores
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own scores
CREATE POLICY "Users can insert own scores" ON user_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read their own achievements
CREATE POLICY "Users can read own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Users can read their own purchases
CREATE POLICY "Users can read own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own purchases
CREATE POLICY "Users can insert own purchases" ON purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public leaderboard: anyone can read scores (but not user emails)
CREATE POLICY "Public leaderboard read" ON user_scores
  FOR SELECT USING (true);
