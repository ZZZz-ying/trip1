import { supabase } from './supabase';

// 用户数据类型
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  created_at: string;
}

// 辅助函数：确保用户有搭子资料
async function ensurePartnerProfile(userId: string, username: string, email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // 检查是否已有资料
    const { data: existing, error: selectError } = await supabase
      .from('partner_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('查询搭子资料失败:', selectError);
      return { success: false, error: selectError.message };
    }

    if (existing) {
      console.log('用户已有搭子资料');
      return { success: true };
    }

    // 创建新资料
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
    const { error: insertError } = await supabase
      .from('partner_profiles')
      .insert({
        user_id: userId,
        username: username,
        avatar: avatar,
        email: email,
        gender: 'secret',
        age: 0,
        location: '未知',
        interests: [],
        travel_style: [],
        destinations: [],
        travel_time: '随时',
        bio: '这个人很懒，什么都没写~',
        rating: 5.0,
        completed_trips: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('创建搭子资料失败:', insertError);
      return { success: false, error: insertError.message };
    } else {
      console.log('自动创建搭子资料成功');
      return { success: true };
    }
  } catch (err: any) {
    console.error('确保搭子资料失败:', err);
    return { success: false, error: err.message };
  }
}

// Supabase Auth服务
export const authService = {
  // 获取当前用户
  getCurrentUser: async (): Promise<User | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const userData = {
        id: session.user.id,
        email: session.user.email || '',
        username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '用户',
        avatar: session.user.user_metadata?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.id}`,
        created_at: session.user.created_at
      };
      // 确保有搭子资料
      await ensurePartnerProfile(userData.id, userData.username, userData.email);
      return userData;
    }
    return null;
  },

  // 登录
  signIn: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.user_metadata?.username || email.split('@')[0],
          avatar: data.user.user_metadata?.avatar,
          created_at: data.user.created_at
        };
        return { user, error: null };
      }

      return { user: null, error: '登录失败' };
    } catch (err: any) {
      return { user: null, error: err.message || '登录失败' };
    }
  },

  // 注册
  signUp: async (email: string, password: string, username: string): Promise<{ user: User | null; error: string | null }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          username: username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.id}`,
          created_at: data.user.created_at
        };
        // 确保新用户有搭子资料
        await ensurePartnerProfile(user.id, user.username, user.email);
        return { user, error: null };
      }

      return { user: null, error: '注册失败' };
    } catch (err: any) {
      return { user: null, error: err.message || '注册失败' };
    }
  },

  // 登出
  signOut: async (): Promise<void> => {
    await supabase.auth.signOut();
  },

  // 更新用户信息
  updateProfile: async (updates: Partial<User>): Promise<{ user: User | null; error: string | null }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        return { user: null, error: '未登录' };
      }

      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.user_metadata?.username || '用户',
          avatar: data.user.user_metadata?.avatar,
          created_at: data.user.created_at
        };
        return { user, error: null };
      }

      return { user: null, error: '更新失败' };
    } catch (err: any) {
      return { user: null, error: err.message || '更新失败' };
    }
  },

  // 监听认证状态变化
  onAuthStateChange: (callback: (user: User | null) => void) => {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '用户',
          avatar: session.user.user_metadata?.avatar,
          created_at: session.user.created_at
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  }
};