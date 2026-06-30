import { useState } from 'react';
import { mockAppointments } from '../../data/mockData';
import { Calendar, Search, Clock, MapPin, XCircle, Star, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';

export default function TenantAppointments() {
  const initialAppts = mockAppointments.filter(a => a.tenantId === 'tenant-001');
  const [appointments, setAppointments] = useState(initialAppts);
  const [filter, setFilter] = useState('all');

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');

  const handleCancel = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' as any } : a));
    toast.error('Đã hủy lịch hẹn');
  };

  const openReviewModal = () => {
    setRating(0);
    setReviewContent('');
    setShowReviewModal(true);
  };

  const submitReview = () => {
    if (rating === 0) {
      toast.error('Vui lòng chọn số sao đánh giá!');
      return;
    }
    toast.success('Gửi đánh giá thành công!', {
      description: 'Cảm ơn bạn đã chia sẻ trải nghiệm.'
    });
    setShowReviewModal(false);
  };

  const filteredAppts = appointments.filter(a => filter === 'all' || a.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Lịch hẹn của tôi</h1>
        <p className="text-text-secondary">Quản lý và theo dõi các lịch xem phòng bạn đã đặt.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
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
            <input type="text" placeholder="Tìm theo tên phòng..." className="w-full bg-white border border-border rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>

        <div className="p-6">
          {filteredAppts.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Không có lịch hẹn nào trong mục này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAppts.map(appt => (
                <div key={appt.id} className="border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col">
                  <div className="flex p-4 gap-4">
                    <img src={appt.roomImage} className="w-24 h-24 rounded-lg object-cover" alt={appt.roomTitle} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-text-primary text-base line-clamp-2">{appt.roomTitle}</h3>
                      </div>
                      <p className="text-xs text-text-secondary flex items-start gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> <span className="line-clamp-2">{appt.roomAddress}</span>
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                          <Clock className="w-4 h-4" />
                          {new Date(appt.scheduledAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-2 p-4 border-t border-border flex justify-between items-center mt-auto">
                    <div>
                      {appt.status === 'pending' && <span className="bg-warning/10 text-warning text-xs font-bold px-3 py-1.5 rounded-lg">Chờ chủ trọ duyệt</span>}
                      {appt.status === 'confirmed' && <span className="bg-info/10 text-info text-xs font-bold px-3 py-1.5 rounded-lg">Chủ trọ đã xác nhận</span>}
                      {appt.status === 'completed' && <span className="bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-lg">Đã xem phòng</span>}
                      {appt.status === 'cancelled' && <span className="bg-error/10 text-error text-xs font-bold px-3 py-1.5 rounded-lg">Đã hủy</span>}
                    </div>
                    
                    {(appt.status === 'pending' || appt.status === 'confirmed') && (
                      <button onClick={() => handleCancel(appt.id)} className="text-error hover:bg-error/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Hủy lịch
                      </button>
                    )}

                    {appt.status === 'completed' && (
                      <button onClick={() => openReviewModal()} className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-1">
                        <Star className="w-4 h-4" /> Đánh giá
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-fade-in-up">
            <div className="p-5 border-b border-border flex justify-between items-center bg-surface-2">
              <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Đánh giá phòng trọ
              </h3>
              <button onClick={() => setShowReviewModal(false)} className="text-text-muted hover:text-text-primary p-1">✕</button>
            </div>
            <div className="p-6 space-y-5">
              <div className="text-center">
                <p className="text-sm font-bold text-text-secondary mb-3">Bạn đánh giá phòng này bao nhiêu sao?</p>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      onClick={() => setRating(star)}
                      className={`transition-colors ${star <= rating ? 'text-warning' : 'text-border hover:text-warning/50'}`}
                    >
                      <Star className="w-10 h-10 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Nhận xét chi tiết</label>
                <textarea 
                  rows={4}
                  className="w-full bg-surface-3 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary resize-none"
                  placeholder="Chia sẻ trải nghiệm của bạn về chất lượng phòng, thái độ của chủ nhà..."
                  value={reviewContent}
                  onChange={e => setReviewContent(e.target.value)}
                />
              </div>

              <Button fullWidth size="lg" className="mt-2" onClick={submitReview}>Gửi đánh giá</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
