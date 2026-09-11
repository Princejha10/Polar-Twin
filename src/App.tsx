import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Stations } from './pages/Stations';
import { StationDetail } from './pages/StationDetail';
import { TwinViewerPage } from './pages/TwinViewerPage';
import { Energy } from './pages/Energy';
import { Environment } from './pages/Environment';
import { Logistics } from './pages/Logistics';
import { Assets } from './pages/Assets';
import { Alerts } from './pages/Alerts';
import { Simulation } from './pages/Simulation';
import { Reports } from './pages/Reports';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes inside MainLayout */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/stations"
              element={
                <MainLayout>
                  <Stations />
                </MainLayout>
              }
            />
            <Route
              path="/stations/:id"
              element={
                <MainLayout>
                  <StationDetail />
                </MainLayout>
              }
            />
            <Route
              path="/3d-twin"
              element={
                <MainLayout>
                  <TwinViewerPage />
                </MainLayout>
              }
            />
            <Route
              path="/energy"
              element={
                <MainLayout>
                  <Energy />
                </MainLayout>
              }
            />
            <Route
              path="/environment"
              element={
                <MainLayout>
                  <Environment />
                </MainLayout>
              }
            />
            <Route
              path="/logistics"
              element={
                <MainLayout>
                  <Logistics />
                </MainLayout>
              }
            />
            <Route
              path="/assets"
              element={
                <MainLayout>
                  <Assets />
                </MainLayout>
              }
            />
            <Route
              path="/assets/:id"
              element={
                <MainLayout>
                  <Assets />
                </MainLayout>
              }
            />
            <Route
              path="/alerts"
              element={
                <MainLayout>
                  <Alerts />
                </MainLayout>
              }
            />
            <Route
              path="/simulation"
              element={
                <MainLayout>
                  <Simulation />
                </MainLayout>
              }
            />
            <Route
              path="/reports"
              element={
                <MainLayout>
                  <Reports />
                </MainLayout>
              }
            />

            {/* Super Admin Restricted Routes */}
            <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']} />}>
              <Route
                path="/users"
                element={
                  <MainLayout>
                    <Users />
                  </MainLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                }
              />
            </Route>
          </Route>

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
