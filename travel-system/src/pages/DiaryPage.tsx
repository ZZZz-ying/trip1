import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  Star,
  Eye,
  Heart,
  Calendar,
  MapPin,
  User,
  CheckCircle,
  Plus,
  ThumbsUp,
  MessageSquare,
  Share2,
  X,
  Image as ImageIcon,
  Video,
  Edit3,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { travelDiaries, TravelDiary } from '../data/sampleData';
import { partialSort, fuzzySearch, fullTextSearch } from '../utils/algorithms';
import { useSimplePagination } from '../hooks/useCursorPagination';
import { useAuth } from '../contexts/AuthContext';

const PAGE_SIZE = 6; // 每页显示数量

type SortField = 'views' | 'rating' | 'likes';
type ViewMode = 'browse' | 'create';

export default function DiaryPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('views');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDiary, setSelectedDiary] = useState<TravelDiary | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [expandedDiary, setExpandedDiary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // Create diary form state
  const [newDiary, setNewDiary] = useState({
    title: '',
    content: '',
    location: '',
    tags: ''
  });

  const allLocations = useMemo(() => {
    const locations = new Set(travelDiaries.map(d => d.location));
    return Array.from(locations);
  }, []);

  const filteredAndSortedDiaries = useMemo(() => {
    let result = [...travelDiaries];

    // 搜索过滤（支持全文检索）
    if (searchQuery.trim()) {
      const searchResults = fullTextSearch(result, searchQuery, (diary) =>
        `${diary.title} ${diary.content} ${diary.location} ${diary.tags.join(' ')}`
      );
      result = searchResults.map(r => r.item);
    }

    // 地点过滤
    if (selectedLocation) {
      result = result.filter(d => d.location === selectedLocation);
    }

    // 排序
    const sortFn = (a: TravelDiary, b: TravelDiary) => {
      switch (sortField) {
        case 'views':
          return b.views - a.views;
        case 'rating':
          return b.rating - a.rating;
        case 'likes':
          return b.likes - a.likes;
        default:
          return 0;
      }
    };

    // 使用部分排序算法
    return partialSort(result, 20, sortFn);
  }, [searchQuery, sortField, selectedLocation]);

  // 使用游标分页
  const {
    items: paginatedDiaries,
    page,
    totalPages,
    hasMore,
    loadMore,
    reset
  } = useSimplePagination({
    data: filteredAndSortedDiaries,
    pageSize: PAGE_SIZE
  });

  // 搜索时重置分页
  useEffect(() => {
    reset();
  }, [searchQuery, sortField, selectedLocation, reset]);

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

  const handleRating = (diaryId: string, rating: number) => {
    console.log(`Rated diary ${diaryId} with ${rating} stars`);
  };

  const handleCreateDiary = () => {
    if (!user) {
      alert('请先登录后再撰写日记');
      return;
    }

    // 将标签字符串转换为数组
    const tagsArray = newDiary.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    // 创建日记对象
    const diaryData = {
      id: `diary_${Date.now()}`,
      title: newDiary.title,
      content: newDiary.content,
      location: newDiary.location,
      date: new Date().toISOString().split('T')[0],
      images: [],
      tags: tagsArray,
      views: 0,
      likes: 0,
      rating: 0
    };

    // 保存到用户本地数据
    const existingDiaries = JSON.parse(localStorage.getItem(`user_diaries_${user.id}`) || '[]');
    existingDiaries.push(diaryData);
    localStorage.setItem(`user_diaries_${user.id}`, JSON.stringify(existingDiaries));

    alert('旅游日记创建成功！');
    setViewMode('browse');
    setNewDiary({ title: '', content: '', location: '', tags: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-red-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">旅游日记</h1>
        <p className="text-red-100">记录旅途故事，分享精彩瞬间</p>
      </div>

      {/* Mode Toggle */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode('browse')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'browse'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-5 h-5" />
            <span>浏览日记</span>
          </button>
          <button
            onClick={() => setViewMode('create')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'create'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Edit3 className="w-5 h-5" />
            <span>撰写日记</span>
          </button>
        </div>
      </div>

      {viewMode === 'browse' ? (
        <>
          {/* Search and Filters */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索日记标题、内容、地点..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4">
              {/* Location Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="">所有地点</option>
                  {allLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Sort Field */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">排序:</span>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as SortField)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="views">按热度</option>
                  <option value="rating">按评分</option>
                  <option value="likes">按点赞</option>
                </select>
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
                  使用<span className="font-medium">全文检索算法</span>进行内容匹配，
                  支持标题、内容、地点、标签的多字段搜索。
                  使用<span className="font-medium">部分排序算法</span>高效返回Top结果。
                </p>
              </div>
            </div>
          </div>

          {/* Results Count & Pagination Info */}
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              共找到 <span className="font-semibold text-red-600">{filteredAndSortedDiaries.length}</span> 篇日记，
              当前显示 <span className="font-semibold">{paginatedDiaries.length}</span> 篇
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>第 {page} / {Math.max(1, Math.ceil(filteredAndSortedDiaries.length / PAGE_SIZE))} 页</span>
              <button
                onClick={() => reset()}
                disabled={page === 1}
                className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Diary List */}
          <div className="space-y-4">
            {paginatedDiaries.map((diary, index) => (
              <div
                key={diary.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  {/* Author Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={diary.avatar}
                      alt={diary.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{diary.author}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{diary.date}</span>
                        <MapPin className="w-3 h-3 mx-1" />
                        <span>{diary.location}</span>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className={`px-3 py-1 rounded-full text-sm font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        'bg-amber-600'
                      }`}>
                        TOP {index + 1}
                      </div>
                    )}
                  </div>

                  {/* Title & Content */}
                  <h3
                    className="font-semibold text-lg text-gray-900 mb-2 cursor-pointer hover:text-red-600"
                    onClick={() => setSelectedDiary(diary)}
                  >
                    {diary.title}
                  </h3>
                  <p className={`text-gray-600 ${expandedDiary === diary.id ? '' : 'line-clamp-3'}`}>
                    {diary.content}
                  </p>
                  {diary.content.length > 150 && (
                    <button
                      onClick={() => setExpandedDiary(expandedDiary === diary.id ? null : diary.id)}
                      className="text-red-600 text-sm mt-1"
                    >
                      {expandedDiary === diary.id ? '收起' : '展开全文'}
                    </button>
                  )}

                  {/* Images */}
                  {diary.images.length > 0 && (
                    <div className="flex space-x-2 mt-3 overflow-x-auto">
                      {diary.images.slice(0, 3).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`图片${idx + 1}`}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {diary.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{diary.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>{diary.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-red-500" />
                        <span>{diary.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedDiary(diary)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        查看详情
                      </button>
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
          {!hasMore && paginatedDiaries.length > 0 && (
            <div className="text-center py-4 text-gray-400">
              已加载全部日记
            </div>
          )}

          {/* Empty State */}
          {paginatedDiaries.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关日记</h3>
              <p className="text-gray-500">请尝试调整搜索条件</p>
            </div>
          )}
        </>
      ) : (
        /* Create Diary Form */
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">撰写旅游日记</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                日记标题
              </label>
              <input
                type="text"
                value={newDiary.title}
                onChange={(e) => setNewDiary({ ...newDiary, title: e.target.value })}
                placeholder="给你的日记起个标题..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                旅游地点
              </label>
              <input
                type="text"
                value={newDiary.location}
                onChange={(e) => setNewDiary({ ...newDiary, location: e.target.value })}
                placeholder="你在哪里旅游？"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                日记内容
              </label>
              <textarea
                value={newDiary.content}
                onChange={(e) => setNewDiary({ ...newDiary, content: e.target.value })}
                placeholder="记录你的旅游经历..."
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签（用逗号分隔）
              </label>
              <input
                type="text"
                value={newDiary.tags}
                onChange={(e) => setNewDiary({ ...newDiary, tags: e.target.value })}
                placeholder="例如：美食,风景,文化"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                添加图片/视频
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 cursor-pointer">
                <div className="flex justify-center space-x-4">
                  <div className="flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">添加图片</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Video className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">添加视频</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleCreateDiary}
                disabled={!newDiary.title || !newDiary.content}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                发布日记
              </button>
              <button
                onClick={() => setViewMode('browse')}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diary Detail Modal */}
      {selectedDiary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">日记详情</h2>
              <button
                onClick={() => setSelectedDiary(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Author */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={selectedDiary.avatar}
                  alt={selectedDiary.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{selectedDiary.author}</p>
                  <p className="text-sm text-gray-500">
                    {selectedDiary.date} · {selectedDiary.location}
                  </p>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedDiary.title}</h3>

              {/* Content */}
              <p className="text-gray-600 mb-4 whitespace-pre-wrap">{selectedDiary.content}</p>

              {/* Images */}
              {selectedDiary.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {selectedDiary.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`图片${idx + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedDiary.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-gray-500 mb-6">
                <div className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  <span>{selectedDiary.views.toLocaleString()} 次浏览</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  <span>{selectedDiary.likes} 点赞</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>{selectedDiary.rating} 评分</span>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-medium text-gray-900 mb-2">为这篇日记评分</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= userRating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <ThumbsUp className="w-5 h-5" />
                  <span>点赞</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Share2 className="w-5 h-5" />
                  <span>分享</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
