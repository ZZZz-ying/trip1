-- 旅游系统数据库表结构
-- 使用前请先在 Supabase SQL Editor 中清空现有表或新建数据库

-- 1. 搭子资料表
CREATE TABLE IF NOT EXISTS partner_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar TEXT,
  gender TEXT DEFAULT 'secret' CHECK (gender IN ('male', 'female', 'secret')),
  age INTEGER DEFAULT 0,
  location TEXT DEFAULT '未知',
  interests TEXT[] DEFAULT '{}',
  travel_style TEXT[] DEFAULT '{}',
  destinations TEXT[] DEFAULT '{}',
  travel_time TEXT DEFAULT '随时',
  bio TEXT DEFAULT '',
  rating DECIMAL(2,1) DEFAULT 5.0,
  completed_trips INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 搭子申请表
CREATE TABLE IF NOT EXISTS partner_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_id TEXT NOT NULL,
  from_name TEXT NOT NULL,
  from_avatar TEXT,
  to_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 会话表
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  partner_id TEXT NOT NULL,
  last_message TEXT DEFAULT '',
  last_message_time TEXT DEFAULT '',
  unread_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, partner_id)
);

-- 4. 消息表
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 旅游日记表
CREATE TABLE IF NOT EXISTS diaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  destination TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 日记点赞表
CREATE TABLE IF NOT EXISTS diary_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diary_id UUID NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(diary_id, user_id)
);

-- 7. 日记评分表
CREATE TABLE IF NOT EXISTS diary_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diary_id UUID NOT NULL,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(diary_id, user_id)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_partner_requests_to_id ON partner_requests(to_id);
CREATE INDEX IF NOT EXISTS idx_partner_requests_from_id ON partner_requests(from_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_diaries_destination ON diaries(destination);
CREATE INDEX IF NOT EXISTS idx_diaries_created_at ON diaries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diary_likes_diary_id ON diary_likes(diary_id);
CREATE INDEX IF NOT EXISTS idx_diary_ratings_diary_id ON diary_ratings(diary_id);

-- RLS (Row Level Security)
ALTER TABLE partner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE diaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_ratings ENABLE ROW LEVEL SECURITY;

-- 删除旧策略（如果存在）
DROP POLICY IF EXISTS "Public can view profiles" ON partner_profiles;
DROP POLICY IF EXISTS "Public can insert profiles" ON partner_profiles;
DROP POLICY IF EXISTS "Public can update profiles" ON partner_profiles;
DROP POLICY IF EXISTS "Public requests" ON partner_requests;
DROP POLICY IF EXISTS "Insert requests" ON partner_requests;
DROP POLICY IF EXISTS "Update requests" ON partner_requests;
DROP POLICY IF EXISTS "Public conversations" ON conversations;
DROP POLICY IF EXISTS "Insert conversations" ON conversations;
DROP POLICY IF EXISTS "Update conversations" ON conversations;
DROP POLICY IF EXISTS "Public messages" ON messages;
DROP POLICY IF EXISTS "Insert messages" ON messages;
DROP POLICY IF EXISTS "Public diaries" ON diaries;
DROP POLICY IF EXISTS "Insert diaries" ON diaries;
DROP POLICY IF EXISTS "Update diaries" ON diaries;
DROP POLICY IF EXISTS "Delete diaries" ON diaries;
DROP POLICY IF EXISTS "Public likes" ON diary_likes;
DROP POLICY IF EXISTS "Insert likes" ON diary_likes;
DROP POLICY IF EXISTS "Delete likes" ON diary_likes;
DROP POLICY IF EXISTS "Public ratings" ON diary_ratings;
DROP POLICY IF EXISTS "Insert ratings" ON diary_ratings;
DROP POLICY IF EXISTS "Update ratings" ON diary_ratings;

-- 创建策略
CREATE POLICY "Public can view profiles" ON partner_profiles FOR SELECT USING (true);
CREATE POLICY "Public can insert profiles" ON partner_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update profiles" ON partner_profiles FOR UPDATE USING (true);
CREATE POLICY "Public requests" ON partner_requests FOR SELECT USING (true);
CREATE POLICY "Insert requests" ON partner_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Update requests" ON partner_requests FOR UPDATE USING (true);
CREATE POLICY "Public conversations" ON conversations FOR SELECT USING (true);
CREATE POLICY "Insert conversations" ON conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Update conversations" ON conversations FOR UPDATE USING (true);
CREATE POLICY "Public messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public diaries" ON diaries FOR SELECT USING (true);
CREATE POLICY "Insert diaries" ON diaries FOR INSERT WITH CHECK (true);
CREATE POLICY "Update diaries" ON diaries FOR UPDATE USING (true);
CREATE POLICY "Delete diaries" ON diaries FOR DELETE USING (true);
CREATE POLICY "Public likes" ON diary_likes FOR SELECT USING (true);
CREATE POLICY "Insert likes" ON diary_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Delete likes" ON diary_likes FOR DELETE USING (true);
CREATE POLICY "Public ratings" ON diary_ratings FOR SELECT USING (true);
CREATE POLICY "Insert ratings" ON diary_ratings FOR INSERT WITH CHECK (true);
CREATE POLICY "Update ratings" ON diary_ratings FOR UPDATE USING (true);

-- RPC 函数（使用 OR REPLACE 防止重复创建错误）
CREATE OR REPLACE FUNCTION increment_diary_views(diary_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE diaries SET views = views + 1 WHERE id = diary_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_diary_likes(diary_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE diaries SET likes = likes + 1 WHERE id = diary_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_diary_likes(diary_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE diaries SET likes = GREATEST(0, likes - 1) WHERE id = diary_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;