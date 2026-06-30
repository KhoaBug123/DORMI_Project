import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, UploadCloud, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'sonner';

export default function LandlordKYC() {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const { verifyLandlord } = useAuthStore();
  const navigate = useNavigate();

  const handleUpload = (side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Fake image URL
      const url = URL.createObjectURL(file);
      if (side === 'front') setFrontImage(url);
      else setBackImage(url);
    }
  };

  const startScan = () => {
    if (!frontImage || !backImage) {
      toast.error('Vui lòng tải lên đầy đủ 2 mặt CCCD');
      return;
    }

    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setIsVerified(true);
          toast.success('Xác thực eKYC thành công!');
        }, 500);
      }
    }, 100);
  };

  const handleComplete = () => {
    verifyLandlord();
    navigate('/landlord/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-2 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-border p-8 animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-warning/10 text-warning rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-3">Xác thực eKYC Chủ trọ</h1>
          <p className="text-text-secondary text-lg">Để đảm bảo an toàn cho cộng đồng, DORMI yêu cầu tất cả chủ trọ xác minh danh tính trước khi đăng tin.</p>
        </div>

        {!isVerified ? (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mặt trước */}
              <div className="relative group cursor-pointer border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary transition-colors h-56 bg-surface-3 overflow-hidden">
                <input type="file" accept="image/*" onChange={(e) => handleUpload('front', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {frontImage ? (
                  <img src={frontImage} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-text-muted mb-3 group-hover:text-primary transition-colors" />
                    <h3 className="font-bold text-text-primary mb-1">Mặt trước CCCD</h3>
                    <p className="text-xs text-text-muted">Chụp rõ nét, không bị lóa sáng</p>
                  </>
                )}
              </div>

              {/* Mặt sau */}
              <div className="relative group cursor-pointer border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary transition-colors h-56 bg-surface-3 overflow-hidden">
                <input type="file" accept="image/*" onChange={(e) => handleUpload('back', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                {backImage ? (
                  <img src={backImage} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-text-muted mb-3 group-hover:text-primary transition-colors" />
                    <h3 className="font-bold text-text-primary mb-1">Mặt sau CCCD</h3>
                    <p className="text-xs text-text-muted">Đảm bảo rõ mã QR và quốc huy</p>
                  </>
                )}
              </div>
            </div>

            {isScanning ? (
              <div className="bg-surface-2 p-6 rounded-2xl border border-border text-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                <h3 className="font-bold text-text-primary mb-2">Đang quét OCR và đối chiếu khuôn mặt...</h3>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-primary transition-all duration-100 ease-linear" style={{ width: `${scanProgress}%` }}></div>
                </div>
              </div>
            ) : (
              <button 
                onClick={startScan}
                disabled={!frontImage || !backImage}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-light transition-all-custom button-press disabled:opacity-50 disabled:cursor-not-allowed shadow-brand"
              >
                Bắt đầu xác thực
              </button>
            )}
          </div>
        ) : (
          <div className="text-center animate-fade-in-up py-8">
            <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-extrabold text-text-primary mb-3">Xác thực thành công!</h2>
            <p className="text-text-secondary mb-8">Danh tính của bạn đã được xác minh. Bây giờ bạn có thể bắt đầu đăng tin cho thuê trên DORMI.</p>
            <button 
              onClick={handleComplete}
              className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-light transition-all-custom button-press shadow-brand"
            >
              Vào Trang quản lý
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
