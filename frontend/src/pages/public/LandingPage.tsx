import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Users, ArrowRight, CheckCircle2, Lock, Star } from 'lucide-react';
import { mockRooms } from '../../data/mockData';
import { Footer } from '../../components/layout/Footer';
import { useAuthStore } from '../../store/useAuthStore';

export default function LandingPage() {
  const { isAuthenticated, user } = useAuthStore();
  const featuredRooms = mockRooms.filter(r => r.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Section 1 — Hero */}
      <section className="relative w-full overflow-hidden bg-[#0F172A]" style={{ backgroundImage: 'var(--gradient-hero)' }}>
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col lg:flex-row items-center gap-12">

          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">🏠 Nền tảng #1 tìm phòng cho sinh viên TP.HCM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.15] tracking-tight">
              Tìm phòng trọ & bạn ở ghép <br className="hidden sm:block" />
              <span className="text-primary-light">an toàn, thông minh.</span>
            </h1>

            <p className="text-lg text-text-muted mb-10 max-w-2xl leading-relaxed">
              Hơn 500+ phòng trọ đã xác thực, 1.200+ sinh viên tin dùng. Trải nghiệm nền tảng tìm kiếm và ghép nối phòng trọ hiện đại nhất dành cho bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Link to={isAuthenticated ? (user?.role === 'tenant' ? '/tenant/explore' : `/${user?.role}/dashboard`) : "/register"} className="px-8 py-4 bg-primary text-white font-bold rounded-md hover:bg-primary-light transition-all-custom button-press shadow-brand flex justify-center items-center">
                Tìm phòng ngay
              </Link>
              <Link to={isAuthenticated ? (user?.role === 'landlord' ? '/landlord/create-room' : `/${user?.role}/dashboard`) : "/register"} className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-md hover:bg-white/10 transition-all-custom button-press flex justify-center items-center">
                Đăng tin cho thuê
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-success" /> Đã xác thực eKYC
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Lock className="w-5 h-5 text-info" /> Bảo mật tiền cọc
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Star className="w-5 h-5 text-warning" fill="currentColor" /> 4.8/5 đánh giá trung bình
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Mockup Card Float */}
            <div className="relative z-20 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 border border-white/20 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 card-hover">
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800" alt="Mockup" className="w-full h-48 object-cover rounded-xl mb-4" />
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-text-primary">Phòng trọ cao cấp Q.10</h3>
                <span className="bg-success/10 text-success text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Đã xác thực
                </span>
              </div>
              <p className="text-text-muted text-sm flex items-center gap-1 mb-4">
                <MapPin className="w-4 h-4" /> Gần ĐH Bách Khoa
              </p>
              <div className="flex justify-between items-center">
                <p className="text-primary font-bold text-lg">3.500.000đ<span className="text-xs text-text-muted font-normal">/tháng</span></p>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            {/* Background decoration for mockup */}
            <div className="absolute top-10 -right-4 w-full h-full bg-primary/20 rounded-2xl blur-xl z-10"></div>
          </div>
        </div>
      </section>

      {/* Section 2 — Thống kê nhanh */}
      <section className="bg-white border-b border-border py-12 relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-auto lg:max-w-5xl rounded-2xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 divide-x-0 md:divide-x divide-border">
          <div className="text-center px-4">
            <p className="text-4xl font-extrabold text-primary mb-2">500+</p>
            <p className="text-sm font-semibold text-text-secondary">Phòng trọ đã xác thực</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl font-extrabold text-primary mb-2">1.200+</p>
            <p className="text-sm font-semibold text-text-secondary">Sinh viên tin dùng</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl font-extrabold text-primary mb-2">98%</p>
            <p className="text-sm font-semibold text-text-secondary">Phòng khớp thông tin thực</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl font-extrabold text-primary mb-2 flex items-center justify-center gap-1">4.8<Star className="w-6 h-6 text-warning" fill="currentColor" /></p>
            <p className="text-sm font-semibold text-text-secondary">Đánh giá trung bình</p>
          </div>
        </div>
      </section>

      {/* Section 3 — Tính năng nổi bật */}
      <section id="features" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Tại sao chọn DORMI?</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Giải pháp toàn diện giúp bạn tìm kiếm không gian sống lý tưởng một cách an toàn và thông minh nhất.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border card-hover">
              <div className="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Xác thực & Tin cậy</h3>
              <p className="text-text-secondary leading-relaxed">
                Mọi chủ trọ đều qua quá trình eKYC nghiêm ngặt. Hệ thống Trust Score minh bạch giúp bạn hoàn toàn an tâm khi giao dịch.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border card-hover">
              <div className="w-14 h-14 bg-info/10 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-info" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Bản đồ thông minh</h3>
              <p className="text-text-secondary leading-relaxed">
                Tìm phòng theo bán kính quanh trường Đại học của bạn. Hiển thị trực quan, dễ dàng so sánh vị trí và tiện ích xung quanh.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border card-hover">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Ghép bạn ở ghép</h3>
              <p className="text-text-secondary leading-relaxed">
                Thuật toán AI phân tích thói quen và lối sống để gợi ý những người bạn cùng phòng hoàn hảo, không cần đăng bài tìm kiếm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Cách thức hoạt động */}
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Bắt đầu chỉ trong 3 bước</h2>
            <p className="text-text-secondary text-lg">Đơn giản, nhanh chóng và hiệu quả.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Tenant Steps */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
              <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                <Users className="w-6 h-6" /> Dành cho Người thuê
              </h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">1</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Tạo tài khoản sinh viên</h4>
                    <p className="text-text-secondary">Đăng ký và hoàn thành hồ sơ lối sống của bạn.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">2</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Tìm kiếm & Lọc phòng</h4>
                    <p className="text-text-secondary">Sử dụng bản đồ và bộ lọc thông minh để tìm phòng ưng ý.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">3</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Đặt lịch xem phòng</h4>
                    <p className="text-text-secondary">Chat trực tiếp với chủ nhà và đặt lịch đến xem thực tế.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Landlord Steps */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
              <h3 className="text-2xl font-bold text-accent mb-8 flex items-center gap-3">
                <MapPin className="w-6 h-6" /> Dành cho Chủ trọ
              </h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white font-bold flex items-center justify-center">1</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Đăng ký & Xác thực eKYC</h4>
                    <p className="text-text-secondary">Đảm bảo uy tín bằng cách xác minh danh tính chủ nhà.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white font-bold flex items-center justify-center">2</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Đăng tin phòng</h4>
                    <p className="text-text-secondary">Tạo tin đăng chuyên nghiệp, đầy đủ thông tin và hình ảnh.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white font-bold flex items-center justify-center">3</div>
                  <div>
                    <h4 className="font-bold text-text-primary text-lg mb-1">Nhận khách & Quản lý</h4>
                    <p className="text-text-secondary">Tiếp nhận yêu cầu, chốt hợp đồng và quản lý lịch trình.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Phòng nổi bật */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Phòng trọ nổi bật</h2>
              <p className="text-text-secondary text-lg">Những căn phòng được đánh giá cao nhất trên hệ thống.</p>
            </div>
            <Link to={isAuthenticated ? (user?.role === 'tenant' ? '/tenant/explore' : `/${user?.role}/dashboard`) : "/register"} className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors">
              Xem tất cả phòng <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map(room => (
              <Link to={isAuthenticated ? `/tenant/explore/${room.id}` : "/register"} key={room.id} className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden card-hover group block">
                <div className="relative h-56 overflow-hidden">
                  <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  {room.isVerified && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-success font-bold text-xs px-2.5 py-1.5 rounded-md flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-4 h-4" /> Đã xác thực
                    </div>
                  )}
                  {room.isFeatured && (
                    <div className="absolute top-3 right-3 bg-warning text-white font-bold text-xs px-2.5 py-1.5 rounded-md shadow-sm">
                      VIP
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-text-primary text-lg mb-2 line-clamp-1">{room.title}</h3>
                  <p className="text-text-secondary text-sm flex items-center gap-1.5 mb-4">
                    <MapPin className="w-4 h-4 text-text-muted" /> {room.district}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="bg-surface-3 text-text-secondary text-xs px-2.5 py-1 rounded-full font-medium">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="bg-surface-3 text-text-secondary text-xs px-2.5 py-1 rounded-full font-medium">
                        +{room.amenities.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <div>
                      <p className="text-primary font-bold text-xl">{room.price.toLocaleString('vi-VN')}đ<span className="text-xs text-text-muted font-normal">/tháng</span></p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-2 px-2.5 py-1 rounded-md">
                      <Star className="w-4 h-4 text-warning" fill="currentColor" />
                      <span className="text-sm font-bold text-text-primary">{room.trustScore}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link to={isAuthenticated ? (user?.role === 'tenant' ? '/tenant/explore' : `/${user?.role}/dashboard`) : "/register"} className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors">
              Xem tất cả phòng <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6 — CTA đăng ký */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light mix-blend-multiply pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-xl">
              <h3 className="text-3xl font-bold text-text-primary mb-4">Bạn đang tìm phòng?</h3>
              <p className="text-text-secondary mb-8 text-lg">Khám phá hàng ngàn phòng trọ chất lượng và tìm người bạn cùng phòng lý tưởng ngay hôm nay.</p>
              <Link to={isAuthenticated ? (user?.role === 'tenant' ? '/tenant/explore' : `/${user?.role}/dashboard`) : "/register"} className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-md hover:bg-primary-light transition-all-custom button-press w-full sm:w-auto text-center">
                Tìm phòng ngay
              </Link>
            </div>

            <div className="bg-[#1E1B4B] p-10 rounded-2xl shadow-xl">
              <h3 className="text-3xl font-bold text-white mb-4">Bạn là chủ nhà?</h3>
              <p className="text-white/80 mb-8 text-lg">Đăng tin nhanh chóng, quản lý dễ dàng và tiếp cận nguồn khách thuê chất lượng, uy tín.</p>
              <Link to={isAuthenticated ? (user?.role === 'landlord' ? '/landlord/create-room' : `/${user?.role}/dashboard`) : "/register"} className="inline-block px-8 py-4 bg-white text-[#1E1B4B] font-bold rounded-md hover:bg-gray-50 transition-all-custom button-press w-full sm:w-auto text-center">
                Đăng tin cho thuê
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Footer */}
      <Footer />
    </div>
  );
}
