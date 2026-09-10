-- Seed sample data for development
-- Note: These are not authenticated users, just sample data for the leaderboard

-- Insert sample users (these will be shown on leaderboard)
INSERT INTO users (id, email, full_name) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'alex@neurofitlabs.com', 'Alex Chen'),
  ('550e8400-e29b-41d4-a716-446655440001', 'jordan@neurofitlabs.com', 'Jordan Smith'),
  ('550e8400-e29b-41d4-a716-446655440002', 'casey@neurofitlabs.com', 'Casey Moore'),
  ('550e8400-e29b-41d4-a716-446655440003', 'morgan@neurofitlabs.com', 'Morgan Lee'),
  ('550e8400-e29b-41d4-a716-446655440004', 'taylor@neurofitlabs.com', 'Taylor White'),
  ('550e8400-e29b-41d4-a716-446655440005', 'sam@neurofitlabs.com', 'Sam Johnson'),
  ('550e8400-e29b-41d4-a716-446655440006', 'pat@neurofitlabs.com', 'Pat Davis'),
  ('550e8400-e29b-41d4-a716-446655440007', 'riley@neurofitlabs.com', 'Riley Brown'),
  ('550e8400-e29b-41d4-a716-446655440008', 'robin@neurofitlabs.com', 'Robin Garcia'),
  ('550e8400-e29b-41d4-a716-446655440009', 'avery@neurofitlabs.com', 'Avery Martinez')
ON CONFLICT DO NOTHING;

-- Insert sample scores
INSERT INTO user_scores (user_id, score, test_type) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 8650, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440000', 9200, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440000', 8400, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440001', 8200, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440001', 8900, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440001', 8100, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440002', 7900, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440002', 8600, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440002', 7800, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440003', 7650, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440003', 8300, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440003', 7600, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440004', 7400, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440004', 8000, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440004', 7300, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440005', 7100, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440005', 7700, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440005', 7000, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440006', 6800, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440006', 7400, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440006', 6700, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440007', 6500, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440007', 7100, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440007', 6400, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440008', 6200, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440008', 6800, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440008', 6100, 'reaction'),
  
  ('550e8400-e29b-41d4-a716-446655440009', 5900, 'memory'),
  ('550e8400-e29b-41d4-a716-446655440009', 6500, 'focus'),
  ('550e8400-e29b-41d4-a716-446655440009', 5800, 'reaction')
ON CONFLICT DO NOTHING;

-- Insert sample achievements
INSERT INTO user_achievements (user_id, badge_name) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'first_100'),
  ('550e8400-e29b-41d4-a716-446655440000', 'top_10'),
  ('550e8400-e29b-41d4-a716-446655440000', 'streak_7days'),
  ('550e8400-e29b-41d4-a716-446655440000', 'memory_master'),
  
  ('550e8400-e29b-41d4-a716-446655440001', 'first_100'),
  ('550e8400-e29b-41d4-a716-446655440001', 'top_10'),
  ('550e8400-e29b-41d4-a716-446655440001', 'focus_king'),
  
  ('550e8400-e29b-41d4-a716-446655440002', 'first_100'),
  ('550e8400-e29b-41d4-a716-446655440002', 'streak_7days')
ON CONFLICT DO NOTHING;
