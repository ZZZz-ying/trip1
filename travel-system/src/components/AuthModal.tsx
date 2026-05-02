import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await signIn(email, password);
        if (!result.success) {
          setError(result.error || '登录失败');
        } else {
          onClose();
        }
      } else {
        if (!username.trim()) {
          setError('请输入用户名');
          setLoading(false);
          return;
        }
        const result = await signUp(email, password, username);
        if (!result.success) {
          setError(result.error || '注册失败');
        } else {
          onClose();
        }
      }
    } catch (err) {
      setError('操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* 模态框 */}
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* 标题 */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? '欢迎回来' : '创建账号'}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {mode === 'login'
              ? '登录您的个性化旅游系统账号'
              : '注册账号，开始您的旅游之旅'}
          </p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">用户名</label>
              <input
                id="username"
                type="text"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">密码</label>
            <input
              id="password"
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <button type="submit" className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center" disabled={loading}>
            {loading ? (
              '处理中...'
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                登录
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                注册
              </>
            )}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-400">或</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
          >
            {mode === 'login' ? '没有账号？立即注册' : '已有账号？立即登录'}
          </button>

          {/* 演示模式提示 */}
          <div className="mt-4 p-3 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium">演示模式说明：</p>
            <p>• 注册和登录数据将存储在本地浏览器中</p>
            <p>• 刷新页面后需重新登录</p>
            <p>• 配置 Supabase 后可使用真实的用户系统</p>
          </div>
        </form>
      </div>
    </div>
  );
}
