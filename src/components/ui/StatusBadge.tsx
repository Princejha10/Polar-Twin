import React from 'react';
import { StatusLevel, AlertSeverity } from '../../types';

interface StatusBadgeProps {
  status: StatusLevel | AlertSeverity | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showDot = true }) => {
  const upper = String(status).toUpperCase();

  let colorClasses = 'bg-[#7895A8]/15 text-[#7895A8] border-[#7895A8]/30';
  let dotColor = 'bg-[#7895A8]';

  if (upper === 'NORMAL' || upper === 'HEALTHY' || upper === 'OPERATIONAL' || upper === 'RESOLVED') {
    colorClasses = 'bg-[#7D9B83]/15 text-[#7D9B83] border-[#7D9B83]/30';
    dotColor = 'bg-[#7D9B83]';
  } else if (upper === 'WARNING' || upper === 'ATTENTION' || upper === 'ACKNOWLEDGED') {
    colorClasses = 'bg-[#B29A6A]/15 text-[#B29A6A] border-[#B29A6A]/30';
    dotColor = 'bg-[#B29A6A]';
  } else if (upper === 'CRITICAL' || upper === 'HIGH' || upper === 'ACTIVE') {
    colorClasses = 'bg-[#A87575]/15 text-[#A87575] border-[#A87575]/30';
    dotColor = 'bg-[#A87575]';
  } else if (upper === 'ADVISORY' || upper === 'INFO') {
    colorClasses = 'bg-[#7895A8]/15 text-[#7895A8] border-[#7895A8]/30';
    dotColor = 'bg-[#7895A8]';
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 space-x-1',
    md: 'text-[11px] px-2.5 py-0.5 space-x-1.5',
    lg: 'text-xs px-3 py-1 space-x-2 font-medium',
  }[size];

  return (
    <span className={`inline-flex items-center rounded-md border font-sans tracking-wide uppercase font-medium transition-all duration-180 ${colorClasses} ${sizeClasses}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      <span>{upper}</span>
    </span>
  );
};
