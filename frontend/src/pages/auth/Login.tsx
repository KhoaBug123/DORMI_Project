import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, clearError, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'tenant') navigate('/tenant/dashboard');
      else if (user.role === 'landlord') navigate('/landlord/dashboard');
      else if (user.role === 'admin') navigate('/admin/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!email || !password) {
      toast.error('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast.success('Đăng nhập thành công!');
      const user = useAuthStore.getState().user;
      if (user?.role === 'tenant') {
        navigate('/tenant/dashboard');
      } else if (user?.role === 'landlord') {
        if (user.kycStatus === 'verified') {
          navigate('/landlord/dashboard');
        } else {
          navigate('/landlord/kyc');
        }
      } else if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } else {
      const errorMsg = useAuthStore.getState().error;
      toast.error(errorMsg || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-2 flex-1">
      {/* Cột trái - Hình ảnh/Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-primary/50 to-transparent"></div>
        
        <div className="relative z-10 p-12 text-white max-w-xl">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-primary text-2xl">
              D
            </div>
            <span className="text-3xl font-extrabold tracking-tight">DORMI</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">Tìm nơi ở lý tưởng, <br />kết nối bạn đồng hành.</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Nền tảng số 1 dành cho sinh viên TP.HCM. Khám phá hàng ngàn phòng trọ xác thực và tìm bạn cùng phòng hoàn hảo.
          </p>
        </div>
      </div>

      {/* Cột phải - Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white text-xl">
                D
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-primary">DORMI</span>
            </Link>
            <h2 className="text-3xl font-extrabold text-text-primary mb-3">Chào mừng trở lại!</h2>
            <p className="text-text-secondary text-lg">Đăng nhập để tiếp tục tìm phòng trọ của bạn.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full bg-surface-3 border-2 border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark">Quên mật khẩu?</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-light transition-all-custom button-press shadow-md flex justify-center items-center gap-2 mt-6"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Đăng nhập'}
            </button>

            {/* Quick Login for Testing */}
            <div className="mt-6 bg-info/10 border border-info/20 rounded-lg p-4">
              <p className="text-xs font-semibold text-info mb-3 uppercase tracking-wider text-center">Đăng nhập nhanh (Bản thử nghiệm)</p>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  type="button"
                  onClick={() => { setEmail('sinhvien@email.com'); setPassword('123456'); }}
                  className="py-2 bg-white border border-border rounded-md text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  Sinh viên
                </button>
                <button 
                  type="button"
                  onClick={() => { setEmail('chutro@email.com'); setPassword('123456'); }}
                  className="py-2 bg-white border border-border rounded-md text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  Chủ trọ
                </button>
                <button 
                  type="button"
                  onClick={() => { setEmail('admin@dormi.vn'); setPassword('admin123'); }}
                  className="py-2 bg-white border border-border rounded-md text-xs font-semibold hover:text-error hover:border-error transition-colors text-text-secondary"
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink-0 mx-4 text-text-muted text-sm font-medium">Hoặc</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <button
              type="button"
              className="w-full bg-white border-2 border-border text-text-primary font-bold py-3.5 rounded-lg hover:bg-surface-2 transition-colors flex justify-center items-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Tiếp tục với Google
            </button>
          </form>

          <p className="text-center text-text-secondary mt-8 font-medium">
            Chưa có tài khoản? <Link to="/register" className="text-primary hover:text-primary-dark font-bold ml-1">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
