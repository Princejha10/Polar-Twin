import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isLoading, hasAccess } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#040812] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
          <p className="font-mono text-xs text-cyan-400 tracking-wider uppercase">Loading POLAR TWIN Command Centre...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasAccess(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
