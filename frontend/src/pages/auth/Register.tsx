import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Home, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../../store/useAuthStore';

type Role = 'tenant' | 'landlord' | null;

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'tenant') navigate('/tenant/dashboard');
      else if (user.role === 'landlord') navigate('/landlord/dashboard');
      else if (user.role === 'admin') navigate('/admin/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Step 2
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 3 (Tenant)
  const [university, setUniversity] = useState('');
  const [year, setYear] = useState('');
  const [budget, setBudget] = useState(3000000);

  // Step 3 (Landlord)
  const [roomCount, setRoomCount] = useState('');
  const [mainDistrict, setMainDistrict] = useState('');
  const [bio, setBio] = useState('');

  const handleNext = () => {
    if (step === 1 && !role) {
      toast.error('Vui lòng chọn vai trò của bạn');
      return;
    }
    if (step === 2) {
      if (!name || !email || !phone || !password || !confirmPassword) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
      }
      if (password !== confirmPassword) {
        toast.error('Mật khẩu xác nhận không khớp');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'tenant' && (!university || !year)) {
      toast.error('Vui lòng chọn trường đại học và năm học');
      return;
    }
    if (role === 'landlord' && (!roomCount || !mainDistrict)) {
      toast.error('Vui lòng điền thông tin phòng và khu vực');
      return;
    }

    setIsLoading(true);
    // Giả lập call API đăng ký
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Đăng ký thành công!');

      // Ở đây thực tế sẽ set token và lưu user
      // Tạm thời điều hướng theo logic mock
      if (role === 'tenant') {
        navigate('/tenant/explore');
      } else {
        navigate('/landlord/kyc');
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-2 pt-8 pb-16">
      <div className="max-w-2xl w-full mx-auto px-4">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white text-xl">
              D
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-primary">DORMI</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-text-primary mb-3">Tạo tài khoản mới</h2>
          <p className="text-text-secondary">Gia nhập cộng đồng DORMI ngay hôm nay.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 flex items-center justify-between relative max-w-sm mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

          {[1, 2, 3].map((num) => (
            <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-primary text-white shadow-brand' : 'bg-surface-3 border border-border text-text-muted'}`}>
              {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 animate-fade-in-up">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-center mb-6">Bước 1: Bạn là ai?</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('tenant')}
                  className={`p-6 rounded-xl border-2 text-left transition-all-custom ${role === 'tenant' ? 'border-primary bg-primary/5 shadow-brand' : 'border-border hover:border-primary/30 hover:bg-surface-2'}`}
                >
                  <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${role === 'tenant' ? 'bg-primary text-white' : 'bg-surface-3 text-text-secondary'}`}>
                    <User className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-text-primary mb-2">Tôi là Người thuê</h4>
                  <p className="text-sm text-text-secondary">Sinh viên đang tìm kiếm phòng trọ hoặc bạn ở ghép.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('landlord')}
                  className={`p-6 rounded-xl border-2 text-left transition-all-custom ${role === 'landlord' ? 'border-accent bg-accent/5 shadow-[0_8px_24px_rgba(249,115,22,0.3)]' : 'border-border hover:border-accent/30 hover:bg-surface-2'}`}
                >
                  <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${role === 'landlord' ? 'bg-accent text-white' : 'bg-surface-3 text-text-secondary'}`}>
                    <Home className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-text-primary mb-2">Tôi là Chủ trọ</h4>
                  <p className="text-sm text-text-secondary">Chủ nhà, quản lý khu trọ muốn đăng tin cho thuê.</p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-xl font-bold text-center mb-6">Bước 2: Thông tin cơ bản</h3>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Họ và tên</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nhập họ và tên đầy đủ" className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập địa chỉ email" className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Số điện thoại</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Nhập số điện thoại" className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Mật khẩu</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu" className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Xác nhận</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && role === 'tenant' && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-xl font-bold text-center mb-6">Bước 3: Chi tiết sinh viên</h3>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Trường Đại học đang theo học</label>
                <select value={university} onChange={e => setUniversity(e.target.value)} className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors appearance-none">
                  <option value="">Chọn trường đại học</option>
                  <option value="bk">ĐH Bách Khoa HCM</option>
                  <option value="ueh">ĐH Kinh tế HCM</option>
                  <option value="hcmus">ĐH Khoa học Tự nhiên</option>
                  <option value="uit">ĐH Công nghệ Thông tin</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Năm học</label>
                <select value={year} onChange={e => setYear(e.target.value)} className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors appearance-none">
                  <option value="">Chọn năm học</option>
                  <option value="1">Năm 1</option>
                  <option value="2">Năm 2</option>
                  <option value="3">Năm 3</option>
                  <option value="4">Năm 4</option>
                  <option value="5">Năm 5+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Ngân sách dự kiến: <span className="text-primary font-bold">{budget.toLocaleString('vi-VN')}đ</span>/tháng
                </label>
                <input
                  type="range"
                  min="1000000"
                  max="10000000"
                  step="500000"
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-text-muted mt-2">
                  <span>1tr</span>
                  <span>10tr+</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && role === 'landlord' && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-xl font-bold text-center mb-6">Bước 3: Chi tiết chủ trọ</h3>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Số phòng bạn đang quản lý</label>
                <input type="number" value={roomCount} onChange={e => setRoomCount(e.target.value)} placeholder="Ví dụ: 5" className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Khu vực chính</label>
                <select value={mainDistrict} onChange={e => setMainDistrict(e.target.value)} className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors appearance-none">
                  <option value="">Chọn Quận/Huyện</option>
                  <option value="q1">Quận 1</option>
                  <option value="q3">Quận 3</option>
                  <option value="q5">Quận 5</option>
                  <option value="q10">Quận 10</option>
                  <option value="bt">Bình Thạnh</option>
                  <option value="gv">Gò Vấp</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Giới thiệu ngắn (Tùy chọn)</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Vài dòng giới thiệu về khu trọ của bạn..." rows={3} className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors resize-none"></textarea>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8 pt-6 border-t border-border">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="px-6 py-3.5 bg-surface-2 text-text-primary font-bold rounded-lg hover:bg-surface-3 transition-colors flex items-center justify-center">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            {step < 3 ? (
              <button type="button" onClick={handleNext} className="flex-1 bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-light transition-all-custom button-press flex items-center justify-center gap-2">
                Tiếp tục <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={isLoading} className="flex-1 bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-light transition-all-custom button-press flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Hoàn tất đăng ký'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-text-secondary mt-8 font-medium">
          Đã có tài khoản? <Link to="/login" className="text-primary hover:text-primary-dark font-bold ml-1">Đăng nhập</Link>
        </p>

      </div>
    </div>
  );
}
