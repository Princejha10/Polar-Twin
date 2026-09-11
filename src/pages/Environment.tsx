import React from 'react';
import { environmentService } from '../services/dataServices';
import { MetricCard } from '../components/ui/MetricCard';
import { CloudSnow, Thermometer, Wind, Eye, ShieldAlert } from 'lucide-react';

export const Environment: React.FC = () => {
  const env = environmentService.getEnvironmentMetrics();

  return (
    <div className="space-y-6 select-none page-fade font-sans">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-[#E4E8EB] tracking-wide flex items-center gap-2">
          <CloudSnow className="w-4 h-4 text-[#7895A8]" />
          <span>Environmental Monitoring & Weather Metrics</span>
        </h2>
        <p className="text-xs text-[#9AA7B1]">
          Atmospheric sounding telemetry, Katabatic wind gust forecasts, and Antarctic risk indices
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="AVG TEMPERATURE"
          value={`${env.avgTemp}°C`}
          subtitle="Schirmacher & Larsemann Plateau"
          icon={Thermometer}
          statusColor="cyan"
        />
        <MetricCard
          title="WIND SPEED"
          value={`${env.avgWind} km/h`}
          subtitle="Sustained Katabatic Flow"
          icon={Wind}
          statusColor="emerald"
        />
        <MetricCard
          title="VISIBILITY"
          value={`${env.visibilityKm} km`}
          subtitle="Clear Line of Sight"
          icon={Eye}
          statusColor="emerald"
        />
        <MetricCard
          title="POLAR RISK SCORE"
          value={`${env.riskScore} / 1.00`}
          subtitle={`Trend: ${env.riskTrend}`}
          icon={ShieldAlert}
          progressPercent={env.riskScore * 100}
          statusColor="rose"
        />
      </div>

      {/* Active Weather Banner */}
      <div className="p-4 rounded-[10px] bg-[#B29A6A]/10 border border-[#B29A6A]/25 flex items-center justify-between text-xs text-[#B29A6A] shadow-dark-subtle">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-4 h-4 text-[#B29A6A]" />
          <div>
            <span className="font-semibold uppercase tracking-wider">Active Weather Advisory:</span>
            <p className="text-[#E4E8EB] text-xs mt-0.5">{env.weatherAlert}</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-[#B29A6A]/15 text-[#B29A6A] border border-[#B29A6A]/30 text-[10px] uppercase font-medium">
          ADVISORY ACTIVE
        </span>
      </div>

      {/* Weather Forecast Table */}
      <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-3 shadow-dark-subtle">
        <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider">
          5-Day Antarctic Operational Weather Forecast
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {env.forecast.map((fc, idx) => (
            <div key={idx} className="p-3.5 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] text-center font-sans space-y-1.5">
              <div className="text-[#7895A8] font-semibold text-xs">{fc.day}</div>
              <div className="text-xl font-mono font-medium text-[#E4E8EB]">{fc.tempHigh}°C</div>
              <div className="text-[10px] text-[#9AA7B1]">Low: {fc.tempLow}°C</div>
              <div className="text-xs font-mono text-[#9AA7B1]">{fc.wind} km/h</div>
              <div className="text-[10px] text-[#B29A6A] bg-[#B29A6A]/10 px-2 py-0.5 rounded border border-[#B29A6A]/20">
                {fc.condition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
