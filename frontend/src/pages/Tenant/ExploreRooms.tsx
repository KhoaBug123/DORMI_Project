import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mockRooms, mockUniversities } from '../../data/mockData';
import { ShieldCheck, MapPin, Filter, Heart } from 'lucide-react';
import { useTenantStore } from '../../store/useTenantStore';

// Custom Map Icon
const createCustomIcon = (price: number) => {
  const formattedPrice = (price / 1000000).toFixed(1) + 'tr';
  return L.divIcon({
    className: 'custom-map-icon',
    html: `<div class="bg-primary text-white font-bold text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap border border-white relative before:absolute before:content-[''] before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2 before:border-t-[6px] before:border-t-primary before:border-x-[5px] before:border-x-transparent before:border-b-0">${formattedPrice}</div>`,
    iconSize: [40, 24],
    iconAnchor: [20, 30],
  });
};

const RoomImageSlider = ({ images, isVerified }: { images: string[], isVerified?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-1/3 min-w-[140px] h-36 rounded-xl overflow-hidden group">
      <img src={images[currentIndex]} alt="Room" className="w-full h-full object-cover transition-opacity duration-300" />
      {isVerified && (
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-success font-bold text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm z-10">
          <ShieldCheck className="w-3 h-3" /> Đã xác thực
        </div>
      )}
      
      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button onClick={prevImage} className="w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
          &lt;
        </button>
        <button onClick={nextImage} className="w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
          &gt;
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
        {images.slice(0, 5).map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex % 5 ? 'w-3 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default function ExploreRooms() {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const { savedRooms, toggleSaveRoom } = useTenantStore();
  
  // Filters state
  const [district, setDistrict] = useState('');
  const [university, setUniversity] = useState('');
  
  const filteredRooms = useMemo(() => {
    let result = mockRooms;
    if (district) result = result.filter(r => r.district === district);
    return result;
  }, [district]);

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-surface">
      {/* Panel Trái - Bản Đồ (60%) */}
      <div className="w-[60%] h-full relative border-r border-border flex flex-col">
        {/* Thanh Lọc Overlay (Sticky top) */}
        <div className="absolute top-4 left-4 right-4 z-[400] bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-border p-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-3 px-3 py-1.5 rounded-lg border border-border">
            <Filter className="w-4 h-4 text-text-muted" />
            <span className="text-sm font-semibold text-text-primary">Lọc</span>
          </div>
          
          <select 
            value={district} 
            onChange={e => setDistrict(e.target.value)}
            className="bg-white border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary min-w-[120px]"
          >
            <option value="">Tất cả Quận/Huyện</option>
            <option value="Quận 10">Quận 10</option>
            <option value="Quận 5">Quận 5</option>
            <option value="Quận 3">Quận 3</option>
            <option value="Bình Thạnh">Bình Thạnh</option>
            <option value="Gò Vấp">Gò Vấp</option>
          </select>
          
          <select 
            value={university} 
            onChange={e => setUniversity(e.target.value)}
            className="bg-white border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary min-w-[150px]"
          >
            <option value="">Tất cả Trường ĐH</option>
            {mockUniversities.map(uni => (
              <option key={uni.id} value={uni.id}>{uni.name}</option>
            ))}
          </select>

          <div className="ml-auto flex items-center bg-primary/10 px-3 py-1.5 rounded-lg">
            <span className="text-sm font-bold text-primary">Tìm thấy {filteredRooms.length} phòng</span>
          </div>
        </div>

        <MapContainer 
          center={[10.7769, 106.6609]} 
          zoom={13} 
          style={{ width: '100%', height: '100%', zIndex: 1 }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {filteredRooms.map(room => (
            <Marker 
              key={room.id} 
              position={[room.lat, room.lng]}
              icon={createCustomIcon(room.price)}
              eventHandlers={{
                mouseover: () => setHoveredRoom(room.id),
                mouseout: () => setHoveredRoom(null),
              }}
            >
              <Popup className="dormi-popup">
                <div className="w-[200px]">
                  <img src={room.images[0]} className="w-full h-24 object-cover rounded-t-md" />
                  <div className="p-2">
                    <p className="font-bold text-sm line-clamp-1">{room.title}</p>
                    <p className="text-primary font-bold text-sm mt-1">{room.price.toLocaleString('vi-VN')}đ/th</p>
                    <Link to={`/tenant/explore/${room.id}`} className="block mt-2 text-center bg-primary text-white text-xs py-1.5 rounded-md hover:bg-primary-light transition-colors">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Panel Phải - Danh sách phòng (40%) */}
      <div className="w-[40%] h-full overflow-y-auto bg-surface-2 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-text-primary">Danh sách phòng</h2>
          <select className="bg-white border border-border rounded-lg px-2 py-1.5 text-sm outline-none focus:border-primary">
            <option>Mới nhất</option>
            <option>Giá thấp đến cao</option>
            <option>Trust Score cao nhất</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted">Không tìm thấy phòng phù hợp. Thử thay đổi bộ lọc.</p>
            </div>
          ) : (
            filteredRooms.map(room => (
              <div 
                key={room.id} 
                className={`bg-white rounded-xl shadow-sm border p-3 flex gap-4 transition-all-custom cursor-pointer ${hoveredRoom === room.id ? 'border-primary shadow-md transform -translate-y-1' : 'border-border hover:border-primary/50'}`}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <RoomImageSlider images={room.images} isVerified={room.isVerified} />

                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-text-primary text-sm line-clamp-2 leading-tight mb-1">{room.title}</h3>
                  <p className="text-text-muted text-xs flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" /> {room.district}
                  </p>
                  
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-light" style={{ width: `${room.trustScore}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-primary">{room.trustScore}</span>
                  </div>

                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-primary font-extrabold text-base">{room.price.toLocaleString('vi-VN')}đ<span className="text-[10px] text-text-muted font-normal">/th</span></p>
                      <p className="text-xs text-text-secondary">{room.area}m² • {room.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleSaveRoom(room.id); }}
                        className="p-1.5 rounded-md hover:bg-surface-3 text-text-muted transition-colors"
                      >
                        <Heart className="w-5 h-5" fill={savedRooms.includes(room.id) ? '#EF4444' : 'none'} color={savedRooms.includes(room.id) ? '#EF4444' : 'currentColor'} />
                      </button>
                      <Link to={`/tenant/explore/${room.id}`} className="bg-surface-3 hover:bg-primary hover:text-white text-text-primary text-xs font-bold px-3 py-1.5 rounded-md transition-colors flex items-center">
                        Xem
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
