import { useState } from 'react';
import { CheckCircle2, Search, ShieldAlert, ScanLine } from 'lucide-react';
import { toast } from 'sonner';

export default function KYCApprovals() {
  // Fake pending KYC data
  const [pendingKYC, setPendingKYC] = useState([
    {
      id: 'kyc-001',
      landlordName: 'Nguyễn Văn A',
      email: 'nva@email.com',
      phone: '0901234567',
      submittedAt: '2026-06-30T10:30:00Z',
      idCardNumber: '079199012345',
      frontImage: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400',
      backImage: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400',
      selfieImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      matchScore: 98
    },
    {
      id: 'kyc-002',
      landlordName: 'Trần Thị B',
      email: 'ttb@email.com',
      phone: '0912345678',
      submittedAt: '2026-06-30T11:15:00Z',
      idCardNumber: '079198000123',
      frontImage: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400',
      backImage: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400',
      selfieImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      matchScore: 65
    }
  ]);

  const [viewImage, setViewImage] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setPendingKYC(prev => prev.filter(k => k.id !== id));
    toast.success('Đã duyệt eKYC thành công.');
  };

  const handleReject = (id: string) => {
    setPendingKYC(prev => prev.filter(k => k.id !== id));
    toast.success('Đã từ chối eKYC và yêu cầu cập nhật lại.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in-up">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Xác minh eKYC</h1>
          <p className="text-text-secondary">Đối chiếu thẻ CCCD và khuôn mặt của Chủ trọ để đảm bảo an toàn.</p>
        </div>
        <div className="bg-warning/10 text-warning px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-warning/20">
          <ShieldAlert className="w-5 h-5" /> {pendingKYC.length} Hồ sơ chờ xử lý
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-2 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Tìm theo tên, CMND/CCCD..." className="w-full bg-white border border-border rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-3 border-b border-border text-sm text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Thông tin Chủ trọ</th>
                <th className="px-6 py-4 font-bold">Hình ảnh CCCD</th>
                <th className="px-6 py-4 font-bold">Kết quả AI OCR</th>
                <th className="px-6 py-4 font-bold text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pendingKYC.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-muted">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-success/50" />
                    Không có hồ sơ eKYC nào đang chờ duyệt.
                  </td>
                </tr>
              ) : (
                pendingKYC.map(kyc => (
                  <tr key={kyc.id} className="hover:bg-surface-2 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-text-primary mb-1">{kyc.landlordName}</p>
                      <p className="text-xs text-text-secondary mb-1">Email: {kyc.email}</p>
                      <p className="text-xs text-text-secondary mb-1">SĐT: {kyc.phone}</p>
                      <p className="text-xs font-semibold text-primary mt-2">CCCD: {kyc.idCardNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <div onClick={() => setViewImage(kyc.frontImage)} className="relative group cursor-pointer border border-border rounded-lg overflow-hidden w-20 h-16 shrink-0">
                          <img src={kyc.frontImage} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">Mặt trước</span>
                          </div>
                        </div>
                        <div onClick={() => setViewImage(kyc.backImage)} className="relative group cursor-pointer border border-border rounded-lg overflow-hidden w-20 h-16 shrink-0">
                          <img src={kyc.backImage} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">Mặt sau</span>
                          </div>
                        </div>
                        <div onClick={() => setViewImage(kyc.selfieImage)} className="relative group cursor-pointer border border-border rounded-lg overflow-hidden w-16 h-16 shrink-0">
                          <img src={kyc.selfieImage} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">Selfie</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center relative ${kyc.matchScore > 80 ? 'border-success/20 text-success' : 'border-warning/20 text-warning'}`}>
                          <span className="font-black text-sm">{kyc.matchScore}%</span>
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="113" strokeDashoffset={113 - (113 * kyc.matchScore) / 100} />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-text-primary flex items-center gap-1"><ScanLine className="w-3 h-3 text-text-muted" /> Face Match</p>
                          <p className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded ${kyc.matchScore > 80 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                            {kyc.matchScore > 80 ? 'Hợp lệ' : 'Cần xem lại'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleApprove(kyc.id)} className="px-4 py-2 bg-success text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]">
                          Duyệt
                        </button>
                        <button onClick={() => handleReject(kyc.id)} className="px-4 py-2 bg-error/10 text-error font-bold rounded-lg hover:bg-error hover:text-white transition-colors">
                          Từ chối
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Modal */}
      {viewImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center animate-zoom-in" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setViewImage(null)} 
              className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
            >
              <CheckCircle2 className="w-8 h-8 rotate-45" /> {/* Use as close icon */}
            </button>
            <img src={viewImage} className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
