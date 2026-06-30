import { MessageSquare, Star } from 'lucide-react';
import { mockLeads } from '../../data/mockData';

export default function LandlordLeads() {
  const leads = mockLeads;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Khách thuê tiềm năng (Leads)</h1>
          <p className="text-text-secondary">Khách hàng đang tìm phòng phù hợp với khu vực của bạn.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-2 border-b border-border text-sm text-text-secondary">
              <th className="p-4 font-semibold">Khách hàng</th>
              <th className="p-4 font-semibold">Thông tin</th>
              <th className="p-4 font-semibold">Nhu cầu (Match)</th>
              <th className="p-4 font-semibold">Ngân sách</th>
              <th className="p-4 font-semibold text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-surface/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={lead.tenantAvatar} alt={lead.tenantName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <span className="font-semibold text-text-primary block">{lead.tenantName}</span>
                      <span className="text-xs text-text-muted">{lead.university}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 text-sm text-text-secondary">
                    <span>Tìm ở: {lead.preferredDistricts.join(', ')}</span>
                    <span>Dọn vào: {lead.moveInDate}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-text-primary">Khớp với phòng của bạn</span>
                    <span className="text-xs font-bold text-success flex items-center gap-1"><Star className="w-3 h-3 fill-current"/> Match Score: {lead.matchScore}%</span>
                  </div>
                </td>
                <td className="p-4 text-primary font-bold">{lead.budget.toLocaleString('vi-VN')}đ</td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md font-semibold transition-colors flex items-center gap-1.5 ml-auto">
                    <MessageSquare className="w-4 h-4" /> Nhắn tin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
