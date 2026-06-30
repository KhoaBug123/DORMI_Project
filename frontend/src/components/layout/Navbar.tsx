import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Bell, User, LogOut, Settings, Heart, Gift, PlusSquare, Users, Crown, Wrench, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const isAdmin = isAuthenticated && user?.role === 'admin';
  const bgColor = isAdmin ? 'bg-[#1E1B4B] text-white border-b border-[#312E81]' : 'bg-surface/90 backdrop-blur-md border-b border-border';
  const textColor = isAdmin ? 'text-white/80 hover:text-white' : 'text-text-secondary hover:text-primary';
  const activeColor = isAdmin ? 'text-white border-white' : 'text-primary border-primary';

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-5 text-sm font-semibold border-b-2 transition-colors ${isActive
      ? `${activeColor}`
      : `border-transparent ${textColor}`
    }`;

  const renderGuestLinks = () => (
    <>
      <div className="hidden md:flex items-center space-x-6 mx-auto">
        <NavLink to="/tenant/explore" className={navLinkClass}>Khám phá</NavLink>
        <a href="#features" className={`px-3 py-5 text-sm font-semibold border-b-2 border-transparent ${textColor}`}>Tính năng</a>
        <a href="#about" className={`px-3 py-5 text-sm font-semibold border-b-2 border-transparent ${textColor}`}>Về chúng tôi</a>
        <a href="#pricing" className={`px-3 py-5 text-sm font-semibold border-b-2 border-transparent ${textColor}`}>Giá dịch vụ</a>
      </div>
      <div className="hidden md:flex items-center space-x-3 ml-auto">
        <Link to="/login" className="px-4 py-2 text-sm font-semibold text-text-primary hover:bg-surface-3 rounded-md transition-colors">
          Đăng nhập
        </Link>
        <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary-light rounded-md shadow-sm transition-all-custom button-press">
          Đăng ký
        </Link>
      </div>
    </>
  );

  const renderTenantLinks = () => (
    <div className="hidden md:flex items-center space-x-6 mx-auto">
      <NavLink to="/tenant/explore" className={navLinkClass}>Khám phá</NavLink>
      <NavLink to="/tenant/roommate" className={navLinkClass}>Bạn ở ghép</NavLink>
      <NavLink to="/tenant/chat" className={navLinkClass}>Tin nhắn</NavLink>
      <NavLink to="/tenant/dashboard" className={navLinkClass}>Tổng quan</NavLink>
    </div>
  );

  const renderLandlordLinks = () => (
    <div className="hidden md:flex items-center space-x-6 mx-auto">
      <NavLink to="/landlord/dashboard" className={navLinkClass}>Tổng quan</NavLink>
      <NavLink to="/landlord/rooms" className={navLinkClass}>Quản lý phòng</NavLink>
      <NavLink to="/landlord/appointments" className={navLinkClass}>Lịch hẹn</NavLink>
      <NavLink to="/landlord/chat" className={navLinkClass}>Tin nhắn</NavLink>
    </div>
  );

  const renderAdminLinks = () => (
    <div className="hidden md:flex items-center space-x-6 mx-auto">
      <NavLink to="/admin/dashboard" className={navLinkClass}>Tổng quan</NavLink>
      <NavLink to="/admin/rooms" className={navLinkClass}>Tin đăng</NavLink>
      <NavLink to="/admin/kyc" className={navLinkClass}>eKYC</NavLink>
      <NavLink to="/admin/reports" className={navLinkClass}>Báo cáo</NavLink>
      <NavLink to="/admin/users" className={navLinkClass}>Người dùng</NavLink>
    </div>
  );

  const renderAvatarDropdown = () => {
    const dropdownBg = 'bg-white border border-border shadow-lg rounded-md overflow-hidden min-w-[200px] text-text-primary text-sm';
    const itemClass = 'flex items-center px-4 py-2.5 hover:bg-surface-2 transition-colors cursor-pointer';

    return (
      <div className="relative ml-auto flex items-center space-x-4" ref={dropdownRef}>
        <button className={`p-2 rounded-full transition-colors ${isAdmin ? 'hover:bg-white/10 text-white' : 'hover:bg-surface-3 text-text-secondary'}`}>
          <Bell className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover" />
            <span className={`text-sm font-medium hidden sm:block ${isAdmin ? 'text-white' : 'text-text-primary'}`}>
              {user?.name?.split(' ').pop()}
            </span>
          </button>

          {isDropdownOpen && (
            <div className={`absolute right-0 top-full mt-2 z-50 animate-fade-in-up ${dropdownBg}`}>
              <div className="px-4 py-3 border-b border-border bg-surface-2">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs text-text-secondary mt-0.5">{user?.email}</p>
              </div>

              <div className="py-1">
                {user?.role === 'tenant' && (
                  <>
                    <Link to="/tenant/profile" className={itemClass}><User className="w-4 h-4 mr-2" /> Hồ sơ</Link>
                    <Link to="/tenant/saved" className={itemClass}><Heart className="w-4 h-4 mr-2" /> Phòng đã lưu</Link>
                    <Link to="/tenant/vouchers" className={itemClass}><Gift className="w-4 h-4 mr-2" /> Ưu đãi của tôi</Link>
                    <Link to="/tenant/maintenance" className={itemClass}><Wrench className="w-4 h-4 mr-2" /> Sự cố (Bảo trì)</Link>
                  </>
                )}
                {user?.role === 'landlord' && (
                  <>
                    <Link to="/landlord/profile" className={itemClass}><User className="w-4 h-4 mr-2" /> Hồ sơ</Link>
                    <Link to="/landlord/create-room" className={itemClass}><PlusSquare className="w-4 h-4 mr-2" /> Đăng tin mới</Link>
                    <Link to="/landlord/maintenance" className={itemClass}><Wrench className="w-4 h-4 mr-2" /> Quản lý sự cố</Link>
                    <Link to="/landlord/leads" className={itemClass}><Users className="w-4 h-4 mr-2" /> Gợi ý khách thuê</Link>
                    <Link to="/landlord/vip" className={itemClass}><Crown className="w-4 h-4 mr-2 text-warning" /> Nâng cấp VIP</Link>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <Link to="/admin/settings" className={itemClass}><Settings className="w-4 h-4 mr-2" /> Cài đặt hệ thống</Link>
                  </>
                )}
                {user?.role !== 'admin' && (
                  <Link to="/settings" className={itemClass}><Settings className="w-4 h-4 mr-2" /> Cài đặt</Link>
                )}
              </div>
              <div className="border-t border-border py-1">
                <button onClick={handleLogout} className={`${itemClass} w-full text-error hover:bg-red-50`}>
                  <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className={`sticky top-0 z-40 transition-colors duration-300 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0 flex items-center">
            <Link to={isAuthenticated ? `/${user?.role}/dashboard` : '/'} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${isAdmin ? 'bg-white text-[#1E1B4B]' : 'bg-primary'}`}>
                D
              </div>
              <span className={`text-xl font-extrabold tracking-tight ${isAdmin ? 'text-white' : 'text-primary'}`}>
                DORMI {isAdmin && <span className="text-xs font-medium ml-1 bg-white/20 px-2 py-0.5 rounded-full">Admin</span>}
              </span>
            </Link>
          </div>

          {!isAuthenticated && renderGuestLinks()}
          {isAuthenticated && user?.role === 'tenant' && renderTenantLinks()}
          {isAuthenticated && user?.role === 'landlord' && renderLandlordLinks()}
          {isAuthenticated && user?.role === 'admin' && renderAdminLinks()}

          <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
            {isAuthenticated && renderAvatarDropdown()}

            {/* Mobile Menu Toggle Button */}
            <button
              className={`md:hidden p-2 rounded-md ${isAdmin ? 'text-white' : 'text-text-primary'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t ${isAdmin ? 'bg-[#1E1B4B] border-[#312E81] text-white' : 'bg-white border-border text-text-primary'}`}>
          <div className="px-4 py-3 space-y-2 flex flex-col">
            {!isAuthenticated && (
              <>
                <NavLink to="/tenant/explore" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface-2 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Khám phá</NavLink>
                <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface-2 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Tính năng</a>
                <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface-2 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Về chúng tôi</a>
                <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface-2 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Giá dịch vụ</a>
                <div className="pt-4 flex gap-3">
                  <Link to="/login" className="flex-1 text-center px-4 py-2 border border-border rounded-md hover:bg-surface-2 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Đăng nhập</Link>
                  <Link to="/register" className="flex-1 text-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Đăng ký</Link>
                </div>
              </>
            )}

            {isAuthenticated && user?.role === 'tenant' && (
              <>
                <NavLink to="/tenant/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface-2" onClick={() => setIsMobileMenuOpen(false)}>Tổng quan</NavLink>
                <NavLink to="/tenant/explore" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface-2" onClick={() => setIsMobileMenuOpen(false)}>Khám phá</NavLink>
                <NavLink to="/tenant/roommate" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface-2" onClick={() => setIsMobileMenuOpen(false)}>Bạn ở ghép</NavLink>
                <NavLink to="/tenant/chat" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface-2" onClick={() => setIsMobileMenuOpen(false)}>Tin nhắn</NavLink>
              </>
            )}

            {isAuthenticated && user?.role === 'landlord' && (
              <>
                <NavLink to="/landlord/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>Tổng quan</NavLink>
                <NavLink to="/landlord/rooms" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>Quản lý phòng</NavLink>
                <NavLink to="/landlord/appointments" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>Lịch hẹn</NavLink>
                <NavLink to="/landlord/chat" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>Tin nhắn</NavLink>
              </>
            )}

            {isAuthenticated && user?.role === 'admin' && (
              <>
                <NavLink to="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>Tổng quan</NavLink>
                <NavLink to="/admin/rooms" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>Tin đăng</NavLink>
                <NavLink to="/admin/kyc" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>eKYC</NavLink>
                <NavLink to="/admin/reports" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>Báo cáo</NavLink>
                <NavLink to="/admin/users" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>Người dùng</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
