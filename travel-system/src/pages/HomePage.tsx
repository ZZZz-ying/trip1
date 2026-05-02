import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Route,
  Store,
  BookOpen,
  Utensils,
  TrendingUp,
  Star,
  Users,
  ArrowRight
} from 'lucide-react';
import { travelSpots, travelDiaries, foods } from '../data/sampleData';

const features = [
  {
    icon: MapPin,
    title: '旅游推荐',
    description: '根据热度、评价和个人兴趣推荐景点和学校',
    path: '/recommendation',
    color: 'bg-red-600'
  },
  {
    icon: Route,
    title: '路线规划',
    description: '智能规划最优参观线路，支持多种策略',
    path: '/route-planning',
    color: 'bg-blue-600'
  },
  {
    icon: Store,
    title: '场所查询',
    description: '查找附近设施，按距离智能排序',
    path: '/facility-query',
    color: 'bg-green-600'
  },
  {
    icon: BookOpen,
    title: '旅游日记',
    description: '记录旅途，分享精彩故事',
    path: '/diary',
    color: 'bg-purple-600'
  },
  {
    icon: Utensils,
    title: '美食推荐',
    description: '推荐当地特色美食',
    path: '/food',
    color: 'bg-orange-600'
  }
];

export default function HomePage() {
  const topSpots = travelSpots.slice(0, 3);
  const topDiaries = travelDiaries.slice(0, 3);
  const topFoods = foods.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-16 text-white">
          <h1 className="text-4xl font-bold mb-4">欢迎使用个性化旅游系统</h1>
          <p className="text-xl text-red-100 mb-8 max-w-2xl">
            为您提供景点推荐、路线规划、场所查询、旅游日记和美食推荐等全方位旅游服务
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/recommendation"
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              开始探索
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/route-planning"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              规划路线
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">系统功能</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all"
              >
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Spots */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">热门景点</h2>
          <Link to="/recommendation" className="text-red-600 hover:text-red-700 font-medium flex items-center">
            查看全部
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {topSpots.map((spot) => (
            <div key={spot.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {spot.type === 'scenic' ? '景点' : '学校'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{spot.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{spot.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-1 text-red-500" />
                    <span>{spot.heat.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>{spot.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Diaries */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">热门日记</h2>
          <Link to="/diary" className="text-red-600 hover:text-red-700 font-medium flex items-center">
            查看全部
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {topDiaries.map((diary) => (
            <div key={diary.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={diary.avatar}
                  alt={diary.author}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{diary.author}</p>
                  <p className="text-xs text-gray-500">{diary.location}</p>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{diary.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">{diary.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{diary.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{diary.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Food */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">热门美食</h2>
          <Link to="/food" className="text-red-600 hover:text-red-700 font-medium flex items-center">
            查看全部
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {topFoods.map((food) => (
            <div key={food.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {food.cuisine}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{food.name}</h3>
                  <span className="text-red-600 font-semibold">¥{food.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">{food.restaurant}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{food.distance}km</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>{food.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Algorithm Features */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">核心算法支持</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">排序算法</h3>
            <p className="text-gray-600 text-sm">Top K 高效排序</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">查找算法</h3>
            <p className="text-gray-600 text-sm">模糊匹配与全文检索</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Route className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">最短路径</h3>
            <p className="text-gray-600 text-sm">Dijkstra算法优化</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">无损压缩</h3>
            <p className="text-gray-600 text-sm">LZW压缩存储</p>
          </div>
        </div>
      </section>
    </div>
  );
}
