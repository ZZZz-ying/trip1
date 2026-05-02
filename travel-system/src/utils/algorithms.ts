/**
 * 算法工具函数
 * 包含排序算法、查找算法、最短路径算法等核心算法实现
 */

// ==================== 排序算法 ====================

/**
 * 部分排序 - 获取Top K元素（不进行完全排序）
 * 使用堆排序的思想，时间复杂度 O(n log k)
 */
export function partialSort<T>(
  arr: T[],
  k: number,
  compareFn: (a: T, b: T) => number
): T[] {
  if (arr.length <= k) {
    return [...arr].sort(compareFn);
  }

  // 使用小顶堆
  const heap: T[] = [];

  for (const item of arr) {
    if (heap.length < k) {
      heap.push(item);
      // 向上调整
      bubbleUp(heap, heap.length - 1, compareFn);
    } else if (compareFn(item, heap[0]) > 0) {
      // 如果当前元素比堆顶大，则替换
      heap[0] = item;
      // 向下调整
      bubbleDown(heap, 0, compareFn);
    }
  }

  // 最后对堆进行排序
  return heap.sort(compareFn);
}

function bubbleUp<T>(heap: T[], index: number, compareFn: (a: T, b: T) => number): void {
  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (compareFn(heap[index], heap[parentIndex]) > 0) {
      [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
      index = parentIndex;
    } else {
      break;
    }
  }
}

function bubbleDown<T>(heap: T[], index: number, compareFn: (a: T, b: T) => number): void {
  const length = heap.length;
  while (true) {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let largest = index;

    if (leftChild < length && compareFn(heap[leftChild], heap[largest]) > 0) {
      largest = leftChild;
    }
    if (rightChild < length && compareFn(heap[rightChild], heap[largest]) > 0) {
      largest = rightChild;
    }

    if (largest !== index) {
      [heap[index], heap[largest]] = [heap[largest], heap[index]];
      index = largest;
    } else {
      break;
    }
  }
}

/**
 * 快速排序 - 标准实现
 */
export function quickSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => compareFn(x, pivot) < 0);
  const middle = arr.filter(x => compareFn(x, pivot) === 0);
  const right = arr.filter(x => compareFn(x, pivot) > 0);

  return [...quickSort(left, compareFn), ...middle, ...quickSort(right, compareFn)];
}

/**
 * 归并排序 - 稳定排序
 */
export function mergeSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compareFn);
  const right = mergeSort(arr.slice(mid), compareFn);

  return merge(left, right, compareFn);
}

