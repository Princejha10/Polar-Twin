import React, { useState } from 'react';
import { alertService } from '../services/dataServices';
import { Alert } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Bell, Search, CheckCircle2, Clock } from 'lucide-react';

export const Alerts: React.FC = () => {
  const [alertList, setAlertList] = useState<Alert[]>(alertService.getAlerts());
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAcknowledge = (id: string) => {
    alertService.acknowledgeAlert(id);
    setAlertList(alertService.getAlerts());
  };

  const handleResolve = (id: string) => {
    alertService.resolveAlert(id);
    setAlertList(alertService.getAlerts());
  };

  const filteredAlerts = alertList.filter((alt) => {
    const matchesSev = severityFilter === 'ALL' || alt.severity === severityFilter;
    const matchesSearch =
      alt.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alt.stationName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSev && matchesSearch;
  });

  return (
    <div className="space-y-6 select-none page-fade font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#E4E8EB] tracking-wide flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#B29A6A]" />
            <span>Operational Alerts & Incident Management</span>
          </h2>
          <p className="text-xs text-[#9AA7B1]">
            Real-time critical warnings, equipment notifications, and weather alerts across stations
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center space-x-3">
          <div className="relative w-56">
            <Search className="w-3.5 h-3.5 text-[#687681] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter alerts..."
              className="w-full bg-[#101820] border border-[rgba(190,205,215,0.12)] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
            />
          </div>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#101820] text-[#E4E8EB] border border-[rgba(190,205,215,0.12)] rounded-md px-3 py-1.5 text-xs font-mono focus:outline-none"
          >
            <option value="ALL">ALL SEVERITIES</option>
            <option value="CRITICAL">CRITICAL ONLY</option>
            <option value="WARNING">WARNING ONLY</option>
            <option value="ADVISORY">ADVISORY ONLY</option>
            <option value="INFO">INFO ONLY</option>
          </select>
        </div>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-3">
        {filteredAlerts.map((alt) => (
          <div
            key={alt.id}
            className={`bg-[#101820] p-4 rounded-[10px] border border-[rgba(190,205,215,0.10)] shadow-dark-subtle transition-all duration-180 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs ${
              alt.status === 'RESOLVED' ? 'opacity-50' : ''
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center space-x-3">
                <StatusBadge status={alt.severity} size="sm" />
                <span className="font-semibold text-[#E4E8EB] tracking-wide">{alt.stationName}</span>
                <span className="text-[10px] font-mono text-[#687681] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#7895A8]" /> {alt.timestamp}
                </span>
              </div>
              <p className="text-[#E4E8EB] text-xs leading-snug">{alt.message}</p>
            </div>

            {/* Action Buttons */}
            {alt.status !== 'RESOLVED' && (
              <div className="flex items-center space-x-2">
                {alt.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleAcknowledge(alt.id)}
                    className="px-3 py-1 rounded bg-[#B29A6A]/15 text-[#B29A6A] hover:bg-[#B29A6A]/25 border border-[#B29A6A]/30 text-[11px] font-mono"
                  >
                    ACKNOWLEDGE
                  </button>
                )}
                <button
                  onClick={() => handleResolve(alt.id)}
                  className="px-3 py-1 rounded bg-[#7D9B83]/15 text-[#7D9B83] hover:bg-[#7D9B83]/25 border border-[#7D9B83]/30 text-[11px] font-mono flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>MARK RESOLVED</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
