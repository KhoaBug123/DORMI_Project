import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '../../store/useAuthStore';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
