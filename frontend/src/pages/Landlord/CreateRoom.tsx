import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLandlordStore } from '../../store/useLandlordStore';
import { CheckCircle2, ArrowRight, ArrowLeft, UploadCloud, MapPin, DollarSign, Home as HomeIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateRoom() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { addRoom } = useLandlordStore();

  const [formData, setFormData] = useState({
    title: '',
    district: '',
    address: '',
    price: '',
    deposit: '',
    area: '',
    maxOccupants: '1',
    description: '',
    amenities: [] as string[],
    images: [] as string[]
  });

  const amenitiesList = [
    'Điều hòa', 'Tủ lạnh', 'Máy giặt', 'Nóng lạnh', 'Giường', 
    'Tủ quần áo', 'Bếp', 'Wifi tốc độ cao', 'Chỗ để xe', 'Thang máy',
    'Khóa vân tay', 'Bảo vệ 24/7'
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleAmenity = (item: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(item) 
        ? prev.amenities.filter(a => a !== item)
        : [...prev.amenities, item]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Fake upload
    if (e.target.files?.length) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800']
      }));
    }
  };

  const handleSubmit = () => {
    const newRoom = {
      id: `room-new-${Date.now()}`,
      landlordId: 'landlord-001',
      title: formData.title,
      description: formData.description,
      address: formData.address,
      district: formData.district,
      price: Number(formData.price),
      deposit: Number(formData.deposit),
      area: Number(formData.area),
      maxOccupants: Number(formData.maxOccupants),
      status: "Đang cho thuê",
      lat: 10.7769,
      lng: 106.6609,
      type: "Phòng trọ",
      electricPrice: 3500,
      waterPrice: 100000,
      amenities: formData.amenities,
      images: formData.images.length ? formData.images : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      isVerified: true,
      trustScore: 100,
      landlordName: "Bạn",
      landlordAvatar: "https://i.pravatar.cc/150?u=landlord1",
      landlordRating: 5.0,
      landlordTotalReviews: 0,
      landlordVerified: true,
      createdAt: new Date().toISOString()
    };

    addRoom(newRoom as any);
    toast.success('Đăng phòng thành công! Tin đang chờ duyệt.');
    navigate('/landlord/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Đăng tin phòng trọ</h1>
        <p className="text-text-secondary">Hoàn thành các bước dưới đây để đăng tin tìm khách thuê.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative mb-12">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {['Thông tin cơ bản', 'Hình ảnh', 'Tiện ích', 'Xác nhận'].map((label, idx) => {
          const s = idx + 1;
          const isActive = step === s;
          const isDone = step > s;
          return (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors mb-2 ${isDone || isActive ? 'bg-primary text-white shadow-md' : 'bg-surface-3 border-2 border-border text-text-muted'}`}>
                {isDone ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              <span className={`text-xs font-bold hidden sm:block ${isActive ? 'text-primary' : 'text-text-muted'}`}>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-8 animate-fade-in-up">
        
        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <HomeIcon className="w-5 h-5 text-primary" /> Thông tin cơ bản
            </h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Tiêu đề tin đăng *</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="VD: Phòng trọ cao cấp ban công cửa sổ lớn Quận 10" className="w-full bg-surface-3 border border-border rounded-lg px-4 py-3 outline-none focus:border-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Quận / Huyện *</label>
                <select value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} className="w-full bg-surface-3 border border-border rounded-lg px-4 py-3 outline-none focus:border-primary appearance-none">
                  <option value="">Chọn Quận</option>
                  <option value="Quận 10">Quận 10</option>
                  <option value="Quận 5">Quận 5</option>
                  <option value="Bình Thạnh">Bình Thạnh</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Địa chỉ chi tiết *</label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Số nhà, tên đường..." className="w-full bg-surface-3 border border-border rounded-lg pl-10 pr-4 py-3 outline-none focus:border-primary" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Giá thuê (VNĐ/tháng) *</label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="Ví dụ: 3500000" className="w-full bg-surface-3 border border-border rounded-lg pl-10 pr-4 py-3 outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Tiền cọc (VNĐ)</label>
                <input type="number" value={formData.deposit} onChange={e => setFormData({...formData, deposit: e.target.value})} placeholder="Ví dụ: 3500000" className="w-full bg-surface-3 border border-border rounded-lg px-4 py-3 outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Diện tích (m²)</label>
                <input type="number" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} placeholder="Ví dụ: 25" className="w-full bg-surface-3 border border-border rounded-lg px-4 py-3 outline-none focus:border-primary" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-primary" /> Hình ảnh phòng trọ
            </h2>
            <p className="text-sm text-text-secondary mb-4">Đăng ít nhất 3 ảnh (phòng, nhà vệ sinh, tiện ích chung) để tin đăng hiển thị tốt hơn. Hệ thống AI sẽ tự động chấm điểm hình ảnh.</p>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 h-48 border-2 border-dashed border-primary/50 rounded-2xl bg-primary/5 flex flex-col items-center justify-center relative cursor-pointer hover:bg-primary/10 transition-colors">
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <UploadCloud className="w-10 h-10 text-primary mb-2" />
                <p className="font-bold text-primary">Kéo thả hoặc Click để tải ảnh lên</p>
                <p className="text-xs text-text-muted mt-1">Hỗ trợ JPG, PNG (Tối đa 5MB)</p>
              </div>

              {formData.images.map((img, i) => (
                <div key={i} className="relative h-32 rounded-xl overflow-hidden border border-border group">
                  <img src={img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="text-white text-xs font-bold bg-error px-2 py-1 rounded">Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-xl font-bold text-text-primary mb-6">Tiện ích & Mô tả</h2>

            <div>
              <label className="block text-sm font-semibold mb-3">Chọn các tiện ích có sẵn</label>
              <div className="flex flex-wrap gap-3">
                {amenitiesList.map(item => (
                  <button
                    key={item}
                    onClick={() => toggleAmenity(item)}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${formData.amenities.includes(item) ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border text-text-secondary hover:border-text-muted'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 mt-6">Mô tả thêm</label>
              <textarea 
                rows={5} 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Viết mô tả chi tiết về phòng trọ, quy định chung, giờ giấc..." 
                className="w-full bg-surface-3 border border-border rounded-lg px-4 py-3 outline-none focus:border-primary resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" /> Xem trước tin đăng
            </h2>
            
            <div className="border border-border rounded-2xl overflow-hidden">
              <img src={formData.images[0] || 'https://via.placeholder.com/800x400?text=No+Image'} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">{formData.title || 'Tiêu đề trống'}</h3>
                <p className="text-sm text-text-secondary mb-4">{formData.address}, {formData.district}</p>
                <div className="flex items-end gap-3 mb-6 border-b border-border pb-4">
                  <p className="text-2xl font-extrabold text-primary">{Number(formData.price).toLocaleString('vi-VN')}đ/tháng</p>
                  <p className="text-sm font-medium text-text-muted mb-1">Cọc: {Number(formData.deposit).toLocaleString('vi-VN')}đ</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map(a => (
                    <span key={a} className="bg-surface-2 text-xs font-bold px-2 py-1 rounded border border-border text-text-secondary">{a}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-text-secondary">Tin đăng của bạn sẽ được AI kiểm duyệt tự động về hình ảnh và nội dung. Quá trình này thường mất chưa tới 5 phút.</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 font-bold rounded-lg flex items-center gap-2 transition-colors ${step === 1 ? 'opacity-0' : 'bg-surface-2 text-text-primary hover:bg-surface-3'}`}
          >
            <ArrowLeft className="w-5 h-5" /> Quay lại
          </button>
          
          {step < 4 ? (
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors flex items-center gap-2 shadow-brand"
            >
              Tiếp tục <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="px-8 py-3 bg-success text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]"
            >
              Đăng tin ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
