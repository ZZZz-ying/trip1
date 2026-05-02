import { useState, useMemo, useCallback } from 'react';

interface CursorPaginationOptions<T> {
  data: T[];
  pageSize?: number;
  getCursor: (item: T) => string;
  initialCursor?: string;
}

interface CursorPaginationResult<T> {
  currentPage: T[];
  currentCursor: string | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  totalPages: number;
  currentPageNumber: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (cursor: string) => void;
  refresh: () => void;
  loadMore: () => void;
  allLoadedItems: T[];
}

export function useCursorPagination<T>({
  data,
  pageSize = 10,
  getCursor,
  initialCursor
}: CursorPaginationOptions<T>): CursorPaginationResult<T> {
  const [currentCursor, setCurrentCursor] = useState<string | null>(initialCursor || null);
  const [refreshKey, setRefreshKey] = useState(0);

  // 刷新函数
  const refresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  // 根据游标查找数据的起始索引
  const getStartIndex = useCallback(() => {
    if (!currentCursor) return 0;
    const index = data.findIndex(item => getCursor(item) === currentCursor);
    return index >= 0 ? index + 1 : 0;
  }, [currentCursor, data, getCursor]);

  // 获取当前页数据
  const currentPage = useMemo(() => {
    const startIndex = getStartIndex();
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, getStartIndex, pageSize, refreshKey]);

  // 获取下一页的起始游标
  const nextCursor = useMemo(() => {
    if (currentPage.length < pageSize) return null;
    const lastItem = currentPage[currentPage.length - 1];
    if (!lastItem) return null;
    return getCursor(lastItem);
  }, [currentPage, pageSize, getCursor, refreshKey]);

  // 获取上一页的游标
  const prevCursor = useMemo(() => {
    if (!currentCursor) return null;
    const startIndex = getStartIndex();
    if (startIndex <= 0) return null;
    const prevIndex = Math.max(0, startIndex - pageSize);
    return getCursor(data[prevIndex]);
  }, [currentCursor, data, getStartIndex, getCursor, pageSize, refreshKey]);

  // 加载更多（追加数据）
  const [allLoadedItems, setAllLoadedItems] = useState<T[]>([]);

  const loadMore = useCallback(() => {
    setAllLoadedItems(prev => [...prev, ...currentPage]);
  }, [currentPage]);

  // 翻页函数
  const goToNextPage = useCallback(() => {
    if (nextCursor) {
      setCurrentCursor(nextCursor);
    }
  }, [nextCursor]);

  const goToPrevPage = useCallback(() => {
    if (prevCursor) {
      setCurrentCursor(prevCursor);
    }
  }, [prevCursor]);

  const goToPage = useCallback((cursor: string) => {
    setCurrentCursor(cursor);
  }, []);

  // 计算当前页码
  const currentPageNumber = useMemo(() => {
    if (!currentCursor) return 1;
    const index = data.findIndex(item => getCursor(item) === currentCursor);
    return Math.floor(index / pageSize) + 1;
  }, [currentCursor, data, getCursor, pageSize]);

  return {
    currentPage,
    currentCursor,
    hasNextPage: nextCursor !== null,
    hasPrevPage: prevCursor !== null,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / pageSize),
    currentPageNumber,
    goToNextPage,
    goToPrevPage,
    goToPage,
    refresh,
    loadMore,
    allLoadedItems
  };
}

// 简化版游标分页（用于静态数据模拟）
interface SimpleCursorPaginationOptions<T> {
  data: T[];
  pageSize?: number;
}

interface SimplePaginationResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
}

export function useSimplePagination<T>({
  data,
  pageSize = 10
}: SimpleCursorPaginationOptions<T>): SimplePaginationResult<T> {
  const [page, setPage] = useState(1);

  const items = useMemo(() => {
    return data.slice(0, page * pageSize);
  }, [data, page, pageSize]);

  const hasMore = useMemo(() => {
    return items.length < data.length;
  }, [items.length, data.length]);

  const loadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setPage(1);
  }, []);

  return {
    items,
    page,
    totalPages: Math.ceil(data.length / pageSize),
    hasMore,
    loadMore,
    reset
  };
}
