import React, { useState } from 'react';
import { stationService } from '../services/dataServices';
import { Station } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Radio, Plus, Eye, Edit3, Trash2, Compass, MapPin, Activity } from 'lucide-react';

export const Stations: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stations, setStations] = useState<Station[]>(stationService.getStations());
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newStationName, setNewStationName] = useState<string>('');

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const handleAddStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStationName) return;

    const created = stationService.addStation({
      name: newStationName.toUpperCase() + ' STATION',
      code: `IND-${newStationName.toUpperCase().slice(0, 3)}-03`,
      status: 'NORMAL',
      location: 'Queen Maud Land Plateau',
      coordinates: { lat: -71.2, lng: 12.4, elevation: 150 },
      temperature: -25.0,
      windSpeed: 22,
      humidity: 60,
      pressure: 988,
      fuelLevel: 80,
      powerLevel: 90,
      generationKw: 400,
      consumptionKw: 280,
      overallHealth: 95,
      lastSync: 'Just now',
      operationalDays: 1,
      description: 'Newly added research station facility.',
      population: 15
    });

    setStations([...stations, created]);
    setNewStationName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 select-none page-fade">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-sans text-[#E4E8EB] tracking-wide flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#7895A8]" />
            <span>Indian Antarctic Research Stations</span>
          </h2>
          <p className="text-xs text-[#9AA7B1] font-sans">
            Operational status and telemetry overview for Maitri & Bharati stations
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 rounded-md bg-[#7895A8] hover:bg-[#8BA7BA] text-[#080D12] font-semibold text-xs flex items-center space-x-1.5 transition-all duration-180 shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD STATION</span>
          </button>
        )}
      </div>

      {/* Stations Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stations.map((st) => (
          <div
            key={st.id}
            className="bg-[#101820] rounded-[10px] p-5 border border-[rgba(190,205,215,0.10)] flex flex-col justify-between shadow-dark-subtle hover:border-[#7895A8]/40 transition-all duration-180"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-sans font-semibold text-base text-[#E4E8EB] tracking-wide">{st.name}</h3>
                    <span className="text-xs font-mono text-[#9AA7B1]">({st.code})</span>
                  </div>
                  <p className="text-xs text-[#9AA7B1] flex items-center gap-1 mt-0.5 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#7895A8]" />
                    <span>{st.location}</span>
                  </p>
                </div>
                <StatusBadge status={st.status} size="md" />
              </div>

              <p className="text-xs text-[#9AA7B1] mb-5 leading-relaxed bg-[#0C1218] p-3 rounded-md border border-[rgba(190,205,215,0.08)] font-sans">
                {st.description}
              </p>

              {/* Telemetry Matrix Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs mb-5">
                <div className="p-2.5 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                  <div className="text-[10px] text-[#687681] font-sans">Temp</div>
                  <div className="font-medium text-[#E4E8EB]">{st.temperature}°C</div>
                </div>

                <div className="p-2.5 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                  <div className="text-[10px] text-[#687681] font-sans">Wind</div>
                  <div className="font-medium text-[#E4E8EB]">{st.windSpeed} km/h</div>
                </div>

                <div className="p-2.5 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                  <div className="text-[10px] text-[#687681] font-sans">Fuel</div>
                  <div className={`font-medium ${st.fuelLevel < 65 ? 'text-[#B29A6A]' : 'text-[#7D9B83]'}`}>
                    {st.fuelLevel}%
                  </div>
                </div>

                <div className="p-2.5 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
                  <div className="text-[10px] text-[#687681] font-sans">Power</div>
                  <div className="font-medium text-[#7D9B83]">{st.powerLevel}%</div>
                </div>
              </div>
            </div>

            {/* Actions Row */}
            <div className="pt-3 border-t border-[rgba(190,205,215,0.10)] flex items-center justify-between font-sans text-xs">
              <div className="text-[#687681] text-[11px] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#7895A8]" />
                <span>Last Sync: {st.lastSync}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate(`/stations/${st.id}`)}
                  className="px-3 py-1.5 rounded-md bg-[#7895A8]/20 text-[#E4E8EB] hover:bg-[#7895A8]/30 border border-[#7895A8]/30 flex items-center gap-1.5 text-xs transition-all duration-180"
                >
                  <Eye className="w-3.5 h-3.5 text-[#7895A8]" />
                  <span>VIEW DETAILS</span>
                </button>

                {isSuperAdmin && (
                  <>
                    <button
                      title="Edit Station"
                      className="p-1.5 rounded-md text-[#9AA7B1] hover:text-[#E4E8EB] hover:bg-[#0C1218]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Delete Station"
                      className="p-1.5 rounded-md text-[#9AA7B1] hover:text-[#A87575] hover:bg-[#0C1218]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Station Modal (Super Admin) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101820] w-full max-w-md rounded-[10px] p-6 border border-[rgba(190,205,215,0.12)] shadow-2xl space-y-4 font-sans text-xs">
            <h3 className="text-sm font-semibold text-[#E4E8EB] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#7895A8]" />
              <span>Add New Research Station</span>
            </h3>
            <form onSubmit={handleAddStation} className="space-y-4">
              <div>
                <label className="text-[#9AA7B1] block mb-1">Station Name</label>
                <input
                  type="text"
                  value={newStationName}
                  onChange={(e) => setNewStationName(e.target.value)}
                  placeholder="Dakshin Gangotri II"
                  className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] font-mono focus:outline-none focus:border-[#7895A8]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-md text-[#9AA7B1] hover:bg-[#0C1218]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#7895A8] text-[#080D12] font-semibold"
                >
                  CREATE STATION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
