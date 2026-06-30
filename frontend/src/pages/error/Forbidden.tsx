import { Link } from 'react-router-dom';
import { Home, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function Forbidden() {
  const { user } = useAuthStore();
  
  const getHomeLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'landlord') return '/landlord/dashboard';
    return '/tenant/dashboard';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mb-6">
        <ShieldAlert className="w-10 h-10 text-warning" />
      </div>
      <h1 className="text-6xl font-black text-text-primary mb-4 tracking-tight">403</h1>
      <h2 className="text-2xl font-bold text-text-primary mb-4">Truy cập bị từ chối</h2>
      <p className="text-text-secondary text-lg mb-8 max-w-md">
        Xin lỗi, bạn không có quyền truy cập vào trang này với vai trò hiện tại. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
      </p>
      <Link 
        to={getHomeLink()} 
        className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-md hover:bg-primary-light transition-colors shadow-sm"
      >
        <Home className="w-5 h-5" />
        Về Trang Chính
      </Link>
    </div>
  );
}
