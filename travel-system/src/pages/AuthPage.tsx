import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn(formData.email, formData.password);
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error || '登录失败');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('两次密码输入不一致');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('密码长度至少6位');
          setLoading(false);
          return;
        }
        if (!formData.username.trim()) {
          setError('请输入用户名');
          setLoading(false);
          return;
        }
        const result = await signUp(formData.email, formData.password, formData.username);
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error || '注册失败');
        }
      }
    } catch (err) {
      setError('操作失败，请重试');
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">个性化旅游系统</h1>
          <p className="text-red-100 mt-1">
            {isLogin ? '欢迎回来，开始您的旅程' : '创建账户，开启探索之旅'}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入邮箱"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Username (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  用户名
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="请输入用户名"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请输入密码"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="请再次输入密码"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>{loading ? '处理中...' : (isLogin ? '登录' : '注册')}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? '还没有账户？' : '已有账户？'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-red-600 font-semibold ml-1 hover:underline"
              >
                {isLogin ? '立即注册' : '立即登录'}
              </button>
            </p>
          </div>

          {/* Security Info */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-medium">数据安全</p>
                <p className="text-green-600">您的数据已加密存储，保障隐私安全</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="px-6 pb-6 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
