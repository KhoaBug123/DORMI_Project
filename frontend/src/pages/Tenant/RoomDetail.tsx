import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockRooms } from '../../data/mockData';
import { ShieldCheck, MapPin, Star, CheckCircle2, Heart, MessageSquare, Calendar, ChevronRight, X, UserPlus, AlertTriangle } from 'lucide-react';
import { useTenantStore } from '../../store/useTenantStore';
import { useLandlordStore } from '../../store/useLandlordStore';
import { toast } from 'sonner';

export default function RoomDetail() {
  const { roomId } = useParams();
  const room = mockRooms.find(r => r.id === roomId) || mockRooms[0];
  const { savedRooms, toggleSaveRoom, bookAppointment, addReview } = useTenantStore();
  const { addReportedIssue } = useLandlordStore();

  const [show360, setShow360] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const [reportTitle, setReportTitle] = useState('');
  const [reportDesc, setReportDesc] = useState('');

  const isSaved = savedRooms.includes(room.id);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment({
      id: `appt-${Date.now()}`,
      roomId: room.id,
      roomTitle: room.title,
      roomAddress: room.address,
      roomImage: room.images[0],
      landlordId: room.landlordId,
      scheduledAt: "2026-07-01T10:00:00",
      status: "pending"
    });
    setShowBooking(false);
    toast.success('Yêu cầu đặt lịch đã gửi! Chủ trọ sẽ phản hồi sớm.');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      id: `rev-${Date.now()}`,
      roomId: room.id,
      rating,
      comment: reviewText,
      createdAt: new Date().toISOString()
    });
    setShowReviewModal(false);
    setReviewText('');
    setRating(5);
    toast.success('Cảm ơn bạn đã đánh giá phòng này!');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReportedIssue({
      id: `issue-${Date.now()}`,
      roomId: room.id,
      title: reportTitle,
      description: reportDesc,
      status: 'Đang xử lý',
      createdAt: new Date().toISOString()
    });
    setShowReportModal(false);
    setReportTitle('');
    setReportDesc('');
    toast.error('Đã gửi báo cáo sự cố đến chủ trọ!');
  };

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Khối Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-text-muted mb-4 gap-2">
            <Link to="/tenant/explore" className="hover:text-primary transition-colors">Khám phá</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{room.district}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-text-primary font-medium line-clamp-1">{room.title}</span>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-1.5 text-sm text-error hover:bg-error/10 px-3 py-1.5 rounded-md transition-colors"
          >
            <AlertTriangle className="w-4 h-4" /> Gửi báo cáo sự cố
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 h-[400px]">
          <div className="w-full md:w-2/3 h-full rounded-2xl overflow-hidden relative group">
            <img src={room.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {room.panoramaUrl && (
              <button
                onClick={() => setShow360(true)}
                className="absolute inset-0 m-auto w-max h-max bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors"
              >
                🔄 Tham quan 360°
              </button>
            )}
            <button onClick={() => setShowGallery(true)} className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-text-primary text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-white transition-colors">
              📷 Xem tất cả ảnh
            </button>
          </div>
          <div className="hidden md:flex w-1/3 flex-col gap-4 h-full">
            <div className="flex-1 rounded-2xl overflow-hidden">
              <img src={room.images[1] || room.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden">
              <img src={room.images[2] || room.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Cột trái - Chi tiết */}
        <div className="flex-1 w-full animate-fade-in-up">
          <div className="flex items-start gap-3 mb-2">
            {room.isVerified && (
              <span className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-success/20">
                <ShieldCheck className="w-4 h-4" /> Đã xác thực
              </span>
            )}
            {room.isFeatured && (
              <span className="bg-warning text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                VIP
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-3 leading-tight">
            {room.title}
          </h1>
          <p className="text-text-secondary flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-text-muted" /> {room.address}
          </p>

          <div className="flex items-end gap-3 mb-8">
            <p className="text-3xl font-extrabold text-primary">{room.price.toLocaleString('vi-VN')}đ<span className="text-base text-text-muted font-normal">/tháng</span></p>
            <p className="text-text-muted mb-1 text-sm font-medium">Đặt cọc: {room.deposit.toLocaleString('vi-VN')}đ</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface-2 p-4 rounded-xl border border-border">
              <p className="text-text-muted text-xs mb-1">Diện tích</p>
              <p className="font-bold text-text-primary">{room.area} m²</p>
            </div>
            <div className="bg-surface-2 p-4 rounded-xl border border-border">
              <p className="text-text-muted text-xs mb-1">Số người tối đa</p>
              <p className="font-bold text-text-primary">{room.maxOccupants} người</p>
            </div>
            <div className="bg-surface-2 p-4 rounded-xl border border-border">
              <p className="text-text-muted text-xs mb-1">Tiền điện</p>
              <p className="font-bold text-text-primary">{room.electricPrice}đ/kWh</p>
            </div>
            <div className="bg-surface-2 p-4 rounded-xl border border-border">
              <p className="text-text-muted text-xs mb-1">Tiền nước</p>
              <p className="font-bold text-text-primary">{room.waterPrice}đ/tháng</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">Mô tả chi tiết</h3>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {room.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">Tiện ích</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
              {room.amenities.map(a => (
                <div key={a} className="flex items-center gap-2 text-text-secondary font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Trust Score & Đánh Giá */}
          <div className="mb-8 bg-surface-2 border border-border rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <Star className="w-6 h-6 text-warning" fill="currentColor" /> Trust Score & Đánh Giá
                </h3>
                <p className="text-sm text-text-secondary mt-1">Điểm tin cậy được tính toán bởi AI dựa trên: xác thực eKYC, độ đầy đủ thông tin, ảnh thật, và đánh giá.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-primary">{room.trustScore}<span className="text-lg text-text-muted">/100</span></span>
              </div>
            </div>

            <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-primary to-primary-light" style={{ width: `${room.trustScore}%` }}></div>
            </div>

            <button onClick={() => setShowReviewModal(true)} className="w-full sm:w-auto bg-white border-2 border-primary text-primary font-bold px-6 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all-custom flex items-center justify-center gap-2">
              <Star className="w-5 h-5" /> Viết đánh giá 5 sao
            </button>
          </div>
        </div>

        {/* Cột phải - Sidebar Hành động */}
        <div className="w-full lg:w-[350px] flex-shrink-0 relative">
          <div className="sticky top-24 space-y-6">

            <div className="bg-white rounded-2xl shadow-lg border border-border p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between items-center mb-6">
                <p className="text-2xl font-extrabold text-primary">{room.price.toLocaleString('vi-VN')}đ<span className="text-sm text-text-muted font-normal">/tháng</span></p>
                {room.status === 'Đang cho thuê' ? (
                  <span className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-md">Còn trống</span>
                ) : (
                  <span className="bg-error/10 text-error text-xs font-bold px-2 py-1 rounded-md">Đã đầy</span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <button onClick={() => setShowBooking(true)} className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-light transition-all-custom button-press flex justify-center items-center gap-2 shadow-brand">
                  <Calendar className="w-5 h-5" /> Đặt lịch xem phòng
                </button>
                <Link to="/tenant/chat" className="w-full bg-surface-3 text-text-primary border border-border font-bold py-3.5 rounded-lg hover:bg-surface-2 transition-all-custom button-press flex justify-center items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Nhắn tin với chủ trọ
                </Link>
                <button onClick={() => toggleSaveRoom(room.id)} className={`w-full ${isSaved ? 'text-error' : 'text-text-secondary'} font-bold py-3 rounded-lg hover:bg-surface-2 transition-all-custom flex justify-center items-center gap-2`}>
                  <Heart className="w-5 h-5" fill={isSaved ? '#EF4444' : 'none'} /> {isSaved ? 'Đã lưu phòng' : 'Lưu phòng'}
                </button>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <img src={room.landlordAvatar} className="w-12 h-12 rounded-full object-cover border border-border" />
                  <div>
                    <p className="font-bold text-text-primary text-sm flex items-center gap-1">
                      {room.landlordName} {room.landlordVerified && <ShieldCheck className="w-4 h-4 text-success" />}
                    </p>
                    <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-warning" fill="currentColor" /> {room.landlordRating}/5 ({room.landlordTotalReviews} đánh giá)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {room.lookingForRoommate && (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-sm border border-indigo-100 p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Đang tìm bạn ở ghép</h4>
                    <p className="text-xs font-semibold text-primary/70">{room.currentOccupants}/{room.maxOccupants} chỗ đã có người</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  Phòng này đang tìm thêm người ở ghép. Hãy xem mức độ phù hợp của bạn với những người đang ở đây.
                </p>
                <Link to="/tenant/roommate" className="w-full bg-white text-primary border border-primary font-bold py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all-custom block text-center shadow-sm">
                  Ghép bạn ở ghép
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Modal 360 (Mock) */}
      {show360 && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button onClick={() => setShow360(false)} className="absolute top-6 right-6 text-white hover:text-gray-300 z-50">
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl h-[70vh] bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-700 overflow-hidden relative">
            <iframe
              src={room.panoramaUrl || "https://momento360.com/e/u/7d084347ec054f7a93a103ec6099cf16?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true"}
              width="100%"
              height="100%"
              allowFullScreen
              className="border-none"
            ></iframe>
          </div>
        </div>
      )}

      {/* Modal Xem ảnh */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button onClick={() => setShowGallery(false)} className="absolute top-6 right-6 text-white hover:text-gray-300 z-50">
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-6xl h-[80vh] flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 custom-scrollbar">
            {room.images.map((img, i) => (
              <img key={i} src={img} className="h-full w-auto object-contain snap-center flex-shrink-0 mx-auto" />
            ))}
          </div>
        </div>
      )}

      {/* Modal Đặt lịch */}
      {showBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="font-bold text-xl text-text-primary">Đặt lịch xem phòng</h3>
              <button onClick={() => setShowBooking(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleBook} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Chọn ngày giờ</label>
                <input type="datetime-local" required className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Ghi chú cho chủ trọ (Tùy chọn)</label>
                <textarea rows={3} className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2 outline-none focus:border-primary resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-4 hover:bg-primary-light transition-all-custom button-press">
                Gửi yêu cầu
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Đánh Giá F05 */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="font-bold text-xl text-text-primary">Đánh giá phòng</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${star <= rating ? 'text-warning fill-current' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Bình luận của bạn</label>
                <textarea
                  required
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn về phòng này..."
                  className="w-full bg-surface-3 border border-border rounded-lg px-4 py-3 outline-none focus:border-primary resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-4 hover:bg-primary-light transition-all-custom button-press">
                Gửi đánh giá
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Báo Cáo Sự Cố G02 */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="font-bold text-xl text-error flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Báo cáo sự cố
              </h3>
              <button onClick={() => setShowReportModal(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleReportSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Vấn đề gặp phải</label>
                <input
                  type="text"
                  required
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="VD: Hỏng vòi nước, Điều hòa không mát..."
                  className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Mô tả chi tiết</label>
                <textarea
                  required
                  rows={4}
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                  placeholder="Mô tả cụ thể tình trạng sự cố để chủ trọ nắm rõ..."
                  className="w-full bg-surface-3 border border-border rounded-lg px-4 py-3 outline-none focus:border-primary resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-error text-white font-bold py-3 rounded-lg mt-4 hover:bg-red-600 transition-all-custom button-press">
                Gửi báo cáo cho chủ trọ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
