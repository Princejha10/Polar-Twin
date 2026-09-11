import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Station } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowRight, Compass } from 'lucide-react';

interface GlobeViewerProps {
  stations: Station[];
  selectedStationId?: string | null;
  onSelectStation?: (station: Station) => void;
  onOpenStationDetail?: (stationId: string) => void;
}

// Convert Lat/Lng to 3D Cartesian coordinates on sphere radius R
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Procedural Realistic Earth Texture Generator (Canvas 2D -> CanvasTexture)
function createEarthCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Deep Blue Ocean Base
    ctx.fillStyle = '#1A3B5C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ocean depth gradient lines / currents
    ctx.fillStyle = '#16324F';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect(0, i * 25, canvas.width, 10);
    }

    // 2. Realistic Landmass Continents (Natural Olive Green / Sage Earth)
    ctx.fillStyle = '#4D6B53';

    // Helper to draw approximate latitude/longitude continent polygons
    const drawLand = (path: [number, number][]) => {
      ctx.beginPath();
      path.forEach(([lng, lat], index) => {
        const x = ((lng + 180) / 360) * canvas.width;
        const y = ((90 - lat) / 180) * canvas.height;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
    };

    // Eurasia & Africa
    drawLand([
      [-10, 35], [20, 38], [40, 42], [70, 60], [140, 70], [170, 60], 
      [140, 35], [100, 10], [80, 8], [75, 20], [60, 25], [45, 12], 
      [50, -35], [20, -35], [10, 5], [-18, 15], [-10, 35]
    ]);

    // North America
    drawLand([
      [-168, 65], [-140, 70], [-80, 75], [-60, 45], [-75, 30], 
      [-90, 30], [-105, 20], [-120, 35], [-130, 50], [-168, 65]
    ]);

    // South America
    drawLand([
      [-80, 10], [-40, -5], [-35, -10], [-50, -40], [-70, -55], [-75, -40], [-80, 10]
    ]);

    // Australia & Indonesia
    drawLand([
      [112, -15], [140, -12], [152, -25], [140, -38], [115, -35], [112, -15]
    ]);

    // India Subcontinent (Distinctive Peninsula for NCPOR Context)
    ctx.fillStyle = '#5A7A60';
    drawLand([
      [68, 24], [78, 30], [88, 22], [80, 8], [77, 8], [68, 24]
    ]);

    // 3. Polar Ice Caps (White Antarctica & Arctic)
    ctx.fillStyle = '#EBF2F7';

    // Arctic Top Ice Cap
    ctx.fillRect(0, 0, canvas.width, 40);

    // Antarctica Continent (South Pole Ice Dome)
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height, canvas.height * 0.22, 0, Math.PI * 2);
    ctx.fill();

    // Antarctica Details (Queen Maud Land, Larsemann Hills, Antarctic Peninsula)
    drawLand([
      [-180, -60], [-120, -65], [-60, -62], [-55, -68], [0, -66], 
      [20, -68], [70, -66], [120, -64], [160, -68], [180, -60], 
      [180, -90], [-180, -90]
    ]);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 3D Realistic Earth Sphere Component
const EarthMesh: React.FC = () => {
  const globeRef = useRef<THREE.Group>(null);
  const earthTexture = useMemo(() => createEarthCanvasTexture(), []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      // Subtle continuous planetary rotation
      globeRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group ref={globeRef} rotation={[0.75, 0.3, 0]}>
      {/* Primary Realistic Earth Globe */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Natural Atmosphere Shell */}
      <mesh scale={1.035}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#6B9AC4"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Lat/Lng Context Lines */}
      <mesh scale={1.002}>
        <sphereGeometry args={[2.5, 18, 18]} />
        <meshBasicMaterial
          color="#8A969C"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </group>
  );
};

// Station Marker Pin & HTML Overlay Card
const StationMarker3D: React.FC<{
  station: Station;
  isSelected: boolean;
  onSelect: (st: Station) => void;
  onOpenView: (id: string) => void;
}> = ({ station, isSelected, onSelect, onOpenView }) => {
  const pos = latLngToVector3(station.coordinates.lat, station.coordinates.lng, 2.52);
  const [hovered, setHovered] = useState(false);

  // Muted status colors (Sage Green / Sand Amber)
  const markerColor = station.status === 'NORMAL' ? '#6F9278' : '#B09663';

  return (
    <group position={pos}>
      {/* 3D Pin Head */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(station);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={hovered || isSelected ? 0.7 : 0.3}
        />
      </mesh>

      {/* Muted Ring */}
      <mesh scale={hovered || isSelected ? 1.5 : 1.1}>
        <ringGeometry args={[0.07, 0.09, 32]} />
        <meshBasicMaterial color={markerColor} side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Smoke-White Telemetry Popup Card */}
      <Html
        position={[0, 0.25, 0]}
        center
        distanceFactor={6}
        className="pointer-events-auto transition-all duration-180 z-50"
      >
        <div
          onClick={() => onSelect(station)}
          className={`cursor-pointer rounded-[10px] p-3.5 font-sans select-none transition-all duration-180 min-w-[210px] ${
            isSelected
              ? 'bg-[#101820]/95 border border-[#7895A8]/50 shadow-dark-subtle'
              : 'bg-[#101820]/90 border border-[rgba(190,205,215,0.12)] hover:border-[#7895A8]/40'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="font-semibold text-xs text-[#E4E8EB] tracking-wide">{station.name}</span>
            <StatusBadge status={station.status} size="sm" />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-[#9AA7B1] py-1.5 border-y border-[rgba(190,205,215,0.08)] my-1.5 font-sans">
            <div>
              <span>Temp: </span>
              <span className="font-mono text-[#E4E8EB] font-medium">{station.temperature}°C</span>
            </div>
            <div>
              <span>Wind: </span>
              <span className="font-mono text-[#E4E8EB] font-medium">{station.windSpeed} km/h</span>
            </div>
            <div>
              <span>Fuel: </span>
              <span className={`font-mono font-medium ${station.fuelLevel < 65 ? 'text-[#B29A6A]' : 'text-[#7D9B83]'}`}>
                {station.fuelLevel}%
              </span>
            </div>
            <div>
              <span>Power: </span>
              <span className="font-mono text-[#7D9B83] font-medium">{station.powerLevel}%</span>
            </div>
          </div>

          {/* Action Button */}
          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenView(station.id);
              }}
              className="w-full mt-2 px-3 py-1.5 rounded-md bg-[#7895A8] hover:bg-[#8BA7BA] text-[#080D12] font-semibold text-[10px] flex items-center justify-center space-x-1.5 transition-all shadow-subtle"
            >
              <Eye className="w-3 h-3" />
              <span>VIEW STATION</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </Html>
    </group>
  );
};

export const GlobeViewer: React.FC<GlobeViewerProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  onOpenStationDetail
}) => {
  const navigate = useNavigate();

  const handleSelect = (st: Station) => {
    if (onSelectStation) {
      onSelectStation(st);
    }
  };

  const handleOpenView = (id: string) => {
    if (onOpenStationDetail) {
      onOpenStationDetail(id);
    } else {
      navigate(`/stations/${id}`);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-[10px] overflow-hidden glass-panel border border-[rgba(190,205,215,0.10)]">
      {/* 3D Scene Controls Overlay Banner */}
      <div className="absolute top-3 left-3 z-10 font-sans text-xs flex items-center space-x-2 bg-[#0C1218]/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-[rgba(190,205,215,0.12)] text-[#E4E8EB] shadow-subtle">
        <Compass className="w-3.5 h-3.5 text-[#7895A8]" />
        <span className="font-medium">3D DIGITAL TWIN - RECOGNIZABLE EARTH GLOBE</span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, -1.8, 4.8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#7895A5" />

        <EarthMesh />

        {stations.map((st) => (
          <StationMarker3D
            key={st.id}
            station={st}
            isSelected={selectedStationId === st.id}
            onSelect={handleSelect}
            onOpenView={handleOpenView}
          />
        ))}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.8}
          rotateSpeed={0.6}
          minDistance={3.2}
          maxDistance={8.0}
        />
      </Canvas>

      {/* Bottom Controls Legend */}
      <div className="absolute bottom-3 left-3 z-10 text-[10px] font-mono text-[#9AA7B1] bg-[#0C1218]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[rgba(190,205,215,0.12)] flex items-center gap-2">
        <span>Rotate: Left Click + Drag</span>
        <span>•</span>
        <span>Zoom: Scroll</span>
        <span>•</span>
        <span>Pan: Right Click</span>
      </div>
    </div>
  );
};
