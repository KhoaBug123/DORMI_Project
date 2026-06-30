export const Footer = () => {
  return (
    <footer className="bg-surface-2 border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">
                D
              </div>
              <span className="text-xl font-extrabold tracking-tight text-primary">DORMI</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Nền tảng tìm phòng trọ thông minh cho sinh viên. Đảm bảo an toàn, nhanh chóng và ghép nối bạn cùng phòng hoàn hảo.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Tính năng</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Tìm phòng bản đồ</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Ghép bạn ở ghép</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Chat trực tiếp</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Đặt lịch xem phòng</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Liên hệ báo cáo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Mạng xã hội</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Tiktok</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Zalo Official</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">© 2025 DORMI. Nền tảng tìm phòng trọ thông minh cho sinh viên.</p>
          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span>Made with ❤️ in HCMC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
