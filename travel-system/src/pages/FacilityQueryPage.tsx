import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Home,
  ShoppingBag,
  Utensils,
  Car,
  Gamepad2,
  Heart,
  Banknote,
  Info,
  Navigation,
  CheckCircle,
  Star
} from 'lucide-react';
import { facilities, Facility } from '../data/sampleData';
import { partialSort, calculateDistance, fuzzySearch } from '../utils/algorithms';

type FacilityType = 'all' | 'toilet' | 'shop' | 'restaurant' | 'parking' | 'entertainment' | 'medical' | 'atm' | 'info';

const facilityTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  toilet: Home,
  shop: ShoppingBag,
  restaurant: Utensils,
  parking: Car,
  entertainment: Gamepad2,
  medical: Heart,
  atm: Banknote,
  info: Info
};

const facilityTypeLabels: Record<string, string> = {
  toilet: '卫生间',
  shop: '商店',
  restaurant: '餐厅',
  parking: '停车场',
  entertainment: '娱乐设施',
  medical: '医疗点',
  atm: 'ATM',
  info: '服务中心'
};

export default function FacilityQueryPage() {
  const [selectedSpot, setSelectedSpot] = useState<string>('故宫博物院');
  const [selectedLocation, setSelectedLocation] = useState({ lat: 39.9163, lng: 116.3972 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FacilityType>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'time'>('distance');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  // 模拟用户当前位置到各设施的实际距离
  const facilitiesWithRealDistance = useMemo(() => {
    return facilities.map(f => ({
      ...f,
      realDistance: calculateDistance(selectedLocation.lat, selectedLocation.lng, f.lat, f.lng),
      walkingTime: Math.ceil(calculateDistance(selectedLocation.lat, selectedLocation.lng, f.lat, f.lng) / 80) // 假设步行速度80m/min
    }));
  }, [selectedLocation]);

  const filteredFacilities = useMemo(() => {
    let result = [...facilitiesWithRealDistance];

    // 搜索过滤
    if (searchQuery.trim()) {
      result = fuzzySearch(result, searchQuery, (facility) =>
        `${facility.name} ${facility.category} ${facility.description}`
      );
    }

    // 类型过滤
    if (filterType !== 'all') {
      result = result.filter(f => f.type === filterType);
    }

    // 使用部分排序算法（实际距离，而非直线距离）
    return partialSort(result, 20, (a, b) => {
      if (sortBy === 'distance') {
        return a.realDistance - b.realDistance;
      } else {
        return a.walkingTime - b.walkingTime;
      }
    });
  }, [facilitiesWithRealDistance, searchQuery, filterType, sortBy]);

  const handleLocationChange = (spot: string) => {
    setSelectedSpot(spot);
    // 模拟不同景点的位置
    const locations: Record<string, { lat: number; lng: number }> = {
      '故宫博物院': { lat: 39.9163, lng: 116.3972 },
      '清华大学': { lat: 40.0092, lng: 116.3246 },
      '西湖': { lat: 30.2465, lng: 120.1485 },
      '黄山': { lat: 30.1281, lng: 118.1596 }
    };
    setSelectedLocation(locations[spot] || locations['故宫博物院']);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-red-600 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">场所查询</h1>
        <p className="text-red-100">查找附近设施，按实际距离智能排序</p>
      </div>

      {/* Location Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              当前所在景区/学校
            </label>
            <select
              value={selectedSpot}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="故宫博物院">故宫博物院</option>
              <option value="清华大学">清华大学</option>
              <option value="西湖">西湖</option>
              <option value="黄山">黄山</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            当前位置: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索设施名称、类别..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-2">
          <Filter className="w-4 h-4 text-gray-500 mr-2" />
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filterType === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          {Object.entries(facilityTypeLabels).map(([key, label]) => {
            const Icon = facilityTypeIcons[key] || Info;
            return (
              <button
                key={key}
                onClick={() => setFilterType(key as FacilityType)}
                className={`flex items-center space-x-1 px-3 py-1 text-sm rounded-full transition-colors ${
                  filterType === key
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Option */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">排序方式:</span>
          <label className="flex items-center">
            <input
              type="radio"
              name="sort"
              value="distance"
              checked={sortBy === 'distance'}
              onChange={() => setSortBy('distance')}
              className="mr-2"
            />
            <span className="text-sm">按实际距离</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sort"
              value="time"
              checked={sortBy === 'time'}
              onChange={() => setSortBy('time')}
              className="mr-2"
            />
            <span className="text-sm">按步行时间</span>
          </label>
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
              使用<span className="font-medium">实际距离排序</span>（非直线距离），
              结合Haversine公式计算地球表面两点间的真实距离。
              支持按类别过滤，使用<span className="font-medium">部分排序算法</span>
              高效返回排序结果。
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <div className="text-gray-600">
          找到 <span className="font-semibold text-red-600">{filteredFacilities.length}</span> 个设施
        </div>

        {filteredFacilities.map((facility, index) => {
          const Icon = facilityTypeIcons[facility.type] || Info;
          return (
            <div
              key={facility.id}
              onClick={() => setSelectedFacility(facility)}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                {/* Index Badge */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-amber-600' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{facility.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {facility.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{facility.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm">
                      <Navigation className="w-4 h-4 mr-1 text-red-500" />
                      <span className="font-medium">{facility.realDistance.toFixed(0)}米</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>步行约{facility.walkingTime}分钟</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {filteredFacilities.length === 0 && (
          <div className="text-center py-12">
            <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关设施</h3>
            <p className="text-gray-500">请尝试调整搜索条件或过滤器</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    {React.createElement(facilityTypeIcons[selectedFacility.type] || Info, {
                      className: 'w-6 h-6 text-red-600'
                    })}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedFacility.name}</h2>
                    <p className="text-sm text-gray-500">{selectedFacility.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 mb-4">{selectedFacility.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">实际距离</div>
                  <div className="text-xl font-bold text-red-600">
                    {selectedFacility.distance}米
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">步行时间</div>
                  <div className="text-xl font-bold text-blue-600">
                    {selectedFacility.walkingTime}分钟
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="text-sm text-blue-800">
                  <strong>提示：</strong>此距离为实际路径距离，非直线距离。
                  实际步行可能因道路情况而有所不同。
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  导航前往
                </button>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
