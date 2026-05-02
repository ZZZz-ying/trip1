import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Search,
  Heart,
  MapPin,
  Calendar,
  UserPlus,
  Check,
  X,
  MessageSquare,
  Star,
  Filter,
  UserCheck,
  Clock,
  Map,
  Coffee,
  Camera,
  Music,
  BookOpen,
  TreePine,
  Utensils,
  Send,
  BadgeCheck,
  Lock,
  LogIn,
  AlertCircle,
  Database,
  RefreshCw,
  UserCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isDemoMode, supabase } from '../lib/supabase';
import {
  getRealUsers,
  getUserProfile,
  upsertUserProfile,
  sendPartnerRequest as dbSendRequest,
  getReceivedRequests,
  getSentRequests,
  updateRequestStatus,
  getConversations,
  getMessages as dbGetMessages,
  sendMessage as dbSendMessage,
  getAcceptedPartners,
  createConversation,
  PartnerProfile
} from '../lib/partnerService';

// 搭子用户类型
interface TravelPartner {
  id: string;
  username: string;
  avatar: string;
  gender: 'male' | 'female' | 'secret';
  age: number;
  location: string;
  interests: string[];
  travelStyle: string[];
  destinations: string[];
  travelTime: string;
  bio: string;
  rating: number;
  completedTrips: number;
  matchScore?: number;
  online?: boolean;
  lastSeen?: string;
}

// 申请类型
interface PartnerRequest {
  id: string;
  fromId: string;
  fromName: string;
  fromAvatar: string;
  toId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: string;
}

// 消息类型
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// 会话类型
interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

// 示例数据
const mockPartners: TravelPartner[] = [
  {
    id: 'p1',
    username: '小明爱旅行',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male1',
    gender: 'male',
    age: 25,
    location: '杭州',
    interests: ['摄影', '美食', '自然'],
    travelStyle: ['自由行', '深度游'],
    destinations: ['西湖', '黄山', '张家界'],
    travelTime: '周末、节假日',
    bio: '热爱摄影，喜欢探索小众景点，希望找一个志同道合的伙伴一起旅行！',
    rating: 4.8,
    completedTrips: 15
  },
  {
    id: 'p2',
    username: '背包客小李',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female1',
    gender: 'female',
    age: 23,
    location: '上海',
    interests: ['户外', '自然', '摄影'],
    travelStyle: ['自由行', '冒险'],
    destinations: ['西藏', '新疆', '云南'],
    travelTime: '长假',
    bio: '背包旅行爱好者，喜欢徒步和露营，寻找一起冒险的伙伴！',
    rating: 4.9,
    completedTrips: 28
  },
  {
    id: 'p3',
    username: '美食探索家',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male2',
    gender: 'male',
    age: 28,
    location: '成都',
    interests: ['美食', '文化', '历史'],
    travelStyle: ['打卡游', '休闲游'],
    destinations: ['成都', '重庆', '西安'],
    travelTime: '随时',
    bio: '吃遍天下美食，寻找志同道合的美食搭子！',
    rating: 4.7,
    completedTrips: 42
  },
  {
    id: 'p4',
    username: '文艺女青年',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female2',
    gender: 'female',
    age: 24,
    location: '北京',
    interests: ['文化', '历史', '摄影'],
    travelStyle: ['深度游', '研学'],
    destinations: ['故宫', '敦煌', '西安'],
    travelTime: '周末',
    bio: '喜欢有文化底蕴的地方，希望找到喜欢人文历史的伙伴一起探索。',
    rating: 4.6,
    completedTrips: 20
  },
  {
    id: 'p5',
    username: '户外达人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=male3',
    gender: 'male',
    age: 26,
    location: '深圳',
    interests: ['户外', '冒险', '自然'],
    travelStyle: ['自由行', '冒险'],
    destinations: ['西藏', '新疆', '川西'],
    travelTime: '长假',
    bio: '专业户外玩家，擅长徒步和登山，寻找有同样爱好的伙伴！',
    rating: 4.9,
    completedTrips: 56
  },
  {
    id: 'p6',
    username: '慢生活旅行者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female3',
    gender: 'female',
    age: 27,
    location: '苏州',
    interests: ['文化', '自然', '美食'],
    travelStyle: ['休闲游', '深度游'],
    destinations: ['江南水乡', '杭州', '厦门'],
    travelTime: '随时',
    bio: '喜欢慢慢旅行，享受旅途中的每一刻，寻找志同道合的伙伴。',
    rating: 4.8,
    completedTrips: 18
  }
];

const interestOptions = ['摄影', '美食', '自然', '文化', '历史', '户外', '冒险', '艺术', '音乐', '阅读'];
const travelStyleOptions = ['自由行', '跟团游', '深度游', '打卡游', '休闲游', '冒险', '研学'];
const genderOptions = ['不限', '男', '女'];

