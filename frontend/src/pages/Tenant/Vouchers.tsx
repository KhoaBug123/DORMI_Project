import { Gift, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Vouchers() {
  const [copied, setCopied] = useState<string | null>(null);

  const vouchers = [
    { id: 'V1', code: 'DORMI50K', title: 'Giảm 50K phí dịch vụ', desc: 'Áp dụng cho mọi giao dịch thanh toán qua DORMI', expires: '31/12/2026' },
    { id: 'V2', code: 'NEWTENANT', title: 'Giảm 100K tháng đầu', desc: 'Áp dụng cho hợp đồng thuê từ 6 tháng trở lên', expires: '30/11/2026' },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <Gift className="w-6 h-6 text-primary" /> Ưu đãi của tôi
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vouchers.map(v => (
          <div key={v.id} className="bg-white rounded-xl shadow-sm border border-border p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -z-10"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-text-primary">{v.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{v.desc}</p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-border border-dashed flex items-center justify-between">
              <span className="text-xs text-text-muted">HSD: {v.expires}</span>
              <button 
                onClick={() => handleCopy(v.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 hover:bg-surface-3 transition-colors rounded-md text-sm font-bold text-primary"
              >
                {copied === v.code ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                {copied === v.code ? 'Đã chép' : v.code}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
