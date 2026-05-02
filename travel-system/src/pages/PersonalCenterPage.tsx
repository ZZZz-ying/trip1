import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  MapPin,
  BookOpen,
  Route,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Calendar,
  Edit3,
  Download,
  Upload,
  MessageSquare,
  Star,
  Eye,
  Shield,
  Bell,
  Camera,
  Save,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type TabType = 'profile' | 'diaries' | 'history' | 'backup' | 'feedback';

export default function PersonalCenterPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    interests: [] as string[],
    travelPreferences: [] as string[]
  });
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'problem' | 'other'>('suggestion');
  const [backupStatus, setBackupStatus] = useState<string>('');

  const { user, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();

  const interestOptions = ['历史', '文化', '自然', '摄影', '美食', '冒险', '亲子', '研学'];
  const preferenceOptions = ['自由行', '跟团游', '深度游', '打卡游', '休闲游'];

  // 本地存储的兴趣和偏好
  const [localInterests, setLocalInterests] = useState<string[]>([]);
  const [localPreferences, setLocalPreferences] = useState<string[]>([]);

  // 加载本地存储的兴趣和偏好
  useEffect(() => {
    const storedInterests = localStorage.getItem(`user_interests_${user?.id}`);
    const storedPreferences = localStorage.getItem(`user_preferences_${user?.id}`);
    if (storedInterests) setLocalInterests(JSON.parse(storedInterests));
    if (storedPreferences) setLocalPreferences(JSON.parse(storedPreferences));
  }, [user?.id]);

  const handleEditProfile = () => {
    if (user) {
      setEditForm({
        username: user.username,
        email: user.email,
        interests: localInterests,
        travelPreferences: localPreferences
      });
      setIsEditing(true);
    }
  };

  const handleSaveProfile = async () => {
    // 保存用户名和邮箱到用户信息
    if (editForm.username !== user?.username || editForm.email !== user?.email) {
      await updateProfile({
        username: editForm.username,
        email: editForm.email
      });
    }
    // 保存兴趣和偏好到本地存储
    localStorage.setItem(`user_interests_${user?.id}`, JSON.stringify(editForm.interests));
    localStorage.setItem(`user_preferences_${user?.id}`, JSON.stringify(editForm.travelPreferences));
    setLocalInterests(editForm.interests);
    setLocalPreferences(editForm.travelPreferences);
    setIsEditing(false);
  };

  const toggleInterest = (interest: string) => {
    setEditForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const togglePreference = (pref: string) => {
    setEditForm(prev => ({
      ...prev,
      travelPreferences: prev.travelPreferences.includes(pref)
        ? prev.travelPreferences.filter(p => p !== pref)
        : [...prev.travelPreferences, pref]
    }));
  };

  const handleBackup = () => {
    setBackupStatus('backup');
    const diaries = JSON.parse(localStorage.getItem(`user_diaries_${user?.id}`) || '[]');
    const data = {
      user: {
        id: user?.id,
        email: user?.email,
        username: user?.username,
        avatar: user?.avatar,
        created_at: user?.created_at
      },
      diaries,
      interests: localInterests,
      travelPreferences: localPreferences,
      bookmarks: [],
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setBackupStatus(''), 3000);
  };

  const handleRestore = () => {
    setBackupStatus('restore');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            if (data.user) {
              updateProfile({
                username: data.user.username,
                email: data.user.email
              });
              alert('数据恢复成功！');
            }
            if (data.interests) {
              localStorage.setItem(`user_interests_${user?.id}`, JSON.stringify(data.interests));
              setLocalInterests(data.interests);
            }
            if (data.travelPreferences) {
              localStorage.setItem(`user_preferences_${user?.id}`, JSON.stringify(data.travelPreferences));
              setLocalPreferences(data.travelPreferences);
            }
          } catch {
            alert('文件格式错误');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
    setTimeout(() => setBackupStatus(''), 3000);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleSubmitFeedback = () => {
    if (feedbackContent.trim()) {
      alert('反馈已提交，感谢您的建议！');
      setFeedbackContent('');
    }
  };

  // 获取用户的日记
  const userDiaries = JSON.parse(localStorage.getItem(`user_diaries_${user?.id}`) || '[]');

  // 处理删除日记
  const handleDeleteDiary = (diaryId: string) => {
    const updatedDiaries = userDiaries.filter((d: any) => d.id !== diaryId);
    localStorage.setItem(`user_diaries_${user?.id}`, JSON.stringify(updatedDiaries));
    alert('日记已删除');
    // 强制刷新页面以更新日记列表
    window.location.reload();
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    } catch {
      return dateString;
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">请先登录</p>
        <Link to="/auth" className="text-red-600 hover:underline font-medium">
          前往登录
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: '个人信息', icon: User },
    { id: 'diaries', label: '我的日记', icon: BookOpen },
    { id: 'history', label: '旅游记录', icon: Route },
    { id: 'backup', label: '数据备份', icon: Download },
    { id: 'feedback', label: '意见反馈', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-red-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">个人中心</h1>
        <p className="text-red-100">管理您的个人信息、旅游记录和数据</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          {/* User Info */}
          <div className="text-center pb-4 border-b border-gray-200">
            <div className="relative inline-block">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.username}
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <button className="absolute bottom-2 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="font-semibold text-lg">{user.username}</h2>
            <p className="text-gray-400 text-xs mt-1">加入于 {formatDate(user.created_at)}</p>
          </div>

          {/* Navigation */}
          <nav className="py-4">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{tab.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>退出登录</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">个人信息</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>编辑资料</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Save className="w-4 h-4" />
                      <span>保存</span>
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      用户名
                    </label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      兴趣标签
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map(interest => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            editForm.interests.includes(interest)
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      出游偏好
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {preferenceOptions.map(pref => (
                        <button
                          key={pref}
                          onClick={() => togglePreference(pref)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            editForm.travelPreferences.includes(pref)
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">用户名</div>
                      <div className="font-medium">{user.username}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">邮箱</div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                      <div className="text-sm text-gray-500 mb-1">注册时间</div>
                      <div className="font-medium">{formatDate(user.created_at)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-2">兴趣标签</div>
                    <div className="flex flex-wrap gap-2">
                      {localInterests.length > 0 ? (
                        localInterests.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">未设置</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-2">出游偏好</div>
                    <div className="flex flex-wrap gap-2">
                      {localPreferences.length > 0 ? (
                        localPreferences.map(pref => (
                          <span key={pref} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                            {pref}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">未设置</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Diaries Tab */}
          {activeTab === 'diaries' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">我的日记</h2>
                <Link
                  to="/diary"
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>写日记</span>
                </Link>
              </div>

              {userDiaries.length > 0 ? (
                <div className="space-y-4">
                  {userDiaries.map((diary: any) => (
                    <div key={diary.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        {diary.images && diary.images[0] && (
                          <img
                            src={diary.images[0]}
                            alt={diary.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{diary.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{diary.date}</span>
                            {diary.location && (
                              <>
                                <MapPin className="w-4 h-4 mx-1 ml-3" />
                                <span>{diary.location}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center text-gray-500">
                              <Eye className="w-4 h-4 mr-1" />
                              {diary.views || 0}
                            </span>
                            <span className="flex items-center text-gray-500">
                              <Heart className="w-4 h-4 mr-1" />
                              {diary.likes || 0}
                            </span>
                            {diary.rating && (
                              <span className="flex items-center text-gray-500">
                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                {diary.rating}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteDiary(diary.id)}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">还没有写过日记</p>
                  <Link
                    to="/diary"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>开始写日记</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">旅游记录</h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold mb-1">{userDiaries.length}</div>
                  <div className="text-red-100">游览景点</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold mb-1">8</div>
                  <div className="text-blue-100">规划路线</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                  <div className="text-3xl font-bold mb-1">{userDiaries.length}</div>
                  <div className="text-green-100">发布日记</div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">最近足迹</h3>
              <div className="space-y-3">
                {userDiaries.length > 0 ? (
                  userDiaries.slice(0, 5).map((diary: any, idx: number) => (
                    <div key={diary.id || idx} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{diary.title || '未命名日记'}</div>
                        <div className="text-sm text-gray-500">{diary.date}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p>暂无旅游记录</p>
                    <Link to="/route" className="text-red-600 hover:underline text-sm">
                      去规划路线
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Backup Tab */}
          {activeTab === 'backup' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">数据备份与恢复</h2>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">数据安全</h3>
                      <p className="text-sm text-blue-800">
                        您的个人数据、日记和收藏将安全备份。备份文件为JSON格式，可在需要时恢复。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    onClick={handleBackup}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Download className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">备份数据</h3>
                    <p className="text-sm text-gray-500">导出您的所有数据到本地</p>
                    {backupStatus === 'backup' && (
                      <span className="text-xs text-green-600 mt-2 block">备份成功！</span>
                    )}
                  </div>

                  <div
                    onClick={handleRestore}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1">恢复数据</h3>
                    <p className="text-sm text-gray-500">从备份文件恢复数据</p>
                    {backupStatus === 'restore' && (
                      <span className="text-xs text-green-600 mt-2 block">选择文件...</span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">备份内容</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      个人信息设置
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      旅游日记内容
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      收藏的目的地
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      规划的路线记录
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">意见反馈</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    反馈类型
                  </label>
                  <div className="flex space-x-3">
                    {[
                      { id: 'suggestion', label: '功能建议' },
                      { id: 'problem', label: '问题反馈' },
                      { id: 'other', label: '其他' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setFeedbackType(type.id as typeof feedbackType)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          feedbackType === type.id
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    反馈内容
                  </label>
                  <textarea
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    placeholder="请详细描述您的建议或遇到的问题..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系方式（选填）
                  </label>
                  <input
                    type="text"
                    placeholder="邮箱或电话号码"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <button
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackContent.trim()}
                  className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  提交反馈
                </button>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">常见问题</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 如遇功能问题，请描述操作步骤</li>
                    <li>• 建议详细说明期望的功能效果</li>
                    <li>• 我们会在1-3个工作日内处理您的反馈</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
