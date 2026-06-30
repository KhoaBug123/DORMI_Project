import { Percent, CreditCard, Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Cài đặt hệ thống</h1>
          <p className="text-text-secondary">Cấu hình các tham số hoạt động của nền tảng.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-all-custom button-press shadow-sm">
          <Save className="w-5 h-5" /> Lưu thay đổi
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
            <Percent className="w-5 h-5 text-primary" /> Cấu hình phí dịch vụ & Hoa hồng
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Phí phần trăm hoa hồng (Mỗi giao dịch thành công)</label>
              <div className="flex items-center gap-2 max-w-xs">
                <input type="number" defaultValue={5} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-primary transition-colors" />
                <span className="font-bold text-text-secondary">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Phí nâng cấp gói VIP (Cơ bản / Tháng)</label>
              <div className="flex items-center gap-2 max-w-xs">
                <input type="number" defaultValue={99000} className="w-full px-4 py-2 border border-border rounded-lg outline-none focus:border-primary transition-colors" />
                <span className="font-bold text-text-secondary">VNĐ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-info" /> Cổng thanh toán
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-surface-2 transition-colors">
              <div>
                <p className="font-semibold text-text-primary">VNPay Sandbox</p>
                <p className="text-sm text-text-secondary">Môi trường thử nghiệm thanh toán</p>
              </div>
              <input type="checkbox" className="w-5 h-5 text-primary rounded border-border focus:ring-primary" defaultChecked />
            </label>
            <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-surface-2 transition-colors">
              <div>
                <p className="font-semibold text-text-primary">Momo API</p>
                <p className="text-sm text-text-secondary">Tích hợp thanh toán qua ví Momo</p>
              </div>
              <input type="checkbox" className="w-5 h-5 text-primary rounded border-border focus:ring-primary" defaultChecked />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
