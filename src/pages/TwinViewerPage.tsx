import React, { useState } from 'react';
import { stationService, assetService } from '../services/dataServices';
import { GlobeViewer } from '../components/3d/GlobeViewer';
import { Station3DTwin } from '../components/3d/Station3DTwin';
import { Box, Globe, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TwinViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const stations = stationService.getStations();

  const [mode, setMode] = useState<'globe' | 'station'>('globe');
  const [selectedStationId, setSelectedStationId] = useState<string>('maitri');

  const selectedStation = stations.find((s) => s.id === selectedStationId) || stations[0];
  const stationAssets = assetService.getAssetsByStation(selectedStation.id);

  return (
    <div className="space-y-4 select-none page-fade">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#101820] border border-[rgba(190,205,215,0.10)] p-4 rounded-[10px] shadow-dark-subtle">
        <div>
          <h2 className="text-base font-semibold font-sans text-[#E4E8EB] tracking-wide flex items-center gap-2">
            <Box className="w-4 h-4 text-[#7895A8]" />
            <span>3D Digital Twin Command Environment</span>
          </h2>
          <p className="text-xs text-[#9AA7B1] font-sans">
            Web-based real-time 3D visualization engine for Antarctic research station telemetry
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center space-x-2 font-sans text-xs bg-[#0C1218] p-1 rounded-md border border-[rgba(190,205,215,0.10)]">
          <button
            onClick={() => setMode('globe')}
            className={`px-3 py-1 rounded flex items-center gap-1.5 transition-all duration-180 ${
              mode === 'globe'
                ? 'bg-[#7895A8] text-[#080D12] font-semibold shadow-subtle'
                : 'text-[#9AA7B1] hover:text-[#E4E8EB]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>ANTARCTIC GLOBE</span>
          </button>

          <button
            onClick={() => setMode('station')}
            className={`px-3 py-1 rounded flex items-center gap-1.5 transition-all duration-180 ${
              mode === 'station'
                ? 'bg-[#7895A8] text-[#080D12] font-semibold shadow-subtle'
                : 'text-[#9AA7B1] hover:text-[#E4E8EB]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>STATION 3D MODEL</span>
          </button>

          <select
            value={selectedStationId}
            onChange={(e) => setSelectedStationId(e.target.value)}
            className="bg-[#101820] text-[#E4E8EB] border border-[rgba(190,205,215,0.12)] rounded px-2.5 py-1 focus:outline-none font-mono text-xs"
          >
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="h-[600px] w-full relative">
        {mode === 'globe' ? (
          <GlobeViewer
            stations={stations}
            selectedStationId={selectedStationId}
            onSelectStation={(st) => setSelectedStationId(st.id)}
            onOpenStationDetail={(id) => navigate(`/stations/${id}`)}
          />
        ) : (
          <Station3DTwin
            station={selectedStation}
            assets={stationAssets}
          />
        )}
      </div>
    </div>
  );
};
