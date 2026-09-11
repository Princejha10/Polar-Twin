import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Station, Asset } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Zap, Wrench, Radio } from 'lucide-react';

interface Station3DTwinProps {
  station: Station;
  assets: Asset[];
  onSelectAsset?: (asset: Asset) => void;
}

const StationScene3D: React.FC<{
  station: Station;
  assets: Asset[];
  onSelectAsset?: (asset: Asset) => void;
}> = ({ station, assets, onSelectAsset }) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const gen2Asset = assets.find((a) => a.id === 'gen-02' || a.name.includes('#02'));

  return (
    <group>
      {/* 1. Realistic Snow Terrain Base */}
      <mesh receiveShadow position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40, 32, 32]} />
        <meshStandardMaterial
          color="#EDF2F4"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Subtle Muted Terrain Grid Lines */}
      <gridHelper args={[40, 40, '#B8C6D0', '#D5DFE5']} position={[0, 0.01, 0]} />

      {/* 2. Main Station Research Building Complex (Off-White & Slate Blue) */}
      <group position={[0, 0.8, 0]}>
        {/* Central Main Building Module */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[6, 1.6, 3]} />
          <meshStandardMaterial color="#E2E8ED" roughness={0.3} metalness={0.3} />
        </mesh>

        {/* Roof Accent Panel */}
        <mesh castShadow receiveShadow position={[0, 0.85, 0]}>
          <boxGeometry args={[5.8, 0.1, 2.8]} />
          <meshStandardMaterial color="#557A91" roughness={0.4} metalness={0.5} />
        </mesh>

        {/* Living Quarters Wing */}
        <mesh castShadow receiveShadow position={[-2.5, 0, 2.5]}>
          <boxGeometry args={[3, 1.4, 2]} />
          <meshStandardMaterial color="#D8E2E8" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Laboratory Wing */}
        <mesh castShadow receiveShadow position={[2.5, 0, 2.5]}>
          <boxGeometry args={[3, 1.4, 2]} />
          <meshStandardMaterial color="#D8E2E8" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Windows */}
        <mesh position={[0, 0.4, 1.51]}>
          <planeGeometry args={[4, 0.5]} />
          <meshStandardMaterial color="#7895A5" transparent opacity={0.7} />
        </mesh>

        {/* Station Label Badge */}
        <Html position={[0, 1.1, 0]} center className="pointer-events-none select-none">
          <div className="bg-[#101820]/95 text-[#E4E8EB] border border-[rgba(190,205,215,0.12)] px-2.5 py-0.5 rounded font-sans text-[11px] font-semibold tracking-wide shadow-subtle">
            {station.name} MAIN HABITAT
          </div>
        </Html>
      </group>

      {/* 3. Communication Radome Tower */}
      <group position={[-5, 0, -3]}>
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 4, 16]} />
          <meshStandardMaterial color="#8A9AA5" metalness={0.8} />
        </mesh>
        <mesh position={[0, 4, 0]}>
          <sphereGeometry args={[0.9, 24, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
        <Html position={[0, 5.2, 0]} center className="pointer-events-none">
          <div className="text-[10px] font-sans bg-[#101820]/90 text-[#9AA7B1] px-2 py-0.5 rounded border border-[rgba(190,205,215,0.12)] flex items-center gap-1 shadow-subtle">
            <Radio className="w-3 h-3 text-[#7895A8]" /> ISRO Ku-Band Satellite Dish
          </div>
        </Html>
      </group>

      {/* 4. Power House / Generator Building (Interactive Asset: Generator #02) */}
      <group
        position={[6, 0, -2]}
        onClick={() => gen2Asset && onSelectAsset && onSelectAsset(gen2Asset)}
        onPointerOver={() => setActiveHoverId('gen-02')}
        onPointerOut={() => setActiveHoverId(null)}
      >
        <mesh castShadow position={[0, 1, 0]}>
          <boxGeometry args={[4, 2, 3]} />
          <meshStandardMaterial
            color="#D0D9E0"
            roughness={0.4}
            metalness={0.4}
          />
        </mesh>

        {/* Warning Border Outline */}
        <mesh position={[0, 1, 0]} scale={1.02}>
          <boxGeometry args={[4, 2, 3]} />
          <meshBasicMaterial
            color="#B29A6A"
            wireframe
            transparent
            opacity={activeHoverId === 'gen-02' ? 0.7 : 0.25}
          />
        </mesh>

        {/* Exhaust Stacks */}
        <mesh position={[-1, 2.3, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshStandardMaterial color="#64727A" metalness={0.8} />
        </mesh>
        <mesh position={[1, 2.3, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshStandardMaterial color="#64727A" metalness={0.8} />
        </mesh>

        <Html position={[0, 2.7, 0]} center className="pointer-events-auto cursor-pointer">
          <div className="bg-[#101820]/95 text-[#E4E8EB] border border-[#B29A6A]/40 p-2.5 rounded-[8px] font-sans text-[11px] space-y-1 shadow-subtle hover:border-[#B29A6A] transition-all">
            <div className="flex items-center gap-1 font-semibold text-[#B29A6A]">
              <Zap className="w-3 h-3" /> GENERATOR #02
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[#9AA7B1]">Status:</span>
              <StatusBadge status={gen2Asset?.status || 'WARNING'} size="sm" />
            </div>
            <div className="text-[#9AA7B1] font-mono text-[10px]">Temp: <span className="text-[#E4E8EB] font-bold">76°C</span> | Load: <span className="text-[#E4E8EB] font-bold">82%</span></div>
          </div>
        </Html>
      </group>

      {/* 5. Fuel Storage Depot Tanks */}
      <group position={[-6, 0, 3]}>
        {[-1.2, 1.2].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.8, 0.8, 2.5, 24]} />
            <meshStandardMaterial color="#9AA7B1" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        <Html position={[0, 1.9, 0]} center className="pointer-events-none">
          <div className="bg-[#101820]/90 text-[#9AA7B1] border border-[rgba(190,205,215,0.12)] px-2 py-0.5 rounded font-sans text-[10px] shadow-subtle">
            BULK FUEL FARM (72% REMAINING)
          </div>
        </Html>
      </group>

      {/* 6. Solar Array Microgrid */}
      <group position={[0, 0.5, -6]} rotation={[-0.4, 0, 0]}>
        {[-2.5, 0, 2.5].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0, 0]}>
            <boxGeometry args={[2, 0.08, 1.4]} />
            <meshStandardMaterial color="#7895A8" roughness={0.2} metalness={0.8} />
          </mesh>
        ))}
        <Html position={[0, 1.2, 0]} center className="pointer-events-none">
          <div className="bg-[#101820]/90 text-[#9AA7B1] border border-[rgba(190,205,215,0.12)] px-2 py-0.5 rounded font-sans text-[10px] shadow-subtle">
            BIFACIAL SOLAR ARRAY (450 kW)
          </div>
        </Html>
      </group>
    </group>
  );
};

