import React, { useState } from 'react';
import { Database, CheckCircle, XCircle, Loader2, ExternalLink, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function DatabaseSetupPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [connectionInfo, setConnectionInfo] = useState<{ url: string; keyPrefix: string } | null>(null);
  const [tables, setTables] = useState<{ name: string; exists: boolean; error?: string }[]>([
    { name: 'partner_profiles', exists: false },
    { name: 'partner_requests', exists: false },
    { name: 'conversations', exists: false },
    { name: 'messages', exists: false },
    { name: 'diaries', exists: false },
    { name: 'diary_likes', exists: false },
    { name: 'diary_ratings', exists: false },
  ]);

  // 测试连接
  const testConnection = async () => {
    setStatus('loading');
    setMessage('正在测试数据库连接...');

    try {
      // 显示连接信息
      const url = import.meta.env.VITE_SUPABASE_URL || 'https://srzvitgmwqknqryhcjov.supabase.co';
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
      setConnectionInfo({
        url: url,
        keyPrefix: key.substring(0, 20) + '...'
      });

      // 尝试查询一个不存在的表来测试连接
      const { error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .limit(1);

      if (error) {
        // 连接可能成功，但查询方式不对
        setStatus('error');
        setMessage('数据库连接成功！但无法访问系统表。表检查将使用直接查询方式。');
      } else {
        setStatus('success');
        setMessage('数据库连接成功！');
      }
    } catch (error) {
      setStatus('error');
      setMessage('数据库连接失败: ' + (error as Error).message);
    }
  };

  const checkTables = async () => {
    setStatus('loading');
    setMessage('正在检查数据库表...');

    try {
      const tableNames = tables.map(t => t.name);
      const results: { name: string; exists: boolean; error?: string }[] = [];

      for (const tableName of tableNames) {
        try {
          // 使用 HEAD 请求快速检查表是否存在
          const { error, status } = await supabase
            .from(tableName)
            .select('id')
            .limit(1);

          // 表存在的情况：
          // 1. 没有错误 (error = null)
          // 2. 错误但状态码是 200-299 (可能是空表)
          // 表不存在的情况：
          // 1. 状态码 400 或 404 (表不存在)
          // 2. 错误消息包含 "relation ... does not exist"

          const errorMsg = error?.message || '';
          const tableNotFound =
            status === 400 ||
            status === 404 ||
            errorMsg.includes('does not exist') ||
            errorMsg.includes('not found');

          if (tableNotFound) {
            results.push({
              name: tableName,
              exists: false,
              error: errorMsg || `表不存在 (状态码: ${status})`
            });
          } else {
            // 表存在（即使有RLS限制，只要表存在就显示为已存在）
            results.push({
              name: tableName,
              exists: true
            });
          }
        } catch (err) {
          results.push({
            name: tableName,
            exists: false,
            error: (err as Error).message
          });
        }
      }

      setTables(results);

      const existingTables = results.filter(t => t.exists);
      if (existingTables.length === results.length) {
        setStatus('success');
        setMessage('所有数据库表已存在，系统可以正常使用！');
      } else if (existingTables.length > 0) {
        setStatus('error');
        const missingTables = results.filter(t => !t.exists).map(t => t.name);
        setMessage(`部分数据表已存在 (${existingTables.length}/${results.length})。缺少: ${missingTables.join(', ')}。`);
      } else {
        setStatus('error');
        const firstError = results[0]?.error || '';
        setMessage(`缺少数据表。请在Supabase SQL Editor中执行SQL脚本创建表。错误: ${firstError}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage('检查失败: ' + (error as Error).message);
    }
  };

  const createTables = async () => {
    setStatus('loading');
    setMessage('正在创建数据表...');

    try {
      // 创建所有表
      const createStatements = [
        // 搭子资料表
        `CREATE TABLE IF NOT EXISTS partner_profiles (
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
        )`,

        // 搭子申请表
        `CREATE TABLE IF NOT EXISTS partner_requests (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          from_id TEXT NOT NULL,
          from_name TEXT NOT NULL,
          from_avatar TEXT,
          to_id TEXT NOT NULL,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
          message TEXT DEFAULT '',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )`,

        // 会话表
        `CREATE TABLE IF NOT EXISTS conversations (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id TEXT NOT NULL,
          partner_id TEXT NOT NULL,
          last_message TEXT DEFAULT '',
          last_message_time TEXT DEFAULT '',
          unread_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id, partner_id)
        )`,

        // 消息表
        `CREATE TABLE IF NOT EXISTS messages (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          conversation_id UUID NOT NULL,
          sender_id TEXT NOT NULL,
          receiver_id TEXT NOT NULL,
          content TEXT NOT NULL,
          timestamp TEXT NOT NULL,
          read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )`,

        // 旅游日记表
        `CREATE TABLE IF NOT EXISTS diaries (
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
        )`,

        // 日记点赞表
        `CREATE TABLE IF NOT EXISTS diary_likes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          diary_id UUID NOT NULL,
          user_id UUID NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(diary_id, user_id)
        )`,

        // 日记评分表
        `CREATE TABLE IF NOT EXISTS diary_ratings (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          diary_id UUID NOT NULL,
          user_id UUID NOT NULL,
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(diary_id, user_id)
        )`
      ];

      // 由于Supabase JS客户端不能直接执行DDL，我们需要用户手动在SQL Editor中执行
      // 显示SQL脚本让用户复制

      setStatus('error');
      setMessage('请在 Supabase SQL Editor 中执行以下 SQL 脚本创建表结构。点击下方按钮复制脚本。');

    } catch (error) {
      setStatus('error');
      setMessage('创建失败: ' + (error as Error).message);
    }
  };

  const copySQL = () => {
    const sql = `-- 旅游系统数据库表结构

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

-- 删除旧策略（如果存在）- 防止重复创建错误
DROP POLICY IF EXISTS "Public can view profiles" ON partner_profiles;
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
CREATE POLICY "Update diaries" ON diaries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Delete diaries" ON diaries FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Public likes" ON diary_likes FOR SELECT USING (true);
CREATE POLICY "Insert likes" ON diary_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Delete likes" ON diary_likes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Public ratings" ON diary_ratings FOR SELECT USING (true);
CREATE POLICY "Insert ratings" ON diary_ratings FOR INSERT WITH CHECK (true);
CREATE POLICY "Update ratings" ON diary_ratings FOR UPDATE USING (auth.uid() = user_id);

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
$$ LANGUAGE plpgsql SECURITY DEFINER;`;

    navigator.clipboard.writeText(sql);
    alert('SQL 脚本已复制到剪贴板！请在 Supabase SQL Editor 中粘贴执行。');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">数据库设置</h1>
              <p className="text-gray-500">配置旅游系统所需的数据表结构</p>
            </div>
          </div>

          {/* 连接信息 */}
          {connectionInfo && (
            <div className="mb-6 p-4 bg-gray-100 rounded-xl">
              <h3 className="font-medium text-gray-700 mb-2">当前连接信息</h3>
              <p className="text-sm text-gray-600 font-mono">URL: {connectionInfo.url}</p>
              <p className="text-sm text-gray-600 font-mono">Key: {connectionInfo.keyPrefix}</p>
            </div>
          )}

          {/* 状态显示 */}
          {status !== 'idle' && (
            <div className={`rounded-xl p-5 mb-6 ${
              status === 'loading' ? 'bg-blue-50 border-2 border-blue-200' :
              status === 'success' ? 'bg-green-50 border-2 border-green-200' :
              'bg-red-50 border-2 border-red-200'
            }`}>
              <div className="flex items-start space-x-4">
                {status === 'loading' && <Loader2 className="w-6 h-6 text-blue-600 mt-0.5 animate-spin" />}
                {status === 'success' && <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />}
                {status === 'error' && <XCircle className="w-6 h-6 text-red-600 mt-0.5" />}
                <div className="flex-1">
                  <p className={`text-base ${
                    status === 'loading' ? 'text-blue-700' :
                    status === 'success' ? 'text-green-700' :
                    'text-red-700'
                  }`}>
                    {message}
                  </p>
                  {/* 显示错误详情 */}
                  {status === 'error' && tables.some(t => t.error) && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-red-200">
                      <h4 className="text-sm font-medium text-red-700 mb-2">错误详情：</h4>
                      {tables.filter(t => t.error).map(t => (
                        <p key={t.name} className="text-xs text-red-600 font-mono">
                          {t.name}: {t.error}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 数据表状态 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">数据表状态</h2>
            <div className="grid grid-cols-2 gap-3">
              {tables.map(table => (
                <div key={table.name} className="flex flex-col p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-gray-700">{table.name}</span>
                    {table.exists ? (
                      <span className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        已存在
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
                        <XCircle className="w-4 h-4 mr-1" />
                        不存在
                      </span>
                    )}
                  </div>
                  {table.error && (
                    <p className="mt-2 text-xs text-red-500 font-mono truncate" title={table.error}>
                      错误: {table.error}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={testConnection}
              disabled={status === 'loading'}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>测试数据库连接</span>
            </button>

            <button
              onClick={checkTables}
              disabled={status === 'loading'}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center space-x-2 transition-colors"
            >
              <Database className="w-5 h-5" />
              <span>检查数据表</span>
            </button>

            <button
              onClick={copySQL}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 flex items-center justify-center space-x-2 transition-all shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              <span>复制 SQL 脚本</span>
            </button>
          </div>

          {/* 操作说明 */}
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-4">操作步骤</h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>点击"复制 SQL 脚本"按钮，将 SQL 脚本复制到剪贴板</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>登录 Supabase Dashboard，进入你的项目</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>点击左侧菜单"SQLEditor"，新建查询</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>粘贴 SQL 脚本并点击"Run"执行</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>返回此页面，点击"检查数据表"确认所有表已创建成功</span>
              </li>
            </ol>
          </div>

          {/* Supabase链接 */}
          <div className="mt-6 text-center">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center space-x-1"
            >
              <ExternalLink className="w-4 h-4" />
              <span>打开 Supabase Dashboard</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}