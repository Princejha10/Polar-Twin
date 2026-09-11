import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Radio, 
  Box, 
  Zap, 
  CloudSnow, 
  Truck, 
  Cpu, 
  Bell, 
  Activity, 
  FileText, 
  Users, 
  Settings, 
  Compass, 
  Wrench,
  Thermometer,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface NavItem {
  name: string;
  path: string;
  icon: any;
  roles: UserRole[];
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const allNavItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'STATION_OPERATOR', 'ENGINEER'] },
    { name: 'Stations', path: '/stations', icon: Radio, roles: ['SUPER_ADMIN'] },
    { name: 'My Station', path: '/stations/maitri', icon: Compass, roles: ['STATION_OPERATOR'] },
    { name: '3D Twin', path: '/3d-twin', icon: Box, roles: ['SUPER_ADMIN', 'STATION_OPERATOR', 'ENGINEER'], badge: '3D' },
    { name: 'Energy', path: '/energy', icon: Zap, roles: ['SUPER_ADMIN', 'STATION_OPERATOR', 'ENGINEER'] },
    { name: 'Environment', path: '/environment', icon: CloudSnow, roles: ['SUPER_ADMIN', 'STATION_OPERATOR'] },
    { name: 'Sensors', path: '/environment', icon: Thermometer, roles: ['ENGINEER'] },
    { name: 'Logistics', path: '/logistics', icon: Truck, roles: ['SUPER_ADMIN', 'STATION_OPERATOR'] },
    { name: 'Assets', path: '/assets', icon: Cpu, roles: ['SUPER_ADMIN', 'STATION_OPERATOR', 'ENGINEER'] },
    { name: 'Equipment', path: '/assets?category=Generators', icon: Layers, roles: ['ENGINEER'] },
    { name: 'Maintenance', path: '/assets?filter=maintenance', icon: Wrench, roles: ['ENGINEER'] },
    { name: 'Alerts', path: '/alerts', icon: Bell, roles: ['SUPER_ADMIN', 'STATION_OPERATOR', 'ENGINEER'], badge: '2' },
    { name: 'Simulation', path: '/simulation', icon: Activity, roles: ['SUPER_ADMIN', 'ENGINEER'] },
    { name: 'Reports', path: '/reports', icon: FileText, roles: ['SUPER_ADMIN', 'STATION_OPERATOR', 'ENGINEER'] },
    { name: 'Users', path: '/users', icon: Users, roles: ['SUPER_ADMIN'] },
    { name: 'Settings', path: '/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
  ];

  const filteredItems = allNavItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside className="w-60 bg-[#0C1218] border-r border-[rgba(190,205,215,0.10)] flex flex-col h-screen fixed left-0 top-0 z-40 select-none">
      {/* Brand Header */}
      <div className="p-4 bg-[#080D12] border-b border-[rgba(190,205,215,0.10)] flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-[#101820] border border-[rgba(190,205,215,0.12)] flex items-center justify-center text-[#7895A8]">
          <Radio className="w-4 h-4" />
        </div>
        <div>
          <div className="font-mono font-semibold tracking-wider text-sm text-[#E4E8EB]">
            POLAR TWIN
          </div>
          <p className="text-[10px] uppercase font-mono tracking-widest text-[#9AA7B1]">
            Antarctic Ops Twin
          </p>
        </div>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-4 py-2 bg-[#080D12]/50 border-b border-[rgba(190,205,215,0.08)] flex items-center justify-between font-sans">
        <span className="text-[11px] text-[#687681]">ROLE:</span>
        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#101820] text-[#7895A8] border border-[rgba(190,205,215,0.12)] uppercase tracking-wider">
          {user.role.replace('_', ' ')}
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name + item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center justify-between px-3 py-2 rounded-md text-xs font-sans transition-all duration-180 ${
                  isActive
                    ? 'bg-[#7895A8]/15 text-[#E4E8EB] font-medium border border-[#7895A8]/30'
                    : 'text-[#9AA7B1] hover:text-[#E4E8EB] hover:bg-[#101820]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Left Active Line Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#7895A8] rounded-r" />
                  )}
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#7895A8]' : 'text-[#687681]'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#101820] text-[#7895A8] border border-[rgba(190,205,215,0.12)]">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer System Status Card */}
      <div className="p-3 m-3 rounded-[10px] bg-[#101820] border border-[rgba(190,205,215,0.10)] text-[11px] font-sans space-y-1.5 shadow-subtle">
        <div className="flex items-center justify-between">
          <span className="text-[#9AA7B1] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7D9B83]" />
            All Systems
          </span>
          <span className="text-[#7D9B83] font-medium text-[10px]">OPERATIONAL</span>
        </div>
        <div className="flex items-center justify-between text-[#687681] text-[10px] font-mono">
          <span>Data Sync</span>
          <span className="text-[#7895A8]">LIVE</span>
        </div>
        <div className="flex items-center justify-between text-[#687681] text-[10px] font-mono">
          <span>Uptime</span>
          <span className="text-[#E4E8EB]">99.8%</span>
        </div>
      </div>
    </aside>
  );
};
