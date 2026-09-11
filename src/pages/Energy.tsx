import React from 'react';
import { energyService } from '../services/dataServices';
import { MetricCard } from '../components/ui/MetricCard';
import { Zap, BatteryCharging, Sun, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const Energy: React.FC = () => {
  const energy = energyService.getEnergyMetrics();

  return (
    <div className="space-y-6 select-none page-fade font-sans">
      {/* Page Header */}
      <div>
        <h2 className="text-lg font-bold text-[#E4E8EB] tracking-wide flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#7895A8]" />
          <span>Microgrid & Energy Management</span>
        </h2>
        <p className="text-xs text-[#9AA7B1]">
          Real-time diesel generation, solar contribution, and battery storage reserve
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="TOTAL GENERATION"
          value={`${energy.totalGenerationKw} kW`}
          subtitle="Combined Power Generation"
          icon={Zap}
          statusColor="cyan"
        />
        <MetricCard
          title="TOTAL CONSUMPTION"
          value={`${energy.totalConsumptionKw} kW`}
          subtitle="Station Base Heating & Labs"
          icon={Activity}
          statusColor="emerald"
        />
        <MetricCard
          title="BATTERY RESERVE"
          value={`${energy.batteryReservePercent}%`}
          subtitle="LiFePO4 Buffer Storage"
          icon={BatteryCharging}
          progressPercent={energy.batteryReservePercent}
          statusColor="emerald"
        />
        <MetricCard
          title="SOLAR FRACTION"
          value={`${energy.renewableFractionPercent}%`}
          subtitle="Bifacial Polar Microgrid"
          icon={Sun}
          progressPercent={energy.renewableFractionPercent}
          statusColor="cyan"
        />
      </div>

      {/* Main Generation Chart & Station Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Hourly Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-3 shadow-dark-subtle">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider">
              24-Hour Telemetry: Generation vs Consumption (kW)
            </h3>
            <span className="text-[10px] font-mono text-[#9AA7B1] bg-[#0C1218] px-2.5 py-0.5 rounded border border-[rgba(190,205,215,0.12)]">
              SYNCHRONIZED
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energy.hourlyHistory}>
                <defs>
                  <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7895A8" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#7895A8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7F9FA5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7F9FA5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(190,205,215,0.10)" />
                <XAxis dataKey="time" stroke="#9AA7B1" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#9AA7B1" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#101820', borderColor: 'rgba(190,205,215,0.15)', borderRadius: '8px', color: '#E4E8EB', fontSize: '11px', fontFamily: 'monospace', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
                />
                <Area type="monotone" dataKey="generation" stroke="#7895A8" fillOpacity={1} fill="url(#colorGen)" name="Generation (kW)" />
                <Area type="monotone" dataKey="consumption" stroke="#7F9FA5" fillOpacity={1} fill="url(#colorCons)" name="Consumption (kW)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Station Breakdown Cards */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider">
            Station Power Efficiency Comparison
          </h3>
          {energy.stationComparison.map((st) => (
            <div key={st.stationId} className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-4 rounded-[10px] space-y-3 shadow-dark-subtle">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-[#E4E8EB] text-xs">{st.stationName}</h4>
                <span className="text-xs font-mono text-[#7D9B83]">{st.efficiency}% Efficiency</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                  <div className="text-[10px] text-[#687681] font-sans">Generation</div>
                  <div className="font-medium text-[#E4E8EB]">{st.generation} kW</div>
                </div>
                <div className="p-2 rounded bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                  <div className="text-[10px] text-[#687681] font-sans">Consumption</div>
                  <div className="font-medium text-[#E4E8EB]">{st.consumption} kW</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
