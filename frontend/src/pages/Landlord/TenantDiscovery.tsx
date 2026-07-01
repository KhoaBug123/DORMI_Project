import { useState } from 'react';
import { Search, MapPin, DollarSign, Calendar, MessageSquare, UserPlus, Star, Filter } from 'lucide-react';
import { mockTenantMatches } from '../../data/mockData';
import { toast } from 'sonner';

export default function TenantDiscovery() {
  const [tenants, setTenants] = useState(mockTenantMatches);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInvite = (id: string) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, contacted: true } : t));
    toast.success('Đã gửi lời mời thuê phòng đến khách hàng!');
  };

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Tìm kiếm Người thuê</h1>
          <p className="text-text-secondary">AI của chúng tôi đã quét và đề xuất các khách thuê phù hợp nhất với phòng của bạn.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Tìm theo tên, trường học..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-surface-2 border border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="px-6 py-3 bg-surface-2 border border-border text-text-primary rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-surface-3 transition-colors">
          <Filter className="w-5 h-5" /> Lọc
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTenants.map(tenant => (
          <div key={tenant.id} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <img src={tenant.avatar} alt={tenant.name} className="w-16 h-16 rounded-full border-2 border-surface-2 object-cover" />
                  <div>
                    <h3 className="font-bold text-lg text-text-primary line-clamp-1">{tenant.name}</h3>
                    <p className="text-sm text-text-secondary">{tenant.university}</p>
                    <p className="text-xs text-text-muted mt-0.5">{tenant.major}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{tenant.matchScore}%</span>
                  </div>
                  <span className="text-[10px] text-text-muted mt-1 font-medium uppercase tracking-wider">Match</span>
                </div>
              </div>

              <div className="space-y-3 mb-4 text-sm text-text-secondary">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-text-muted shrink-0" />
                  <span className="font-medium text-text-primary">{tenant.budget.toLocaleString('vi-VN')}đ/tháng</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-text-muted shrink-0" />
                  <span>Tìm quanh: <span className="font-medium text-text-primary">{tenant.preferredDistricts.join(', ')}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-text-muted shrink-0" />
                  <span>Dự kiến ở: <span className="font-medium text-text-primary">{tenant.moveInDate}</span></span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-text-primary italic line-clamp-2">"{tenant.lookingFor}"</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {tenant.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-surface-3 text-text-secondary text-xs rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border bg-surface-1 flex gap-3">
              <button 
                className="flex-1 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                onClick={() => toast.info('Đã mở hộp thoại tin nhắn')}
              >
                <MessageSquare className="w-4 h-4" /> Nhắn tin
              </button>
              <button 
                className={`flex-1 py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${tenant.contacted ? 'bg-surface-3 text-text-muted cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
                onClick={() => !tenant.contacted && handleInvite(tenant.id)}
                disabled={tenant.contacted}
              >
                <UserPlus className="w-4 h-4" /> {tenant.contacted ? 'Đã mời' : 'Mời thuê'}
              </button>
            </div>
          </div>
        ))}

        {filteredTenants.length === 0 && (
          <div className="col-span-full py-16 text-center text-text-muted border-2 border-dashed border-border rounded-2xl">
            <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Không tìm thấy người thuê nào phù hợp với từ khóa.</p>
          </div>
        )}
      </div>
    </div>
  );
}
