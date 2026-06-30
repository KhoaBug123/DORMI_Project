import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

import LandingPage from '../pages/public/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Forbidden from '../pages/error/Forbidden';
import NotFound from '../pages/error/NotFound';
import PublicLandlordProfile from '../pages/public/LandlordProfile';

// Tenant Pages
import TenantDashboard from '../pages/Tenant/Dashboard';
import ExploreRooms from '../pages/Tenant/ExploreRooms';
import RoomDetail from '../pages/Tenant/RoomDetail';
import RoommateMatcher from '../pages/Tenant/RoommateMatcher';
import TenantChat from '../pages/Tenant/Chat';
import TenantProfile from '../pages/Tenant/Profile';
import SavedRooms from '../pages/Tenant/SavedRooms';
import Vouchers from '../pages/Tenant/Vouchers';
import TenantMaintenance from '../pages/Tenant/Maintenance';
import TenantAppointments from '../pages/Tenant/Appointments';

// Landlord Pages
import LandlordKYC from '../pages/Landlord/KYC';
import LandlordDashboard from '../pages/Landlord/Dashboard';
import CreateRoom from '../pages/Landlord/CreateRoom';
import LandlordAppointments from '../pages/Landlord/Appointments';
import VIPPackages from '../pages/Landlord/VIPPackages';
import LandlordProfile from '../pages/Landlord/Profile';
import LandlordLeads from '../pages/Landlord/Leads';
import LandlordChat from '../pages/Landlord/Chat';
import LandlordRooms from '../pages/Landlord/Rooms';
import LandlordMaintenance from '../pages/Landlord/Maintenance';

// Admin Pages
import AdminDashboard from '../pages/Admin/Dashboard';
import RoomApprovals from '../pages/Admin/RoomApprovals';
import KYCApprovals from '../pages/Admin/KYCApprovals';
import AdminUsers from '../pages/Admin/Users';
import AdminSettings from '../pages/Admin/Settings';
import AdminReports from '../pages/Admin/Reports';

// Shared
import SharedSettings from '../pages/shared/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '403', element: <Forbidden /> },
      { path: 'settings', element: <SharedSettings /> },
      { path: 'landlord/:id', element: <PublicLandlordProfile /> },

      // Tenant Routes
      {
        path: 'tenant',
        element: <ProtectedRoute allowedRoles={['tenant']} />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <TenantDashboard /> },
          { path: 'explore', element: <ExploreRooms /> },
          { path: 'explore/:roomId', element: <RoomDetail /> },
          { path: 'roommate', element: <RoommateMatcher /> },
          { path: 'chat', element: <TenantChat /> },
          { path: 'profile', element: <TenantProfile /> },
          { path: 'saved', element: <SavedRooms /> },
          { path: 'vouchers', element: <Vouchers /> },
          { path: 'maintenance', element: <TenantMaintenance /> },
          { path: 'appointments', element: <TenantAppointments /> },
        ]
      },

      // Landlord Routes
      {
        path: 'landlord',
        element: <ProtectedRoute allowedRoles={['landlord']} />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'kyc', element: <LandlordKYC /> },
          { path: 'dashboard', element: <LandlordDashboard /> },
          { path: 'create-room', element: <CreateRoom /> },
          { path: 'appointments', element: <LandlordAppointments /> },
          { path: 'vip', element: <VIPPackages /> },
          { path: 'profile', element: <LandlordProfile /> },
          { path: 'leads', element: <LandlordLeads /> },
          { path: 'chat', element: <LandlordChat /> },
          { path: 'rooms', element: <LandlordRooms /> },
          { path: 'maintenance', element: <LandlordMaintenance /> },
        ]
      },

      // Admin Routes
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'rooms', element: <RoomApprovals /> },
          { path: 'kyc', element: <KYCApprovals /> },
          { path: 'users', element: <AdminUsers /> },
          { path: 'settings', element: <AdminSettings /> },
          { path: 'reports', element: <AdminReports /> },
        ]
      }
    ]
  }
]);
