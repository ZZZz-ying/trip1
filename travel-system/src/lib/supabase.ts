import { createClient } from '@supabase/supabase-js';

// 从环境变量或预定义常量获取Supabase配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://srzvitgmwqknqryhcjov.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_lkhT4BBz3Rtxi9Q8gsDsEQ_jIhrT0ws';

// 禁用演示模式 - 强制使用Supabase
export const isDemoMode = false;

// Supabase客户端 - 始终启用
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 本地存储键名
const AUTH_STORAGE_KEY = 'travel_system_auth';

// 用户数据类型（保留用于参考，不再使用）
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  created_at: string;
}

// 演示模式用户管理（保留用于参考，不再使用）
export const demoAuth = {
  // 获取当前用户
  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.user && data.expiry > Date.now()) {
        return data.user;
      }
    }
    return null;
  },

  // 登录
  signIn: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    // 演示模式：简单的本地验证
    const users = JSON.parse(localStorage.getItem('travel_system_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      const userData: User = {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        created_at: user.created_at
      };
      const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天过期
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: userData, expiry }));
      return { user: userData, error: null };
    }
    return { user: null, error: '邮箱或密码错误' };
  },

  // 注册
  signUp: async (email: string, password: string, username: string): Promise<{ user: User | null; error: string | null }> => {
    const users = JSON.parse(localStorage.getItem('travel_system_users') || '[]');

    // 检查邮箱是否已存在
    if (users.find((u: any) => u.email === email)) {
      return { user: null, error: '该邮箱已被注册' };
    }

    const newUser: any = {
      id: crypto.randomUUID(),
      email,
      password, // 演示模式存储明文密码，实际应该加密
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('travel_system_users', JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      avatar: newUser.avatar,
      created_at: newUser.created_at
    };
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: userData, expiry }));
    return { user: userData, error: null };
  },

  // 登出
  signOut: async (): Promise<void> => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // 更新用户信息
  updateProfile: async (updates: Partial<User>): Promise<{ user: User | null; error: string | null }> => {
    const currentUser = demoAuth.getCurrentUser();
    if (!currentUser) {
      return { user: null, error: '未登录' };
    }

    const users = JSON.parse(localStorage.getItem('travel_system_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === currentUser.id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('travel_system_users', JSON.stringify(users));

      const userData: User = {
        id: users[userIndex].id,
        email: users[userIndex].email,
        username: users[userIndex].username,
        avatar: users[userIndex].avatar,
        created_at: users[userIndex].created_at
      };
      const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: userData, expiry }));
      return { user: userData, error: null };
    }
    return { user: null, error: '更新失败' };
  }
};
