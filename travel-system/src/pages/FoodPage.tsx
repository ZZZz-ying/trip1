import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  TrendingUp,
  Utensils,
  CheckCircle,
  ShoppingBag,
  Clock,
  X,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { foods, Food } from '../data/sampleData';
import { partialSort, fuzzySearch } from '../utils/algorithms';
import { useSimplePagination } from '../hooks/useCursorPagination';

type SortField = 'heat' | 'rating' | 'price' | 'distance';

const cuisines = ['全部', '京菜', '浙菜', '川菜', '粤菜', '淮扬菜', '沪菜', '西北菜', '河北菜'];
const PAGE_SIZE = 8; // 每页显示数量

export default function FoodPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('heat');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('全部');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showTop10Only, setShowTop10Only] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const filteredAndSortedFoods = useMemo(() => {
    let result = [...foods];

    // 搜索过滤（支持模糊查询）
    if (searchQuery.trim()) {
      result = fuzzySearch(result, searchQuery, (food) =>
        `${food.name} ${food.cuisine} ${food.restaurant} ${food.window} ${food.description}`
      );
    }

    // 菜系过滤
    if (selectedCuisine !== '全部') {
      result = result.filter(f => f.cuisine === selectedCuisine);
    }

    // 排序
    const sortFn = (a: Food, b: Food) => {
      switch (sortField) {
        case 'heat':
          return b.heat - a.heat;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'distance':
          return a.distance - b.distance;
        default:
          return 0;
      }
    };

    if (showTop10Only) {
      return partialSort(result, 10, sortFn);
    }

    return [...result].sort(sortFn);
  }, [searchQuery, sortField, selectedCuisine, showTop10Only]);

  // 使用游标分页
  const {
    items: paginatedFoods,
    page,
    totalPages,
    hasMore,
    loadMore,
    reset
  } = useSimplePagination({
    data: filteredAndSortedFoods,
    pageSize: PAGE_SIZE
  });

  // 搜索时重置分页
  useEffect(() => {
    reset();
  }, [searchQuery, sortField, selectedCuisine, showTop10Only, reset]);

  // 无限滚动监听
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          // 模拟加载延迟
          setTimeout(() => {
            loadMore();
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-red-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">美食推荐</h1>
        <p className="text-red-100">根据热度、评价和距离为您推荐特色美食</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索美食名称、菜系、饭店或窗口名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Cuisine Filter */}
        <div className="flex flex-wrap gap-2">
          <Filter className="w-4 h-4 text-gray-500 mr-2 self-center" />
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCuisine === cuisine
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm text-gray-600">排序方式:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'heat', label: '热度', icon: TrendingUp },
              { id: 'rating', label: '评分', icon: Star },
              { id: 'price', label: '价格', icon: DollarSign },
              { id: 'distance', label: '距离', icon: MapPin }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSortField(id as SortField)}
                className={`flex items-center space-x-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                  sortField === id
                    ? 'bg-red-100 text-red-600 border border-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Top K Toggle */}
          <div className="flex items-center space-x-2 ml-auto">
            <input
              type="checkbox"
              id="top10food"
              checked={showTop10Only}
              onChange={(e) => setShowTop10Only(e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="top10food" className="text-sm text-gray-600">
              只看前10名
            </label>
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              部分排序
            </span>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">算法说明</h3>
            <p className="text-sm text-gray-600">
              <span className="text-red-600 font-medium">核心算法：</span>
              使用<span className="font-medium">模糊查找算法</span>进行多字段匹配
              （美食名称、菜系、饭店、窗口描述）。
              使用<span className="font-medium">部分排序算法</span>高效获取Top K结果，
              时间复杂度 O(n log k)，k=10。
            </p>
          </div>
        </div>
      </div>

      {/* Results Count & Pagination Info */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          找到 <span className="font-semibold text-red-600">{filteredAndSortedFoods.length}</span> 个美食，
          当前显示 <span className="font-semibold">{paginatedFoods.length}</span> 个
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>第 {page} / {Math.max(1, Math.ceil(filteredAndSortedFoods.length / PAGE_SIZE))} 页</span>
          <button
            onClick={() => reset()}
            disabled={page === 1}
            className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedFoods.map((food, index) => (
          <div
            key={food.id}
            onClick={() => setSelectedFood(food)}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="relative h-36">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              {showTop10Only && index < 10 && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  TOP {index + 1}
                </div>
              )}
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
                {food.cuisine}
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{food.name}</h3>
                <span className="text-red-600 font-bold ml-2">¥{food.price}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{food.restaurant}</p>
              <p className="text-xs text-gray-400">{food.window}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{food.distance}km</span>
                </div>
                <div className="flex items-center text-xs">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  <span className="font-medium">{food.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-8">
          {loading ? (
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>加载中...</span>
            </div>
          ) : (
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              加载更多
            </button>
          )}
        </div>
      )}

      {/* No More Results */}
      {!hasMore && paginatedFoods.length > 0 && (
        <div className="text-center py-4 text-gray-400">
          已加载全部美食
        </div>
      )}

      {/* Empty State */}
      {paginatedFoods.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关美食</h3>
          <p className="text-gray-500">请尝试调整搜索条件或菜系筛选</p>
        </div>
      )}

      {/* Food Detail Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="relative">
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedFood(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedFood.name}</h2>
                  <p className="text-gray-500">{selectedFood.restaurant}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">¥{selectedFood.price}</div>
                  <div className="text-sm text-gray-500">{selectedFood.window}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                  {selectedFood.cuisine}
                </span>
                {selectedFood.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 mb-4">{selectedFood.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center text-yellow-500 mb-1">
                    <Star className="w-5 h-5 mr-1" />
                    <span className="text-xl font-bold">{selectedFood.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">评分</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center text-red-500 mb-1">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    <span className="text-xl font-bold">{selectedFood.heat}</span>
                  </div>
                  <div className="text-xs text-gray-500">热度</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center text-blue-500 mb-1">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span className="text-xl font-bold">{selectedFood.distance}km</span>
                  </div>
                  <div className="text-xs text-gray-500">距离</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 mb-6">
                <div className="flex items-start space-x-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <strong>购买信息：</strong>
                    {selectedFood.reviews.toLocaleString()} 人评价
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
                  去购买
                </button>
                <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  收藏
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
