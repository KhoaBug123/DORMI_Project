import { useState } from 'react';
import { mockAppointments } from '../../data/mockData';
import { Calendar, CheckCircle2, XCircle, Search, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function LandlordAppointments() {
  // Lấy các lịch hẹn của landlord-001
  const initialAppts = mockAppointments.filter(a => a.landlordId === 'landlord-001');
  const [appointments, setAppointments] = useState(initialAppts);
  const [filter, setFilter] = useState('all');

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus as any } : a));
    if (newStatus === 'confirmed') toast.success('Đã xác nhận lịch hẹn');
    if (newStatus === 'cancelled') toast.error('Đã từ chối lịch hẹn');
    if (newStatus === 'completed') toast.success('Đã đánh dấu hoàn thành lịch hẹn');
  };

  const filteredAppts = appointments.filter(a => filter === 'all' || a.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Quản lý Lịch hẹn</h1>
          <p className="text-text-secondary">Theo dõi và sắp xếp lịch xem phòng với khách thuê.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-2">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === f ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-text-secondary hover:bg-surface-3'}`}
              >
                {f === 'all' ? 'Tất cả' : f === 'pending' ? 'Chờ xác nhận' : f === 'confirmed' ? 'Đã xác nhận' : f === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Tìm tên, sđt..." className="w-full bg-white border border-border rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>

        {/* Bảng */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-3 border-b border-border text-sm text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Khách thuê</th>
                <th className="px-6 py-4 font-bold">Phòng trọ</th>
                <th className="px-6 py-4 font-bold">Thời gian</th>
                <th className="px-6 py-4 font-bold">Trạng thái</th>
                <th className="px-6 py-4 font-bold text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAppts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    Không có lịch hẹn nào.
                  </td>
                </tr>
              ) : (
                filteredAppts.map(appt => (
                  <tr key={appt.id} className="hover:bg-surface-2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {appt.tenantId.slice(-3)}
                        </div>
                        <div>
                          <p className="font-bold text-text-primary text-sm">Sinh viên {appt.tenantId.slice(-3)}</p>
                          <p className="text-xs text-text-muted">090xxxxxxx</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 max-w-[200px]">
                        <img src={appt.roomImage} className="w-12 h-12 rounded-lg object-cover" />
                        <p className="font-semibold text-text-primary text-sm line-clamp-2">{appt.roomTitle}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary bg-primary/5 w-max px-3 py-1.5 rounded-lg border border-primary/20">
                        <Clock className="w-4 h-4" />
                        {new Date(appt.scheduledAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {appt.status === 'pending' && <span className="bg-warning/10 text-warning text-xs font-bold px-2.5 py-1 rounded-md">Chờ xác nhận</span>}
                      {appt.status === 'confirmed' && <span className="bg-info/10 text-info text-xs font-bold px-2.5 py-1 rounded-md">Đã xác nhận</span>}
                      {appt.status === 'completed' && <span className="bg-success/10 text-success text-xs font-bold px-2.5 py-1 rounded-md">Hoàn thành</span>}
                      {appt.status === 'cancelled' && <span className="bg-error/10 text-error text-xs font-bold px-2.5 py-1 rounded-md">Đã hủy</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {appt.status === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleUpdateStatus(appt.id, 'confirmed')} className="p-2 bg-info/10 text-info hover:bg-info hover:text-white rounded-lg transition-colors" title="Xác nhận">
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleUpdateStatus(appt.id, 'cancelled')} className="p-2 bg-error/10 text-error hover:bg-error hover:text-white rounded-lg transition-colors" title="Từ chối">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : appt.status === 'confirmed' ? (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleUpdateStatus(appt.id, 'completed')} className="px-3 py-1.5 bg-success/10 text-success hover:bg-success hover:text-white rounded-lg transition-colors text-sm font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Hoàn thành
                          </button>
                          <button onClick={() => handleUpdateStatus(appt.id, 'cancelled')} className="p-2 bg-error/10 text-error hover:bg-error hover:text-white rounded-lg transition-colors" title="Hủy">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-text-muted italic">Đã xử lý</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
