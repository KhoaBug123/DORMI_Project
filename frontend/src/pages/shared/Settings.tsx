import { useState } from 'react';
import { User, Bell, Shield, Key } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'sonner';

export default function SharedSettings() {
  const { user } = useAuthStore();
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSavePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Vui lòng nhập đầy đủ thông tin mật khẩu');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }
    // Giả lập API đổi mật khẩu thành công
    toast.success('Đổi mật khẩu thành công!');
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Cài đặt tài khoản</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-4 bg-surface-2">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-text-muted" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">{user?.name}</h2>
            <p className="text-text-secondary">{user?.email}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" /> Thông báo
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-white">
                  <div>
                    <p className="font-bold text-text-primary">Thông báo qua Email</p>
                    <p className="text-sm text-text-secondary mt-0.5">Nhận email khi có tin nhắn hoặc cập nhật mới</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-primary rounded border-border focus:ring-primary" defaultChecked onChange={(e) => {
                    toast.success(e.target.checked ? 'Đã bật thông báo qua Email' : 'Đã tắt thông báo qua Email');
                  }} />
                </label>
                <label className="flex items-center justify-between p-4 border border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-white">
                  <div>
                    <p className="font-bold text-text-primary">Thông báo đẩy</p>
                    <p className="text-sm text-text-secondary mt-0.5">Nhận thông báo trực tiếp trên trình duyệt</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-primary rounded border-border focus:ring-primary" defaultChecked onChange={(e) => {
                    toast.success(e.target.checked ? 'Đã bật thông báo đẩy' : 'Đã tắt thông báo đẩy');
                  }} />
                </label>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-warning" /> Bảo mật
              </h3>
              
              {!showPasswordForm ? (
                <button onClick={() => setShowPasswordForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-surface-2 text-text-primary font-bold rounded-xl hover:bg-surface-3 transition-colors border border-border">
                  <Key className="w-4 h-4" /> Đổi mật khẩu
                </button>
              ) : (
                <div className="bg-surface-2 border border-border p-5 rounded-xl space-y-4 max-w-md animate-scale-up origin-top-left">
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-1">Mật khẩu hiện tại</label>
                    <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="w-full bg-white border border-border rounded-lg px-3 py-2 outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-1">Mật khẩu mới</label>
                    <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full bg-white border border-border rounded-lg px-3 py-2 outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-1">Xác nhận mật khẩu mới</label>
                    <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full bg-white border border-border rounded-lg px-3 py-2 outline-none focus:border-primary" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={handleSavePassword} className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors">
                      Lưu mật khẩu
                    </button>
                    <button onClick={() => setShowPasswordForm(false)} className="px-4 py-2 bg-white text-text-primary border border-border font-bold rounded-lg hover:bg-surface-3 transition-colors">
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
