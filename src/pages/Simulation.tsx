import React, { useState } from 'react';
import { simulationService, stationService } from '../services/dataServices';
import { SimulationResult } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Activity, Play, RefreshCw, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const Simulation: React.FC = () => {
  const scenarios = simulationService.getScenarios();
  const stations = stationService.getStations();

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0].id);
  const [selectedStationId, setSelectedStationId] = useState<string>('maitri');

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const [paramValues, setParamValues] = useState<Record<string, number>>({
    temp: -27,
    duration: 24,
    load: 85,
    delay: 30,
    conservation: 15,
    wind: 120
  });

  const [simResult, setSimResult] = useState<SimulationResult | null>(() =>
    simulationService.runSimulation(scenarios[0].id, 'maitri', { temp: -27, duration: 24, load: 85 })
  );

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = simulationService.runSimulation(selectedScenarioId, selectedStationId, paramValues);
      setSimResult(res);
      setIsRunning(false);
    }, 400);
  };

  const handleParamChange = (key: string, val: number) => {
    setParamValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="space-y-6 select-none page-fade font-sans">
      {/* Page Header */}
      <div>
        <h2 className="text-lg font-bold text-[#E4E8EB] tracking-wide flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#7895A8]" />
          <span>Digital Twin Simulation Sandbox</span>
        </h2>
        <p className="text-xs text-[#9AA7B1]">
          Simulate generator outages, polar storm severity, and supply delays to predict infrastructure survivability
        </p>
      </div>

      {/* Control Panel & Scenario Config */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Scenario Controls (1 Col) */}
        <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-4 shadow-dark-subtle">
          <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider">
            Simulation Parameters
          </h3>

          <div>
            <label className="text-xs text-[#9AA7B1] block mb-1">Select Scenario</label>
            <select
              value={selectedScenarioId}
              onChange={(e) => setSelectedScenarioId(e.target.value)}
              className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3 py-2 text-xs text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
            >
              {scenarios.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-[#9AA7B1] block mb-1">Target Station</label>
            <select
              value={selectedStationId}
              onChange={(e) => setSelectedStationId(e.target.value)}
              className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3 py-2 text-xs text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
            >
              {stations.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.code})
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Sliders */}
          <div className="space-y-3 pt-2 border-t border-[rgba(190,205,215,0.10)]">
            {selectedScenario.parameters.map((p) => {
              const currentVal = paramValues[p.key] ?? p.default;
              return (
                <div key={p.key} className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#9AA7B1]">{p.label}</span>
                    <span className="font-mono text-[#E4E8EB]">
                      {currentVal} {p.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={p.min}
                    max={p.max}
                    value={currentVal}
                    onChange={(e) => handleParamChange(p.key, Number(e.target.value))}
                    className="w-full accent-[#7895A8] cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="w-full bg-[#7895A8] hover:bg-[#8BA7BA] text-[#080D12] font-semibold py-2.5 rounded-md flex items-center justify-center space-x-2 transition-all duration-180 mt-3 shadow-subtle"
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>RUN SIMULATION</span>
              </>
            )}
          </button>
        </div>

        {/* Simulation Output Dashboard (2 Cols) */}
        {simResult && (
          <div className="lg:col-span-2 bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-5 shadow-dark-subtle">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(190,205,215,0.10)]">
              <div>
                <span className="text-[10px] uppercase text-[#687681]">Simulated Target</span>
                <h3 className="font-semibold text-base text-[#E4E8EB]">{simResult.stationName}</h3>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-[#9AA7B1]">Projected Status:</span>
                <StatusBadge status={simResult.statusForecast} size="md" />
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] space-y-1">
                <div className="text-[10px] text-[#687681] uppercase">Power Impact</div>
                <div className="text-xl font-mono text-[#A87575]">-{simResult.powerImpactPercent}%</div>
              </div>

              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] space-y-1">
                <div className="text-[10px] text-[#687681] uppercase">Fuel Depletion Rate</div>
                <div className="text-xl font-mono text-[#B29A6A]">+{simResult.fuelImpactPercent}%</div>
              </div>

              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] space-y-1">
                <div className="text-[10px] text-[#687681] uppercase">Risk Level Score</div>
                <div className="text-xl font-mono text-[#E4E8EB]">{simResult.riskLevelScore}</div>
              </div>

              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] space-y-1">
                <div className="text-[10px] text-[#687681] uppercase">Est. Recovery</div>
                <div className="text-xl font-mono text-[#7D9B83]">{simResult.recoveryHours} hrs</div>
              </div>
            </div>

            {/* Timeline Line Chart */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider">
                Simulated Telemetry Timeline
              </h4>
              <div className="h-52 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={simResult.timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(190,205,215,0.10)" />
                    <XAxis dataKey="hour" stroke="#9AA7B1" tick={{ fontSize: 10, fontFamily: 'monospace' }} unit="h" />
                    <YAxis stroke="#9AA7B1" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#101820', borderColor: 'rgba(190,205,215,0.15)', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace', color: '#E4E8EB', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
                    />
                    <Line type="monotone" dataKey="powerAvailable" stroke="#7895A8" strokeWidth={2} name="Power Available (%)" />
                    <Line type="monotone" dataKey="fuelLevel" stroke="#B29A6A" strokeWidth={1.5} name="Fuel Level (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recovery Procedures */}
            <div className="space-y-2 pt-2 border-t border-[rgba(190,205,215,0.10)]">
              <h4 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7D9B83]" />
                <span>Recommended Operational Procedures</span>
              </h4>

              <div className="space-y-1 text-xs">
                {simResult.recommendedActions.map((action, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#0C1218] border border-[rgba(190,205,215,0.08)] text-[#9AA7B1] flex items-start gap-2">
                    <span className="text-[#7895A8] font-mono">{idx + 1}.</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