export const Station3DTwin: React.FC<Station3DTwinProps> = ({ station, assets, onSelectAsset }) => {
  return (
    <div className="relative w-full h-[520px] rounded-[10px] overflow-hidden glass-panel border border-[rgba(190,205,215,0.10)]">
      {/* Overlay Banner */}
      <div className="absolute top-3 left-3 z-10 font-sans text-xs flex items-center space-x-2 bg-[#0C1218]/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-[rgba(190,205,215,0.12)] text-[#E4E8EB] shadow-subtle">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7D9B83]" />
        <span className="font-semibold tracking-wide">{station.name} - 3D INFRASTRUCTURE TWIN</span>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [12, 10, 14], fov: 45 }}
        style={{ background: 'transparent' }}
        shadows
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[15, 20, 10]} intensity={1.2} castShadow color="#FFFFFF" />
        <pointLight position={[6, 4, -2]} intensity={0.6} color="#B29A6A" />

        <StationScene3D station={station} assets={assets} onSelectAsset={onSelectAsset} />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={6}
          maxDistance={30}
        />
      </Canvas>

      {/* Footer Info */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between font-sans text-[11px] text-[#9AA7B1] bg-[#0C1218]/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-[rgba(190,205,215,0.12)] shadow-subtle">
        <div>
          Coords: <strong className="text-[#E4E8EB] font-mono">{station.coordinates.lat}° S, {station.coordinates.lng}° E</strong>
        </div>
        <div className="text-[#B29A6A] font-medium flex items-center gap-1">
          <Wrench className="w-3.5 h-3.5" />
          <span>Click Generator #02 for Diagnostic Telemetry</span>
        </div>
      </div>
    </div>
  );
};
