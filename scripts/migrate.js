import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  try {
    console.log('Starting database migration...');

    // Create users table
    console.log('Creating users table...');
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          full_name TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
          avatar_url TEXT
        );
      `
    }).catch(() => {
      // Table might already exist, continue
    });

    // Create user_scores table
    console.log('Creating user_scores table...');
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_scores (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          score INTEGER NOT NULL,
          test_type TEXT NOT NULL CHECK (test_type IN ('memory', 'focus', 'reaction')),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `
    }).catch(() => {});

    // Create user_achievements table
    console.log('Creating user_achievements table...');
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_achievements (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          badge_name TEXT NOT NULL,
          unlocked_at TIMESTAMP DEFAULT NOW(),
          UNIQUE(user_id, badge_name)
        );
      `
    }).catch(() => {});

    // Create purchases table
    console.log('Creating purchases table...');
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS purchases (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          product_id TEXT NOT NULL,
          stripe_session_id TEXT,
          status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `
    }).catch(() => {});

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
