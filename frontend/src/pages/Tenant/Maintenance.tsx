import { useState } from 'react';
import { Plus, Wrench, Search, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function TenantMaintenance() {
  const [tickets, setTickets] = useState([
    { id: 'MT-001', room: 'Phòng 101 - Landmark 81', issue: 'Hỏng vòi hoa sen', status: 'pending', date: '20/06/2026', note: '' },
    { id: 'MT-002', room: 'Phòng 101 - Landmark 81', issue: 'Đèn trần bị cháy', status: 'resolved', date: '15/06/2026', note: 'Đã thay bóng đèn LED mới.' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [issue, setIssue] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('Phòng 101 - Landmark 81');

  const myRooms = [
    'Phòng 101 - Landmark 81',
    'Phòng 202 - Vinhomes Central Park',
    'Căn hộ mini - Quận 5'
  ];

  const handleSubmit = () => {
    if (!issue) return toast.error('Vui lòng nhập mô tả sự cố');
    setTickets([{ id: `MT-00${tickets.length + 1}`, room: selectedRoom, issue, status: 'pending', date: new Date().toLocaleDateString('vi-VN'), note: '' }, ...tickets]);
    setShowModal(false);
    setIssue('');
    toast.success('Gửi báo cáo sự cố thành công!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Quản lý sự cố</h1>
          <p className="text-text-secondary">Gửi và theo dõi báo cáo hỏng hóc, sự cố trong phòng của bạn.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-all-custom shadow-brand">
          <Plus className="w-5 h-5" /> Báo cáo sự cố
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-2 relative">
          <Search className="w-5 h-5 absolute left-7 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Tìm kiếm sự cố..." className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:border-primary outline-none" />
        </div>
        <div className="p-6">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 mx-auto text-text-muted opacity-20 mb-3" />
              <p className="text-text-muted">Chưa có báo cáo sự cố nào.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map(ticket => (
                <div key={ticket.id} className="border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-bold text-text-muted bg-surface-2 px-2 py-1 rounded-md mb-2 inline-block">Mã: {ticket.id}</span>
                      <h3 className="font-bold text-text-primary text-lg">{ticket.issue}</h3>
                      <p className="text-sm text-text-secondary flex items-center gap-1 mt-1"><MapPin className="w-4 h-4"/> {ticket.room}</p>
                    </div>
                    {ticket.status === 'pending' ? (
                      <span className="bg-warning/10 text-warning px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5"><Clock className="w-4 h-4"/> Đang xử lý</span>
                    ) : (
                      <span className="bg-success/10 text-success px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> Đã giải quyết</span>
                    )}
                  </div>
                  <div className="text-sm text-text-secondary border-t border-border pt-3 mt-3 flex justify-between items-center">
                    <span>Ngày gửi: {ticket.date}</span>
                    {ticket.note && <span className="text-text-primary font-medium bg-surface-2 px-3 py-1 rounded-lg">Phản hồi: {ticket.note}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-xl relative animate-scale-up">
            <h2 className="text-xl font-bold text-text-primary mb-4">Báo cáo sự cố mới</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-bold text-text-secondary mb-1">Phòng gặp sự cố <span className="text-error">*</span></label>
              <select 
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary mb-4"
              >
                {myRooms.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>

              <label className="block text-sm font-bold text-text-secondary mb-1">Mô tả sự cố <span className="text-error">*</span></label>
              <textarea 
                value={issue} 
                onChange={(e) => setIssue(e.target.value)} 
                placeholder="Ví dụ: Vòi nước bồn rửa mặt bị rỉ..." 
                className="w-full bg-surface-2 border border-border rounded-xl p-4 min-h-[120px] outline-none focus:border-primary resize-none"
              ></textarea>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 bg-surface-3 hover:bg-border text-text-primary font-bold rounded-xl transition-colors">Hủy bỏ</button>
              <button onClick={handleSubmit} className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-colors flex items-center gap-2">
                <Wrench className="w-5 h-5"/> Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
