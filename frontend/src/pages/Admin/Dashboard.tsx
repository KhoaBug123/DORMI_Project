import { mockAdminStats } from '../../data/mockData';
import { Users, Home, DollarSign, AlertTriangle, TrendingUp, Building, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Trung tâm Kiểm duyệt DORMI</h1>
        <p className="text-text-secondary">Theo dõi sức khỏe nền tảng và quản lý kiểm duyệt.</p>
      </div>

      {/* Stats Grid - 6 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* KPI 1: Tổng Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center text-info">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 5%
            </span>
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Tổng người dùng</p>
          <p className="text-3xl font-black text-[#1E1B4B]">{mockAdminStats.totalUsers.toLocaleString('vi-VN')}</p>
        </div>

        {/* KPI 2: Tổng Phòng */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Building className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Tổng phòng trên hệ thống</p>
          <p className="text-3xl font-black text-[#1E1B4B]">4.520</p>
        </div>

        {/* KPI 3: Doanh thu */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 18%
            </span>
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Doanh thu tháng</p>
          <p className="text-3xl font-black text-[#1E1B4B]">{(mockAdminStats.platformRevenue / 1000000).toFixed(1)}M</p>
        </div>

        {/* KPI 4: KYC chờ duyệt */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
              <AlertTriangle className="w-6 h-6" />
            </div>
            {mockAdminStats.pendingKYC > 0 && (
              <span className="absolute top-6 right-6 w-3 h-3 bg-warning rounded-full animate-pulse"></span>
            )}
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">eKYC chờ duyệt</p>
          <p className="text-3xl font-black text-[#1E1B4B]">{mockAdminStats.pendingKYC}</p>
        </div>

        {/* KPI 5: Tin đăng chờ duyệt */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Home className="w-6 h-6" />
            </div>
            {mockAdminStats.pendingRooms > 0 && (
              <span className="absolute top-6 right-6 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Tin đăng chờ duyệt</p>
          <p className="text-3xl font-black text-[#1E1B4B]">{mockAdminStats.pendingRooms}</p>
        </div>

        {/* KPI 6: Báo cáo vi phạm đang mở */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <span className="absolute top-6 right-6 w-3 h-3 bg-error rounded-full animate-pulse"></span>
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Báo cáo vi phạm (Mở)</p>
          <p className="text-3xl font-black text-[#1E1B4B]">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden p-6">
          <h2 className="font-bold text-text-primary mb-4">Tác vụ cần xử lý</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm">Kiểm duyệt tin đăng mới</h3>
                  <p className="text-xs text-text-secondary">Có {mockAdminStats.pendingRooms} tin phòng trọ đang chờ duyệt.</p>
                </div>
              </div>
              <Link to="/admin/rooms" className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-primary hover:bg-surface-3 transition-colors">
                Xử lý ngay
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-warning/20 text-warning flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm">Xác minh eKYC Chủ trọ</h3>
                  <p className="text-xs text-text-secondary">Có {mockAdminStats.pendingKYC} hồ sơ CCCD đang chờ đối chiếu.</p>
                </div>
              </div>
              <Link to="/admin/kyc" className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-primary hover:bg-surface-3 transition-colors">
                Xử lý ngay
              </Link>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-error/20 text-error flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm">Báo cáo vi phạm</h3>
                  <p className="text-xs text-text-secondary">Có 3 báo cáo chờ xử lý.</p>
                </div>
              </div>
              <Link to="/admin/reports" className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-primary hover:bg-surface-3 transition-colors">
                Xử lý ngay
              </Link>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 flex flex-col">
          <h2 className="font-bold text-text-primary mb-6">Tốc độ tăng trưởng người dùng (6 tháng)</h2>
          <div className="flex-1 w-full h-full relative min-h-[200px]">
            <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(30, 27, 75, 0.2)" />
                  <stop offset="100%" stopColor="rgba(30, 27, 75, 0)" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Path and Area */}
              <path d="M 0 150 L 100 130 L 200 110 L 300 120 L 400 80 L 500 50 L 600 20" fill="none" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 0 150 L 100 130 L 200 110 L 300 120 L 400 80 L 500 50 L 600 20 L 600 200 L 0 200 Z" fill="url(#lineGradient)" />
              
              {/* Points */}
              <circle cx="0" cy="150" r="5" fill="#fff" stroke="#1E1B4B" strokeWidth="3" />
              <circle cx="100" cy="130" r="5" fill="#fff" stroke="#1E1B4B" strokeWidth="3" />
              <circle cx="200" cy="110" r="5" fill="#fff" stroke="#1E1B4B" strokeWidth="3" />
              <circle cx="300" cy="120" r="5" fill="#fff" stroke="#1E1B4B" strokeWidth="3" />
              <circle cx="400" cy="80" r="5" fill="#fff" stroke="#1E1B4B" strokeWidth="3" />
              <circle cx="500" cy="50" r="5" fill="#fff" stroke="#1E1B4B" strokeWidth="3" />
              <circle cx="600" cy="20" r="5" fill="#fff" stroke="#1E1B4B" strokeWidth="3" />
            </svg>
            
            <div className="absolute bottom-[-24px] left-0 w-full flex justify-between text-xs font-bold text-text-muted">
              <span>Tháng 1</span>
              <span>Tháng 2</span>
              <span>Tháng 3</span>
              <span>Tháng 4</span>
              <span>Tháng 5</span>
              <span>Tháng 6</span>
              <span>Hiện tại</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
