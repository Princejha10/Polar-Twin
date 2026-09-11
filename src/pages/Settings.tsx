import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Radio, CheckCircle2, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [syncFreq, setSyncFreq] = useState<string>('5');
  const [apiEndpoint, setApiEndpoint] = useState<string>('https://telemetry.ncpor.res.in/v1/polar-twin');
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 select-none page-fade font-sans">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-[#E4E8EB] tracking-wide flex items-center gap-2">
          <SettingsIcon className="w-4 h-4 text-[#7895A8]" />
          <span>System Configuration & Settings</span>
        </h2>
        <p className="text-xs text-[#9AA7B1]">
          Super Admin global settings for satellite synchronization, IoT sensors, and security protocols
        </p>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-5 max-w-2xl text-xs">
        {/* System & Telemetry */}
        <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-4 shadow-dark-subtle">
          <h3 className="font-semibold text-xs text-[#7895A8] uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#7895A8]" /> Satellite Link & Telemetry
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[#9AA7B1] block mb-1">Telemetry Refresh Interval</label>
              <select
                value={syncFreq}
                onChange={(e) => setSyncFreq(e.target.value)}
                className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
              >
                <option value="1">1 second (Real-Time Stream)</option>
                <option value="5">5 seconds (Standard Mission Control)</option>
                <option value="30">30 seconds (Satellite Power Saving)</option>
              </select>
            </div>

            <div>
              <label className="text-[#9AA7B1] block mb-1">NCPOR Telemetry Gateway API URL</label>
              <input
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] font-mono focus:outline-none focus:border-[#7895A8]"
              />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] space-y-4 shadow-dark-subtle">
          <h3 className="font-semibold text-xs text-[#7895A8] uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#7895A8]" /> Security Controls
          </h3>

          <div className="space-y-2 text-[#9AA7B1]">
            <div className="flex items-center justify-between p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
              <span>Enforce Two-Factor Security for Super Admins</span>
              <input type="checkbox" defaultChecked className="accent-[#7895A8] w-4 h-4" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
              <span>Automatic Session Lockout after 15 minutes of inactivity</span>
              <input type="checkbox" defaultChecked className="accent-[#7895A8] w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Save Button & Feedback */}
        <div className="flex items-center space-x-4 pt-1">
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-[#7895A8] hover:bg-[#8BA7BA] text-[#080D12] font-semibold text-xs flex items-center space-x-2 transition-all duration-180 shadow-subtle"
          >
            <Save className="w-3.5 h-3.5" />
            <span>SAVE CONFIGURATION</span>
          </button>

          {saved && (
            <span className="text-[#7D9B83] font-medium flex items-center gap-1 text-xs">
              <CheckCircle2 className="w-4 h-4" /> Configuration Saved Successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
