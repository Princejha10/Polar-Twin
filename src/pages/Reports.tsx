import React, { useState } from 'react';
import { reportService } from '../services/dataServices';
import { SystemReport } from '../types';
import { useAuth } from '../context/AuthContext';
import { FileText, Download, Plus, Calendar } from 'lucide-react';

export const Reports: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<SystemReport[]>(reportService.getReports());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<SystemReport['category']>('Daily Operations');
  const [summary, setSummary] = useState<string>('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary) return;

    const created = reportService.createReport(
      title,
      category,
      'Maitri & Bharati Stations',
      summary,
      user?.name || 'Commander Rajesh Sharma'
    );

    setReports(reportService.getReports());
    setTitle('');
    setSummary('');
    setShowModal(false);
  };

  const handleDownloadReport = (rep: SystemReport) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rep, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${rep.id}-${rep.category.toLowerCase().replace(/ /g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 select-none page-fade font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#E4E8EB] tracking-wide flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#7895A8]" />
            <span>Mission Control Reports & Expedition Archives</span>
          </h2>
          <p className="text-xs text-[#9AA7B1]">
            Generate and export operational logs, energy audits, asset health reports, and incident logs
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-1.5 rounded-md bg-[#7895A8] hover:bg-[#8BA7BA] text-[#080D12] font-semibold text-xs flex items-center space-x-1.5 transition-all duration-180 shadow-subtle"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>GENERATE REPORT</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((rep) => (
          <div key={rep.id} className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] flex flex-col justify-between space-y-3 shadow-dark-subtle">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[10px] font-mono text-[#7895A8] uppercase bg-[#7895A8]/15 px-2 py-0.5 rounded border border-[#7895A8]/30">
                    {rep.category}
                  </span>
                  <h3 className="font-semibold text-xs text-[#E4E8EB] mt-1.5">{rep.title}</h3>
                </div>
                <span className="text-[10px] font-mono text-[#687681]">{rep.fileSize}</span>
              </div>

              <p className="text-xs text-[#9AA7B1] leading-relaxed bg-[#0C1218] p-3 rounded-md border border-[rgba(190,205,215,0.08)]">
                {rep.summary}
              </p>
            </div>

            <div className="pt-2.5 border-t border-[rgba(190,205,215,0.10)] flex items-center justify-between text-xs">
              <div className="text-[#687681] text-[10px] font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7895A8]" />
                <span>{rep.generatedAt}</span>
              </div>

              <button
                onClick={() => handleDownloadReport(rep)}
                className="px-3 py-1 rounded bg-[#7895A8]/20 text-[#E4E8EB] hover:bg-[#7895A8]/30 border border-[#7895A8]/30 flex items-center gap-1.5 text-[11px] font-mono transition-all duration-180"
              >
                <Download className="w-3.5 h-3.5 text-[#7895A8]" />
                <span>EXPORT JSON</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Generate Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101820] border border-[rgba(190,205,215,0.12)] shadow-2xl w-full max-w-md rounded-[10px] p-6 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-[#E4E8EB] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7895A8]" />
              <span>Generate Mission Report</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="text-[#9AA7B1] block mb-1">Report Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Maitri Weekly Energy Audit"
                  className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
                />
              </div>

              <div>
                <label className="text-[#9AA7B1] block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
                >
                  <option value="Daily Operations">Daily Operations</option>
                  <option value="Energy Audit">Energy Audit</option>
                  <option value="Asset Health">Asset Health</option>
                  <option value="Environmental Risk">Environmental Risk</option>
                  <option value="Logistics Status">Logistics Status</option>
                </select>
              </div>

              <div>
                <label className="text-[#9AA7B1] block mb-1">Executive Summary</label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summary of operational telemetry..."
                  className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-1.5 rounded-md text-[#9AA7B1] hover:bg-[#0C1218]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#7895A8] text-[#080D12] font-semibold"
                >
                  GENERATE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
