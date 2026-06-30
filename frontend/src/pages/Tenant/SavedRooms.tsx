import { useTenantStore } from '../../store/useTenantStore';
import { mockRooms } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Heart } from 'lucide-react';

export default function SavedRooms() {
  const { savedRooms, toggleSaveRoom } = useTenantStore();
  const rooms = mockRooms.filter(r => savedRooms.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6 text-primary" fill="currentColor" /> Phòng đã lưu
      </h1>
      
      {rooms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-border">
          <Heart className="w-16 h-16 text-border mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">Bạn chưa lưu phòng nào</h2>
          <p className="text-text-secondary mb-6">Hãy khám phá thêm và lưu lại các phòng bạn ưng ý nhé.</p>
          <Link to="/tenant/explore" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors">
            Khám phá phòng ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <div key={room.id} className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden group block">
              <div className="relative h-48 overflow-hidden">
                <Link to={`/tenant/explore/${room.id}`}>
                  <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </Link>
                <button 
                  onClick={() => toggleSaveRoom(room.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-primary shadow-sm hover:scale-110 transition-transform"
                >
                  <Heart className="w-5 h-5" fill="currentColor" />
                </button>
                {room.isVerified && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-success font-bold text-xs px-2.5 py-1.5 rounded-md flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-4 h-4" /> Đã xác thực
                  </div>
                )}
              </div>
              <div className="p-5">
                <Link to={`/tenant/explore/${room.id}`}>
                  <h3 className="font-bold text-text-primary text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">{room.title}</h3>
                </Link>
                <p className="text-text-secondary text-sm flex items-center gap-1.5 mb-4">
                  <MapPin className="w-4 h-4 text-text-muted" /> {room.address}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-primary font-bold text-xl">{room.price.toLocaleString('vi-VN')}đ<span className="text-xs text-text-muted font-normal">/tháng</span></p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-2 px-2.5 py-1 rounded-md">
                    <Star className="w-4 h-4 text-warning" fill="currentColor" />
                    <span className="text-sm font-bold text-text-primary">{room.trustScore}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
