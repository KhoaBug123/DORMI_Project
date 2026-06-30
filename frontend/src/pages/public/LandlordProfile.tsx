import { useParams, useNavigate } from 'react-router-dom';
import { mockRooms } from '../../data/mockData';
import { ArrowLeft, CheckCircle2, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PublicLandlordProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock landlord data based on the rooms
  const landlordRooms = mockRooms.filter(r => r.landlordId === (id || 'landlord-001'));
  const roomCount = landlordRooms.length;
  
  // Fake landlord details
  const landlord = {
    id: id || 'landlord-001',
    name: landlordRooms[0]?.landlordName || 'Nguyễn Văn Phúc',
    avatar: landlordRooms[0]?.landlordAvatar || 'https://i.pravatar.cc/100?img=11',
    coverImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200',
    trustScore: landlordRooms[0]?.trustScore || 92,
    rating: landlordRooms[0]?.landlordRating || 4.8,
    reviews: landlordRooms[0]?.landlordTotalReviews || 47,
    isVerified: landlordRooms[0]?.landlordVerified || true,
    joinDate: 'Tháng 6, 2023',
    responseRate: '98%',
  };

  return (
    <div className="bg-surface-2 min-h-screen pb-12">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full relative">
        <img src={landlord.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10">
        <div className="bg-white rounded-3xl shadow-sm border border-border p-6 md:p-8 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 border-b border-border pb-6">
            <div className="relative">
              <img src={landlord.avatar} alt={landlord.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md" />
              {landlord.isVerified && (
                <div className="absolute bottom-0 right-0 md:bottom-2 md:right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Đã xác thực eKYC">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">{landlord.name}</h1>
              <p className="text-text-secondary text-sm mb-3">Tham gia: {landlord.joinDate}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {landlord.isVerified && (
                  <span className="bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Chủ trọ uy tín
                  </span>
                )}
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  Điểm uy tín: {landlord.trustScore}/100
                </span>
              </div>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex-1 md:flex-none text-center bg-surface-2 px-6 py-3 rounded-2xl border border-border">
                <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Đánh giá</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  <span className="font-black text-xl text-text-primary">{landlord.rating}</span>
                </div>
                <p className="text-xs text-text-secondary mt-1">({landlord.reviews} lượt)</p>
              </div>
              <div className="flex-1 md:flex-none text-center bg-surface-2 px-6 py-3 rounded-2xl border border-border">
                <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Phản hồi</p>
                <p className="font-black text-xl text-text-primary mt-1">{landlord.responseRate}</p>
                <p className="text-xs text-text-secondary mt-1">Nhanh chóng</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <h2 className="text-lg font-bold text-text-primary mb-2">Giới thiệu</h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-3xl">
              Xin chào, tôi là {landlord.name}. Tôi chuyên cung cấp các phòng trọ sạch sẽ, an ninh và đầy đủ tiện nghi cho sinh viên và người đi làm khu vực trung tâm. Tiêu chí của tôi là mang đến cho bạn một không gian sống thoải mái như ở nhà.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
            Phòng đang cho thuê <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{roomCount}</span>
          </h2>
          
          {roomCount === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-border">
              <p className="text-text-secondary">Chủ trọ này hiện chưa có phòng nào đang trống.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landlordRooms.map(room => (
                <Link to={`/explore/${room.id}`} key={room.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-border flex flex-col group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2 py-1 rounded">
                      {room.type}
                    </div>
                    {room.lastImageUpdatedAt && (
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 z-10">
                        <span className="text-white text-[10px] font-bold">🕒 Cập nhật: {new Date(room.lastImageUpdatedAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors">{room.title}</h3>
                    <p className="text-xs text-text-secondary flex items-center gap-1 mb-3">
                      <MapPin className="w-3.5 h-3.5" /> {room.district}
                    </p>
                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <p className="text-primary font-bold text-lg">{room.price.toLocaleString('vi-VN')}đ</p>
                        <p className="text-xs text-text-muted">/tháng</p>
                      </div>
                      <span className="text-xs font-medium bg-surface-2 px-2 py-1 rounded text-text-secondary">{room.area}m²</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