function merge<T>(left: T[], right: T[], compareFn: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (compareFn(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

// ==================== 查找算法 ====================

/**
 * 二分查找 - 有序数组
 */
export function binarySearch<T>(
  arr: T[],
  target: T,
  compareFn: (a: T, b: T) => number
): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const cmp = compareFn(arr[mid], target);

    if (cmp === 0) return mid;
    if (cmp < 0) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

/**
 * 模糊查找 - 基于内容
 */
export function fuzzySearch<T>(
  arr: T[],
  query: string,
  getSearchText: (item: T) => string
): T[] {
  if (!query.trim()) return arr;

  const normalizedQuery = query.toLowerCase().trim();

  return arr.filter(item => {
    const text = getSearchText(item).toLowerCase();
    return text.includes(normalizedQuery);
  });
}

/**
 * 全文检索 - 简单的TF-IDF实现
 */
export function fullTextSearch<T>(
  arr: T[],
  query: string,
  getContent: (item: T) => string
): { item: T; score: number }[] {
  if (!query.trim()) {
    return arr.map(item => ({ item, score: 0 }));
  }

  const queryWords = query.toLowerCase().split(/\s+/);

  return arr
    .map(item => {
      const content = getContent(item).toLowerCase();
      let score = 0;

      for (const word of queryWords) {
        // 计算词频
        const regex = new RegExp(word, 'g');
        const matches = content.match(regex);
        if (matches) {
          score += matches.length;
        }

        // 标题匹配加权
        if (content.startsWith(word)) {
          score += 10;
        }
      }

      return { item, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);
}

// ==================== 最短路径算法 ====================

export interface GraphNode {
  id: string;
  lat: number;
  lng: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  distance: number;
  time: number;
  congestion: number;
}

export interface PathResult {
  path: string[];
  totalDistance: number;
  totalTime: number;
  steps: { from: string; to: string; distance: number; time: number }[];
}

/**
 * Dijkstra最短路径算法
 */
export function dijkstra(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  endId: string,
  weightType: 'distance' | 'time' | 'congestion'
): PathResult | null {
  const dist: Map<string, number> = new Map();
  const prev: Map<string, string | null> = new Map();
  const visited: Set<string> = new Set();

  // 初始化
  for (const node of nodes) {
    dist.set(node.id, Infinity);
    prev.set(node.id, null);
  }
  dist.set(startId, 0);

  // 构建邻接表
  const adjList: Map<string, { to: string; edge: GraphEdge }[]> = new Map();
  for (const node of nodes) {
    adjList.set(node.id, []);
  }
  for (const edge of edges) {
    adjList.get(edge.from)?.push({ to: edge.to, edge });
    adjList.get(edge.to)?.push({ to: edge.from, edge });
  }

  while (visited.size < nodes.length) {
    // 找到未访问的最小距离节点
    let minDist = Infinity;
    let u: string | null = null;

    for (const node of nodes) {
      if (!visited.has(node.id) && dist.get(node.id)! < minDist) {
        minDist = dist.get(node.id)!;
        u = node.id;
      }
    }

    if (u === null) break;
    visited.add(u);

    if (u === endId) break;

    // 更新邻居
    for (const { to, edge } of adjList.get(u) || []) {
      if (visited.has(to)) continue;

      let weight: number;
      switch (weightType) {
        case 'distance':
          weight = edge.distance;
          break;
        case 'time':
          weight = edge.time * (1 + edge.congestion);
          break;
        case 'congestion':
          weight = edge.congestion;
          break;
      }

      const alt = dist.get(u)! + weight;
      if (alt < dist.get(to)!) {
        dist.set(to, alt);
        prev.set(to, u);
      }
    }
  }

  // 重建路径
  if (prev.get(endId) === null && startId !== endId) {
    return null;
  }

  const path: string[] = [];
  const steps: { from: string; to: string; distance: number; time: number }[] = [];
  let current: string | null = endId;

  while (current !== null) {
    path.unshift(current);
    const prevNode = prev.get(current);
    if (prevNode !== null && prevNode !== undefined) {
      const edge = edges.find(
        e => (e.from === prevNode && e.to === current) ||
             (e.to === prevNode && e.from === current)
      );
      if (edge) {
        steps.unshift({
          from: prevNode,
          to: current,
          distance: edge.distance,
          time: edge.time
        });
      }
    }
    current = prevNode;
  }

  return {
    path,
    totalDistance: dist.get(endId)!,
    totalTime: steps.reduce((sum, s) => sum + s.time, 0),
    steps
  };
}

/**
 * 途经多点最短路径（TSP变体）
 * 使用贪心近似算法
 */
export function multiPointPath(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  targetIds: string[],
  weightType: 'distance' | 'time'
): PathResult | null {
  if (targetIds.length === 0) {
    return {
      path: [startId],
      totalDistance: 0,
      totalTime: 0,
      steps: []
    };
  }

  const fullPath: string[] = [startId];
  const allSteps: { from: string; to: string; distance: number; time: number }[] = [];
  let totalDistance = 0;
  let totalTime = 0;
  let currentPos = startId;
  const remainingTargets = [...targetIds];

  while (remainingTargets.length > 0) {
    // 找到最近的未访问目标
    let nearestIdx = 0;
    let nearestDist = Infinity;

    for (let i = 0; i < remainingTargets.length; i++) {
      const path = dijkstra(nodes, edges, currentPos, remainingTargets[i], weightType);
      if (path && path.totalDistance < nearestDist) {
        nearestDist = path.totalDistance;
        nearestIdx = i;
      }
    }

    const target = remainingTargets.splice(nearestIdx, 1)[0];
    const path = dijkstra(nodes, edges, currentPos, target, weightType);

    if (!path) return null;

    // 添加路径（跳过起点）
    fullPath.push(...path.path.slice(1));
    allSteps.push(...path.steps);
    totalDistance += path.totalDistance;
    totalTime += path.totalTime;
    currentPos = target;
  }

  // 返回起点
  const returnPath = dijkstra(nodes, edges, currentPos, startId, weightType);
  if (returnPath) {
    fullPath.push(...returnPath.path.slice(1));
    allSteps.push(...returnPath.steps);
    totalDistance += returnPath.totalDistance;
    totalTime += returnPath.totalTime;
  }

  return {
    path: fullPath,
    totalDistance,
    totalTime,
    steps: allSteps
  };
}

/**
 * 室内导航算法
 */
export interface IndoorPathResult {
  path: { nodeId: string; floor: number; action: string }[];
  totalTime: number;
}

export function indoorNavigation(
  startNodeId: string,
  endNodeId: string,
  nodes: { id: string; floor: number; type: string }[],
  floorPlan: Map<string, Map<string, { distance: number; time: number }>>
): IndoorPathResult | null {
  // 简化实现：直线距离 + 楼层切换时间
  const startNode = nodes.find(n => n.id === startNodeId);
  const endNode = nodes.find(n => n.id === endNodeId);

  if (!startNode || !endNode) return null;

  const floorDiff = Math.abs(endNode.floor - startNode.floor);
  const elevatorTime = floorDiff * 0.5; // 每层0.5分钟
  const walkTime = 2; // 基础步行时间

  const path: { nodeId: string; floor: number; action: string }[] = [
    { nodeId: startNodeId, floor: startNode.floor, action: '起点' }
  ];

  if (startNode.floor !== endNode.floor) {
    path.push({ nodeId: 'elevator', floor: startNode.floor, action: '乘电梯上楼' });
    path.push({ nodeId: 'elevator', floor: endNode.floor, action: '到达目标楼层' });
  }

  path.push({ nodeId: endNodeId, floor: endNode.floor, action: '到达目的地' });

  return {
    path,
    totalTime: elevatorTime + walkTime
  };
}

// ==================== 压缩算法 ====================

/**
 * LZW无损压缩
 */
export function lzwCompress(text: string): { compressed: number[]; dictionary: Map<string, number> } {
  const dictionary: Map<string, number> = new Map();
  let dictSize = 256;

  // 初始化字典
  for (let i = 0; i < 256; i++) {
    dictionary.set(String.fromCharCode(i), i);
  }

  let current = '';
  const result: number[] = [];

  for (const char of text) {
    const combined = current + char;
    if (dictionary.has(combined)) {
      current = combined;
    } else {
      result.push(dictionary.get(current)!);
      dictionary.set(combined, dictSize++);
      current = char;
    }
  }

  if (current !== '') {
    result.push(dictionary.get(current)!);
  }

  return { compressed: result, dictionary };
}

export function lzwDecompress(
  compressed: number[],
  dictionary: Map<number, string>
): string {
  let current = dictionary.get(compressed[0]) || '';
  const result = [current];

  for (let i = 1; i < compressed.length; i++) {
    const entry = dictionary.get(compressed[i]);
    const next = entry !== undefined ? entry : current + current[0];
    result.push(next);
    dictionary.set(dictionary.size, current + next[0]);
    current = next;
  }

  return result.join('');
}

// ==================== 距离计算 ====================

/**
 * 计算两点之间的实际距离（ Haversine公式）
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // 地球半径（米）
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// ==================== 排序辅助函数 ====================

export type SortField = 'heat' | 'rating' | 'reviews' | 'distance' | 'price';
export type SortOrder = 'asc' | 'desc';

export function getSortCompareFn<T>(
  field: SortField,
  getFieldValue: (item: T, field: SortField) => number,
  order: SortOrder = 'desc'
): (a: T, b: T) => number {
  return (a, b) => {
    const valueA = getFieldValue(a, field);
    const valueB = getFieldValue(b, field);
    return order === 'desc' ? valueB - valueA : valueA - valueB;
  };
}
