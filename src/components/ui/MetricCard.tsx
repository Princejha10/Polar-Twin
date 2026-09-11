import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: LucideIcon;
  progressPercent?: number;
  statusColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple';
  details?: { label: string; value: string | number; color?: string }[];
  accentBorder?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  progressPercent,
  statusColor = 'cyan',
  details
}) => {
  const barColor = {
    cyan: 'bg-[#7895A8]',
    emerald: 'bg-[#7D9B83]',
    amber: 'bg-[#B29A6A]',
    rose: 'bg-[#A87575]',
    purple: 'bg-[#7F9FA5]'
  }[statusColor];

  return (
    <div className="glass-panel-interactive p-4 rounded-[10px] flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-sans font-medium tracking-wider text-[#9AA7B1] uppercase">
            {title}
          </span>
          {Icon && (
            <div className="w-7 h-7 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.12)] flex items-center justify-center text-[#7895A8]">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Main Value Display */}
        <div className="flex items-baseline space-x-1 mb-1">
          <span className="text-3xl font-mono font-semibold tracking-tight text-[#E4E8EB]">
            {value}
          </span>
          {unit && <span className="text-xs font-sans text-[#9AA7B1]">{unit}</span>}
        </div>

        {subtitle && <p className="text-[12px] text-[#9AA7B1] mb-3 font-sans">{subtitle}</p>}

        {/* Progress Bar */}
        {progressPercent !== undefined && (
          <div className="w-full bg-[#080D12] rounded-full h-1 overflow-hidden border border-[rgba(190,205,215,0.08)] mb-3">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor}`}
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        )}
      </div>

      {/* Details List */}
      {details && details.length > 0 && (
        <div className="pt-2 border-t border-[rgba(190,205,215,0.08)] space-y-1 text-xs font-sans">
          {details.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-[12px]">
              <span className="text-[#9AA7B1]">{item.label}</span>
              <span className={`font-mono font-medium ${item.color || 'text-[#E4E8EB]'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
