import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  Footprints,
  Bike,
  Zap,
  Building,
  Layers,
  ArrowRight,
  Clock,
  Route as RouteIcon,
  CheckCircle,
  Mountain,
  School,
  Globe
} from 'lucide-react';
import { routeNodes, routeEdges, indoorNodes, scenicRouteNodes, scenicRouteEdges } from '../data/sampleData';
import { dijkstra, multiPointPath, PathResult } from '../utils/algorithms';
import MapView from '../components/MapView';
import AMapView from '../components/AMapView';

type StrategyType = 'distance' | 'time' | 'transport';
type TransportMode = 'walk' | 'bike' | 'shuttle';
type NavigationMode = 'outdoor' | 'indoor' | 'amap'; // 添加高德地图模式
type LocationType = 'school' | 'scenic';
type MapType = 'amap' | 'leaflet';

const strategies = [
  { id: 'distance', label: '最短距离', icon: MapPin, description: '距离最短即可' },
  { id: 'time', label: '最短时间', icon: Clock, description: '考虑道路拥挤度的时间最短' },
  { id: 'transport', label: '交通工具最短时间', icon: Bike, description: '混合多种交通工具' }
];

const schoolTransportModes = [
  { id: 'walk', label: '步行', icon: Footprints, speed: 1.0 },
  { id: 'bike', label: '自行车', icon: Bike, speed: 3.0 }
];

const scenicTransportModes = [
  { id: 'walk', label: '步行', icon: Footprints, speed: 1.0 },
  { id: 'shuttle', label: '电瓶车', icon: Zap, speed: 2.0 }
];

