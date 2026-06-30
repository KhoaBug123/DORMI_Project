import { CheckCircle2, Star, Zap, Crown } from 'lucide-react';
import { toast } from 'sonner';

export default function VIPPackages() {
  const packages = [
    {
      id: 'basic',
      name: 'Gói Cơ Bản',
      price: 99000,
      period: 'tháng',
      icon: Star,
      color: 'text-info',
      bgColor: 'bg-info/10',
      borderColor: 'border-info',
      features: [
        'Đăng tối đa 5 tin',
        'Làm mới tin 1 lần/ngày',
        'Hỗ trợ tiêu chuẩn'
      ],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Gói Chuyên Nghiệp',
      price: 299000,
      period: 'tháng',
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      features: [
        'Đăng tối đa 20 tin',
        'Làm mới tin 5 lần/ngày',
        'Hỗ trợ ưu tiên 24/7',
        'Huy hiệu "Chủ trọ Uy tín"',
        'Thống kê lượt xem nâng cao'
      ],
      recommended: true
    },
    {
      id: 'premium',
      name: 'Gói Cao Cấp',
      price: 599000,
      period: 'tháng',
      icon: Crown,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning',
      features: [
        'Đăng tin không giới hạn',
        'Tự động làm mới tin mỗi giờ',
        'Hỗ trợ ưu tiên trực tiếp (Phone)',
        'Huy hiệu "Đối tác VIP"',
        'Phân tích đối thủ cạnh tranh',
        'Gắn nhãn nổi bật trên Bản đồ'
      ],
      recommended: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">Nâng tầm kinh doanh với Gói VIP</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Tiếp cận hàng ngàn sinh viên mỗi ngày, đẩy nhanh tốc độ lấp đầy phòng trọ với các công cụ tối ưu hóa độc quyền.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg, idx) => {
          const Icon = pkg.icon;
          return (
            <div 
              key={pkg.id} 
              className={`relative bg-white rounded-3xl p-8 flex flex-col transition-all duration-300 animate-fade-in-up hover:-translate-y-2 ${pkg.recommended ? 'border-2 border-primary shadow-2xl scale-105 z-10' : 'border border-border shadow-sm'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                  Khuyên dùng
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl ${pkg.bgColor} ${pkg.color} flex items-center justify-center mb-6`}>
                <Icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-text-primary mb-2">{pkg.name}</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-black text-text-primary">{pkg.price.toLocaleString('vi-VN')}đ</span>
                <span className="text-text-muted font-medium mb-1">/{pkg.period}</span>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${pkg.color}`} />
                    <span className="text-text-secondary font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => toast.success(`Đã đăng ký ${pkg.name} thành công!`)}
                className={`w-full py-4 rounded-xl font-bold transition-all-custom button-press ${pkg.recommended ? 'bg-primary text-white hover:bg-primary-light shadow-brand' : 'bg-surface-2 text-text-primary hover:bg-surface-3 border border-border'}`}
              >
                Đăng ký ngay
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
