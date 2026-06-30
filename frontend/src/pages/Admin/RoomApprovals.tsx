import { useState } from 'react';
import { mockRooms } from '../../data/mockData';
import { CheckCircle2, XCircle, Eye, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function RoomApprovals() {
  // Fake some rooms as pending
  const [pendingRooms, setPendingRooms] = useState(
    mockRooms.slice(0, 3).map(r => ({ ...r, status: 'pending_approval' }))
  );
  
  const [rejectReason, setRejectReason] = useState('');
  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [viewRoomId, setViewRoomId] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setPendingRooms(prev => prev.filter(r => r.id !== id));
    toast.success('Đã duyệt tin đăng thành công. Tin đã được hiển thị công khai.');
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }
    setPendingRooms(prev => prev.filter(r => r.id !== rejectModalId));
    setRejectModalId(null);
    setRejectReason('');
    toast.success('Đã từ chối tin đăng và gửi thông báo cho chủ trọ.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Kiểm duyệt Tin đăng</h1>
        <p className="text-text-secondary">Xét duyệt các tin đăng phòng trọ mới từ chủ trọ trước khi hiển thị công khai.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-3 border-b border-border text-sm text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Tin đăng</th>
                <th className="px-6 py-4 font-bold">Chủ trọ</th>
                <th className="px-6 py-4 font-bold">Giá & Cọc</th>
                <th className="px-6 py-4 font-bold">Chấm điểm AI</th>
                <th className="px-6 py-4 font-bold text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pendingRooms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-success/50" />
                    Không có tin đăng nào đang chờ duyệt. Tuyệt vời!
                  </td>
                </tr>
              ) : (
                pendingRooms.map(room => (
                  <tr key={room.id} className="hover:bg-surface-2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-4 max-w-sm">
                        <img src={room.images[0]} alt={room.title} className="w-20 h-20 rounded-xl object-cover border border-border flex-shrink-0" />
                        <div>
                          <p className="font-bold text-text-primary text-sm line-clamp-2 mb-1">{room.title}</p>
                          <p className="text-xs text-text-muted line-clamp-1">{room.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img src={room.landlordAvatar} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-sm font-bold text-text-primary">{room.landlordName}</p>
                          <p className="text-xs text-text-muted">ID: {room.landlordId.slice(-4)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary text-sm">{room.price.toLocaleString('vi-VN')}đ/th</p>
                      <p className="text-xs text-text-muted">Cọc: {room.deposit.toLocaleString('vi-VN')}đ</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full border-2 border-warning flex items-center justify-center font-bold text-warning text-xs">
                          {room.trustScore}
                        </div>
                        <div className="text-xs">
                          <p className="text-success flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ảnh thật 100%</p>
                          <p className="text-success flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Giá hợp lý</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setViewRoomId(room.id)} className="p-2 bg-info/10 text-info hover:bg-info hover:text-white rounded-lg transition-colors" title="Xem chi tiết">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleApprove(room.id)} className="p-2 bg-success/10 text-success hover:bg-success hover:text-white rounded-lg transition-colors" title="Duyệt">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => setRejectModalId(room.id)} className="p-2 bg-error/10 text-error hover:bg-error hover:text-white rounded-lg transition-colors" title="Từ chối">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModalId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-text-primary">Từ chối tin đăng</h3>
            </div>
            <div className="p-6">
              <label className="block text-sm font-semibold mb-2">Lý do từ chối (Gửi cho chủ trọ)</label>
              <textarea 
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="VD: Hình ảnh mờ, thông tin giá không hợp lý..."
                rows={4} 
                className="w-full bg-surface-3 border border-border rounded-lg px-4 py-3 outline-none focus:border-error resize-none"
              ></textarea>
              
              <div className="flex gap-3 mt-6">
                <button onClick={() => setRejectModalId(null)} className="flex-1 px-4 py-2.5 rounded-lg font-bold border border-border text-text-secondary hover:bg-surface-2 transition-colors">
                  Hủy
                </button>
                <button onClick={handleRejectSubmit} className="flex-1 px-4 py-2.5 rounded-lg font-bold bg-error text-white hover:bg-red-600 transition-colors shadow-[0_4px_14px_0_rgba(239,68,68,0.39)]">
                  Từ chối tin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Room Modal */}
      {viewRoomId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
            {pendingRooms.filter(r => r.id === viewRoomId).map(room => (
              <div key={room.id}>
                <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10">
                  <h3 className="font-bold text-xl text-text-primary">Chi tiết tin đăng</h3>
                  <button onClick={() => setViewRoomId(null)} className="p-2 bg-surface-2 hover:bg-surface-3 rounded-full transition-colors text-text-secondary">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex gap-4 mb-6">
                    {room.images.slice(0, 3).map((img, idx) => (
                      <img key={idx} src={img} className="w-1/3 h-32 object-cover rounded-xl border border-border" />
                    ))}
                  </div>
                  <h4 className="text-xl font-bold text-text-primary mb-2">{room.title}</h4>
                  <p className="text-sm text-text-secondary mb-4">{room.address}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-surface-2 p-4 rounded-xl">
                      <p className="text-xs text-text-secondary mb-1">Giá thuê</p>
                      <p className="font-bold text-primary text-lg">{room.price.toLocaleString('vi-VN')}đ/th</p>
                    </div>
                    <div className="bg-surface-2 p-4 rounded-xl">
                      <p className="text-xs text-text-secondary mb-1">Tiền cọc</p>
                      <p className="font-bold text-text-primary text-lg">{room.deposit.toLocaleString('vi-VN')}đ</p>
                    </div>
                    <div className="bg-surface-2 p-4 rounded-xl">
                      <p className="text-xs text-text-secondary mb-1">Diện tích</p>
                      <p className="font-bold text-text-primary text-lg">{room.area}m²</p>
                    </div>
                    <div className="bg-surface-2 p-4 rounded-xl">
                      <p className="text-xs text-text-secondary mb-1">Chủ trọ</p>
                      <p className="font-bold text-text-primary text-lg">{room.landlordName}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-bold mb-2">Tiện ích</h5>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} className="bg-info/10 text-info px-3 py-1 rounded-full text-xs font-bold">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button onClick={() => { handleApprove(room.id); setViewRoomId(null); }} className="flex-1 px-4 py-3 rounded-xl font-bold bg-success text-white hover:bg-green-600 transition-colors shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Duyệt tin này
                    </button>
                    <button onClick={() => { setRejectModalId(room.id); setViewRoomId(null); }} className="flex-1 px-4 py-3 rounded-xl font-bold bg-error/10 text-error hover:bg-error hover:text-white transition-colors flex items-center justify-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Yêu cầu sửa đổi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
