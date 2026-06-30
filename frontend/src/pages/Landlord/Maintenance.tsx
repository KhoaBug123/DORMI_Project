import { useState } from 'react';
import { Wrench, Search, MapPin, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function LandlordMaintenance() {
  const [tickets, setTickets] = useState([
    { id: 'MT-001', tenant: 'Nguyễn Văn Khoa', room: 'Phòng 101 - Trọ Sinh Viên', issue: 'Hỏng vòi hoa sen', status: 'pending', date: '20/06/2026', note: '' },
    { id: 'MT-003', tenant: 'Trần Thị B', room: 'Phòng 205 - Trọ Sinh Viên', issue: 'Máy lạnh không mát', status: 'pending', date: '19/06/2026', note: '' },
    { id: 'MT-002', tenant: 'Nguyễn Văn Khoa', room: 'Phòng 101 - Trọ Sinh Viên', issue: 'Đèn trần bị cháy', status: 'resolved', date: '15/06/2026', note: 'Đã thay bóng đèn LED mới.' },
  ]);

  const [filter, setFilter] = useState('all');

  const handleResolve = (id: string) => {
    const note = prompt('Nhập ghi chú giải quyết sự cố (Tùy chọn):');
    if (note !== null) {
      setTickets(tickets.map(t => t.id === id ? { ...t, status: 'resolved', note } : t));
      toast.success('Đã cập nhật trạng thái sự cố thành: Đã giải quyết');
    }
  };

  const filteredTickets = tickets.filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Tiếp nhận & Xử lý sự cố</h1>
        <p className="text-text-secondary">Quản lý và cập nhật tiến độ xử lý các báo cáo hỏng hóc từ người thuê.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-2 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'all' ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-text-secondary'}`}>Tất cả ({tickets.length})</button>
            <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'pending' ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-text-secondary'}`}>Đang xử lý ({tickets.filter(t=>t.status==='pending').length})</button>
            <button onClick={() => setFilter('resolved')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'resolved' ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border text-text-secondary'}`}>Đã giải quyết ({tickets.filter(t=>t.status==='resolved').length})</button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:border-primary outline-none" />
          </div>
        </div>
        
        <div className="p-6">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 mx-auto text-text-muted opacity-20 mb-3" />
              <p className="text-text-muted">Không có sự cố nào.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTickets.map(ticket => (
                <div key={ticket.id} className="border border-border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-text-secondary bg-surface-3 px-2.5 py-1 rounded-md">Mã: {ticket.id}</span>
                    {ticket.status === 'pending' ? (
                      <span className="bg-warning/10 text-warning px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Đang chờ</span>
                    ) : (
                      <span className="bg-success/10 text-success px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Đã xử lý</span>
                    )}
                  </div>
                  <h3 className="font-bold text-text-primary text-lg mb-2">{ticket.issue}</h3>
                  <div className="space-y-1.5 mb-4 text-sm text-text-secondary">
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-text-muted"/> {ticket.room}</p>
                    <p className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-text-muted"/> Người gửi: <span className="font-semibold text-text-primary">{ticket.tenant}</span></p>
                    <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-text-muted"/> Ngày báo: {ticket.date}</p>
                  </div>
                  
                  <div className="border-t border-border pt-4 mt-auto">
                    {ticket.status === 'pending' ? (
                      <button onClick={() => handleResolve(ticket.id)} className="w-full py-2 bg-success/10 text-success hover:bg-success hover:text-white font-bold rounded-lg transition-colors flex justify-center items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Đánh dấu đã giải quyết
                      </button>
                    ) : (
                      <div className="text-sm bg-surface-2 p-3 rounded-lg text-text-secondary">
                        <span className="font-bold text-text-primary block mb-1">Ghi chú xử lý:</span>
                        {ticket.note || "Không có ghi chú"}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
