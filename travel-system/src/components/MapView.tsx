import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with webpack/vite
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapNode {
  id: string;
  lat: number;
  lng: number;
  name?: string;
}

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  nodes?: MapNode[];
  routePath?: string[];
  startNode?: string;
  endNode?: string;
  height?: string;
}

export default function MapView({
  center = [39.9042, 116.4074], // Beijing by default
  zoom = 14,
  nodes = [],
  routePath = [],
  startNode,
  endNode,
  height = '400px'
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when it changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  // Update markers when nodes change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each node
    nodes.forEach(node => {
      const isStart = node.id === startNode;
      const isEnd = node.id === endNode;
      const isInRoute = routePath.includes(node.id);

      // Create custom icon based on node type
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: ${isStart || isEnd ? '32px' : '24px'};
            height: ${isStart || isEnd ? '32px' : '24px'};
            background-color: ${isStart ? '#22c55e' : isEnd ? '#ef4444' : isInRoute ? '#f97316' : '#3b82f6'};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
          ">
            ${isStart ? '起' : isEnd ? '终' : ''}
          </div>
        `,
        iconSize: [isStart || isEnd ? 32 : 24, isStart || isEnd ? 32 : 24],
        iconAnchor: [isStart || isEnd ? 16 : 12, isStart || isEnd ? 16 : 12],
      });

      const marker = L.marker([node.lat, node.lng], { icon })
        .addTo(mapInstanceRef.current);

      if (node.name) {
        marker.bindPopup(`<b>${node.name}</b>`);
      }

      markersRef.current.push(marker);
    });

    // Fit bounds if we have nodes
    if (nodes.length > 0) {
      const bounds = L.latLngBounds(nodes.map(n => [n.lat, n.lng]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [nodes, startNode, endNode, routePath]);

  // Update route path when it changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove existing polyline
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    // Add new polyline if we have a route
    if (routePath.length > 1) {
      const routeCoords = routePath
        .map(nodeId => {
          const node = nodes.find(n => n.id === nodeId);
          return node ? [node.lat, node.lng] as [number, number] : null;
        })
        .filter(Boolean) as [number, number][];

      if (routeCoords.length > 1) {
        polylineRef.current = L.polyline(routeCoords, {
          color: '#ef4444',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 10',
        }).addTo(mapInstanceRef.current);
      }
    }
  }, [routePath, nodes]);

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div ref={mapRef} style={{ height }} className="w-full" />

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 text-xs shadow-lg z-[1000]">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2 border border-white"></div>
          <span>起点</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2 border border-white"></div>
          <span>终点</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-orange-500 mr-2 border border-white"></div>
          <span>途经点</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 border border-white"></div>
          <span>景点</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-0.5 bg-red-500 mr-2" style={{ borderStyle: 'dashed' }}></div>
          <span>路线</span>
        </div>
      </div>
    </div>
  );
}
