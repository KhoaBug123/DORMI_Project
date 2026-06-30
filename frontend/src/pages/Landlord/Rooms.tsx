import { useState } from 'react';
import { Plus, Search, Edit2, ArrowUpCircle, Eye, EyeOff, MoreVertical, MapPin, CheckCircle2, X, UploadCloud, Trash2 } from 'lucide-react';
import { mockRooms } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function LandlordRooms() {
  const [rooms, setRooms] = useState(mockRooms.filter(r => r.landlordId === 'landlord-001'));
  const [editingRoom, setEditingRoom] = useState<any>(null);

  const activeRoomsCount = rooms.filter(r => r.status === 'Đang cho thuê').length;
  const hiddenRoomsCount = rooms.filter(r => r.status === 'Đã ẩn').length;

  const handlePush = () => {
    toast.success('Đã đẩy tin lên Top thành công! Phòng của bạn sẽ hiển thị ưu tiên trong 24h.');
  };

  const toggleVisibility = (roomId: string) => {
    setRooms(rooms.map(r => r.id === roomId ? { ...r, status: r.status === 'Đang cho thuê' ? 'Đã ẩn' : 'Đang cho thuê' } : r));
    toast.success('Đã cập nhật trạng thái hiển thị của phòng.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && editingRoom) {
      setEditingRoom({
        ...editingRoom,
        images: [...editingRoom.images, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        imageChanged: true
      });
    }
  };

  const removeImage = (index: number) => {
    if (editingRoom) {
      const newImages = [...editingRoom.images];
      newImages.splice(index, 1);
      setEditingRoom({
        ...editingRoom,
        images: newImages,
        imageChanged: true
      });
    }
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom) {
      setRooms(rooms.map(r => r.id === editingRoom.id ? { 
        ...r, 
        title: editingRoom.title, 
        price: editingRoom.price,
        address: editingRoom.address,
        area: editingRoom.area,
        electricPrice: editingRoom.electricPrice,
        waterPrice: editingRoom.waterPrice,
        images: editingRoom.images,
        lastImageUpdatedAt: editingRoom.imageChanged ? new Date().toISOString() : (r.lastImageUpdatedAt || new Date().toISOString())
      } as any : r));
      toast.success('Cập nhật thông tin phòng thành công!');
      setEditingRoom(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Quản lý phòng</h1>
          <p className="text-text-secondary">Quản lý danh sách, chỉnh sửa, hoặc đẩy tin đăng của bạn lên top.</p>
        </div>
        <Link to="/landlord/create-room" className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-all-custom button-press shadow-brand">
          <Plus className="w-5 h-5" /> Đăng tin mới
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-surface-2">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg">Tất cả ({rooms.length})</button>
            <button className="px-4 py-2 bg-white text-text-secondary hover:text-text-primary text-sm font-bold rounded-lg border border-transparent hover:border-border transition-colors">Đang cho thuê ({activeRoomsCount})</button>
            <button className="px-4 py-2 bg-white text-text-secondary hover:text-text-primary text-sm font-bold rounded-lg border border-transparent hover:border-border transition-colors">Đã ẩn ({hiddenRoomsCount})</button>
          </div>
          <div className="relative w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo mã, tiêu đề..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:border-primary outline-none transition-colors"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-sm text-text-secondary">
              <th className="p-4 font-semibold w-[40%]">Phòng trọ</th>
              <th className="p-4 font-semibold">Trạng thái</th>
              <th className="p-4 font-semibold">Giá thuê</th>
              <th className="p-4 font-semibold">Lượt xem</th>
              <th className="p-4 font-semibold text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {rooms.map(room => (
              <tr key={room.id} className={`hover:bg-surface/50 transition-colors ${room.status === 'Đã ẩn' ? 'opacity-60' : ''}`}>
                <td className="p-4">
                  <div className="flex gap-4 items-center">
                    <img src={room.images[0]} alt={room.title} className="w-20 h-20 rounded-lg object-cover border border-border" />
                    <div>
                      <h3 className="font-bold text-text-primary text-base line-clamp-1 mb-1">{room.title}</h3>
                      <p className="text-xs text-text-secondary flex items-center gap-1 mb-2">
                        <MapPin className="w-3.5 h-3.5" /> {room.address}
                      </p>
                      <div className="flex gap-2">
                        <span className="text-xs font-semibold bg-surface-2 px-2 py-0.5 rounded text-text-secondary">Mã: {room.id}</span>
                        {room.isVerified && <span className="text-xs font-semibold bg-success/10 text-success px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Đã duyệt</span>}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${room.status === 'Đang cho thuê' ? 'bg-success/10 text-success' : 'bg-surface-3 text-text-secondary'}`}>
                    {room.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-bold text-primary">{room.price.toLocaleString('vi-VN')}đ</span>
                  <span className="text-xs text-text-muted">/tháng</span>
                </td>
                <td className="p-4 font-semibold text-text-secondary">1.2k</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handlePush()}
                      className="px-3 py-1.5 bg-warning/10 text-warning hover:bg-warning hover:text-white rounded-md font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                      title="Đẩy tin lên Top"
                    >
                      <ArrowUpCircle className="w-4 h-4" /> Đẩy tin
                    </button>
                    <div className="w-px h-6 bg-border mx-1"></div>
                    <button 
                      onClick={() => setEditingRoom({ ...room, imageChanged: false })}
                      className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-surface-2 font-semibold flex items-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" /> Chỉnh sửa
                    </button>
                    <div className="relative group">
                      <button className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-surface-2">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 flex flex-col overflow-hidden">
                        <button onClick={() => toggleVisibility(room.id)} className="px-4 py-2 text-left text-sm hover:bg-surface-2 flex items-center gap-2">
                          {room.status === 'Đang cho thuê' ? <><EyeOff className="w-4 h-4" /> Ẩn tin</> : <><Eye className="w-4 h-4" /> Hiện tin</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-in-up my-8">
            <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-white z-10 rounded-t-2xl">
              <h3 className="font-bold text-xl text-text-primary">Chỉnh sửa tin đăng</h3>
              <button onClick={() => setEditingRoom(null)} className="text-text-muted hover:text-text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={saveEdit} className="p-6 space-y-6">
              
              {/* Image Management Section */}
              <div className="space-y-4 border border-border p-4 rounded-xl bg-surface-2">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-primary" /> Quản lý Hình ảnh
                </h4>
                <p className="text-xs text-text-secondary">Việc thêm hoặc xóa ảnh sẽ tự động cập nhật thời gian "Cập nhật ảnh" của phòng trọ.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="h-24 border-2 border-dashed border-primary/50 rounded-xl bg-primary/5 flex flex-col items-center justify-center relative cursor-pointer hover:bg-primary/10 transition-colors">
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <UploadCloud className="w-6 h-6 text-primary mb-1" />
                    <span className="text-xs font-bold text-primary">Tải ảnh lên</span>
                  </div>

                  {editingRoom.images.map((img: string, index: number) => (
                    <div key={index} className="relative h-24 rounded-xl overflow-hidden border border-border group">
                      <img src={img} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => removeImage(index)} className="w-8 h-8 bg-error/90 hover:bg-error rounded-full flex items-center justify-center text-white">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Tiêu đề tin đăng</label>
                  <input 
                    type="text" 
                    value={editingRoom.title}
                    onChange={(e) => setEditingRoom({ ...editingRoom, title: e.target.value })}
                    className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Địa chỉ</label>
                  <input 
                    type="text" 
                    value={editingRoom.address}
                    onChange={(e) => setEditingRoom({ ...editingRoom, address: e.target.value })}
                    className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Giá thuê (VNĐ/tháng)</label>
                  <input 
                    type="number" 
                    value={editingRoom.price}
                    onChange={(e) => setEditingRoom({ ...editingRoom, price: Number(e.target.value) })}
                    className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Diện tích (m²)</label>
                  <input 
                    type="number" 
                    value={editingRoom.area}
                    onChange={(e) => setEditingRoom({ ...editingRoom, area: Number(e.target.value) })}
                    className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Giá điện (VNĐ/kwh)</label>
                  <input 
                    type="number" 
                    value={editingRoom.electricPrice}
                    onChange={(e) => setEditingRoom({ ...editingRoom, electricPrice: Number(e.target.value) })}
                    className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Giá nước (VNĐ/khối hoặc /người)</label>
                  <input 
                    type="number" 
                    value={editingRoom.waterPrice}
                    onChange={(e) => setEditingRoom({ ...editingRoom, waterPrice: Number(e.target.value) })}
                    className="w-full bg-surface-3 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary" 
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-4 border-t border-border mt-6">
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-light transition-all-custom button-press">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
