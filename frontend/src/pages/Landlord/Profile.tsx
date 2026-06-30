import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, Mail, Phone, Edit2, ShieldCheck, MapPin, Upload, Camera, Save, X, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export default function LandlordProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [kycFiles, setKycFiles] = useState({ front: '', back: '', selfie: '' });
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '0901234567',
    email: user?.email || '',
    address: 'Quận 10, Quận 7, TP.HCM',
    bankAccount: 'Vietcombank - 1012345678',
  });

  const [kycStatus, setKycStatus] = useState(user?.kycStatus || 'pending'); // 'pending', 'verified', 'unverified'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Cập nhật hồ sơ thành công!');
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycFiles.front || !kycFiles.back || !kycFiles.selfie) {
      toast.error('Vui lòng tải lên đầy đủ 3 ảnh xác thực!');
      return;
    }
    setIsKycModalOpen(false);
    toast.success('Hệ thống đang xét duyệt hồ sơ eKYC của bạn. Vui lòng chờ trong 24h!');
    // Giả lập sau khi submit thì chuyển sang verified luôn cho nhanh trong MVP
    setTimeout(() => {
      setKycStatus('verified');
      toast.success('Xin chúc mừng! Tài khoản của bạn đã được xác thực (eKYC) thành công.');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Hồ sơ Chủ trọ</h1>
          <p className="text-text-secondary">Quản lý thông tin liên hệ và xác thực danh tính.</p>
        </div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors shadow-sm">
            <Edit2 className="w-4 h-4" /> Cập nhật hồ sơ
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-5 py-2.5 bg-surface-3 text-text-primary font-bold rounded-xl hover:bg-border transition-colors">
              <X className="w-4 h-4" /> Hủy
            </button>
            <button onClick={handleSaveProfile} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors shadow-sm">
              <Save className="w-4 h-4" /> Lưu thay đổi
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-primary/10"></div>
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-sm relative z-10">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-14 h-14 text-text-muted" />
              )}
            </div>
            
            {!isEditing ? (
              <h2 className="text-2xl font-bold text-text-primary mb-1 flex items-center justify-center gap-2 w-full z-10 relative">
                {formData.name} 
                {kycStatus === 'verified' && <span title="Đã xác thực danh tính"><ShieldCheck className="w-6 h-6 text-success" /></span>}
              </h2>
            ) : (
              <div className="w-full mb-2 z-10 relative">
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full text-center text-xl font-bold bg-surface-2 border border-border rounded-lg py-2 px-3 outline-none focus:border-primary" placeholder="Họ và tên" />
              </div>
            )}
            
            <p className="text-text-secondary mb-6 px-3 py-1 bg-surface-2 rounded-full text-sm inline-block z-10 relative font-medium">Vai trò: Chủ trọ</p>
            
            <div className="w-full bg-surface-2 border border-border rounded-xl p-4 text-left z-10 relative">
              <h3 className="font-bold text-text-primary text-sm flex items-center gap-2 mb-2">
                <ShieldCheck className={`w-4 h-4 ${kycStatus === 'verified' ? 'text-success' : 'text-warning'}`} />
                Trạng thái Xác thực (eKYC)
              </h3>
              {kycStatus === 'verified' ? (
                <div className="space-y-3">
                  <div className="text-sm text-text-secondary">Tài khoản của bạn đã được xác thực danh tính với CMND/CCCD.</div>
                  <button onClick={() => setIsKycModalOpen(true)} className="w-full py-2 bg-surface-3 text-text-primary text-sm font-bold rounded-lg hover:bg-border transition-colors">
                    Xem / Cập nhật lại giấy tờ (eKYC)
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-sm text-text-secondary">Chưa xác thực. Hãy tải lên giấy tờ để tăng độ uy tín cho tin đăng.</div>
                  <button onClick={() => setIsKycModalOpen(true)} className="w-full py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-light transition-colors shadow-sm">
                    Xác thực ngay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border bg-surface-2">
              <h3 className="text-lg font-bold text-text-primary">Thông tin liên hệ & Thanh toán</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2 flex items-center gap-2"><Phone className="w-4 h-4" /> Số điện thoại</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> Email liên lạc</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-text-secondary mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> Khu vực hoạt động chính</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`} placeholder="VD: Quận 1, Bình Thạnh..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-text-secondary mb-2 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Tài khoản ngân hàng (Nhận cọc/thanh toán)</label>
                  <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`} placeholder="VD: Vietcombank - 123456789 - NGUYEN VAN A" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal eKYC */}
      {isKycModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center p-6 border-b border-border bg-surface-2 rounded-t-2xl">
              <div>
                <h3 className="font-bold text-xl text-text-primary flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary" /> Xác thực danh tính (eKYC)
                </h3>
                <p className="text-sm text-text-secondary mt-1">Nâng cao độ uy tín và hiển thị huy hiệu "Đã xác thực" trên tin đăng.</p>
              </div>
              <button onClick={() => setIsKycModalOpen(false)} className="text-text-muted hover:text-text-primary bg-white p-2 rounded-full border border-border">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleKycSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">1. Mặt trước CCCD/CMND</label>
                  <label className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-surface-2 hover:bg-surface-3 transition-colors cursor-pointer group relative overflow-hidden h-40">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      if (e.target.files?.[0]) setKycFiles({...kycFiles, front: URL.createObjectURL(e.target.files[0])});
                    }} />
                    {kycFiles.front ? (
                      <img src={kycFiles.front} alt="Mặt trước" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-text-muted group-hover:text-primary mb-2 transition-colors" />
                        <p className="text-sm font-semibold text-text-primary">Nhấn để tải ảnh lên</p>
                        <p className="text-xs text-text-secondary mt-1">Định dạng JPG, PNG. Tối đa 5MB</p>
                      </>
                    )}
                  </label>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2">2. Mặt sau CCCD/CMND</label>
                  <label className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-surface-2 hover:bg-surface-3 transition-colors cursor-pointer group relative overflow-hidden h-40">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      if (e.target.files?.[0]) setKycFiles({...kycFiles, back: URL.createObjectURL(e.target.files[0])});
                    }} />
                    {kycFiles.back ? (
                      <img src={kycFiles.back} alt="Mặt sau" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-text-muted group-hover:text-primary mb-2 transition-colors" />
                        <p className="text-sm font-semibold text-text-primary">Nhấn để tải ảnh lên</p>
                      </>
                    )}
                  </label>
                </div>

                <div>
                  <label className="block font-semibold mb-2">3. Ảnh chân dung (Selfie)</label>
                  <label className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-surface-2 hover:bg-surface-3 transition-colors cursor-pointer group relative overflow-hidden h-40">
                    <input type="file" accept="image/*" className="hidden" capture="user" onChange={(e) => {
                      if (e.target.files?.[0]) setKycFiles({...kycFiles, selfie: URL.createObjectURL(e.target.files[0])});
                    }} />
                    {kycFiles.selfie ? (
                      <img src={kycFiles.selfie} alt="Selfie" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <Camera className="w-8 h-8 text-text-muted group-hover:text-primary mb-2 transition-colors" />
                        <p className="text-sm font-semibold text-text-primary">Chụp ảnh khuôn mặt</p>
                        <p className="text-xs text-text-secondary mt-1">Vui lòng đảm bảo đủ sáng, không đeo kính râm.</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="bg-info/10 border border-info/20 rounded-lg p-4 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-info flex-shrink-0" />
                <p className="text-xs text-info font-medium leading-relaxed">
                  Thông tin của bạn được mã hóa an toàn và chỉ sử dụng cho mục đích xác thực danh tính trên nền tảng DORMI. Chúng tôi cam kết không chia sẻ dữ liệu cho bên thứ ba.
                </p>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-light transition-all-custom button-press shadow-sm">
                Gửi yêu cầu xác thực
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
