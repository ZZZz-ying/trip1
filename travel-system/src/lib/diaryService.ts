import { supabase } from './supabase';

// 旅游日记类型
export interface TravelDiary {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  title: string;
  content: string;
  destination: string;
  images: string[];
  videos: string[];
  tags: string[];
  views: number;
  likes: number;
  rating: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

// 旅游日记服务
export const diaryService = {
  // 创建日记
  createDiary: async (diary: Omit<TravelDiary, 'id' | 'views' | 'likes' | 'rating' | 'rating_count' | 'created_at' | 'updated_at'>): Promise<{ id: string; error: string | null }> => {
    try {
      const { data, error } = await supabase
        .from('diaries')
        .insert({
          user_id: diary.user_id,
          user_name: diary.user_name,
          user_avatar: diary.user_avatar,
          title: diary.title,
          content: diary.content,
          destination: diary.destination,
          images: diary.images,
          videos: diary.videos,
          tags: diary.tags
        })
        .select()
        .single();

      if (error) {
        return { id: '', error: error.message };
      }

      return { id: data.id, error: null };
    } catch (err: any) {
      return { id: '', error: err.message };
    }
  },

  // 获取所有日记（支持分页和排序）
  getDiaries: async (options?: {
    sortBy?: 'views' | 'likes' | 'rating' | 'created_at';
    order?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
    destination?: string;
    searchQuery?: string;
  }): Promise<{ diaries: TravelDiary[]; error: string | null }> => {
    try {
      let query = supabase
        .from('diaries')
        .select('*');

      // 目的地过滤
      if (options?.destination) {
        query = query.eq('destination', options.destination);
      }

      // 搜索
      if (options?.searchQuery) {
        query = query.or(`title.ilike.%${options.searchQuery}%,content.ilike.%${options.searchQuery}%`);
      }

      // 排序
      const sortBy = options?.sortBy || 'created_at';
      const order = options?.order || 'desc';
      query = query.order(sortBy, { ascending: order === 'asc' });

      // 分页
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      const { data, error } = await query;

      if (error) {
        return { diaries: [], error: error.message };
      }

      const diaries: TravelDiary[] = data.map(d => ({
        id: d.id,
        user_id: d.user_id,
        user_name: d.user_name,
        user_avatar: d.user_avatar,
        title: d.title,
        content: d.content,
        destination: d.destination,
        images: d.images || [],
        videos: d.videos || [],
        tags: d.tags || [],
        views: d.views || 0,
        likes: d.likes || 0,
        rating: d.rating || 0,
        rating_count: d.rating_count || 0,
        created_at: d.created_at,
        updated_at: d.updated_at
      }));

      return { diaries, error: null };
    } catch (err: any) {
      return { diaries: [], error: err.message };
    }
  },

  // 获取单个日记
  getDiary: async (id: string): Promise<{ diary: TravelDiary | null; error: string | null }> => {
    try {
      const { data, error } = await supabase
        .from('diaries')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { diary: null, error: error.message };
      }

      const diary: TravelDiary = {
        id: data.id,
        user_id: data.user_id,
        user_name: data.user_name,
        user_avatar: data.user_avatar,
        title: data.title,
        content: data.content,
        destination: data.destination,
        images: data.images || [],
        videos: data.videos || [],
        tags: data.tags || [],
        views: data.views || 0,
        likes: data.likes || 0,
        rating: data.rating || 0,
        rating_count: data.rating_count || 0,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      return { diary, error: null };
    } catch (err: any) {
      return { diary: null, error: err.message };
    }
  },

  // 获取用户的日记
  getUserDiaries: async (userId: string): Promise<{ diaries: TravelDiary[]; error: string | null }> => {
    try {
      const { data, error } = await supabase
        .from('diaries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { diaries: [], error: error.message };
      }

      const diaries: TravelDiary[] = data.map(d => ({
        id: d.id,
        user_id: d.user_id,
        user_name: d.user_name,
        user_avatar: d.user_avatar,
        title: d.title,
        content: d.content,
        destination: d.destination,
        images: d.images || [],
        videos: d.videos || [],
        tags: d.tags || [],
        views: d.views || 0,
        likes: d.likes || 0,
        rating: d.rating || 0,
        rating_count: d.rating_count || 0,
        created_at: d.created_at,
        updated_at: d.updated_at
      }));

      return { diaries, error: null };
    } catch (err: any) {
      return { diaries: [], error: err.message };
    }
  },

  // 更新日记
  updateDiary: async (id: string, updates: Partial<TravelDiary>): Promise<{ success: boolean; error: string | null }> => {
    try {
      const { error } = await supabase
        .from('diaries')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // 删除日记
  deleteDiary: async (id: string): Promise<{ success: boolean; error: string | null }> => {
    try {
      const { error } = await supabase
        .from('diaries')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // 增加浏览量
  incrementViews: async (id: string): Promise<void> => {
    await supabase.rpc('increment_diary_views', { diary_id: id });
  },

  // 点赞/取消点赞
  toggleLike: async (id: string, userId: string): Promise<{ liked: boolean; error: string | null }> => {
    try {
      // 检查是否已点赞
      const { data: existing } = await supabase
        .from('diary_likes')
        .select('*')
        .eq('diary_id', id)
        .eq('user_id', userId)
        .single();

      if (existing) {
        // 取消点赞
        await supabase
          .from('diary_likes')
          .delete()
          .eq('diary_id', id)
          .eq('user_id', userId);

        await supabase.rpc('decrement_diary_likes', { diary_id: id });
        return { liked: false, error: null };
      } else {
        // 添加点赞
        await supabase
          .from('diary_likes')
          .insert({ diary_id: id, user_id: userId });

        await supabase.rpc('increment_diary_likes', { diary_id: id });
        return { liked: true, error: null };
      }
    } catch (err: any) {
      return { liked: false, error: err.message };
    }
  },

  // 评分
  rateDiary: async (id: string, userId: string, rating: number): Promise<{ success: boolean; error: string | null }> => {
    try {
      // 检查是否已评分
      const { data: existing } = await supabase
        .from('diary_ratings')
        .select('*')
        .eq('diary_id', id)
        .eq('user_id', userId)
        .single();

      if (existing) {
        // 更新评分
        await supabase
          .from('diary_ratings')
          .update({ rating })
          .eq('diary_id', id)
          .eq('user_id', userId);
      } else {
        // 添加评分
        await supabase
          .from('diary_ratings')
          .insert({ diary_id: id, user_id: userId, rating });
      }

      // 更新日记的平均评分
      const { data: ratings } = await supabase
        .from('diary_ratings')
        .select('rating')
        .eq('diary_id', id);

      if (ratings && ratings.length > 0) {
        const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
        await supabase
          .from('diaries')
          .update({
            rating: avgRating,
            rating_count: ratings.length
          })
          .eq('id', id);
      }

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
};