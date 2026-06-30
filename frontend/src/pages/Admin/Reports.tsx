import { useState } from 'react';
import { AlertOctagon, Search, Ban, CheckCircle2, Flag, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminReports() {
  const [reports, setReports] = useState([
    { id: 'RP-001', reporter: 'Nguyễn Văn Khoa', target: 'Phòng 101 - Landlord 001', reason: 'Thông tin sai sự thật, giá ảo', status: 'pending', date: '20/06/2026', severity: 'high' },
    { id: 'RP-002', reporter: 'Lê Thị B', target: 'Phòng 202 - Landlord 003', reason: 'Chủ trọ lừa đảo tiền cọc', status: 'pending', date: '19/06/2026', severity: 'critical' },
    { id: 'RP-003', reporter: 'Trần Văn C', target: 'Phòng 303 - Landlord 002', reason: 'Ảnh phòng không đúng thực tế', status: 'resolved', date: '15/06/2026', severity: 'medium' },
  ]);

  const handleAction = (id: string, action: 'ban' | 'dismiss' | 'resolve') => {
    setReports(reports.map(r => r.id === id ? { ...r, status: action === 'dismiss' ? 'dismissed' : 'resolved' } : r));
    if (action === 'ban') toast.success('Đã khóa tài khoản chủ trọ vi phạm!');
    if (action === 'dismiss') toast.info('Đã bỏ qua báo cáo không hợp lệ.');
    if (action === 'resolve') toast.success('Đã xử lý và cảnh cáo.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Quản lý Báo cáo vi phạm</h1>
        <p className="text-text-secondary">Kiểm duyệt và xử lý các ticket báo cáo từ người dùng về phòng trọ hoặc chủ trọ.</p>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">Chờ xử lý</p>
            <p className="text-2xl font-bold text-text-primary">{reports.filter(r => r.status === 'pending').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-2 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-sm">Tất cả ({reports.length})</button>
            <button className="px-4 py-2 bg-white border border-border text-text-secondary text-sm font-bold rounded-lg hover:bg-surface-3 transition-colors">Chưa xử lý</button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Tìm ID báo cáo..." className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:border-primary outline-none" />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-3 border-b border-border text-sm text-text-secondary uppercase tracking-wider">
              <th className="px-6 py-4 font-bold w-[30%]">Thông tin báo cáo</th>
              <th className="px-6 py-4 font-bold">Người gửi</th>
              <th className="px-6 py-4 font-bold">Mức độ</th>
              <th className="px-6 py-4 font-bold">Trạng thái</th>
              <th className="px-6 py-4 font-bold text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {reports.map(report => (
              <tr key={report.id} className="hover:bg-surface-2 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <Flag className={`w-5 h-5 mt-0.5 ${report.severity === 'critical' ? 'text-error' : report.severity === 'high' ? 'text-warning' : 'text-info'}`} />
                    <div>
                      <h3 className="font-bold text-text-primary mb-1">{report.reason}</h3>
                      <p className="text-xs text-text-secondary">Đối tượng: {report.target}</p>
                      <p className="text-xs text-text-muted mt-1">Mã RP: {report.id} • {report.date}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-text-primary">{report.reporter}</td>
                <td className="px-6 py-4">
                  {report.severity === 'critical' && <span className="bg-error/10 text-error px-2 py-1 rounded-md text-xs font-bold">Nghiêm trọng</span>}
                  {report.severity === 'high' && <span className="bg-warning/10 text-warning px-2 py-1 rounded-md text-xs font-bold">Cao</span>}
                  {report.severity === 'medium' && <span className="bg-info/10 text-info px-2 py-1 rounded-md text-xs font-bold">Trung bình</span>}
                </td>
                <td className="px-6 py-4">
                  {report.status === 'pending' && <span className="bg-warning/10 text-warning px-2.5 py-1 rounded-md text-xs font-bold">Chờ xử lý</span>}
                  {report.status === 'resolved' && <span className="bg-success/10 text-success px-2.5 py-1 rounded-md text-xs font-bold">Đã xử lý</span>}
                  {report.status === 'dismissed' && <span className="bg-surface-3 text-text-secondary px-2.5 py-1 rounded-md text-xs font-bold">Đã bỏ qua</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  {report.status === 'pending' ? (
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleAction(report.id, 'ban')} className="p-2 bg-error/10 text-error hover:bg-error hover:text-white rounded-lg transition-colors" title="Khóa tài khoản">
                        <Ban className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleAction(report.id, 'resolve')} className="p-2 bg-success/10 text-success hover:bg-success hover:text-white rounded-lg transition-colors" title="Đánh dấu đã xử lý">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleAction(report.id, 'dismiss')} className="p-2 bg-surface-3 text-text-secondary hover:bg-surface-4 rounded-lg transition-colors" title="Bỏ qua (Báo cáo sai)">
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-text-muted italic text-sm">Đã đóng</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
