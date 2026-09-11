import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stationService, assetService, alertService } from '../services/dataServices';
import { Station3DTwin } from '../components/3d/Station3DTwin';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';
import { Asset } from '../types';
import { 
  ArrowLeft, 
  MapPin, 
  Thermometer, 
  Wind, 
  Zap, 
  Fuel, 
  ShieldCheck, 
  Cpu, 
  Bell, 
  Box, 
  X
} from 'lucide-react';

export const StationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const station = stationService.getStationById(id || 'maitri') || stationService.getStations()[0];
  const stationAssets = assetService.getAssetsByStation(station.id);
  const stationAlerts = alertService.getAlertsByStation(station.id);

  const [activeTab, setActiveTab] = useState<'3d' | 'overview' | 'assets' | 'alerts'>('3d');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return (
    <div className="space-y-5 select-none page-fade">
      {/* Back Button & Station Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] shadow-dark-subtle">
        <div>
          <button
            onClick={() => navigate('/stations')}
            className="text-xs font-sans text-[#7895A8] hover:text-[#E4E8EB] flex items-center gap-1 mb-2 transition-all duration-180"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO STATIONS</span>
          </button>

          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-sans font-semibold text-[#E4E8EB] tracking-wide">{station.name}</h1>
            <StatusBadge status={station.status} size="md" />
          </div>

          <p className="text-xs text-[#9AA7B1] flex items-center gap-2 mt-1 font-sans">
            <MapPin className="w-3.5 h-3.5 text-[#7895A8]" />
            <span>{station.location}</span>
            <span className="text-[#687681]">•</span>
            <span className="font-mono text-[#E4E8EB]">
              {station.coordinates.lat}° S, {station.coordinates.lng}° E
            </span>
          </p>
        </div>

        {/* Action Tabs Switcher */}
        <div className="flex items-center space-x-1 bg-[#0C1218] p-1 rounded-md border border-[rgba(190,205,215,0.10)] font-sans text-xs">
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all duration-180 ${
              activeTab === '3d'
                ? 'bg-[#7895A8] text-[#080D12] font-semibold shadow-subtle'
                : 'text-[#9AA7B1] hover:text-[#E4E8EB]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D DIGITAL TWIN</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all duration-180 ${
              activeTab === 'overview'
                ? 'bg-[#7895A8] text-[#080D12] font-semibold shadow-subtle'
                : 'text-[#9AA7B1] hover:text-[#E4E8EB]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OVERVIEW</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all duration-180 ${
              activeTab === 'assets'
                ? 'bg-[#7895A8] text-[#080D12] font-semibold shadow-subtle'
                : 'text-[#9AA7B1] hover:text-[#E4E8EB]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>ASSETS ({stationAssets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all duration-180 ${
              activeTab === 'alerts'
                ? 'bg-[#7895A8] text-[#080D12] font-semibold shadow-subtle'
                : 'text-[#9AA7B1] hover:text-[#E4E8EB]'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>ALERTS ({stationAlerts.length})</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="TEMPERATURE"
          value={`${station.temperature}°C`}
          subtitle="Ambient Air Temp"
          icon={Thermometer}
          statusColor="cyan"
        />
        <MetricCard
          title="WIND SPEED"
          value={`${station.windSpeed} km/h`}
          subtitle="Katabatic Flow"
          icon={Wind}
          statusColor="emerald"
        />
        <MetricCard
          title="FUEL LEVEL"
          value={`${station.fuelLevel}%`}
          subtitle="Jet-A1 Reserves"
          icon={Fuel}
          progressPercent={station.fuelLevel}
          statusColor={station.fuelLevel < 65 ? 'amber' : 'emerald'}
        />
        <MetricCard
          title="POWER OUTPUT"
          value={`${station.powerLevel}%`}
          subtitle={`${station.generationKw} kW / ${station.consumptionKw} kW`}
          icon={Zap}
          progressPercent={station.powerLevel}
          statusColor="cyan"
        />
      </div>

      {/* TAB CONTENTS */}
      {activeTab === '3d' && (
        <Station3DTwin
          station={station}
          assets={stationAssets}
          onSelectAsset={(asset) => setSelectedAsset(asset)}
        />
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
          {/* Infrastructure Profile */}
          <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-3 shadow-dark-subtle">
            <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider">
              Station Infrastructure Profile
            </h3>
            <p className="text-xs text-[#9AA7B1] leading-relaxed">
              {station.description}
            </p>
            <div className="space-y-2 text-xs pt-2 border-t border-[rgba(190,205,215,0.08)]">
              <div className="flex justify-between py-1 border-b border-[rgba(190,205,215,0.08)]">
                <span className="text-[#9AA7B1]">Operational Days:</span>
                <span className="text-[#E4E8EB] font-mono">{station.operationalDays} days</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[rgba(190,205,215,0.08)]">
                <span className="text-[#9AA7B1]">Population:</span>
                <span className="text-[#E4E8EB] font-medium">{station.population} Scientists & Engineers</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[rgba(190,205,215,0.08)]">
                <span className="text-[#9AA7B1]">Primary Power:</span>
                <span className="text-[#E4E8EB]">Dual Cat C15 Diesel + Solar Microgrid</span>
              </div>
            </div>
          </div>

          {/* Environmental Metrics */}
          <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-3 shadow-dark-subtle">
            <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider">
              Atmospheric Sounding Telemetry
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                <div className="text-[10px] text-[#687681]">Barometric Pressure</div>
                <div className="text-sm font-mono font-medium text-[#E4E8EB]">{station.pressure} hPa</div>
              </div>
              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                <div className="text-[10px] text-[#687681]">Relative Humidity</div>
                <div className="text-sm font-mono font-medium text-[#E4E8EB]">{station.humidity}%</div>
              </div>
              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                <div className="text-[10px] text-[#687681]">Snow Accumulation</div>
                <div className="text-sm font-mono font-medium text-[#E4E8EB]">14.2 cm</div>
              </div>
              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                <div className="text-[10px] text-[#687681]">Polar Risk Score</div>
                <div className="text-sm font-mono font-medium text-[#7D9B83]">0.54 / 1.00</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assets' && (
        <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] font-sans shadow-dark-subtle">
          <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider mb-4">
            Station Equipment Telemetry ({stationAssets.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stationAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className="p-4 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] hover:border-[#7895A8]/40 cursor-pointer transition-all duration-180 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-xs text-[#E4E8EB]">{asset.name}</h4>
                    <span className="text-[10px] font-mono text-[#687681]">{asset.code} • {asset.category}</span>
                  </div>
                  <StatusBadge status={asset.status} size="sm" />
                </div>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-[rgba(190,205,215,0.08)]">
                  <span className="text-[#9AA7B1]">Health Index: <strong className="text-[#E4E8EB] font-mono">{asset.healthScore}%</strong></span>
                  <span className="text-[#B29A6A] font-medium text-[11px]">Maint. in {asset.nextMaintenanceDays}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-3 font-sans shadow-dark-subtle">
          <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider mb-4">
            Active Station Alerts ({stationAlerts.length})
          </h3>
          {stationAlerts.map((alt) => (
            <div key={alt.id} className="p-3.5 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <StatusBadge status={alt.severity} size="sm" />
                  <span className="text-[#687681] text-[10px] font-mono">{alt.timestamp}</span>
                </div>
                <p className="text-[#E4E8EB] text-xs">{alt.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101820] w-full max-w-lg rounded-[10px] p-6 border border-[rgba(190,205,215,0.12)] shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm text-[#E4E8EB]">{selectedAsset.name}</h3>
                <span className="text-[11px] font-mono text-[#9AA7B1]">{selectedAsset.code} • {selectedAsset.stationName}</span>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1 rounded text-[#9AA7B1] hover:text-[#E4E8EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
              <StatusBadge status={selectedAsset.status} size="md" />
              <div className="text-xs">
                <span className="text-[#9AA7B1]">Health Index: </span>
                <span className="font-mono font-medium text-[#E4E8EB]">{selectedAsset.healthScore}%</span>
              </div>
            </div>

            <p className="text-xs text-[#9AA7B1] leading-relaxed bg-[#0C1218] p-3 rounded-md border border-[rgba(190,205,215,0.08)]">
              {selectedAsset.description}
            </p>

            <div className="space-y-2">
              <div className="text-[#687681] uppercase text-[10px] font-semibold tracking-wider">Specifications</div>
              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#687681]">Serial Number:</span>
                  <span className="text-[#E4E8EB]">{selectedAsset.serialNumber}</span>
                </div>
                {Object.entries(selectedAsset.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-[#687681]">{k}:</span>
                    <span className="text-[#E4E8EB] font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-2 rounded-md bg-[#7895A8] text-[#080D12] font-semibold text-xs shadow-subtle hover:bg-[#8BA7BA] transition-all duration-180"
              >
                CLOSE DIAGNOSTICS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
