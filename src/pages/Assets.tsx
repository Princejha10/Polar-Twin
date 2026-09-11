import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { assetService } from '../services/dataServices';
import { Asset } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Cpu, Search, Wrench, X } from 'lucide-react';

export const Assets: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allAssets = assetService.getAssets();

  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories: string[] = [
    'ALL',
    'Generators',
    'Vehicles',
    'Communication',
    'Power',
    'Heating',
    'Scientific',
    'Storage',
    'Infrastructure'
  ];

  const filteredAssets = allAssets.filter((a) => {
    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.stationName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaintenance = filterParam === 'maintenance' ? a.status === 'WARNING' || a.status === 'CRITICAL' : true;

    return matchesCategory && matchesSearch && matchesMaintenance;
  });

  return (
    <div className="space-y-6 select-none page-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-sans text-[#E4E8EB] tracking-wide flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#7895A8]" />
            <span>Infrastructure & Equipment Telemetry</span>
          </h2>
          <p className="text-xs text-[#9AA7B1] font-sans">
            Real-time equipment monitoring, health scores, and maintenance tracking
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#687681] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search asset, serial #..."
            className="w-full bg-[#101820] border border-[rgba(190,205,215,0.12)] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#E4E8EB] font-sans focus:outline-none focus:border-[#7895A8]"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none font-sans text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSearchParams(cat === 'ALL' ? {} : { category: cat });
            }}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all duration-180 ${
              selectedCategory === cat
                ? 'bg-[#7895A8]/20 text-[#E4E8EB] font-semibold border border-[#7895A8]/40'
                : 'bg-[#101820] text-[#9AA7B1] border border-[rgba(190,205,215,0.10)] hover:text-[#E4E8EB]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className="bg-[#101820] rounded-[10px] p-4 border border-[rgba(190,205,215,0.10)] shadow-dark-subtle hover:border-[#7895A8]/40 transition-all duration-180 flex flex-col justify-between cursor-pointer font-sans"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-xs text-[#E4E8EB]">{asset.name}</h3>
                  <span className="text-[10px] font-mono text-[#687681]">{asset.code} • {asset.stationName}</span>
                </div>
                <StatusBadge status={asset.status} size="sm" />
              </div>

              <p className="text-xs text-[#9AA7B1] mb-4 line-clamp-2">{asset.description}</p>

              {/* Health Score */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#687681]">Health Index</span>
                  <span className="font-mono text-[#E4E8EB] font-medium">{asset.healthScore}%</span>
                </div>
                <div className="w-full bg-[#080D12] rounded-full h-1 overflow-hidden border border-[rgba(190,205,215,0.08)]">
                  <div
                    className={`h-full rounded-full ${asset.healthScore < 70 ? 'bg-[#B29A6A]' : 'bg-[#7D9B83]'}`}
                    style={{ width: `${asset.healthScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer Maintenance */}
            <div className="pt-2 border-t border-[rgba(190,205,215,0.08)] flex items-center justify-between text-xs">
              <span className="text-[#687681] text-[10px]">Location: {asset.location}</span>
              <span className="text-[#B29A6A] font-medium flex items-center gap-1 text-[11px]">
                <Wrench className="w-3.5 h-3.5" />
                <span>Maint. in {asset.nextMaintenanceDays}d</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Detail Drawer */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-[#101820] border border-[rgba(190,205,215,0.12)] shadow-2xl w-full max-w-lg rounded-[10px] p-6 space-y-4 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm text-[#E4E8EB]">{selectedAsset.name}</h3>
                <span className="text-[11px] font-mono text-[#9AA7B1]">{selectedAsset.code} • {selectedAsset.stationName}</span>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1 rounded text-[#9AA7B1] hover:text-[#E4E8EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)]">
              <StatusBadge status={selectedAsset.status} size="md" />
              <div className="text-xs">
                <span className="text-[#9AA7B1]">Health Score: </span>
                <span className="font-mono font-medium text-[#E4E8EB]">{selectedAsset.healthScore}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[#687681] uppercase text-[10px] font-semibold tracking-wider">Specifications</div>
              <div className="p-3 rounded-md bg-[#0C1218] border border-[rgba(190,205,215,0.08)] space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#687681]">Serial Number:</span>
                  <span className="text-[#E4E8EB]">{selectedAsset.serialNumber}</span>
                </div>
                {Object.entries(selectedAsset.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-[#687681]">{k}:</span>
                    <span className="text-[#E4E8EB] font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-4 py-2 rounded-md bg-[#7895A8] text-[#080D12] font-semibold text-xs shadow-subtle hover:bg-[#8BA7BA] transition-all duration-180"
              >
                CLOSE DIAGNOSTICS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
