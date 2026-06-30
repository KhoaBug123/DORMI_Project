import { Link } from 'react-router-dom';
import { Heart, Calendar, Wrench, Users, ArrowRight } from 'lucide-react';
import { useTenantStore } from '../../store/useTenantStore';
import { mockTenantDashboardStats, mockRooms } from '../../data/mockData';

export default function TenantDashboard() {
  const { savedRooms, appointments } = useTenantStore();
  const recentAppointments = appointments.slice(0, 4);
  const savedRoomDetails = mockRooms.filter(r => savedRooms.includes(r.id)).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Tổng quan Người thuê</h1>
        <p className="text-text-secondary">Chào mừng bạn trở lại! Dưới đây là tóm tắt hoạt động của bạn.</p>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Phòng đã lưu</p>
            <p className="text-2xl font-bold text-text-primary">{savedRooms.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center text-info">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Lịch hẹn</p>
            <p className="text-2xl font-bold text-text-primary">{appointments.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Báo cáo sự cố</p>
            <p className="text-2xl font-bold text-text-primary">{mockTenantDashboardStats.activeTickets}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Gợi ý ghép bạn</p>
            <p className="text-2xl font-bold text-text-primary">{mockTenantDashboardStats.roommateMatches}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lịch hẹn sắp tới */}
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-2">
            <h2 className="font-bold text-text-primary">Lịch hẹn gần đây</h2>
            <Link to="/tenant/appointments" className="text-sm font-medium text-primary hover:text-primary-dark">Xem tất cả</Link>
          </div>
          <div className="p-6">
            {recentAppointments.length === 0 ? (
              <div className="text-center py-8 text-text-muted">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Bạn không có lịch hẹn nào.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentAppointments.map(appt => (
                  <div key={appt.id} className="flex gap-4 p-4 border border-border rounded-xl">
                    <img src={appt.roomImage} alt={appt.roomTitle} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-text-primary text-sm mb-1">{appt.roomTitle}</h3>
                      <p className="text-xs text-text-secondary mb-2">{appt.roomAddress}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                          {new Date(appt.scheduledAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                          appt.status === 'confirmed' ? 'bg-success/10 text-success' : 
                          appt.status === 'pending' ? 'bg-warning/10 text-warning' : 
                          appt.status === 'completed' ? 'bg-info/10 text-info' :
                          'bg-error/10 text-error'
                        }`}>
                          {appt.status === 'confirmed' ? 'Đã xác nhận' : 
                           appt.status === 'pending' ? 'Chờ xác nhận' :
                           appt.status === 'completed' ? 'Đã xem' : 'Đã hủy'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Phòng đã lưu gần đây */}
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-2">
            <h2 className="font-bold text-text-primary">Phòng đã lưu</h2>
            <Link to="/tenant/saved" className="text-sm font-medium text-primary hover:text-primary-dark">Xem tất cả</Link>
          </div>
          <div className="p-6">
            {savedRoomDetails.length === 0 ? (
              <div className="text-center py-8 text-text-muted">
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Bạn chưa lưu phòng nào.</p>
                <Link to="/tenant/explore" className="inline-block mt-4 text-sm font-semibold text-primary">Khám phá ngay</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedRoomDetails.map(room => (
                  <Link to={`/tenant/explore/${room.id}`} key={room.id} className="flex justify-between items-center p-3 hover:bg-surface-2 rounded-xl transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={room.images[0]} alt={room.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-semibold text-text-primary text-sm line-clamp-1">{room.title}</h3>
                        <p className="text-xs text-text-secondary">{room.price.toLocaleString('vi-VN')}đ/tháng</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
