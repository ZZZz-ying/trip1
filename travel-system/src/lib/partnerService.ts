import { supabase, isDemoMode } from './supabase';

// 搭子用户类型
export interface PartnerProfile {
  id: string;
  user_id: string;
  username: string;
  avatar: string;
  gender: 'male' | 'female' | 'secret';
  age: number;
  location: string;
  interests: string[];
  travel_style: string[];
  destinations: string[];
  travel_time: string;
  bio: string;
  rating: number;
  completed_trips: number;
  created_at: string;
  updated_at: string;
}

// 申请类型
export interface PartnerRequest {
  id: string;
  from_id: string;
  from_name: string;
  from_avatar: string;
  to_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  created_at: string;
}

// 消息类型
export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  read: boolean;
  created_at: string;
}

// 会话类型
export interface Conversation {
  id: string;
  user_id: string;
  partner_id: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

// 获取所有用户作为搭子
export async function getAllPartners(): Promise<PartnerProfile[]> {
  if (isDemoMode || !supabase) {
    // 返回空数组，演示模式使用 mock 数据
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('partner_profiles')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('获取搭子列表失败:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('获取搭子列表失败:', error);
    return [];
  }
}

// 获取用户搭子资料
export async function getUserProfile(userId: string): Promise<PartnerProfile | null> {
  if (isDemoMode || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('partner_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // 用户资料不存在
        return null;
      }
      console.error('获取用户资料失败:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('获取用户资料失败:', error);
    return null;
  }
}

// 创建或更新用户搭子资料
export async function upsertUserProfile(profile: Partial<PartnerProfile>): Promise<{ success: boolean; error?: string }> {
  if (isDemoMode || !supabase) {
    return { success: false, error: '演示模式不支持此操作' };
  }

  try {
    const { error } = await supabase
      .from('partner_profiles')
      .upsert({
        ...profile,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('保存用户资料失败:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('保存用户资料失败:', error);
    return { success: false, error: '保存失败' };
  }
}

// 发送搭子申请
export async function sendPartnerRequest(request: Omit<PartnerRequest, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  if (isDemoMode || !supabase) {
    return { success: false, error: '演示模式不支持此操作' };
  }

  try {
    const { error } = await supabase
      .from('partner_requests')
      .insert({
        ...request,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('发送申请失败:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('发送申请失败:', error);
    return { success: false, error: '发送失败' };
  }
}

// 获取收到的搭子申请
export async function getReceivedRequests(userId: string): Promise<PartnerRequest[]> {
  if (isDemoMode || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('partner_requests')
      .select('*')
      .eq('to_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取申请列表失败:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('获取申请列表失败:', error);
    return [];
  }
}

// 获取发送的搭子申请
export async function getSentRequests(userId: string): Promise<PartnerRequest[]> {
  if (isDemoMode || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('partner_requests')
      .select('*')
      .eq('from_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取申请列表失败:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('获取申请列表失败:', error);
    return [];
  }
}

// 更新申请状态
export async function updateRequestStatus(requestId: string, status: 'accepted' | 'rejected'): Promise<{ success: boolean; error?: string }> {
  if (isDemoMode || !supabase) {
    return { success: false, error: '演示模式不支持此操作' };
  }

  try {
    const { error } = await supabase
      .from('partner_requests')
      .update({ status })
      .eq('id', requestId);

    if (error) {
      console.error('更新申请状态失败:', error);
      return { success: false, error: error.message };
    }

    // 如果接受申请，创建会话
    if (status === 'accepted') {
      const { data: requestData } = await supabase
        .from('partner_requests')
        .select('from_id, to_id')
        .eq('id', requestId)
        .single();

      if (requestData) {
        // 创建双向会话
        await createConversation(requestData.from_id, requestData.to_id);
        await createConversation(requestData.to_id, requestData.from_id);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('更新申请状态失败:', error);
    return { success: false, error: '更新失败' };
  }
}

// 创建会话
export async function createConversation(userId: string, partnerId: string): Promise<{ success: boolean; conversationId?: string; error?: string }> {
  if (isDemoMode || !supabase) {
    return { success: false, error: '演示模式不支持此操作' };
  }

  try {
    // 检查会话是否已存在（双向检查）
    const { data: existing1 } = await supabase
      .from('conversations')
      .select('id')
      .eq('user_id', userId)
      .eq('partner_id', partnerId)
      .single();

    if (existing1) {
      return { success: true, conversationId: existing1.id }; // 会话已存在，返回ID
    }

    // 检查反向会话是否存在（对方可能已经创建）
    const { data: existing2 } = await supabase
      .from('conversations')
      .select('id')
      .eq('user_id', partnerId)
      .eq('partner_id', userId)
      .single();

    if (existing2) {
      // 如果对方已创建会话，使用相同的会话ID创建反向记录
      const { error } = await supabase
        .from('conversations')
        .insert({
          id: existing2.id,  // 使用相同的会话ID
          user_id: userId,
          partner_id: partnerId,
          last_message: '',
          last_message_time: '',
          unread_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('创建会话失败:', error);
        return { success: false, error: error.message };
      }

      return { success: true, conversationId: existing2.id };
    }

    // 创建新会话
    const conversationId = crypto.randomUUID();
    const { error } = await supabase
      .from('conversations')
      .insert({
        id: conversationId,
        user_id: userId,
        partner_id: partnerId,
        last_message: '',
        last_message_time: '',
        unread_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('创建会话失败:', error);
      return { success: false, error: error.message };
    }

    return { success: true, conversationId };
  } catch (error) {
    console.error('创建会话失败:', error);
    return { success: false, error: '创建失败' };
  }
}

// 获取用户的会话列表
export async function getConversations(userId: string): Promise<Conversation[]> {
  if (isDemoMode || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('获取会话列表失败:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('获取会话列表失败:', error);
    return [];
  }
}

// 发送消息
export async function sendMessage(conversationId: string, senderId: string, receiverId: string, content: string): Promise<{ success: boolean; error?: string }> {
  if (isDemoMode || !supabase) {
    return { success: false, error: '演示模式不支持此操作' };
  }

  try {
    const timestamp = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

    // 插入消息
    const { error: msgError } = await supabase
      .from('messages')
      .insert({
        id: crypto.randomUUID(),
        conversation_id: conversationId,
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        timestamp,
        read: false,
        created_at: new Date().toISOString()
      });

    if (msgError) {
      console.error('发送消息失败:', msgError);
      return { success: false, error: msgError.message };
    }

    // 更新会话的最后消息
    const { error: convError } = await supabase
      .from('conversations')
      .update({
        last_message: content,
        last_message_time: timestamp,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId);

    if (convError) {
      console.error('更新会话失败:', convError);
    }

    return { success: true };
  } catch (error) {
    console.error('发送消息失败:', error);
    return { success: false, error: '发送失败' };
  }
}

// 获取会话消息（支持多个会话ID）
export async function getMessages(conversationId: string, userId?: string, partnerId?: string): Promise<Message[]> {
  if (isDemoMode || !supabase) {
    return [];
  }

  try {
    // 如果提供了用户ID和搭子ID，查询双方之间的所有消息
    if (userId && partnerId) {
      console.log(`[消息查询] 用户ID: ${userId}, 搭子ID: ${partnerId}`);
      
      // 查询所有涉及这两个用户的消息
      const { data: allMessages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('获取消息失败:', error);
        return [];
      }

      // 过滤出双方之间的消息
      const filteredMessages = (allMessages || []).filter(msg => 
        (msg.sender_id === userId && msg.receiver_id === partnerId) ||
        (msg.sender_id === partnerId && msg.receiver_id === userId)
      );

      console.log(`[消息查询] 找到 ${filteredMessages.length} 条双方消息`);
      return filteredMessages;
    }

    // 否则按会话ID查询
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('获取消息失败:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('获取消息失败:', error);
    return [];
  }
}

// 获取已接受的搭子关系
export async function getAcceptedPartners(userId: string): Promise<PartnerProfile[]> {
  if (isDemoMode || !supabase) {
    return [];
  }

  try {
    // 获取用户已接受的申请（作为接收方）
    const { data: receivedRequests } = await supabase
      .from('partner_requests')
      .select('from_id')
      .eq('to_id', userId)
      .eq('status', 'accepted');

    // 获取用户已接受的申请（作为发送方）
    const { data: sentRequests } = await supabase
      .from('partner_requests')
      .select('to_id')
      .eq('from_id', userId)
      .eq('status', 'accepted');

    const partnerIds = [
      ...(receivedRequests?.map(r => r.from_id) || []),
      ...(sentRequests?.map(r => r.to_id) || [])
    ];

    if (partnerIds.length === 0) {
      return [];
    }

    // 获取搭子资料
    const { data, error } = await supabase
      .from('partner_profiles')
      .select('*')
      .in('user_id', partnerIds);

    if (error) {
      console.error('获取已接受搭子失败:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('获取已接受搭子失败:', error);
    return [];
  }
}

// 获取真实用户列表（用于发现搭子）
export async function getRealUsers(currentUserId?: string): Promise<PartnerProfile[]> {
  if (isDemoMode || !supabase) {
    console.log('演示模式或Supabase未初始化');
    return [];
  }

  try {
    console.log('开始查询partner_profiles表...');
    let query = supabase
      .from('partner_profiles')
      .select('*')
      .order('rating', { ascending: false });

    if (currentUserId) {
      query = query.neq('user_id', currentUserId);
      console.log('排除当前用户:', currentUserId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('获取真实用户失败:', error);
      console.error('错误详情:', JSON.stringify(error));
      return [];
    }

    console.log('成功获取用户数据:', data?.length || 0, '条');
    return data || [];
  } catch (error) {
    console.error('获取真实用户异常:', error);
    return [];
  }
}
