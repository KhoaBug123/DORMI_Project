import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import MainLayout from '../layouts/MainLayout';
import TenantLayout from '../layouts/TenantLayout';
import LandlordLayout from '../layouts/LandlordLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public & Auth Pages
import LandingPage from '../pages/public/LandingPage';
import SearchResults from '../pages/public/SearchResults';
import RoomDetail from '../pages/public/RoomDetail';
import AuthPage from '../pages/public/AuthPage';
import ForgotPassword from '../pages/public/ForgotPassword';
import NotFound from '../pages/public/NotFound';

// Tenant Pages
import TenantDashboard from '../pages/Tenant/TenantDashboard';
import RoommateMatcher from '../pages/Tenant/RoommateMatcher';
import CreateRoommatePost from '../pages/Tenant/CreateRoommatePost';
import TenantChatCenter from '../pages/Tenant/TenantChatCenter';
import TenantProfile from '../pages/Tenant/TenantProfile';
import TenantSettings from '../pages/Tenant/TenantSettings';

// Landlord Pages
import LandlordDashboard from '../pages/Landlord/LandlordDashboard';
import LeadAnalytics from '../pages/Landlord/LeadAnalytics';
import SmartListingForm from '../pages/Landlord/SmartListingForm';
import RoomManagement from '../pages/Landlord/RoomManagement';
import TenantDiscovery from '../pages/Landlord/TenantDiscovery';
import PricingCheckout from '../pages/Landlord/PricingCheckout';
import BillingHistory from '../pages/Landlord/BillingHistory';
import VerificationCenter from '../pages/Landlord/VerificationCenter';
import LandlordChatCenter from '../pages/Landlord/LandlordChatCenter';
import LandlordSettings from '../pages/Landlord/LandlordSettings';

// Admin Pages
import AdminDashboard from '../pages/Admin/AdminDashboard';
import VerificationModeration from '../pages/Admin/VerificationModeration';
import ContentModeration from '../pages/Admin/ContentModeration';

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES (Guest) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/reset" element={<ForgotPassword />} />
        
        {/* Legacy Redirects */}
        <Route path="/customer/matcher" element={<Navigate to="/tenant/match" replace />} />
      </Route>

      {/* TENANT ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['Tenant']} />}>
        <Route path="/tenant" element={<TenantLayout />}>
          <Route index element={<TenantDashboard />} />
          <Route path="match" element={<RoommateMatcher />} />
          <Route path="post" element={<CreateRoommatePost />} />
          <Route path="chat" element={<TenantChatCenter />} />
          <Route path="profile" element={<TenantProfile />} />
          <Route path="settings" element={<TenantSettings />} />
        </Route>
      </Route>

      {/* LANDLORD ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['Landlord']} />}>
        <Route path="/landlord" element={<LandlordLayout />}>
          <Route index element={<LandlordDashboard />} />
          <Route path="analytics" element={<LeadAnalytics />} />
          <Route path="create" element={<SmartListingForm />} />
          <Route path="rooms" element={<RoomManagement />} />
          <Route path="discover" element={<TenantDiscovery />} />
          <Route path="pricing" element={<PricingCheckout />} />
          <Route path="billing" element={<BillingHistory />} />
          <Route path="verify" element={<VerificationCenter />} />
          <Route path="chat" element={<LandlordChatCenter />} />
          <Route path="settings" element={<LandlordSettings />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="verify" element={<VerificationModeration />} />
          <Route path="content" element={<ContentModeration />} />
        </Route>
      </Route>

      {/* 404 NOT FOUND */}
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
