import React, { useState } from 'react';
import { MOCK_USERS } from '../data/mockData';
import { User } from '../types';
import { Users as UsersIcon, Plus, UserX } from 'lucide-react';

export const Users: React.FC = () => {
  const [userList, setUserList] = useState<User[]>(MOCK_USERS);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<User['role']>('ENGINEER');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const created: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      status: 'ACTIVE',
      lastLogin: 'Never'
    };

    setUserList([...userList, created]);
    setName('');
    setEmail('');
    setShowAddModal(false);
  };

  const toggleStatus = (id: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE' } : u))
    );
  };

  return (
    <div className="space-y-6 select-none page-fade font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#E4E8EB] tracking-wide flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-[#7895A8]" />
            <span>User & Access Management</span>
          </h2>
          <p className="text-xs text-[#9AA7B1]">
            Super Admin permission controls, station operator assignments, and role authorization
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-1.5 rounded-md bg-[#7895A8] hover:bg-[#8BA7BA] text-[#080D12] font-semibold text-xs flex items-center space-x-1.5 transition-all duration-180 shadow-subtle"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>ADD USER</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-[#101820] border border-[rgba(190,205,215,0.10)] p-5 rounded-[10px] shadow-dark-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[rgba(190,205,215,0.10)] text-[#687681] text-[11px] uppercase font-mono">
                <th className="py-2.5 px-3">USER</th>
                <th className="py-2.5 px-3">ROLE</th>
                <th className="py-2.5 px-3">ASSIGNMENT</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">LAST LOGIN</th>
                <th className="py-2.5 px-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(190,205,215,0.08)] font-sans">
              {userList.map((u) => (
                <tr key={u.id} className="hover:bg-[#0C1218] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-[#E4E8EB] flex items-center space-x-3">
                    {u.avatar ? (
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full border border-[rgba(190,205,215,0.12)] object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] flex items-center justify-center text-[#7895A8] font-bold">
                        {u.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div>{u.name}</div>
                      <div className="text-[10px] text-[#687681] font-mono">{u.email}</div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#7895A8]/15 text-[#7895A8] border border-[#7895A8]/30">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#9AA7B1]">{u.stationName || 'All Stations (Global)'}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      u.status === 'ACTIVE' ? 'bg-[#7D9B83]/15 text-[#7D9B83]' : 'bg-[#A87575]/15 text-[#A87575]'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#687681] font-mono text-[11px]">{u.lastLogin}</td>
                  <td className="py-2.5 px-3 text-right space-x-2">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className="p-1 rounded text-[#9AA7B1] hover:text-[#B29A6A]"
                      title="Toggle Status"
                    >
                      <UserX className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101820] border border-[rgba(190,205,215,0.12)] shadow-2xl w-full max-w-md rounded-[10px] p-6 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-[#E4E8EB] flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-[#7895A8]" />
              <span>Provision User Account</span>
            </h3>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="text-[#9AA7B1] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Ananya Roy"
                  className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
                />
              </div>

              <div>
                <label className="text-[#9AA7B1] block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@polartwin.demo"
                  className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
                />
              </div>

              <div>
                <label className="text-[#9AA7B1] block mb-1">Role Permission</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-[#0C1218] border border-[rgba(190,205,215,0.12)] rounded-md px-3.5 py-2 text-[#E4E8EB] focus:outline-none focus:border-[#7895A8]"
                >
                  <option value="SUPER_ADMIN">SUPER ADMIN</option>
                  <option value="STATION_OPERATOR">STATION OPERATOR</option>
                  <option value="ENGINEER">ENGINEER</option>
                </select>
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
                  PROVISION USER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
