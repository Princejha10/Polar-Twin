import React from 'react';
import { logisticsService } from '../services/dataServices';
import { MetricCard } from '../components/ui/MetricCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Truck, Fuel, Package, ShieldAlert, Calendar } from 'lucide-react';

export const Logistics: React.FC = () => {
  const items = logisticsService.getLogisticsItems();
  const shipments = logisticsService.getShipments();

  return (
    <div className="space-y-6 select-none page-fade font-sans">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-[#E4E8EB] tracking-wide flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#7895A8]" />
          <span>Logistics & Supply Chain Management</span>
        </h2>
        <p className="text-xs text-[#9AA7B1]">
          Antarctic expedition fuel reserves, ration inventory, medical supplies, and vessel supply lines
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="FUEL STOCK"
          value="24,850 L"
          subtitle="JET-A1 & Polar Diesel Combined"
          icon={Fuel}
          progressPercent={66}
          statusColor="amber"
        />
        <MetricCard
          title="ESTIMATED REMAINING"
          value="32 days"
          subtitle="Based on Current Heating Load"
          icon={Calendar}
          statusColor="amber"
        />
        <MetricCard
          title="CRITICAL ITEMS"
          value="8"
          subtitle="Below Emergency Stock Level"
          icon={ShieldAlert}
          statusColor="rose"
        />
        <MetricCard
          title="LOW STOCK"
          value="14"
          subtitle="Approaching Reorder Threshold"
          icon={Package}
          statusColor="amber"
        />
      </div>

      {/* Incoming Shipments Banner */}
      <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-3 shadow-dark-subtle">
        <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#7D9B83]" />
          <span>Incoming Expedition Shipments & Charters</span>
        </h3>

        {shipments.map((sh) => (
          <div key={sh.id} className="p-4 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-[#E4E8EB] text-xs">{sh.vesselName}</span>
                <span className="px-2 py-0.5 rounded bg-[#7D9B83]/15 text-[#7D9B83] border border-[#7D9B83]/30 text-[10px] uppercase font-mono">
                  {sh.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-[#9AA7B1] text-xs mt-1">{sh.cargo}</p>
              <div className="text-[#687681] text-[11px] mt-1 font-mono">Destination: {sh.destinationStation} • ETA: <strong className="text-[#E4E8EB]">{sh.eta}</strong></div>
            </div>

            <div className="w-full md:w-44 space-y-1">
              <div className="flex justify-between text-[10px] text-[#687681] font-mono">
                <span>Voyage Progress</span>
                <span className="text-[#7D9B83] font-semibold">{sh.progressPercent}%</span>
              </div>
              <div className="w-full bg-[#080D12] rounded-full h-1.5 overflow-hidden border border-[rgba(190,205,215,0.10)]">
                <div className="h-full bg-[#7D9B83] rounded-full" style={{ width: `${sh.progressPercent}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logistics Items Table */}
      <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-3 shadow-dark-subtle">
        <h3 className="text-xs uppercase font-semibold text-[#7895A8] tracking-wider">
          Station Logistics Inventory Detail
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[rgba(190,205,215,0.10)] text-[#687681] text-[11px] uppercase font-mono">
                <th className="py-2.5 px-3">ITEM NAME</th>
                <th className="py-2.5 px-3">CATEGORY</th>
                <th className="py-2.5 px-3">STATION</th>
                <th className="py-2.5 px-3">STOCK VOLUME</th>
                <th className="py-2.5 px-3">DAYS REMAINING</th>
                <th className="py-2.5 px-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(190,205,215,0.08)] font-sans">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-[#0C1218] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-[#E4E8EB]">{item.name}</td>
                  <td className="py-2.5 px-3 text-[#7895A8] font-mono">{item.category}</td>
                  <td className="py-2.5 px-3 text-[#9AA7B1]">{item.stationName}</td>
                  <td className="py-2.5 px-3 font-mono text-[#E4E8EB]">{item.currentStock.toLocaleString()} {item.unit}</td>
                  <td className="py-2.5 px-3 font-mono text-[#B29A6A]">{item.daysRemaining} days</td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={item.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