export default function TravelPartnerPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'discover' | 'requests' | 'partners' | 'messages'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('不限');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<TravelPartner | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loginPromptMessage, setLoginPromptMessage] = useState('');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editProfile, setEditProfile] = useState({
    username: '',
    avatar: '',
    gender: 'secret',
    age: 0,
    location: '',
    interests: [] as string[],
    travelStyle: [] as string[],
    destinations: [] as string[],
    travelTime: '随时',
    bio: ''
  });

  // 真实用户数据
  const [realPartners, setRealPartners] = useState<PartnerProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUsingDatabase, setIsUsingDatabase] = useState(false);

  // 从数据库加载申请列表
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [myPartners, setMyPartners] = useState<TravelPartner[]>([]);

  // 加载申请列表
  const loadRequests = async () => {
    if (!user || !isUsingDatabase) {
      // 使用 localStorage
      const saved = localStorage.getItem('partner_requests');
      if (saved) {
        setRequests(JSON.parse(saved));
      } else {
        setRequests([{
          id: 'r1',
          fromId: 'p2',
          fromName: '背包客小李',
          fromAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=female1',
          toId: '',
          status: 'pending',
          message: '你好！我也计划去西藏，想找一个人一起做伴~',
          createdAt: '2024-03-15'
        }]);
      }
      return;
    }

    try {
      // 获取收到的申请
      const receivedRequests = await getReceivedRequests(user.id);
      // 获取发送的申请
      const sentRequests = await getSentRequests(user.id);
      
      // 转换格式
      const formattedReceived = receivedRequests.map(r => ({
        id: r.id,
        fromId: r.from_id,
        fromName: r.from_name,
        fromAvatar: r.from_avatar,
        toId: r.to_id,
        status: r.status,
        message: r.message,
        createdAt: r.created_at.split('T')[0]
      }));
      
      const formattedSent = sentRequests.map(r => ({
        id: r.id,
        fromId: r.from_id,
        fromName: r.from_name,
        fromAvatar: r.from_avatar,
        toId: r.to_id,
        status: r.status,
        message: r.message,
        createdAt: r.created_at.split('T')[0]
      }));
      
      setRequests([...formattedReceived, ...formattedSent]);
    } catch (error) {
      console.error('加载申请列表失败:', error);
    }
  };

  // 加载已接受的搭子
  const loadAcceptedPartners = async () => {
    if (!user) return;

    if (isUsingDatabase) {
      // 使用数据库
      try {
        const partners = await getAcceptedPartners(user.id);
        const formattedPartners = partners.map(p => ({
          id: p.user_id,
          username: p.username,
          avatar: p.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user_id}`,
          gender: p.gender,
          age: p.age,
          location: p.location,
          interests: p.interests || [],
          travelStyle: p.travel_style || [],
          destinations: p.destinations || [],
          travelTime: p.travel_time,
          bio: p.bio,
          rating: p.rating,
          completedTrips: p.completed_trips
        }));
        setMyPartners(formattedPartners);
      } catch (error) {
        console.error('加载已接受搭子失败:', error);
      }
    } else {
      // 使用 localStorage 和 realPartners
      const saved = localStorage.getItem('my_partners');
      let savedPartners = saved ? JSON.parse(saved) : [];
      
      // 从 realPartners 中找出已接受的搭子（通过 requests）
      const acceptedRequests = requests.filter(r => 
        r.toId === user.id && r.status === 'accepted'
      );
      
      const acceptedPartners: TravelPartner[] = acceptedRequests.map(r => {
        // 先从 savedPartners 找
        const savedPartner = savedPartners.find((p: TravelPartner) => p.id === r.fromId);
        if (savedPartner) return savedPartner;
        
        // 从 realPartners 找
        const realPartner = realPartners.find(p => p.user_id === r.fromId);
        if (realPartner) {
          return {
            id: realPartner.user_id,
            username: realPartner.username,
            avatar: realPartner.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${realPartner.user_id}`,
            gender: realPartner.gender,
            age: realPartner.age,
            location: realPartner.location,
            interests: realPartner.interests || [],
            travelStyle: realPartner.travel_style || [],
            destinations: realPartner.destinations || [],
            travelTime: realPartner.travel_time,
            bio: realPartner.bio,
            rating: realPartner.rating,
            completedTrips: realPartner.completed_trips
          };
        }
        
        // 如果都找不到，创建一个临时搭子
        return {
          id: r.fromId,
          username: r.fromName,
          avatar: r.fromAvatar,
          gender: 'secret' as const,
          age: 0,
          location: '未知',
          interests: [],
          travelStyle: [],
          destinations: [],
          travelTime: '未知',
          bio: '',
          rating: 5.0,
          completedTrips: 0
        };
      });
      
      // 合并去重
      const allPartners = [...savedPartners];
      acceptedPartners.forEach(p => {
        if (!allPartners.some(existing => existing.id === p.id)) {
          allPartners.push(p);
        }
      });
      
      setMyPartners(allPartners);
    }
  };

  // 消息状态 - 只在登录后显示
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // 从数据库加载会话列表
  const loadConversations = async () => {
    if (!user || !isUsingDatabase) {
      // 使用 localStorage
      const savedConversations = localStorage.getItem('conversations');
      setConversations(savedConversations ? JSON.parse(savedConversations) : []);
      const savedMessages = localStorage.getItem('messages');
      setMessages(savedMessages ? JSON.parse(savedMessages) : []);
      return;
    }

    try {
      const dbConversations = await getConversations(user.id);
      // 转换为前端格式
      const conversationPromises = dbConversations.map(async (conv) => {
        // 获取搭子资料
        const profile = await getUserProfile(conv.partner_id);
        return {
          id: conv.id,
          partnerId: conv.partner_id,
          partnerName: profile?.username || '未知用户',
          partnerAvatar: profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.partner_id}`,
          lastMessage: conv.last_message,
          lastMessageTime: conv.last_message_time,
          unreadCount: conv.unread_count
        };
      });
      const frontendConversations = await Promise.all(conversationPromises);
      setConversations(frontendConversations);
    } catch (error) {
      console.error('加载会话失败:', error);
    }
  };

  // 从数据库加载消息
  const loadMessages = async (conversationId: string, partnerId?: string) => {
    setIsLoadingMessages(true);
    
    if (!user || !isUsingDatabase) {
      // 使用 localStorage
      const saved = localStorage.getItem('messages');
      const allMessages = saved ? JSON.parse(saved) : [];
      setMessages(allMessages);
      setIsLoadingMessages(false);
      return;
    }

    try {
      // 传入 userId 和 partnerId 以支持跨会话ID查询
      const dbMessages = await dbGetMessages(conversationId, user.id, partnerId);
      // 转换为前端格式
      const frontendMessages = dbMessages.map(msg => ({
        id: msg.id,
        conversationId: msg.conversation_id,
        senderId: msg.sender_id,
        receiverId: msg.receiver_id,
        content: msg.content,
        timestamp: msg.timestamp,
        read: msg.read
      }));
      setMessages(frontendMessages);
    } catch (error) {
      console.error('加载消息失败:', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // 切换到消息标签时加载会话
  useEffect(() => {
    if (activeTab === 'messages' && user) {
      loadConversations();
    }
  }, [activeTab, user, isUsingDatabase]);

  // 初始化用户资料（如果不存在）
  const initializeUserProfile = async (userId: string, username: string, avatar?: string) => {
    if (isDemoMode || !supabase) return;
    
    try {
      const { data: existingProfile } = await supabase
        .from('partner_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (!existingProfile) {
        const { error } = await supabase
          .from('partner_profiles')
          .upsert({
            user_id: userId,
            username: username,
            avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
            gender: 'secret',
            age: 0,
            location: '未知',
            interests: [],
            travel_style: [],
            destinations: [],
            travel_time: '随时',
            bio: '这是我新的搭子介绍',
            rating: 5.0,
            completed_trips: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (error) {
          console.error('初始化用户资料失败:', error);
        } else {
          console.log('已为用户创建搭子资料:', username);
        }
      }
    } catch (error) {
      console.error('初始化用户资料异常:', error);
    }
  };

  // 加载真实用户数据
  const loadRealUsers = async () => {
    if (isDemoMode) {
      setIsUsingDatabase(false);
      setRealPartners([]);
      return;
    }

    setLoading(true);
    try {
      console.log('=== 开始加载真实用户 ===');
      console.log('当前登录用户:', user ? user.id : '未登录');
      console.log('Supabase实例:', supabase ? '已初始化' : '未初始化');
      console.log('演示模式:', isDemoMode);
      
      // 如果用户已登录，先确保其有 profile
      if (user) {
        console.log('用户已登录，开始初始化profile...');
        await initializeUserProfile(user.id, user.username, user.avatar);
        console.log('profile初始化完成');
      }
      
      console.log('调用getRealUsers，排除用户:', user?.id);
      const users = await getRealUsers(user?.id);
      console.log('数据库返回用户数量:', users.length);
      console.log('返回的用户列表:', JSON.stringify(users, null, 2));
      setRealPartners(users);
      
      // 只有当数据库返回数据时才使用数据库模式
      if (users.length > 0) {
        setIsUsingDatabase(true);
        console.log('使用数据库模式，共', users.length, '个用户');
      } else {
        // 数据库为空，不显示任何用户
        setIsUsingDatabase(false);
        console.log('数据库为空，不显示任何用户');
      }
    } catch (error) {
      console.error('加载真实用户失败:', error);
      console.error('错误详情:', JSON.stringify(error));
      setIsUsingDatabase(false);
      setRealPartners([]);
      console.log('连接失败，不显示任何用户');
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时获取真实用户和申请列表
  useEffect(() => {
    loadRealUsers();
    if (user) {
      loadRequests();
      loadAcceptedPartners();
    }

    // 定时刷新用户列表（每30秒）
    const interval = setInterval(() => {
      if (isUsingDatabase) {
        loadRealUsers();
        if (user) {
          loadAcceptedPartners();
        }
      }
    }, 30000); // 每30秒刷新一次

    return () => clearInterval(interval);
  }, [user, isUsingDatabase]);

  // 切换到申请标签时重新加载
  useEffect(() => {
    if (activeTab === 'requests' && user) {
      loadRequests();
    }
    if (activeTab === 'partners' && user) {
      loadAcceptedPartners();
    }
  }, [activeTab, user, isUsingDatabase]);

  // 保存到 localStorage
  useEffect(() => {
    if (user && !isUsingDatabase) {
      localStorage.setItem('partner_requests', JSON.stringify(requests));
      localStorage.setItem('my_partners', JSON.stringify(myPartners));
      localStorage.setItem('conversations', JSON.stringify(conversations));
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [requests, myPartners, conversations, messages, user, isUsingDatabase]);

  // 模拟收到搭子的回复
  useEffect(() => {
    if (!user || isUsingDatabase) return;

    const checkForResponses = () => {
      // 检查是否有已接受的请求超过10秒
      const hasAcceptedRequest = requests.some(r =>
        r.status === 'accepted' &&
        r.fromId !== user.id &&
        !conversations.some(c => c.partnerId === r.fromId)
      );

      if (hasAcceptedRequest) {
        // 模拟搭子发来消息
        const acceptedRequest = requests.find(r =>
          r.status === 'accepted' &&
          r.fromId !== user.id &&
          !conversations.some(c => c.partnerId === r.fromId)
        );

        if (acceptedRequest) {
          // 从 realPartners 查找搭子信息
          const realPartner = realPartners.find(p => p.user_id === acceptedRequest.fromId);
          let partner: TravelPartner | null = null;
          
          if (realPartner) {
            partner = {
              id: realPartner.user_id,
              username: realPartner.username,
              avatar: realPartner.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${realPartner.user_id}`,
              gender: realPartner.gender,
              age: realPartner.age,
              location: realPartner.location,
              interests: realPartner.interests || [],
              travelStyle: realPartner.travel_style || [],
              destinations: realPartner.destinations || [],
              travelTime: realPartner.travel_time,
              bio: realPartner.bio,
              rating: realPartner.rating,
              completedTrips: realPartner.completed_trips
            };
          } else if (acceptedRequest.fromId) {
            // 如果找不到，使用申请信息创建临时搭子
            partner = {
              id: acceptedRequest.fromId,
              username: acceptedRequest.fromName,
              avatar: acceptedRequest.fromAvatar,
              gender: 'secret' as const,
              age: 0,
              location: '未知',
              interests: [],
              travelStyle: [],
              destinations: [],
              travelTime: '未知',
              bio: '',
              rating: 5.0,
              completedTrips: 0
            };
          }
          
          if (partner) {
            // 创建会话
            const newConversation: Conversation = {
              id: `c${Date.now()}`,
              partnerId: partner.id,
              partnerName: partner.username,
              partnerAvatar: partner.avatar,
              lastMessage: '很高兴成为搭子！我们可以开始聊天了~',
              lastMessageTime: '刚刚',
              unreadCount: 1
            };
            setConversations(prev => [...prev, newConversation]);

            // 添加消息
            const newMsg: Message = {
              id: `m${Date.now()}`,
              conversationId: newConversation.id,
              senderId: partner.id,
              receiverId: user.id,
              content: '很高兴成为搭子！我们可以开始聊天了~',
              timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
              read: false
            };
            setMessages(prev => [...prev, newMsg]);
          }
        }
      }
    };

    const interval = setInterval(checkForResponses, 5000);
    return () => clearInterval(interval);
  }, [user, requests, conversations, mockPartners]);

  // 检查是否需要登录
  const requireAuth = (action: string) => {
    if (!user) {
      setLoginPromptMessage(action);
      setShowLoginPrompt(true);
      return false;
    }
    return true;
  };

  // 跳转到登录
  const goToLogin = () => {
    setShowLoginPrompt(false);
    navigate('/auth');
  };

  // 打开编辑资料弹窗
  const openEditProfile = () => {
    if (!user) {
      requireAuth('编辑个人资料');
      return;
    }
    // 从 realPartners 或 localStorage 获取当前用户的资料
    const currentUserProfile = realPartners.find(p => p.user_id === user.id);
    if (currentUserProfile) {
      setEditProfile({
        username: currentUserProfile.username,
        avatar: currentUserProfile.avatar || '',
        gender: currentUserProfile.gender,
        age: currentUserProfile.age,
        location: currentUserProfile.location,
        interests: currentUserProfile.interests || [],
        travelStyle: currentUserProfile.travel_style || [],
        destinations: currentUserProfile.destinations || [],
        travelTime: currentUserProfile.travel_time || '随时',
        bio: currentUserProfile.bio || ''
      });
    } else {
      // 使用默认值
      setEditProfile({
        username: user.username,
        avatar: user.avatar || '',
        gender: 'secret',
        age: 0,
        location: '',
        interests: [],
        travelStyle: [],
        destinations: [],
        travelTime: '随时',
        bio: ''
      });
    }
    setShowEditProfile(true);
  };

  // 保存编辑的资料
  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      if (isUsingDatabase && supabase) {
        // 保存到数据库
        const { error } = await supabase
          .from('partner_profiles')
          .upsert({
            user_id: user.id,
            username: editProfile.username,
            avatar: editProfile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
            gender: editProfile.gender,
            age: editProfile.age,
            location: editProfile.location,
            interests: editProfile.interests,
            travel_style: editProfile.travelStyle,
            destinations: editProfile.destinations,
            travel_time: editProfile.travelTime,
            bio: editProfile.bio,
            updated_at: new Date().toISOString()
          });
        
        if (error) {
          console.error('保存资料失败:', error);
          alert('保存失败，请重试');
        } else {
          alert('资料已保存！');
          setShowEditProfile(false);
          // 重新加载用户列表
          loadRealUsers();
        }
      } else {
        // 保存到 localStorage
        localStorage.setItem(`user_profile_${user.id}`, JSON.stringify(editProfile));
        alert('资料已保存！');
        setShowEditProfile(false);
      }
    } catch (error) {
      console.error('保存资料异常:', error);
      alert('保存失败，请重试');
    }
  };

  // 计算匹配度
  const calculateMatchScore = (partner: TravelPartner, userInterests: string[]) => {
    const interestMatch = partner.interests.filter(i => userInterests.includes(i)).length;
    const styleMatch = partner.travelStyle.length > 0 ? 1 : 0;
    return Math.min(100, Math.round((interestMatch * 20) + (styleMatch * 20) + 30));
  };

  // 过滤和排序后的搭子列表
  const filteredPartners = useMemo(() => {
    let allPartners: TravelPartner[] = [];

    // 只显示真实用户数据（从数据库加载的）
    if (realPartners.length > 0) {
      // 转换真实用户格式
      allPartners = realPartners.map(p => ({
        id: p.user_id,
        username: p.username,
        avatar: p.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user_id}`,
        gender: p.gender,
        age: p.age,
        location: p.location,
        interests: p.interests || [],
        travelStyle: p.travel_style || [],
        destinations: p.destinations || [],
        travelTime: p.travel_time,
        bio: p.bio,
        rating: p.rating,
        completedTrips: p.completed_trips
      }));
      console.log('使用真实用户数据，数量:', allPartners.length);
    } else {
      // 数据库没有数据，不显示任何用户
      console.log('数据库为空，不显示模拟用户');
      allPartners = [];
    }

    let result = [...allPartners];

    // 排除当前登录用户自己
    if (user) {
      result = result.filter(p => p.id !== user.id);
    }

    // 排除已经成为搭子的用户
    const partnerIds = myPartners.map(p => p.id);
    result = result.filter(p => !partnerIds.includes(p.id));

    // 搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.username.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.destinations.some(d => d.toLowerCase().includes(query)) ||
        p.bio.toLowerCase().includes(query)
      );
    }

    // 兴趣过滤
    if (selectedInterests.length > 0) {
      result = result.filter(p =>
        selectedInterests.some(interest => p.interests.includes(interest))
      );
    }

    // 旅行风格过滤
    if (selectedStyle.length > 0) {
      result = result.filter(p =>
        selectedStyle.some(style => p.travelStyle.includes(style))
      );
    }

    // 性别过滤
    if (selectedGender !== '不限') {
      result = result.filter(p =>
        (selectedGender === '男' && p.gender === 'male') ||
        (selectedGender === '女' && p.gender === 'female')
      );
    }

    // 计算匹配度并排序
    const userInterests = user ? JSON.parse(localStorage.getItem(`user_interests_${user.id}`) || '[]') : [];
    result = result.map(p => ({
      ...p,
      matchScore: calculateMatchScore(p, userInterests)
    }));

    // 按匹配度排序
    result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    return result;
  }, [searchQuery, selectedInterests, selectedStyle, selectedGender, user]);

  // 发送申请
  const handleSendRequest = async () => {
    if (!user) {
      setShowRequestModal(false);
      requireAuth('发送结伴申请');
      return;
    }
    if (!selectedPartner || !requestMessage.trim()) return;

    const newRequest: PartnerRequest = {
      id: `r${Date.now()}`,
      fromId: user.id,
      fromName: user.username,
      fromAvatar: user.avatar,
      toId: selectedPartner.id,
      status: 'pending',
      message: requestMessage,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (isUsingDatabase) {
      // 使用数据库
      const result = await dbSendRequest({
        from_id: user.id,
        from_name: user.username,
        from_avatar: user.avatar,
        to_id: selectedPartner.id,
        status: 'pending',
        message: requestMessage
      });
      
      if (result.success) {
        setRequests(prev => [...prev, newRequest]);
        alert('申请已发送！对方同意后即可成为搭子~');
      } else {
        alert('发送申请失败: ' + result.error);
      }
    } else {
      // 使用 localStorage
      setRequests(prev => [...prev, newRequest]);
      alert('申请已发送！对方同意后即可成为搭子~');
    }

    setShowRequestModal(false);
    setRequestMessage('');
    setSelectedPartner(null);
  };

  // 接受申请
  const handleAccept = async (requestId: string) => {
    if (!user) return;
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    if (isUsingDatabase) {
      // 使用数据库
      const result = await updateRequestStatus(requestId, 'accepted');
      
      if (result.success) {
        // 更新本地状态
        setRequests(prev => prev.map(r =>
          r.id === requestId ? { ...r, status: 'accepted' as const } : r
        ));
        
        // 重新加载搭子列表
        await loadAcceptedPartners();
        await loadRequests();
        
        alert('已接受申请！现在可以开始聊天了~');
      } else {
        alert('接受申请失败: ' + result.error);
      }
    } else {
      // 使用 localStorage/模拟数据
      // 从 realPartners 查找
      const realPartner = realPartners.find(p => p.user_id === request.fromId);
      let partner: TravelPartner | undefined;
      
      if (realPartner) {
        partner = {
          id: realPartner.user_id,
          username: realPartner.username,
          avatar: realPartner.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${realPartner.user_id}`,
          gender: realPartner.gender,
          age: realPartner.age,
          location: realPartner.location,
          interests: realPartner.interests || [],
          travelStyle: realPartner.travel_style || [],
          destinations: realPartner.destinations || [],
          travelTime: realPartner.travel_time,
          bio: realPartner.bio,
          rating: realPartner.rating,
          completedTrips: realPartner.completed_trips
        };
      } else {
        // 如果找不到，使用申请信息创建临时搭子
        partner = {
          id: request.fromId,
          username: request.fromName,
          avatar: request.fromAvatar,
          gender: 'secret' as const,
          age: 0,
          location: '未知',
          interests: [],
          travelStyle: [],
          destinations: [],
          travelTime: '未知',
          bio: '',
          rating: 5.0,
          completedTrips: 0
        };
      }

      if (partner) {
        setMyPartners(prev => {
          if (prev.some(p => p.id === partner!.id)) {
            return prev;
          }
          return [...prev, partner];
        });
      }

      setRequests(prev => prev.map(r =>
        r.id === requestId ? { ...r, status: 'accepted' as const } : r
      ));
      
      alert('已接受申请！现在可以开始聊天了~');
    }
  };

  // 拒绝申请
  const handleReject = async (requestId: string) => {
    if (!user) return;

    if (isUsingDatabase) {
      // 使用数据库
      const result = await updateRequestStatus(requestId, 'rejected');
      
      if (result.success) {
        setRequests(prev => prev.map(r =>
          r.id === requestId ? { ...r, status: 'rejected' as const } : r
        ));
        await loadRequests();
      } else {
        alert('拒绝申请失败: ' + result.error);
      }
    } else {
      // 使用 localStorage
      setRequests(prev => prev.map(r =>
        r.id === requestId ? { ...r, status: 'rejected' as const } : r
      ));
    }
  };

  // 打开聊天
  const handleOpenChat = async (partner: TravelPartner) => {
    if (!user) {
      requireAuth('与搭子聊天');
      return;
    }

    // 检查是否已存在会话
    let conversation = conversations.find(c => c.partnerId === partner.id);

    if (!conversation) {
      if (isUsingDatabase) {
        // 在数据库中创建会话
        try {
          const result = await createConversation(user.id, partner.id);
          if (result.success && result.conversationId) {
            // 使用真实的会话 ID
            conversation = {
              id: result.conversationId,
              partnerId: partner.id,
              partnerName: partner.username,
              partnerAvatar: partner.avatar,
              lastMessage: '',
              lastMessageTime: '',
              unreadCount: 0
            };
            setConversations(prev => [...prev, conversation]);
          } else {
            console.error('创建会话失败:', result.error);
            throw new Error(result.error || '创建会话失败');
          }
        } catch (error) {
          console.error('创建会话失败:', error);
          // 使用本地会话
          conversation = {
            id: `c${Date.now()}`,
            partnerId: partner.id,
            partnerName: partner.username,
            partnerAvatar: partner.avatar,
            lastMessage: '',
            lastMessageTime: '',
            unreadCount: 0
          };
          setConversations(prev => [...prev, conversation]);
        }
      } else {
        // 使用本地会话
        conversation = {
          id: `c${Date.now()}`,
          partnerId: partner.id,
          partnerName: partner.username,
          partnerAvatar: partner.avatar,
          lastMessage: '',
          lastMessageTime: '',
          unreadCount: 0
        };
        setConversations(prev => [...prev, conversation]);
      }
    }

    // 先加载消息（在显示窗口之前）
    if (conversation && isUsingDatabase) {
      await loadMessages(conversation.id, conversation.partnerId);
    }

    setActiveConversation(conversation);
    setShowChat(true);
    setActiveTab('messages');
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!user) {
      requireAuth('发送消息');
      return;
    }
    if (!newMessage.trim() || !activeConversation) return;

    const timestamp = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const message: Message = {
      id: `m${Date.now()}`,
      conversationId: activeConversation.id,
      senderId: user.id,
      receiverId: activeConversation.partnerId,
      content: newMessage,
      timestamp: timestamp,
      read: true
    };

    // 更新本地状态
    setMessages(prev => [...prev, message]);

    // 更新会话
    setConversations(prev => prev.map(c =>
      c.id === activeConversation.id
        ? { ...c, lastMessage: newMessage, lastMessageTime: '刚刚' }
        : c
    ));

    // 更新活跃会话
    setActiveConversation(prev => prev ? {
      ...prev,
      lastMessage: newMessage,
      lastMessageTime: '刚刚'
    } : null);

    // 如果使用数据库，保存到数据库
    if (isUsingDatabase) {
      try {
        console.log(`[消息调试] 发送消息 - 会话ID: ${activeConversation.id}, 发送者: ${user.id}, 接收者: ${activeConversation.partnerId}`);
        await dbSendMessage(activeConversation.id, user.id, activeConversation.partnerId, newMessage);
        console.log('[消息调试] 消息发送成功');
      } catch (error) {
        console.error('发送消息到数据库失败:', error);
      }
    } else {
      // 演示模式：模拟搭子回复
      setTimeout(() => {
        simulatePartnerReply(activeConversation.id, activeConversation.partnerId);
      }, 2000);
    }

    setNewMessage('');
  };

  // 模拟搭子回复
  const simulatePartnerReply = (conversationId: string, partnerId: string) => {
    // 从 realPartners 查找搭子信息
    const realPartner = realPartners.find(p => p.user_id === partnerId);
    if (!realPartner) return;

    const replies = [
      '好的，记住了！我很期待这次旅行~',
      '这个主意不错！我查查具体怎么安排。',
      '哈哈，太期待了！我们什么时候出发？',
      '收到！我会提前准备好需要的物品。',
      '听起来很棒！有哪些必去的景点推荐吗？'
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    const replyMsg: Message = {
      id: `m${Date.now()}`,
      conversationId,
      senderId: partnerId,
      receiverId: user?.id,
      content: randomReply,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages(prev => [...prev, replyMsg]);
    setConversations(prev => prev.map(c =>
      c.id === conversationId
        ? { ...c, lastMessage: randomReply, lastMessageTime: '刚刚', unreadCount: c.unreadCount + 1 }
        : c
    ));
  };

  // 处理按 Enter 发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 获取当前会话的所有消息（根据双方用户ID过滤）
  const getConversationMessages = (conversationId: string) => {
    if (!activeConversation || !user) return [];
    
    // 过滤出双方之间的消息（不依赖会话ID）
    return messages.filter(m => 
      (m.senderId === user.id && m.receiverId === activeConversation.partnerId) ||
      (m.senderId === activeConversation.partnerId && m.receiverId === user.id)
    );
  };

  // 关闭聊天
  const handleCloseChat = () => {
    setShowChat(false);
    setActiveConversation(null);
  };

  // 定时刷新消息
  useEffect(() => {
    if (!showChat || !activeConversation || !isUsingDatabase) return;

    const interval = setInterval(async () => {
      try {
        console.log(`[消息刷新] 会话ID: ${activeConversation.id}`);
        const dbMessages = await dbGetMessages(activeConversation.id, user?.id, activeConversation.partnerId);
        console.log(`[消息刷新] 数据库返回 ${dbMessages.length} 条消息`);
        
        const frontendMessages = dbMessages.map(msg => ({
          id: msg.id,
          conversationId: msg.conversation_id,
          senderId: msg.sender_id,
          receiverId: msg.receiver_id,
          content: msg.content,
          timestamp: msg.timestamp,
          read: msg.read
        }));
        
        console.log(`[消息刷新] 当前用户ID: ${user?.id}`);
        frontendMessages.forEach((msg, index) => {
          console.log(`[消息 ${index}] 发送者: ${msg.senderId}, 内容: ${msg.content}`);
        });
        
        setMessages(frontendMessages);
      } catch (error) {
        console.error('刷新消息失败:', error);
      }
    }, 3000); // 每3秒刷新一次

    return () => clearInterval(interval);
  }, [showChat, activeConversation, isUsingDatabase]);

  // 获取兴趣图标
  const getInterestIcon = (interest: string) => {
    switch (interest) {
      case '摄影': return <Camera className="w-4 h-4" />;
      case '美食': return <Utensils className="w-4 h-4" />;
      case '自然': return <TreePine className="w-4 h-4" />;
      case '文化': return <BookOpen className="w-4 h-4" />;
      case '历史': return <Calendar className="w-4 h-4" />;
      case '音乐': return <Music className="w-4 h-4" />;
      case '户外': return <Map className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  // 获取性别标签
  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'male': return '男';
      case 'female': return '女';
      default: return '保密';
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">旅游搭子</h1>
            <p className="text-purple-100">找到志同道合的旅行伙伴，一起探索世界的美好</p>
          </div>
          <button
            onClick={openEditProfile}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <UserCircle className="w-5 h-5" />
            <span>编辑资料</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'discover'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>发现搭子</span>
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors relative ${
              activeTab === 'requests'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <UserPlus className="w-5 h-5" />
            <span>申请列表</span>
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'partners'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span>我的搭子</span>
            {myPartners.length > 0 && (
              <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {myPartners.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors relative ${
              activeTab === 'messages'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>消息</span>
            {conversations.reduce((acc, c) => acc + c.unreadCount, 0) > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {conversations.reduce((acc, c) => acc + c.unreadCount, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'discover' && (
        <>
          {/* Search and Filter */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索目的地、兴趣或用户名..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  showFilter ? 'bg-purple-100 border-purple-300 text-purple-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>筛选</span>
              </button>
            </div>

            {/* Filter Panel */}
            {showFilter && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">筛选条件</label>
                  <button
                    onClick={() => {
                      setSelectedGender('不限');
                      setSelectedInterests([]);
                      setSelectedStyle([]);
                      setSearchQuery('');
                    }}
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    重置
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
                  <div className="flex space-x-2">
                    {genderOptions.map(g => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`px-4 py-1.5 rounded-full text-sm ${
                          selectedGender === g
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">兴趣爱好</label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map(interest => (
                      <button
                        key={interest}
                        onClick={() => {
                          setSelectedInterests(prev =>
                            prev.includes(interest)
                              ? prev.filter(i => i !== interest)
                              : [...prev, interest]
                          );
                        }}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm ${
                          selectedInterests.includes(interest)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {getInterestIcon(interest)}
                        <span>{interest}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">旅行风格</label>
                  <div className="flex flex-wrap gap-2">
                    {travelStyleOptions.map(style => (
                      <button
                        key={style}
                        onClick={() => {
                          setSelectedStyle(prev =>
                            prev.includes(style)
                              ? prev.filter(s => s !== style)
                              : [...prev, style]
                          );
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedStyle.includes(style)
                            ? 'bg-pink-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Partner List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map(partner => (
              <div key={partner.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                {/* Card Header */}
                <div className="relative p-4 bg-gradient-to-r from-purple-500 to-pink-500">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={partner.avatar}
                        alt={partner.username}
                        className="w-16 h-16 rounded-full border-3 border-white"
                      />
                      {partner.rating >= 4.8 && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <BadgeCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-white">
                      <h3 className="font-bold text-lg">{partner.username}</h3>
                      <div className="flex items-center text-sm text-white/80">
                        <MapPin className="w-4 h-4 mr-1" />
                        {partner.location}
                        <span className="mx-2">|</span>
                        {partner.age}岁 {getGenderLabel(partner.gender)}
                      </div>
                    </div>
                    {partner.matchScore && (
                      <div className="bg-white rounded-lg px-3 py-1 text-center">
                        <div className="text-2xl font-bold text-purple-600">{partner.matchScore}%</div>
                        <div className="text-xs text-gray-500">匹配度</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-4">
                  {/* Interests */}
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {partner.interests.map(interest => (
                        <span key={interest} className="inline-flex items-center space-x-1 px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs">
                          {getInterestIcon(interest)}
                          <span>{interest}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Destinations */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1">想去的地方</div>
                    <div className="text-sm text-gray-700">{partner.destinations.join('、')}</div>
                  </div>

                  {/* Travel Style */}
                  <div className="flex flex-wrap gap-2">
                    {partner.travelStyle.map(style => (
                      <span key={style} className="px-2 py-0.5 bg-pink-50 text-pink-600 rounded text-xs">
                        {style}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {partner.rating}
                      </span>
                      <span className="flex items-center">
                        <Map className="w-4 h-4 mr-1 text-blue-500" />
                        {partner.completedTrips}次旅行
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 line-clamp-2">{partner.bio}</p>

                  {/* Action */}
                  <button
                    onClick={() => {
                      if (!requireAuth('申请结伴')) return;
                      setSelectedPartner(partner);
                      setShowRequestModal(true);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>申请结伴</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">没有找到符合条件的搭子</p>
              <p className="text-sm text-gray-400 mt-2">试试调整筛选条件</p>
            </div>
          )}
        </>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">收到的申请</h2>

          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={request.fromAvatar}
                      alt={request.fromName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{request.fromName}</h3>
                        <span className="text-xs text-gray-400">{request.createdAt}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{request.message}</p>
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="flex-1 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 flex items-center justify-center space-x-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>接受</span>
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="flex-1 py-2 bg-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>拒绝</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无待处理的申请</p>
            </div>
          )}

          {/* Past Requests */}
          {requests.filter(r => r.status !== 'pending').length > 0 && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mt-8">历史记录</h2>
              <div className="space-y-3">
                {requests.filter(r => r.status !== 'pending').map(request => (
                  <div key={request.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={request.fromAvatar}
                          alt={request.fromName}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium text-gray-700">{request.fromName}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {request.status === 'accepted' ? '已接受' : '已拒绝'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'partners' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">我的旅游搭子</h2>

          {myPartners.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myPartners.map(partner => (
                <div key={partner.id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={partner.avatar}
                      alt={partner.username}
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{partner.username}</h3>
                      <p className="text-sm text-gray-500">{partner.location}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {partner.interests.slice(0, 3).map(interest => (
                      <span key={interest} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleOpenChat(partner)}
                    className="w-full mt-3 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 flex items-center justify-center space-x-1"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>发消息</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">还没有旅游搭子</p>
              <p className="text-sm text-gray-400 mt-2">去发现页找找志同道合的伙伴吧</p>
            </div>
          )}
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex h-[600px]">
            {/* Conversation List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">消息列表</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length > 0 ? (
                  conversations.map(conv => (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setActiveConversation(conv);
                        setShowChat(true);
                      }}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        activeConversation?.id === conv.id ? 'bg-purple-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={conv.partnerAvatar}
                            alt={conv.partnerName}
                            className="w-12 h-12 rounded-full"
                          />
                          {conv.unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                              {conv.unreadCount}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">{conv.partnerName}</h3>
                            <span className="text-xs text-gray-400">{conv.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conv.lastMessage || '暂无消息'}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>暂无会话</p>
                    <p className="text-sm text-gray-400 mt-1">成为搭子后即可开始聊天</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            {showChat && activeConversation ? (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={activeConversation.partnerAvatar}
                      alt={activeConversation.partnerName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{activeConversation.partnerName}</h3>
                      <p className="text-xs text-green-500 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        在线
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseChat}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {isLoadingMessages ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>加载消息中...</span>
                      </div>
                    </div>
                  ) : getConversationMessages(activeConversation.id).length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-400">
                      <p>还没有消息，开始聊天吧~</p>
                    </div>
                  ) : (
                    getConversationMessages(activeConversation.id).map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === (user?.id || 'current_user') ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs ${msg.senderId === (user?.id || 'current_user') ? 'order-1' : ''}`}>
                        <div className={`px-4 py-2 rounded-2xl ${
                          msg.senderId === (user?.id || 'current_user')
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className={`text-xs text-gray-400 mt-1 ${msg.senderId === (user?.id || 'current_user') ? 'text-right' : ''}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  )))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="输入消息..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">按 Enter 发送，Shift + Enter 换行</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">选择一个会话开始聊天</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showRequestModal && selectedPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={selectedPartner.avatar}
                alt={selectedPartner.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{selectedPartner.username}</h3>
                <p className="text-sm text-gray-500">{selectedPartner.location}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                想对 {selectedPartner.username} 说些什么？
              </label>
              <textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="介绍一下自己，说明为什么想和他/她结伴旅行..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedPartner(null);
                  setRequestMessage('');
                }}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                取消
              </button>
              <button
                onClick={handleSendRequest}
                disabled={!requestMessage.trim()}
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center space-x-1"
              >
                <Send className="w-4 h-4" />
                <span>发送申请</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">请先登录</h3>
            <p className="text-gray-500 mb-4">
              {loginPromptMessage}需要先登录账号，请前往登录页面。
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                取消
              </button>
              <button
                onClick={goToLogin}
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 flex items-center justify-center space-x-1"
              >
                <LogIn className="w-4 h-4" />
                <span>去登录</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">编辑个人资料</h3>
              <button
                onClick={() => setShowEditProfile(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* 用户名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input
                  type="text"
                  value={editProfile.username}
                  onChange={(e) => setEditProfile({ ...editProfile, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 头像 URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">头像 URL</label>
                <input
                  type="text"
                  value={editProfile.avatar}
                  onChange={(e) => setEditProfile({ ...editProfile, avatar: e.target.value })}
                  placeholder="输入头像图片链接（可选）"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 性别 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
                <select
                  value={editProfile.gender}
                  onChange={(e) => setEditProfile({ ...editProfile, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="secret">保密</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>

              {/* 年龄 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
                <input
                  type="number"
                  value={editProfile.age || ''}
                  onChange={(e) => setEditProfile({ ...editProfile, age: parseInt(e.target.value) || 0 })}
                  placeholder="输入年龄"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 位置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">位置</label>
                <input
                  type="text"
                  value={editProfile.location}
                  onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                  placeholder="如：北京、上海、成都"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 旅行时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">旅行时间</label>
                <select
                  value={editProfile.travelTime}
                  onChange={(e) => setEditProfile({ ...editProfile, travelTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="随时">随时</option>
                  <option value="周末">周末</option>
                  <option value="长假">长假</option>
                </select>
              </div>

              {/* 兴趣标签 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">兴趣标签（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(interest => (
                    <button
                      key={interest}
                      onClick={() => {
                        const newInterests = editProfile.interests.includes(interest)
                          ? editProfile.interests.filter(i => i !== interest)
                          : [...editProfile.interests, interest];
                        setEditProfile({ ...editProfile, interests: newInterests });
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        editProfile.interests.includes(interest)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* 旅行风格 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">旅行风格（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {travelStyleOptions.map(style => (
                    <button
                      key={style}
                      onClick={() => {
                        const newStyles = editProfile.travelStyle.includes(style)
                          ? editProfile.travelStyle.filter(s => s !== style)
                          : [...editProfile.travelStyle, style];
                        setEditProfile({ ...editProfile, travelStyle: newStyles });
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        editProfile.travelStyle.includes(style)
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* 想去的地方 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">想去的地方</label>
                <input
                  type="text"
                  value={editProfile.destinations.join('、')}
                  onChange={(e) => setEditProfile({ ...editProfile, destinations: e.target.value.split('、').filter(d => d.trim()) })}
                  placeholder="多个地方用顿号分隔，如：西藏、新疆、云南"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 个人简介 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
                <textarea
                  value={editProfile.bio}
                  onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                  placeholder="介绍一下自己..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* 保存按钮 */}
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={!editProfile.username.trim()}
                  className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                >
                  保存资料
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Not Logged In Banner */}
      {!user && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800">您当前未登录，部分功能受限</span>
          </div>
          <button
            onClick={goToLogin}
            className="px-4 py-1.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 flex items-center space-x-1"
          >
            <LogIn className="w-4 h-4" />
            <span>登录</span>
          </button>
        </div>
      )}
    </div>
  );
}