export default function RoutePlanningPage() {
  const [locationType, setLocationType] = useState<LocationType>('school');
  const [navigationMode, setNavigationMode] = useState<NavigationMode>('outdoor');
  const [strategy, setStrategy] = useState<StrategyType>('distance');
  const [transportMode, setTransportMode] = useState<TransportMode>('walk');
  const [startNode, setStartNode] = useState<string>('');
  const [endNode, setEndNode] = useState<string>('');
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [routeResult, setRouteResult] = useState<PathResult | null>(null);
  const [showMultiTarget, setShowMultiTarget] = useState(false);
  const [mapType, setMapType] = useState<MapType>('amap'); // 默认使用高德地图

  // Indoor navigation state
  const [indoorStart, setIndoorStart] = useState<string>('');
  const [indoorEnd, setIndoorEnd] = useState<string>('');
  const [currentFloor, setCurrentFloor] = useState<number>(1);

  // Get current nodes and edges based on location type
  const currentNodes = locationType === 'school' ? routeNodes : scenicRouteNodes;
  const currentEdges = locationType === 'school' ? routeEdges : scenicRouteEdges;

  const graphNodes = useMemo(() =>
    currentNodes.map(n => ({ id: n.id, lat: n.lat, lng: n.lng })),
    [currentNodes]
  );

  const graphEdges = useMemo(() => {
    return currentEdges.map(e => ({
      from: e.from,
      to: e.to,
      distance: e.distance,
      time: e.time,
      congestion: e.congestion
    }));
  }, [currentEdges]);

  const handleCalculateRoute = () => {
    if (!startNode || !endNode) return;

    const result = dijkstra(
      graphNodes,
      graphEdges,
      startNode,
      endNode,
      strategy === 'time' ? 'time' : 'distance'
    );

    setRouteResult(result);
  };

  const handleMultiTargetRoute = () => {
    if (!startNode || selectedTargets.length === 0) return;

    const result = multiPointPath(
      graphNodes,
      graphEdges,
      startNode,
      selectedTargets,
      strategy === 'time' ? 'time' : 'distance'
    );

    setRouteResult(result);
  };

  const getNodeName = (nodeId: string) => {
    return currentNodes.find(n => n.id === nodeId)?.name || nodeId;
  };

  const getNodeCoords = (nodeId: string) => {
    const node = currentNodes.find(n => n.id === nodeId);
    return node ? { lat: node.lat, lng: node.lng } : null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-red-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">路线规划</h1>
        <p className="text-red-100">智能规划最优参观线路，支持多种导航策略</p>
      </div>

      {/* Location Type Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-3">选择导航区域</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setLocationType('school');
              setStartNode('');
              setEndNode('');
              setSelectedTargets([]);
              setRouteResult(null);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              locationType === 'school'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <School className="w-5 h-5" />
            <span className="font-medium">学校校区</span>
          </button>
          <button
            onClick={() => {
              setLocationType('scenic');
              setStartNode('');
              setEndNode('');
              setSelectedTargets([]);
              setRouteResult(null);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              locationType === 'scenic'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Mountain className="w-5 h-5" />
            <span className="font-medium">景区内部</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {locationType === 'school'
            ? `当前：学校校区模式（${routeNodes.length} 个节点）`
            : `当前：景区内部模式（${scenicRouteNodes.length} 个节点）`
          }
        </p>
      </div>

      {/* Mode Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setNavigationMode('amap')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              navigationMode === 'amap'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Globe className="w-5 h-5" />
            <span>高德地图</span>
          </button>
          <button
            onClick={() => setNavigationMode('outdoor')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              navigationMode === 'outdoor'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>室外导航</span>
          </button>
          {locationType === 'school' && (
            <button
              onClick={() => setNavigationMode('indoor')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                navigationMode === 'indoor'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Building className="w-5 h-5" />
              <span>室内导航</span>
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {navigationMode === 'amap' && (
            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              使用高德地图搜索真实地点并规划路线
            </span>
          )}
          {navigationMode === 'outdoor' && (
            <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
              在景区/学校节点间规划最短路径
            </span>
          )}
          {navigationMode === 'indoor' && (
            <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              教学楼内部导航
            </span>
          )}
        </div>
      </div>

      {navigationMode === 'amap' ? (
        <>
          {/* AMap Real Route Search */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                高德地图真实路线规划
              </h3>
              <p className="text-sm text-gray-600 mt-1">使用高德地图搜索真实地点，规划驾车、步行或骑行路线</p>
            </div>
            <AMapView
              height="500px"
              showRouteSearch={true}
            />
          </div>
        </>
      ) : navigationMode === 'outdoor' ? (
        <>
          {/* Outdoor Navigation */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* Start & End Points */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-4">设置起点和终点</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      起点位置
                    </label>
                    <select
                      value={startNode}
                      onChange={(e) => setStartNode(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">选择起点</option>
                      {currentNodes.map(node => (
                        <option key={node.id} value={node.id}>
                          {node.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {showMultiTarget ? '途经景点（可多选）' : '终点位置'}
                    </label>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowMultiTarget(false)}
                      className={`px-4 py-2 rounded-lg ${
                        !showMultiTarget
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      单点导航
                    </button>
                    <button
                      onClick={() => setShowMultiTarget(true)}
                      className={`px-4 py-2 rounded-lg ${
                        showMultiTarget
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      多点环线
                    </button>
                  </div>

                  {showMultiTarget ? (
                    <div className="grid grid-cols-2 gap-2">
                      {currentNodes
                        .filter(n => n.type === 'spot' || n.type === 'entrance')
                        .map(node => (
                          <label
                            key={node.id}
                            className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                              selectedTargets.includes(node.id)
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedTargets.includes(node.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTargets([...selectedTargets, node.id]);
                                } else {
                                  setSelectedTargets(selectedTargets.filter(id => id !== node.id));
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="text-sm">{node.name}</span>
                          </label>
                        ))}
                    </div>
                  ) : (
                    <select
                      value={endNode}
                      onChange={(e) => setEndNode(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">选择终点</option>
                      {currentNodes.map(node => (
                        <option key={node.id} value={node.id}>
                          {node.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Strategy Selection */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-4">规划策略</h3>
                <div className="space-y-3">
                  {strategies.map(s => {
                    const Icon = s.icon;
                    return (
                      <label
                        key={s.id}
                        className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
                          strategy === s.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="strategy"
                          value={s.id}
                          checked={strategy === s.id}
                          onChange={(e) => setStrategy(e.target.value as StrategyType)}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className="flex items-center">
                            <Icon className="w-4 h-4 mr-2 text-red-600" />
                            <span className="font-medium">{s.label}</span>
                            {s.id === 'time' && (
                              <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded">
                                核心算法
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{s.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {strategy === 'transport' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      选择交通工具
                    </label>
                    <div className="flex space-x-3">
                      {(locationType === 'school' ? schoolTransportModes : scenicTransportModes).map(t => {
                        const Icon = t.icon;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setTransportMode(t.id as TransportMode)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                              transportMode === t.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Calculate Button */}
              <button
                onClick={showMultiTarget ? handleMultiTargetRoute : handleCalculateRoute}
                disabled={!startNode || (!endNode && selectedTargets.length === 0)}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {showMultiTarget ? '计算多点环线路线' : '计算最短路线'}
              </button>

              {/* Algorithm Explanation */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">核心算法说明</h3>
                    <p className="text-sm text-gray-600">
                      <span className="text-red-600 font-medium">Dijkstra最短路径算法：</span>
                      使用堆优化的Dijkstra算法，时间复杂度 O((V+E) log V)，
                      支持最短距离、最短时间、交通工具混合等多种策略。
                      多点环线使用<span className="text-red-600">TSP贪心近似算法</span>，
                      从起点依次选择最近的未访问节点，最后返回起点。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Visualization */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Map Type Toggle */}
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">选择地图</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setMapType('amap')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        mapType === 'amap'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      高德地图
                    </button>
                    <button
                      onClick={() => setMapType('leaflet')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        mapType === 'leaflet'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      OpenStreetMap
                    </button>
                  </div>
                </div>
              </div>

              {mapType === 'amap' ? (
                <AMapView
                  nodes={currentNodes.map(n => ({
                    id: n.id,
                    lat: n.lat,
                    lng: n.lng,
                    name: n.name
                  }))}
                  routePath={routeResult?.path || []}
                  startNode={startNode}
                  endNode={endNode}
                  height="380px"
                />
              ) : (
                <MapView
                  nodes={currentNodes.map(n => ({
                    id: n.id,
                    lat: n.lat,
                    lng: n.lng,
                    name: n.name
                  }))}
                  routePath={routeResult?.path || []}
                  startNode={startNode}
                  endNode={endNode}
                  height="380px"
                />
              )}

              {/* Route Info */}
              {routeResult && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <RouteIcon className="w-4 h-4 text-red-600 mr-2" />
                      <span className="font-medium">总距离: {routeResult.totalDistance.toFixed(0)}米</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="font-medium">预计时间: {routeResult.totalTime}分钟</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Route Steps */}
          {routeResult && (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">导航步骤</h3>
              <div className="space-y-3">
                {routeResult.steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      {index < routeResult.steps.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-1"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{getNodeName(step.from)}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{getNodeName(step.to)}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        距离: {step.distance}米 | 步行约{step.time}分钟
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Indoor Navigation */
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-red-600" />
                室内导航
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    当前楼层
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map(floor => (
                      <button
                        key={floor}
                        onClick={() => setCurrentFloor(floor)}
                        className={`px-4 py-2 rounded-lg ${
                          currentFloor === floor
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {floor}F
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    起点位置
                  </label>
                  <select
                    value={indoorStart}
                    onChange={(e) => setIndoorStart(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">选择起点</option>
                    {indoorNodes
                      .filter(n => n.floor === currentFloor)
                      .map(node => (
                        <option key={node.id} value={node.id}>
                          {node.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    终点位置
                  </label>
                  <select
                    value={indoorEnd}
                    onChange={(e) => setIndoorEnd(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">选择终点</option>
                    {indoorNodes.map(node => (
                      <option key={node.id} value={node.id}>
                        {node.name} ({node.floor}F)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Layers className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">室内导航策略</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 大门到电梯的导航</li>
                    <li>• 楼层间的电梯导航</li>
                    <li>• 楼层内到房间的导航</li>
                    <li>• 楼梯切换楼层导航</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Floor Plan */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">
                {currentFloor}F 平面图 - 教学楼A
              </h3>
            </div>
            <div className="relative h-80 bg-gray-50">
              <svg className="w-full h-full" viewBox="0 0 300 200">
                {/* Building outline */}
                <rect x="20" y="20" width="260" height="160" fill="#f9fafb" stroke="#374151" strokeWidth="2" />

                {/* Rooms */}
                <rect x="30" y="30" width="80" height="60" fill="#dbeafe" stroke="#3b82f6" />
                <text x="70" y="65" textAnchor="middle" fontSize="12" fill="#1e40af">
                  {currentFloor}01教室
                </text>

                <rect x="120" y="30" width="80" height="60" fill="#dbeafe" stroke="#3b82f6" />
                <text x="160" y="65" textAnchor="middle" fontSize="12" fill="#1e40af">
                  {currentFloor}02教室
                </text>

                <rect x="210" y="30" width="60" height="60" fill="#fef3c7" stroke="#f59e0b" />
                <text x="240" y="65" textAnchor="middle" fontSize="12" fill="#92400e">
                  {currentFloor === 1 ? '入口' : currentFloor === 2 ? '楼梯' : '会议室'}
                </text>

                {/* Elevator */}
                <rect x="120" y="100" width="40" height="50" fill="#fecaca" stroke="#ef4444" />
                <text x="140" y="130" textAnchor="middle" fontSize="10" fill="#991b1b">
                  电梯
                </text>

                {/* Corridor */}
                <rect x="30" y="100" width="80" height="10" fill="#e5e7eb" />
                <rect x="170" y="100" width="100" height="10" fill="#e5e7eb" />
              </svg>

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 text-xs">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-blue-100 border border-blue-500 mr-2"></div>
                  <span>教室</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-red-100 border border-red-500 mr-2"></div>
                  <span>电梯</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 mr-2"></div>
                  <span>走廊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
