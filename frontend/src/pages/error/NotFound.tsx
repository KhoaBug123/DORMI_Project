import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-error" />
      </div>
      <h1 className="text-6xl font-black text-text-primary mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold text-text-primary mb-4">Không tìm thấy trang</h2>
      <p className="text-text-secondary text-lg mb-8 max-w-md">
        Trang bạn đang cố gắng truy cập không tồn tại, đã bị xóa hoặc tạm thời không khả dụng.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-md hover:bg-primary-light transition-colors shadow-sm"
      >
        <Home className="w-5 h-5" />
        Về Trang Chủ
      </Link>
    </div>
  );
}
