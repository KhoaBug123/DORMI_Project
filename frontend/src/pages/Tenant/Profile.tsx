import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, Mail, Phone, Edit2, Save, X, BookOpen, Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function TenantProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '0934567890',
    university: 'ĐH Bách Khoa HCM',
    studentYear: 'Năm 2',
    major: 'Kỹ thuật Phần mềm',
    budget: '4000000',
    sleepSchedule: 'Ngủ trước 12 giờ đêm',
    cleanliness: 'Rất gọn gàng',
    cooking: 'Thỉnh thoảng',
    pets: 'Không nuôi'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // API Call here
    setIsEditing(false);
    toast.success('Cập nhật hồ sơ cá nhân thành công!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Hồ sơ cá nhân</h1>
          <p className="text-text-secondary">Quản lý thông tin cá nhân và lối sống của bạn.</p>
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
            <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors shadow-sm">
              <Save className="w-4 h-4" /> Lưu thay đổi
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 text-center flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-surface-3 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-text-muted" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-2 border-white shadow-sm hover:bg-primary-light transition-colors" title="Đổi ảnh đại diện">
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-bold text-text-primary mb-1">{formData.name}</h2>
                <p className="text-text-secondary mb-4 px-3 py-1 bg-surface-2 rounded-full text-sm inline-block">Sinh viên (Tenant)</p>
              </>
            ) : (
              <div className="w-full mb-4">
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full text-center text-xl font-bold bg-surface-2 border border-border rounded-lg py-2 px-3 outline-none focus:border-primary"
                  placeholder="Họ và tên"
                />
              </div>
            )}
            
            <div className="w-full grid gap-3 text-left border-t border-border pt-4">
              <div className="flex items-center gap-3 p-3 bg-surface-2 rounded-xl">
                <Mail className="w-5 h-5 text-text-muted" />
                <div>
                  <p className="text-xs text-text-secondary font-medium">Email</p>
                  <p className="text-sm font-bold text-text-primary">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-2 rounded-xl">
                <Phone className="w-5 h-5 text-text-muted" />
                <div className="w-full">
                  <p className="text-xs text-text-secondary font-medium">Số điện thoại</p>
                  {!isEditing ? (
                    <p className="text-sm font-bold text-text-primary">{formData.phone}</p>
                  ) : (
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white border border-border rounded p-1 text-sm outline-none focus:border-primary mt-1" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-text-primary">Thông tin học tập</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Trường đại học</label>
                <input type="text" name="university" value={formData.university} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Sinh viên năm</label>
                <select name="studentYear" value={formData.studentYear} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none appearance-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`}>
                  <option value="Năm 1">Năm 1</option>
                  <option value="Năm 2">Năm 2</option>
                  <option value="Năm 3">Năm 3</option>
                  <option value="Năm 4">Năm 4</option>
                  <option value="Đã ra trường">Đã ra trường</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Ngành học</label>
                <input type="text" name="major" value={formData.major} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Ngân sách thuê phòng (VND)</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-error" />
              <h3 className="text-lg font-bold text-text-primary">Lối sống & Thói quen</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Giờ giấc ngủ</label>
                <select name="sleepSchedule" value={formData.sleepSchedule} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none appearance-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`}>
                  <option value="Ngủ trước 11 giờ đêm">Ngủ trước 11 giờ đêm</option>
                  <option value="Ngủ trước 12 giờ đêm">Ngủ trước 12 giờ đêm</option>
                  <option value="Cú đêm (Sau 1h sáng)">Cú đêm (Sau 1h sáng)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Mức độ gọn gàng</label>
                <select name="cleanliness" value={formData.cleanliness} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none appearance-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`}>
                  <option value="Rất gọn gàng">Rất gọn gàng</option>
                  <option value="Gọn gàng">Gọn gàng</option>
                  <option value="Bình thường">Bình thường</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Thói quen nấu ăn</label>
                <select name="cooking" value={formData.cooking} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none appearance-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`}>
                  <option value="Thường xuyên">Thường xuyên</option>
                  <option value="Thỉnh thoảng">Thỉnh thoảng</option>
                  <option value="Không nấu ăn">Không nấu ăn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Thú cưng</label>
                <select name="pets" value={formData.pets} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-xl py-2.5 px-4 outline-none appearance-none ${isEditing ? 'border-border bg-white focus:border-primary' : 'border-transparent bg-surface-2 text-text-primary font-medium'}`}>
                  <option value="Không nuôi">Không nuôi</option>
                  <option value="Có nuôi chó/mèo">Có nuôi chó/mèo</option>
                  <option value="Thú cưng nhỏ (Hamster...)">Thú cưng nhỏ</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
