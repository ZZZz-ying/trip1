import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Home,
  MapPin,
  Route,
  Store,
  BookOpen,
  Utensils,
  Menu,
  X,
  User,
  LogIn,
  ChevronDown,
  Users
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/recommendation', label: '旅游推荐', icon: MapPin },
  { path: '/route-planning', label: '路线规划', icon: Route },
  { path: '/facility-query', label: '场所查询', icon: Store },
  { path: '/diary', label: '旅游日记', icon: BookOpen },
  { path: '/food', label: '美食推荐', icon: Utensils },
  { path: '/partner', label: '旅游搭子', icon: Users },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    setUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">个性化旅游系统</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Menu / Login */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-gray-700">{user.username}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                      <Link
                        to="/personal-center"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">个人中心</span>
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogIn className="w-5 h-5" />
                        <span>退出登录</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>登录</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-100 py-4 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                    isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            <div className="border-t border-gray-100 mt-4 pt-4">
              {user ? (
                <>
                  <Link
                    to="/personal-center"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">个人中心</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-medium">退出登录</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-red-600 text-white rounded-lg"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">登录 / 注册</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 个性化旅游系统. 版权所有</p>
            <p className="mt-2">核心算法：排序算法 | 查找算法 | 最短路径算法</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
