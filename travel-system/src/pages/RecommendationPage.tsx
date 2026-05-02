import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  Users,
  MapPin,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { travelSpots, TravelSpot } from '../data/sampleData';
import { partialSort, fuzzySearch, quickSort } from '../utils/algorithms';
import { useSimplePagination } from '../hooks/useCursorPagination';

type SortField = 'heat' | 'rating' | 'reviews';
type FilterType = 'all' | 'scenic' | 'school';
type InterestTag = string;

const interestTags: InterestTag[] = ['历史', '文化', '自然', '校园', '美食', '摄影'];
const PAGE_SIZE = 6; // 每页显示数量

export default function RecommendationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('heat');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedInterests, setSelectedInterests] = useState<InterestTag[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<TravelSpot | null>(null);
  const [showTop10Only, setShowTop10Only] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    travelSpots.forEach(spot => spot.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  // 过滤和排序后的完整数据
  const filteredAndSortedSpots = useMemo(() => {
    let result = [...travelSpots];

    // 搜索过滤
    if (searchQuery.trim()) {
      result = fuzzySearch(result, searchQuery, (spot) =>
        `${spot.name} ${spot.category} ${spot.description} ${spot.tags.join(' ')}`
      );
    }

    // 类型过滤
    if (filterType !== 'all') {
      result = result.filter(spot => spot.type === filterType);
    }

    // 兴趣过滤
    if (selectedInterests.length > 0) {
      result = result.filter(spot =>
        selectedInterests.some(interest =>
          spot.tags.includes(interest) || spot.category.includes(interest)
        )
      );
    }

    // 排序
    const sortFn = (a: TravelSpot, b: TravelSpot) => {
      switch (sortField) {
        case 'heat':
          return b.heat - a.heat;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    };

    if (showTop10Only) {
      return partialSort(result, 10, sortFn);
    }

    return quickSort(result, sortFn);
  }, [searchQuery, sortField, filterType, selectedInterests, showTop10Only]);

  // 使用游标分页
  const {
    items: paginatedSpots,
    page,
    totalPages,
    hasMore,
    loadMore,
    reset
  } = useSimplePagination({
    data: filteredAndSortedSpots,
    pageSize: PAGE_SIZE
  });

  // 搜索时重置分页
  useEffect(() => {
    reset();
  }, [searchQuery, filterType, selectedInterests, sortField, showTop10Only, reset]);

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

  const toggleInterest = (interest: InterestTag) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-red-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">旅游推荐</h1>
        <p className="text-red-100">根据热度、评价和个人兴趣为您推荐景点和学校</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索景点名称、类别、关键字..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-4">
          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">类型:</span>
            <div className="flex space-x-2">
              {(['all', 'scenic', 'school'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    filterType === type
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? '全部' : type === 'scenic' ? '景点' : '学校'}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Field */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">排序:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500"
            >
              <option value="heat">热度</option>
              <option value="rating">评价</option>
              <option value="reviews">评论数</option>
            </select>
          </div>

          {/* Top K Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="top10"
              checked={showTop10Only}
              onChange={(e) => setShowTop10Only(e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="top10" className="text-sm text-gray-600">
              只看前10名
            </label>
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              部分排序算法
            </span>
          </div>
        </div>

        {/* Interest Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">兴趣标签:</span>
          {interestTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleInterest(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedInterests.includes(tag)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedInterests.length > 0 && (
            <button
              onClick={() => setSelectedInterests([])}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-full"
            >
              清除
            </button>
          )}
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
              使用<strong>游标分页</strong>进行结果分页，支持无限滚动加载。
              当选择"只看前10名"时，系统使用<strong>部分排序算法</strong>，
              时间复杂度 O(n log k)，其中 k=10，相比完全排序更加高效。
              查询时使用<strong>模糊查找算法</strong>进行多字段匹配。
            </p>
          </div>
        </div>
      </div>

      {/* Results Count & Pagination Info */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          共找到 <span className="font-semibold text-red-600">{filteredAndSortedSpots.length}</span> 个结果，
          当前显示 <span className="font-semibold">{paginatedSpots.length}</span> 个
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>第 {page} / {Math.max(1, Math.ceil(filteredAndSortedSpots.length / PAGE_SIZE))} 页</span>
          <button
            onClick={() => reset()}
            disabled={page === 1}
            className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedSpots.map((spot, index) => (
          <div
            key={spot.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedSpot(spot)}
          >
            <div className="relative h-48">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
              {showTop10Only && index < 10 && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  TOP {index + 1}
                </div>
              )}
              <div className="absolute top-3 right-3 bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded">
                {spot.type === 'scenic' ? '景点' : '学校'}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{spot.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {spot.category}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{spot.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {spot.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                <div className="flex items-center text-gray-500">
                  <TrendingUp className="w-4 h-4 mr-1 text-red-500" />
                  <span>{spot.heat.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{spot.rating}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{spot.reviews.toLocaleString()}</span>
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
      {!hasMore && paginatedSpots.length > 0 && (
        <div className="text-center py-4 text-gray-400">
          已加载全部结果
        </div>
      )}

      {/* Empty State */}
      {paginatedSpots.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关结果</h3>
          <p className="text-gray-500">请尝试调整搜索条件或过滤器</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedSpot.image}
                alt={selectedSpot.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSpot.name}</h2>
                  <p className="text-gray-500">{selectedSpot.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{selectedSpot.rating}</div>
                  <div className="text-sm text-gray-500">评分</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{selectedSpot.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">开放时间</div>
                  <div className="font-medium">{selectedSpot.openingHours}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">门票</div>
                  <div className="font-medium text-red-600">{selectedSpot.ticket}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSpot.tags.map((tag) => (
                  <span key={tag} className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1 text-red-500" />
                    <span>热度 {selectedSpot.heat.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-blue-500" />
                    <span>评论 {selectedSpot.reviews.toLocaleString()}</span>
                  </div>
                </div>
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  开始导航
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
