import React, { useState, useEffect } from 'react';
import { LogOut, Shield, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const datePart = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const timePart = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      setTimeString(`${datePart} | ${timePart} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-[#0C1218] border-b border-[rgba(190,205,215,0.10)] fixed top-0 right-0 left-60 z-30 px-6 flex items-center justify-between transition-all duration-180">
      {/* Left Title */}
      <div>
        <h1 className="text-sm font-semibold text-[#E4E8EB] tracking-wide flex items-center gap-2 font-sans">
          <span>Antarctic Operations Command Centre</span>
          <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-[#101820] text-[#9AA7B1] border border-[rgba(190,205,215,0.12)]">
            TELEMETRY LINK
          </span>
        </h1>
        <p className="text-xs text-[#9AA7B1] font-sans">
          Real-time overview of Indian Antarctic Research Stations
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Real-time Clock */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#9AA7B1] bg-[#101820] px-3 py-1.5 rounded-lg border border-[rgba(190,205,215,0.10)]">
          <Clock className="w-3.5 h-3.5 text-[#7895A8]" />
          <span>{timeString || '31 Aug 2026 | 10:24:36 IST'}</span>
        </div>

        {/* Satellite Link Status */}
        <div className="flex items-center space-x-2 bg-[#101820] border border-[rgba(190,205,215,0.10)] px-3 py-1.5 rounded-lg text-xs font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7D9B83]" />
          <span className="text-[#9AA7B1] text-[11px]">Satellite Link:</span>
          <span className="text-[#7D9B83] font-medium text-[11px] tracking-wider uppercase">ONLINE</span>
        </div>

        {/* User Profile & Actions */}
        {user && (
          <div className="flex items-center space-x-3 pl-3 border-l border-[rgba(190,205,215,0.10)]">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full border border-[rgba(190,205,215,0.12)] object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#101820] border border-[rgba(190,205,215,0.12)] flex items-center justify-center text-[#7895A8] font-semibold text-xs">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="text-left hidden md:block font-sans">
              <div className="text-xs font-medium text-[#E4E8EB]">{user.name}</div>
              <div className="text-[10px] font-mono text-[#9AA7B1] flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#7895A8]" />
                <span>{user.role.replace('_', ' ')}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-[#9AA7B1] hover:text-[#A87575] hover:bg-[#101820] rounded-lg border border-transparent transition-all duration-180"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
