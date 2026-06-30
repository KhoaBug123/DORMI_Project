import { Search, MoreVertical, UserX, UserCheck, Shield, Unlock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 'T001', name: 'Nguyễn Văn Khoa', email: 'khoa@student.hcmut.edu.vn', role: 'Tenant', status: 'Active', joined: '15/06/2026' },
    { id: 'L001', name: 'Trần Văn Chủ', email: 'chutro@email.com', role: 'Landlord', status: 'Active', joined: '10/05/2026' },
    { id: 'T002', name: 'Lê Thị B', email: 'lethib@gmail.com', role: 'Tenant', status: 'Locked', joined: '01/01/2026' }
  ]);
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Locked' : 'Active';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    toast.success(`Đã ${newStatus === 'Locked' ? 'khóa' : 'mở khóa'} tài khoản thành công!`);
    setActiveMenu(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Quản lý người dùng</h1>
          <p className="text-text-secondary">Quản lý tài khoản Tenant và Landlord trên hệ thống.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between bg-surface-2">
          <div className="relative w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Tìm kiếm người dùng..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:border-primary outline-none transition-colors"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-sm text-text-secondary">
              <th className="p-4 font-semibold">Tên người dùng</th>
              <th className="p-4 font-semibold">Vai trò</th>
              <th className="p-4 font-semibold">Ngày tham gia</th>
              <th className="p-4 font-semibold">Trạng thái</th>
              <th className="p-4 font-semibold text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-surface/50 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-semibold text-text-primary">{u.name}</p>
                    <p className="text-xs text-text-secondary">{u.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${u.role === 'Landlord' ? 'bg-info/10 text-info' : 'bg-surface-3 text-text-secondary'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-text-secondary">{u.joined}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 w-max ${u.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                    {u.status === 'Active' ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />} {u.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="relative" ref={activeMenu === u.id ? menuRef : null}>
                    <button 
                      onClick={() => setActiveMenu(activeMenu === u.id ? null : u.id)}
                      className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-surface-2"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {activeMenu === u.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-border z-10 animate-fade-in-up py-1">
                        <button 
                          onClick={() => toggleStatus(u.id, u.status)}
                          className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-surface-2 transition-colors ${u.status === 'Active' ? 'text-error' : 'text-success'}`}
                        >
                          {u.status === 'Active' ? (
                            <><UserX className="w-4 h-4" /> Khóa tài khoản</>
                          ) : (
                            <><Unlock className="w-4 h-4" /> Mở khóa tài khoản</>
                          )}
                        </button>
                        <button onClick={() => { toast.info('Chức năng đang phát triển'); setActiveMenu(null); }} className="w-full text-left px-4 py-2 text-sm text-text-primary flex items-center gap-2 hover:bg-surface-2 transition-colors">
                          <Shield className="w-4 h-4" /> Xem lịch sử vi phạm
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
