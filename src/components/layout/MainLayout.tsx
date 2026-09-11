import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080D12] text-[#E4E8EB] font-sans flex">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 mt-16 p-6 overflow-x-hidden page-fade">
          {children}
        </main>
      </div>
    </div>
  );
};
