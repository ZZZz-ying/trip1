import React, { useEffect, useRef, useState, useCallback } from 'react';

// 高德地图API密钥
const AMAP_KEY = 'b77d5b1ec92ec5e4710360319ceed024';

interface MapNode {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  address?: string;
}

interface AMapViewProps {
  center?: [number, number];
  zoom?: number;
  nodes?: MapNode[];
  routePath?: string[];
  startNode?: string;
  endNode?: string;
  height?: string;
  showSearch?: boolean;
  showRouteSearch?: boolean; // 显示高德路线搜索
  onLocationSelect?: (location: { lat: number; lng: number; name?: string }) => void;
  onRouteComplete?: (routeInfo: { distance: number; time: number }) => void;
  onRouteSearch?: (start: { lat: number; lng: number; name: string }, end: { lat: number; lng: number; name: string }) => void;
  // 高德路线规划结果回调
  routeSearchResult?: {
    path: [number, number][];
    distance: number;
    time: number;
  } | null;
}

// 声明全局变量
declare global {
  interface Window {
    AMap: any;
    _AMap: any;
    _AMapLoaded: boolean;
  }
}

export default function AMapView({
  center = [30.248, 120.149], // 默认杭州西湖
  zoom = 15,
  nodes = [],
  routePath = [],
  startNode,
  endNode,
  height = '400px',
  showSearch = false,
  showRouteSearch = true,
  onLocationSelect,
  onRouteComplete,
  onRouteSearch,
  routeSearchResult
}: AMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const routeLineRef = useRef<any>(null);
  const startMarkerRef = useRef<any>(null);
  const endMarkerRef = useRef<any>(null);

  // 搜索相关
  const [searchQuery, setSearchQuery] = useState('');
  const [poiResults, setPoiResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const AMapRef = useRef<any>(null);
  const placeSearchRef = useRef<any>(null);

  // 路线搜索相关
  const [startSearchQuery, setStartSearchQuery] = useState('');
  const [endSearchQuery, setEndSearchQuery] = useState('');
  const [startPoiResults, setStartPoiResults] = useState<any[]>([]);
  const [endPoiResults, setEndPoiResults] = useState<any[]>([]);
  const [selectedStart, setSelectedStart] = useState<any>(null);
  const [selectedEnd, setSelectedEnd] = useState<any>(null);
  const [isSearchingStart, setIsSearchingStart] = useState(false);
  const [isSearchingEnd, setIsSearchingEnd] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; time: number } | null>(null);

  // 初始化地图
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    if (window.AMap && window.AMap.Map) {
      initMap(window.AMap);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}`;
    script.async = true;

    script.onload = () => {
      if (window.AMap && window.AMap.Map) {
        initMap(window.AMap);
      }
    };

    script.onerror = () => {
      console.error('Failed to load AMap script');
    };

    document.head.appendChild(script);

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  const initMap = useCallback((AMap: any) => {
    AMapRef.current = AMap;

    const map = new AMap.Map(containerRef.current!, {
      zoom: zoom,
      center: new AMap.LngLat(center[1], center[0]),
      viewMode: '2D',
    });

    // 添加控件
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.AutoComplete'], function() {
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
    });

    // 初始化搜索服务
    AMap.plugin('AMap.PlaceSearch', function() {
      placeSearchRef.current = new AMap.PlaceSearch({
        city: '全国',
        citylimit: false,
        pageSize: 8,
        pageIndex: 1,
        panel: null,
        showCover: false,
      });
    });

    mapRef.current = map;
    setIsMapLoaded(true);
  }, [zoom, center]);

  // 更新缩放级别
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom);
    }
  }, [zoom]);

  // 更新中心点
  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setCenter(new AMapRef.current.LngLat(center[1], center[0]));
    }
  }, [center]);

  // 更新标记点
  useEffect(() => {
    if (!mapRef.current || !AMapRef.current || !isMapLoaded) return;

    // 清除现有标记
    markersRef.current.forEach(marker => {
      mapRef.current.remove(marker);
    });
    markersRef.current = [];

    // 添加新标记
    nodes.forEach(node => {
      const isStart = node.id === startNode;
      const isEnd = node.id === endNode;
      const isInRoute = routePath.includes(node.id);

      const iconSize = isStart || isEnd ? 36 : 28;
      const fontSize = isStart || isEnd ? 14 : 12;
      const bgColor = isStart ? '#22c55e' : isEnd ? '#ef4444' : isInRoute ? '#f97316' : '#3b82f6';
      const label = isStart ? '起' : isEnd ? '终' : '';

      const markerContent = `
        <div style="
          width: ${iconSize}px;
          height: ${iconSize}px;
          background-color: ${bgColor};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: ${fontSize}px;
        ">
          ${label}
        </div>
      `;

      const marker = new AMapRef.current.Marker({
        position: new AMapRef.current.LngLat(node.lng, node.lat),
        content: markerContent,
        offset: new AMapRef.current.Pixel(-iconSize/2, -iconSize/2),
        title: node.name || '',
      });

      if (node.name) {
        marker.on('click', () => {
          mapRef.current.setCenter(marker.getPosition());
        });
      }

      mapRef.current.add(marker);
      markersRef.current.push(marker);
    });

    if (nodes.length > 0) {
      setTimeout(() => {
        mapRef.current.setFitView(markersRef.current, false, [50, 50, 50, 50]);
      }, 100);
    }
  }, [nodes, startNode, endNode, routePath, isMapLoaded]);

  // 更新路线
  useEffect(() => {
    if (!mapRef.current || !AMapRef.current || !isMapLoaded) return;

    if (routeLineRef.current) {
      mapRef.current.remove(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (routePath.length > 1) {
      const routeCoords = routePath
        .map(nodeId => {
          const node = nodes.find(n => n.id === nodeId);
          return node ? new AMapRef.current.LngLat(node.lng, node.lat) : null;
        })
        .filter(Boolean);

      if (routeCoords.length > 1) {
        routeLineRef.current = new AMapRef.current.Polyline({
          path: routeCoords,
          strokeColor: '#ef4444',
          strokeWeight: 5,
          strokeOpacity: 0.8,
          strokeStyle: 'dashed',
          lineJoin: 'round',
        });
        mapRef.current.add(routeLineRef.current);
      }
    }
  }, [routePath, nodes, isMapLoaded]);

  // 处理高德路线规划结果
  useEffect(() => {
    if (!mapRef.current || !AMapRef.current || !isMapLoaded || !routeSearchResult) return;

    // 清除之前的路线
    if (routeLineRef.current) {
      mapRef.current.remove(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (routeSearchResult.path && routeSearchResult.path.length > 1) {
      const routeCoords = routeSearchResult.path.map(
        ([lng, lat]: [number, number]) => new AMapRef.current.LngLat(lng, lat)
      );

      routeLineRef.current = new AMapRef.current.Polyline({
        path: routeCoords,
        strokeColor: '#3388ff',
        strokeWeight: 6,
        strokeOpacity: 0.9,
        lineJoin: 'round',
      });
      mapRef.current.add(routeLineRef.current);
      mapRef.current.setFitView(routeLineRef.current, false, [60, 60, 60, 60]);
    }
  }, [routeSearchResult, isMapLoaded]);

  // 搜索起点POI
  const searchStartPoi = useCallback((keyword: string) => {
    if (!keyword.trim() || !placeSearchRef.current) return;

    setIsSearchingStart(true);
    placeSearchRef.current.search(keyword, (status: string, result: any) => {
      setIsSearchingStart(false);
      if (status === 'complete' && result.poiList && result.poiList.pois) {
        setStartPoiResults(result.poiList.pois);
      } else {
        setStartPoiResults([]);
      }
    });
  }, []);

  // 搜索终点POI
  const searchEndPoi = useCallback((keyword: string) => {
    if (!keyword.trim() || !placeSearchRef.current) return;

    setIsSearchingEnd(true);
    placeSearchRef.current.search(keyword, (status: string, result: any) => {
      setIsSearchingEnd(false);
      if (status === 'complete' && result.poiList && result.poiList.pois) {
        setEndPoiResults(result.poiList.pois);
      } else {
        setEndPoiResults([]);
      }
    });
  }, []);

  // 选择起点
  const handleSelectStart = (poi: any) => {
    setSelectedStart({
      name: poi.name,
      lat: poi.location.lat,
      lng: poi.location.lng,
      address: poi.address
    });
    setStartPoiResults([]);
    setStartSearchQuery(poi.name);

    // 添加或更新起点标记
    if (startMarkerRef.current) {
      mapRef.current.remove(startMarkerRef.current);
    }

    const startIcon = `
      <div style="
        width: 32px;
        height: 32px;
        background-color: #22c55e;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">起</div>
    `;

    startMarkerRef.current = new AMapRef.current.Marker({
      position: poi.location,
      content: startIcon,
      offset: new AMapRef.current.Pixel(-16, -16),
      title: poi.name
    });
    mapRef.current.add(startMarkerRef.current);
    mapRef.current.setCenter(poi.location);
    mapRef.current.setZoom(15);
  };

  // 选择终点
  const handleSelectEnd = (poi: any) => {
    setSelectedEnd({
      name: poi.name,
      lat: poi.location.lat,
      lng: poi.location.lng,
      address: poi.address
    });
    setEndPoiResults([]);
    setEndSearchQuery(poi.name);

    // 添加或更新终点标记
    if (endMarkerRef.current) {
      mapRef.current.remove(endMarkerRef.current);
    }

    const endIcon = `
      <div style="
        width: 32px;
        height: 32px;
        background-color: #ef4444;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">终</div>
    `;

    endMarkerRef.current = new AMapRef.current.Marker({
      position: poi.location,
      content: endIcon,
      offset: new AMapRef.current.Pixel(-16, -16),
      title: poi.name
    });
    mapRef.current.add(endMarkerRef.current);
    mapRef.current.setCenter(poi.location);
    mapRef.current.setZoom(15);
  };

  // 执行高德路线规划
  const handleRouteSearch = (mode: 'driving' | 'walking' | 'riding') => {
    if (!selectedStart || !selectedEnd || !mapRef.current || !AMapRef.current) {
      alert('请先选择起点和终点');
      return;
    }

    setIsRouting(true);
    setRouteInfo(null);

    // 清除之前的路线
    if (routeLineRef.current) {
      mapRef.current.remove(routeLineRef.current);
      routeLineRef.current = null;
    }

    const pluginName = mode === 'driving' ? 'AMap.Driving' : mode === 'walking' ? 'AMap.Walking' : 'AMap.Riding';

    AMapRef.current.plugin(pluginName, () => {
      const routeSearch = new AMapRef.current[mode === 'driving' ? 'Driving' : mode === 'walking' ? 'Walking' : 'Riding']({
        map: mapRef.current,
        panel: null,
        policy: mode === 'driving' ? AMapRef.current.DrivingPolicy.LEAST_TIME : undefined
      });

      routeSearch.search(
        new AMapRef.current.LngLat(selectedStart.lng, selectedStart.lat),
        new AMapRef.current.LngLat(selectedEnd.lng, selectedEnd.lat),
        (status: string, result: any) => {
          setIsRouting(false);
          if (status === 'complete' && result.routes && result.routes.length > 0) {
            const route = result.routes[0];
            const info = {
              distance: route.distance, // 米
              time: Math.round(route.time / 60) // 秒转分钟
            };
            setRouteInfo(info);
            if (onRouteComplete) {
              onRouteComplete(info);
            }
          } else {
            console.error('Route search failed:', result);
            alert('路线规划失败，请重试');
          }
        }
      );
    });
  };

  // 格式化距离
  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return (meters / 1000).toFixed(2) + ' 公里';
    }
    return meters + ' 米';
  };

  // 格式化时间
  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} 小时 ${mins} 分钟`;
    }
    return `${minutes} 分钟`;
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-100">
      {/* 高德路线搜索面板 */}
      {showRouteSearch && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">高德地图路线规划</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleRouteSearch('driving')}
                  disabled={!selectedStart || !selectedEnd || isRouting}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  驾车
                </button>
                <button
                  onClick={() => handleRouteSearch('walking')}
                  disabled={!selectedStart || !selectedEnd || isRouting}
                  className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  步行
                </button>
                <button
                  onClick={() => handleRouteSearch('riding')}
                  disabled={!selectedStart || !selectedEnd || isRouting}
                  className="px-3 py-1.5 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  骑行
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* 起点搜索 */}
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1">起点</label>
                <input
                  type="text"
                  value={startSearchQuery}
                  onChange={(e) => {
                    setStartSearchQuery(e.target.value);
                    if (e.target.value.length >= 2) {
                      searchStartPoi(e.target.value);
                    } else {
                      setStartPoiResults([]);
                    }
                  }}
                  placeholder="输入起点位置"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
                {isSearchingStart && (
                  <div className="absolute right-3 top-7 text-xs text-gray-400">搜索中...</div>
                )}
                {/* 起点搜索结果 */}
                {startPoiResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
                    {startPoiResults.map((poi, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectStart(poi)}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-sm text-gray-900">{poi.name}</div>
                        <div className="text-xs text-gray-500 truncate">{poi.address}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 终点搜索 */}
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1">终点</label>
                <input
                  type="text"
                  value={endSearchQuery}
                  onChange={(e) => {
                    setEndSearchQuery(e.target.value);
                    if (e.target.value.length >= 2) {
                      searchEndPoi(e.target.value);
                    } else {
                      setEndPoiResults([]);
                    }
                  }}
                  placeholder="输入终点位置"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
                {isSearchingEnd && (
                  <div className="absolute right-3 top-7 text-xs text-gray-400">搜索中...</div>
                )}
                {/* 终点搜索结果 */}
                {endPoiResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
                    {endPoiResults.map((poi, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectEnd(poi)}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-sm text-gray-900">{poi.name}</div>
                        <div className="text-xs text-gray-500 truncate">{poi.address}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 路线信息显示 */}
            {routeInfo && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{formatDistance(routeInfo.distance)}</div>
                    <div className="text-xs text-gray-500">预计距离</div>
                  </div>
                  <div className="w-px h-8 bg-blue-200"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{formatTime(routeInfo.time)}</div>
                    <div className="text-xs text-gray-500">预计时间</div>
                  </div>
                </div>
              </div>
            )}

            {isRouting && (
              <div className="mt-3 text-center text-sm text-gray-500">
                正在规划路线...
              </div>
            )}
          </div>
        </div>
      )}

      {/* 地图容器 */}
      <div ref={containerRef} style={{ height }} className="w-full" />

      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 text-xs shadow-lg z-10">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2 border-2 border-white shadow"></div>
          <span className="text-gray-700">起点</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2 border-2 border-white shadow"></div>
          <span className="text-gray-700">终点</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-0.5 bg-blue-500 mr-2"></div>
          <span className="text-gray-700">高德路线</span>
        </div>
      </div>

      {/* 高德地图logo */}
      <div className="absolute bottom-4 right-4 z-10">
        <img
          src="https://webapi.amap.com/assets/poi/diTieShi.png"
          alt="高德地图"
          style={{ height: '18px', opacity: 0.7 }}
        />
      </div>
    </div>
  );
}
