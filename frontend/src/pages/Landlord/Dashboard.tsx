import { Link } from 'react-router-dom';
import { useLandlordStore } from '../../store/useLandlordStore';
import { Home, Eye, Users, CalendarCheck, Plus, TrendingUp } from 'lucide-react';
import { mockLandlordDashboardStats, mockRooms, mockTenantMatches } from '../../data/mockData';

export default function LandlordDashboard() {
  const { myRooms } = useLandlordStore();
  
  const displayRooms = myRooms.length > 0 ? myRooms : mockRooms.filter(r => r.landlordId === 'landlord-001');
  
  const totalRooms = displayRooms.length;
  const activeRooms = displayRooms.filter(r => r.status === 'Đang cho thuê').length;
  const vacantRooms = displayRooms.filter(r => r.status === 'Đã ẩn').length;
  const totalViews = displayRooms.reduce((acc, curr) => acc + curr.totalViews, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Tổng quan Chủ trọ</h1>
          <p className="text-text-secondary">Quản lý phòng trọ và theo dõi hiệu quả kinh doanh.</p>
        </div>
        <Link to="/landlord/create-room" className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-light transition-all-custom button-press flex items-center gap-2 shadow-brand">
          <Plus className="w-5 h-5" /> Đăng phòng mới
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Tổng số phòng</p>
          <p className="text-3xl font-black text-text-primary">{totalRooms}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center text-info">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 24%
            </span>
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Lượt xem tin (tháng)</p>
          <p className="text-3xl font-black text-text-primary">{totalViews.toLocaleString('vi-VN')}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Gợi ý khách thuê phù hợp</p>
          <p className="text-3xl font-black text-text-primary">{mockTenantMatches.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-error bg-error/10 px-2 py-1 rounded flex items-center gap-1">
              5 chờ xác nhận
            </span>
          </div>
          <p className="text-sm font-medium text-text-secondary mb-1">Lịch hẹn xem phòng</p>
          <p className="text-3xl font-black text-text-primary">{mockLandlordDashboardStats.pendingAppointments}</p>
        </div>
      </div>

      {/* Bảng Danh sách phòng */}
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-surface-2">
          <h2 className="font-bold text-text-primary">Phòng đang quản lý</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary"><strong className="text-success">{activeRooms}</strong> đang thuê</span>
            <span className="text-sm text-text-secondary"><strong className="text-error">{vacantRooms}</strong> trống/đã ẩn</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-3 border-b border-border text-sm text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Phòng trọ</th>
                <th className="px-6 py-4 font-bold">Trạng thái</th>
                <th className="px-6 py-4 font-bold">Giá thuê</th>
                <th className="px-6 py-4 font-bold">Lượt xem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayRooms.map(room => (
                <tr key={room.id} className="hover:bg-surface-2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={room.images[0]} alt={room.title} className="w-16 h-16 rounded-xl object-cover border border-border" />
                      <div>
                        <p className="font-bold text-text-primary text-sm mb-1">{room.title}</p>
                        <p className="text-xs text-text-muted flex items-center gap-1">{room.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${room.status === 'Đang cho thuê' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                      {room.status === 'Đang cho thuê' ? 'Còn trống' : 'Đã thuê'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-text-primary">
                    {room.price.toLocaleString('vi-VN')}đ<span className="text-xs text-text-muted font-normal">/th</span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-sm font-medium">
                    {Math.floor(Math.random() * 500) + 100}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
