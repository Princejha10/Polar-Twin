import React, { useState } from 'react';
import { stationService, alertService, environmentService } from '../services/dataServices';
import { Station } from '../types';
import { GlobeViewer } from '../components/3d/GlobeViewer';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MetricCard } from '../components/ui/MetricCard';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Fuel, 
  Package, 
  ShieldAlert, 
  CloudSnow, 
  Wind, 
  Thermometer, 
  Gauge, 
  ChevronRight,
  Bell,
  Activity
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stations = stationService.getStations();
  const alerts = alertService.getAlerts();
  const weather = environmentService.getEnvironmentMetrics();

  const [selectedStation, setSelectedStation] = useState<Station>(stations[0]);

  const maitri = stations.find((s) => s.id === 'maitri') || stations[0];
  const bharati = stations.find((s) => s.id === 'bharati') || stations[1];

  const handleOpenStationDetail = (stationId: string) => {
    navigate(`/stations/${stationId}`);
  };

  return (
    <div className="space-y-5 select-none page-fade">
      {/* 1. TOP STATION CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MAITRI STATION CARD */}
        <div 
          onClick={() => setSelectedStation(maitri)}
          className={`bg-[#101820] border rounded-[10px] p-4 cursor-pointer transition-all duration-180 shadow-dark-subtle hover:border-[#7895A8]/40 ${
            selectedStation.id === maitri.id 
              ? 'border-[#7895A8]/60 bg-[#121B23]' 
              : 'border-[rgba(190,205,215,0.10)]'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-sans font-semibold text-sm text-[#E4E8EB] tracking-wide flex items-center gap-2">
                <span>{maitri.name}</span>
                <span className="text-[11px] text-[#9AA7B1] font-mono">({maitri.code})</span>
              </h3>
              <p className="text-[12px] text-[#9AA7B1]">{maitri.location}</p>
            </div>
            <StatusBadge status={maitri.status} size="md" />
          </div>

          <div className="grid grid-cols-4 gap-2 font-mono text-xs text-[#E4E8EB] bg-[#0C1218] p-2.5 rounded-md border border-[rgba(190,205,215,0.08)]">
            <div>
              <div className="text-[10px] text-[#687681] font-sans">Temp</div>
              <div className="font-medium text-[#E4E8EB]">{maitri.temperature}°C</div>
            </div>
            <div>
              <div className="text-[10px] text-[#687681] font-sans">Wind</div>
              <div className="font-medium text-[#E4E8EB]">{maitri.windSpeed} km/h</div>
            </div>
            <div>
              <div className="text-[10px] text-[#687681] font-sans">Fuel</div>
              <div className="font-medium text-[#7D9B83]">{maitri.fuelLevel}%</div>
            </div>
            <div>
              <div className="text-[10px] text-[#687681] font-sans">Power</div>
              <div className="font-medium text-[#7D9B83]">{maitri.powerLevel}%</div>
            </div>
          </div>
        </div>

        {/* BHARATI STATION CARD */}
        <div 
          onClick={() => setSelectedStation(bharati)}
          className={`bg-[#101820] border rounded-[10px] p-4 cursor-pointer transition-all duration-180 shadow-dark-subtle hover:border-[#7895A8]/40 ${
            selectedStation.id === bharati.id 
              ? 'border-[#7895A8]/60 bg-[#121B23]' 
              : 'border-[rgba(190,205,215,0.10)]'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-sans font-semibold text-sm text-[#E4E8EB] tracking-wide flex items-center gap-2">
                <span>{bharati.name}</span>
                <span className="text-[11px] text-[#9AA7B1] font-mono">({bharati.code})</span>
              </h3>
              <p className="text-[12px] text-[#9AA7B1]">{bharati.location}</p>
            </div>
            <StatusBadge status={bharati.status} size="md" />
          </div>

          <div className="grid grid-cols-4 gap-2 font-mono text-xs text-[#E4E8EB] bg-[#0C1218] p-2.5 rounded-md border border-[rgba(190,205,215,0.08)]">
            <div>
              <div className="text-[10px] text-[#687681] font-sans">Temp</div>
              <div className="font-medium text-[#E4E8EB]">{bharati.temperature}°C</div>
            </div>
            <div>
              <div className="text-[10px] text-[#687681] font-sans">Wind</div>
              <div className="font-medium text-[#E4E8EB]">{bharati.windSpeed} km/h</div>
            </div>
            <div>
              <div className="text-[10px] text-[#687681] font-sans">Fuel</div>
              <div className="font-medium text-[#B29A6A]">{bharati.fuelLevel}%</div>
            </div>
            <div>
              <div className="text-[10px] text-[#687681] font-sans">Power</div>
              <div className="font-medium text-[#7D9B83]">{bharati.powerLevel}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CENTER (3D GLOBE) & RIGHT PANEL (ACTIVE ALERTS + WEATHER) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* CENTER 3D GLOBE (2 COLS) */}
        <div className="lg:col-span-2 h-[480px]">
          <GlobeViewer
            stations={stations}
            selectedStationId={selectedStation.id}
            onSelectStation={(st) => setSelectedStation(st)}
            onOpenStationDetail={handleOpenStationDetail}
          />
        </div>

        {/* RIGHT PANEL (ALERTS + WEATHER) */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* ACTIVE ALERTS CARD */}
          <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] rounded-[10px] p-4 flex-1 flex flex-col justify-between shadow-dark-subtle">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans text-xs uppercase font-semibold text-[#7895A8] tracking-wider flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-[#B29A6A]" />
                  <span>Active Alerts</span>
                </h3>
                <button 
                  onClick={() => navigate('/alerts')}
                  className="text-[11px] font-sans text-[#7895A8] hover:text-[#E4E8EB] flex items-center gap-0.5"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2">
                {alerts.slice(0, 3).map((alt) => (
                  <div 
                    key={alt.id}
                    className="p-2.5 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] font-sans text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <StatusBadge status={alt.severity} size="sm" />
                      <span className="text-[10px] font-mono text-[#687681]">{alt.timestamp}</span>
                    </div>
                    <p className="text-[#E4E8EB] text-[12px] leading-snug">{alt.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ANTARCTIC WEATHER OVERVIEW */}
          <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] rounded-[10px] p-4 shadow-dark-subtle">
            <h3 className="font-sans text-xs uppercase font-semibold text-[#7895A8] tracking-wider mb-3 flex items-center gap-2">
              <CloudSnow className="w-3.5 h-3.5 text-[#7895A8]" />
              <span>Antarctic Weather Overview</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 font-sans text-xs">
              <div className="p-2 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] flex items-center space-x-2">
                <Thermometer className="w-3.5 h-3.5 text-[#7895A8]" />
                <div>
                  <div className="text-[10px] text-[#687681]">Avg Temp</div>
                  <div className="font-mono font-medium text-[#E4E8EB]">{weather.avgTemp}°C</div>
                </div>
              </div>

              <div className="p-2 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] flex items-center space-x-2">
                <Wind className="w-3.5 h-3.5 text-[#7895A8]" />
                <div>
                  <div className="text-[10px] text-[#687681]">Wind</div>
                  <div className="font-mono font-medium text-[#E4E8EB]">{weather.avgWind} km/h</div>
                </div>
              </div>

              <div className="p-2 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] flex items-center space-x-2">
                <Gauge className="w-3.5 h-3.5 text-[#7895A8]" />
                <div>
                  <div className="text-[10px] text-[#687681]">Humidity</div>
                  <div className="font-mono font-medium text-[#E4E8EB]">{weather.avgHumidity}%</div>
                </div>
              </div>

              <div className="p-2 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-[#7895A8]" />
                <div>
                  <div className="text-[10px] text-[#687681]">Pressure</div>
                  <div className="font-mono font-medium text-[#E4E8EB]">{weather.avgPressure} hPa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM METRIC CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          title="ENERGY OVERVIEW"
          value="84%"
          subtitle="Overall Power Availability"
          icon={Zap}
          progressPercent={84}
          statusColor="cyan"
          details={[
            { label: 'Generation:', value: '812 kW', color: 'text-[#E4E8EB]' },
            { label: 'Consumption:', value: '610 kW', color: 'text-[#9AA7B1]' },
          ]}
        />

        <MetricCard
          title="FUEL STATUS"
          value="66%"
          subtitle="Total Fuel Remaining"
          icon={Fuel}
          progressPercent={66}
          statusColor="amber"
          details={[
            { label: 'Total Stock:', value: '24,850 L', color: 'text-[#E4E8EB]' },
            { label: 'Estimated Remaining:', value: '32 days', color: 'text-[#B29A6A]' },
          ]}
        />

        <MetricCard
          title="LOGISTICS OVERVIEW"
          value="63%"
          subtitle="Overall Inventory Health"
          icon={Package}
          progressPercent={63}
          statusColor="emerald"
          details={[
            { label: 'Critical Items:', value: '8', color: 'text-[#A87575]' },
            { label: 'Low Stock:', value: '14', color: 'text-[#B29A6A]' },
          ]}
        />

        <MetricCard
          title="ASSETS HEALTH"
          value="71%"
          subtitle="Average Asset Health"
          icon={ShieldAlert}
          progressPercent={71}
          statusColor="purple"
          details={[
            { label: 'Healthy:', value: '42', color: 'text-[#7D9B83]' },
            { label: 'Attention:', value: '17', color: 'text-[#B29A6A]' },
          ]}
        />

        <MetricCard
          title="ENVIRONMENT RISK"
          value="MEDIUM"
          subtitle="Risk Score: 0.54 / 1.00"
          icon={CloudSnow}
          progressPercent={54}
          statusColor="rose"
          details={[
            { label: 'Trend:', value: 'STABLE', color: 'text-[#7D9B83]' },
            { label: 'Weather Alert:', value: 'Katabatic Advisory', color: 'text-[#9AA7B1]' },
          ]}
        />
      </div>
    </div>
  );
};
