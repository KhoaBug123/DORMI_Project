import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mockRooms, mockUniversities } from '../../data/mockData';
import { ShieldCheck, MapPin, Filter, Heart } from 'lucide-react';
import { useTenantStore } from '../../store/useTenantStore';

// Custom Map Icon
const createCustomIcon = (price: number, isSelected: boolean) => {
  const formattedPrice = (price / 1000000).toFixed(1) + 'tr';
  const bgColor = isSelected ? 'bg-warning' : 'bg-primary';
  return L.divIcon({
    className: 'custom-map-icon',
    html: `<div class="${bgColor} text-white font-bold text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap border border-white relative before:absolute before:content-[''] before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2 before:border-t-[6px] before:border-t-${isSelected ? 'warning' : 'primary'} before:border-x-[5px] before:border-x-transparent before:border-b-0">${formattedPrice}</div>`,
    iconSize: [40, 24],
    iconAnchor: [20, 30],
  });
};

const createTargetIcon = (type: 'university' | 'district') => {
  const colorClass = type === 'university' ? 'bg-purple-600 ring-purple-600/30' : 'bg-blue-600 ring-blue-600/30';
  return L.divIcon({
    className: 'custom-target-icon',
    html: `<div class="${colorClass} w-5 h-5 rounded-full border-[3px] border-white shadow-lg ring-4"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const MapUpdater = ({ rooms, selectedRoomId, targetMarker }: { rooms: any[], selectedRoomId: string | null, targetMarker: any }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedRoomId) {
      const room = rooms.find(r => r.id === selectedRoomId);
      if (room) {
        map.flyTo([room.lat, room.lng], 16, { duration: 1.5 });
      }
    } else if (targetMarker) {
      map.flyTo([targetMarker.lat, targetMarker.lng], 14, { duration: 1.5 });
    } else if (rooms.length > 0) {
      const bounds = L.latLngBounds(rooms.map(r => [r.lat, r.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, duration: 1 });
    }
  }, [rooms, selectedRoomId, targetMarker, map]);
  return null;
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
      
      <div className="absolute inset-0 flex items-center justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-auto">
        <button onClick={prevImage} className="w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
          &lt;
        </button>
        <button onClick={nextImage} className="w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
          &gt;
        </button>
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
        {images.slice(0, 5).map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex % 5 ? 'w-3 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default function ExploreRooms() {
  const hcmcDistricts = [
    { name: 'Quận 1', lat: 10.7769, lng: 106.7009 },
    { name: 'Quận 3', lat: 10.7845, lng: 106.6874 },
    { name: 'Quận 4', lat: 10.7582, lng: 106.7082 },
    { name: 'Quận 5', lat: 10.7525, lng: 106.6661 },
    { name: 'Quận 6', lat: 10.7483, lng: 106.6353 },
    { name: 'Quận 7', lat: 10.7327, lng: 106.7297 },
    { name: 'Quận 8', lat: 10.7229, lng: 106.6264 },
    { name: 'Quận 10', lat: 10.7745, lng: 106.6675 },
    { name: 'Quận 11', lat: 10.7628, lng: 106.6423 },
    { name: 'Quận 12', lat: 10.8671, lng: 106.6413 },
    { name: 'Bình Tân', lat: 10.7594, lng: 106.5925 },
    { name: 'Bình Thạnh', lat: 10.8105, lng: 106.7091 },
    { name: 'Gò Vấp', lat: 10.8285, lng: 106.6713 },
    { name: 'Phú Nhuận', lat: 10.7997, lng: 106.6797 },
    { name: 'Tân Bình', lat: 10.8015, lng: 106.6521 },
    { name: 'Tân Phú', lat: 10.7876, lng: 106.6266 },
    { name: 'Q.Thủ Đức', lat: 10.8523, lng: 106.7644 },
    { name: 'Huyện Bình Chánh', lat: 10.6865, lng: 106.5935 },
    { name: 'Huyện Cần Giờ', lat: 10.4116, lng: 106.8797 },
    { name: 'Huyện Củ Chi', lat: 11.0028, lng: 106.5167 },
    { name: 'Huyện Hóc Môn', lat: 10.8841, lng: 106.5912 },
    { name: 'Huyện Nhà Bè', lat: 10.6695, lng: 106.7297 }
  ];

  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const { savedRooms, toggleSaveRoom } = useTenantStore();
  
  const [district, setDistrict] = useState('');
  const [university, setUniversity] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const filteredRooms = useMemo(() => {
    let result = mockRooms;
    if (district) result = result.filter(r => r.district === district);
    if (university) {
      const uni = mockUniversities.find(u => u.id === university);
      if (uni) {
        const normalizedUni = uni.name.toLowerCase().replace(/đ/g, 'd');
        result = result.filter(r => r.nearbyUniversities?.some(nu => 
          nu.toLowerCase().replace(/đ/g, 'd').includes(normalizedUni)
        ));
      }
    }
    
    // Sorting logic
    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'trust_desc') {
      result = [...result].sort((a, b) => b.trustScore - a.trustScore);
    } else if (sortBy === 'trust_asc') {
      result = [...result].sort((a, b) => a.trustScore - b.trustScore);
    }
    
    return result;
  }, [district, university, sortBy]);

  const targetMarker = useMemo(() => {
    if (university) {
      const uni = mockUniversities.find(u => u.id === university);
      return uni ? { lat: uni.lat, lng: uni.lng, name: uni.name, type: 'university' as const } : null;
    }
    if (district) {
      const dist = hcmcDistricts.find(d => d.name === district);
      return dist ? { lat: dist.lat, lng: dist.lng, name: dist.name, type: 'district' as const } : null;
    }
    return null;
  }, [university, district]);

  const mapRooms = selectedRoom ? filteredRooms.filter(r => r.id === selectedRoom) : filteredRooms;

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-surface">
      <div className="w-[60%] h-full relative border-r border-border flex flex-col">
        <div className="absolute top-4 left-4 right-4 z-[400] bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-border p-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-3 px-3 py-1.5 rounded-lg border border-border">
            <Filter className="w-4 h-4 text-text-muted" />
            <span className="text-sm font-semibold text-text-primary">Lọc</span>
          </div>
          
          <select 
            value={district} 
            onChange={e => { setDistrict(e.target.value); setSelectedRoom(null); }}
            className="bg-white border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary min-w-[120px]"
          >
            <option value="">Tất cả Quận/Huyện</option>
            {hcmcDistricts.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
          
          <select 
            value={university} 
            onChange={e => { setUniversity(e.target.value); setSelectedRoom(null); }}
            className="bg-white border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary min-w-[150px]"
          >
            <option value="">Tất cả Trường ĐH</option>
            {mockUniversities.map(uni => (
              <option key={uni.id} value={uni.id}>{uni.name}</option>
            ))}
          </select>

          <div className="ml-auto flex items-center bg-primary/10 px-3 py-1.5 rounded-lg">
            <span className="text-sm font-bold text-primary">Tìm thấy {filteredRooms.length} phòng</span>
            {selectedRoom && (
              <button 
                onClick={() => setSelectedRoom(null)} 
                className="ml-3 text-xs bg-white text-text-primary px-2 py-1 rounded shadow-sm border border-border hover:bg-surface-3 transition-colors"
              >
                Bỏ chọn
              </button>
            )}
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
          <MapUpdater rooms={mapRooms} selectedRoomId={selectedRoom} targetMarker={targetMarker} />
          
          {targetMarker && (
            <Marker 
              position={[targetMarker.lat, targetMarker.lng]} 
              icon={createTargetIcon(targetMarker.type)}
            >
              <Popup className="dormi-popup">
                <div className="font-bold text-sm text-center px-2 py-1">
                  Vị trí trung tâm: {targetMarker.name}
                </div>
              </Popup>
            </Marker>
          )}

          {mapRooms.map(room => (
            <Marker 
              key={room.id} 
              position={[room.lat, room.lng]}
              icon={createCustomIcon(room.price, selectedRoom === room.id)}
              eventHandlers={{
                mouseover: () => setHoveredRoom(room.id),
                mouseout: () => setHoveredRoom(null),
                click: () => setSelectedRoom(selectedRoom === room.id ? null : room.id)
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

      <div className="w-[40%] h-full overflow-y-auto bg-surface-2 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-text-primary">Danh sách phòng</h2>
          <select 
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white border border-border rounded-lg px-2 py-1.5 text-sm outline-none focus:border-primary"
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá thấp đến cao</option>
            <option value="price_desc">Giá cao đến thấp</option>
            <option value="trust_desc">Trust Score cao đến thấp</option>
            <option value="trust_asc">Trust Score thấp đến cao</option>
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
                className={`bg-white rounded-xl shadow-sm border p-3 flex gap-4 transition-all-custom cursor-pointer ${hoveredRoom === room.id ? 'border-primary shadow-md transform -translate-y-1' : 'border-border hover:border-primary/50'} ${selectedRoom === room.id ? 'ring-2 ring-primary ring-offset-1 bg-warning/5 border-warning/30' : ''}`}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
              >
                <div className="pointer-events-auto">
                  <RoomImageSlider images={room.images} isVerified={room.isVerified} />
                </div>

                <div className="flex-1 flex flex-col pointer-events-auto">
                  <h3 className="font-bold text-text-primary text-sm line-clamp-2 leading-tight mb-1">{room.title}</h3>
                  <p className="text-text-muted text-xs flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" /> {room.district}
                  </p>
                  
                  <div className="flex flex-col gap-1 mb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Trust Score</span>
                      <span className="text-xs font-bold text-primary">{room.trustScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-light" style={{ width: `${room.trustScore}%` }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-primary font-extrabold text-base">{room.price.toLocaleString('vi-VN')}đ<span className="text-[10px] text-text-muted font-normal">/th</span></p>
                      <p className="text-xs text-text-secondary">{room.area}m² • {room.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSaveRoom(room.id); }}
                        className="p-1.5 rounded-md hover:bg-surface-3 text-text-muted transition-colors"
                      >
                        <Heart className="w-5 h-5" fill={savedRooms.includes(room.id) ? '#EF4444' : 'none'} color={savedRooms.includes(room.id) ? '#EF4444' : 'currentColor'} />
                      </button>
                      <Link onClick={(e) => e.stopPropagation()} to={`/tenant/explore/${room.id}`} className="bg-surface-3 hover:bg-primary hover:text-white text-text-primary text-xs font-bold px-3 py-1.5 rounded-md transition-colors flex items-center">
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
