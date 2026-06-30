import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockTenants } from '../../data/mockData';
import { Sparkles, ArrowRight, ArrowLeft, Moon, Sparkle, ChefHat, Cat, Users, Cigarette, Wallet, MessageSquare, X, RefreshCw } from 'lucide-react';

export default function RoommateMatcher() {
  const [activeTab, setActiveTab] = useState<'survey' | 'results'>('survey');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [roommates, setRoommates] = useState(mockTenants.filter(t => t.id !== 'tenant-001' && t.compatibilityScore));
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleSkip = (id: string) => {
    const newRoommates = roommates.filter(r => r.id !== id);
    if (newRoommates.length === 0) {
      setRoommates([]);
      setIsLoadingMore(true);
      setTimeout(() => {
        // mock fetch more or loop
        setRoommates(mockTenants.filter(t => t.id !== 'tenant-001' && t.compatibilityScore));
        setIsLoadingMore(false);
      }, 1500);
    } else {
      setRoommates(newRoommates);
    }
  };

  // Survey States
  const [survey, setSurvey] = useState({
    sleep: '',
    clean: '',
    cook: '',
    pet: '',
    visitor: '',
    smoke: '',
    budget: 3000000
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setActiveTab('results');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const OptionBtn = ({ icon: Icon, label, value, field }: { icon: any, label: string, value: string, field: keyof typeof survey }) => {
    const isSelected = survey[field] === value;
    return (
      <button 
        onClick={() => setSurvey({ ...survey, [field]: value })}
        className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border-2 transition-all-custom ${isSelected ? 'border-primary bg-primary/5 shadow-brand scale-105' : 'border-border hover:border-primary/40 bg-white hover:bg-surface-2'}`}
      >
        <Icon className={`w-10 h-10 mb-4 ${isSelected ? 'text-primary' : 'text-text-muted'}`} />
        <span className={`font-bold text-lg text-center ${isSelected ? 'text-primary' : 'text-text-primary'}`}>{label}</span>
      </button>
    );
  };


  return (
    <div className="bg-surface-2 min-h-[calc(100vh-64px)] w-full py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        
        {/* Tabs Header */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-border inline-flex">
            <button 
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'survey' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => setActiveTab('survey')}
            >
              Khảo sát lối sống
            </button>
            <button 
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'results' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => setActiveTab('results')}
            >
              Gợi ý bạn ở ghép
            </button>
          </div>
        </div>

        {/* Khảo sát */}
        {activeTab === 'survey' && (
          <div className="bg-white rounded-3xl shadow-lg border border-border flex-1 flex flex-col overflow-hidden animate-fade-in-up">
            
            {/* Progress */}
            <div className="bg-surface-2 border-b border-border px-8 py-6">
              <h2 className="text-2xl font-extrabold text-text-primary mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" /> Cho chúng tôi biết về bạn
              </h2>
              <p className="text-text-secondary mb-6">Thông tin này giúp AI tìm mảnh ghép hoàn hảo cho bạn.</p>
              
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-text-muted mt-2 uppercase tracking-wider">
                <span>Bắt đầu</span>
                <span>Bước {currentStep}/{totalSteps}</span>
                <span>Hoàn tất</span>
              </div>
            </div>

            {/* Questions area */}
            <div className="flex-1 p-8 flex flex-col justify-center min-h-[400px]">
              
              {currentStep === 1 && (
                <div className="animate-fade-in-up w-full max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold text-center mb-10">Giờ ngủ thường ngày của bạn?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <OptionBtn icon={Moon} label="Trước 10h tối" value="10h" field="sleep" />
                    <OptionBtn icon={Moon} label="Trước 12h đêm" value="12h" field="sleep" />
                    <OptionBtn icon={Moon} label="Sau 12h đêm" value="late" field="sleep" />
                    <OptionBtn icon={Moon} label="Linh hoạt" value="flex" field="sleep" />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-fade-in-up w-full max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold text-center mb-10">Mức độ gọn gàng?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <OptionBtn icon={Sparkle} label="Rất gọn gàng" value="very" field="clean" />
                    <OptionBtn icon={Sparkle} label="Khá gọn gàng" value="good" field="clean" />
                    <OptionBtn icon={Sparkle} label="Bình thường" value="normal" field="clean" />
                    <OptionBtn icon={Sparkle} label="Sao cũng được" value="flex" field="clean" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-fade-in-up w-full max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold text-center mb-10">Bạn có thường nấu ăn?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <OptionBtn icon={ChefHat} label="Thường xuyên" value="often" field="cook" />
                    <OptionBtn icon={ChefHat} label="Thỉnh thoảng" value="sometimes" field="cook" />
                    <OptionBtn icon={ChefHat} label="Không nấu" value="never" field="cook" />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="animate-fade-in-up w-full max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold text-center mb-10">Bạn có nuôi thú cưng không?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <OptionBtn icon={Cat} label="Có nuôi" value="yes" field="pet" />
                    <OptionBtn icon={Cat} label="Không nuôi" value="no" field="pet" />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="animate-fade-in-up w-full max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold text-center mb-10">Dẫn bạn bè về chơi?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <OptionBtn icon={Users} label="Thường xuyên" value="often" field="visitor" />
                    <OptionBtn icon={Users} label="Thỉnh thoảng" value="sometimes" field="visitor" />
                    <OptionBtn icon={Users} label="Không bao giờ" value="never" field="visitor" />
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="animate-fade-in-up w-full max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold text-center mb-10">Thói quen hút thuốc?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <OptionBtn icon={Cigarette} label="Có hút" value="yes" field="smoke" />
                    <OptionBtn icon={Cigarette} label="Không hút" value="no" field="smoke" />
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="animate-fade-in-up w-full max-w-3xl mx-auto text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wallet className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Ngân sách của bạn?</h3>
                  <p className="text-text-secondary mb-10">Mức giá tối đa bạn có thể chi trả mỗi tháng.</p>
                  
                  <div className="max-w-md mx-auto bg-surface-2 p-8 rounded-2xl border border-border">
                    <p className="text-4xl font-extrabold text-primary mb-6">{survey.budget.toLocaleString('vi-VN')}đ</p>
                    <input 
                      type="range" 
                      min="1000000" 
                      max="10000000" 
                      step="500000"
                      value={survey.budget} 
                      onChange={(e) => setSurvey({...survey, budget: Number(e.target.value)})}
                      className="w-full accent-primary h-2 bg-border rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-3 text-sm font-bold text-text-muted">
                      <span>1.000.000đ</span>
                      <span>10.000.000đ</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="border-t border-border p-6 flex justify-between bg-surface-2 mt-auto">
              <button 
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-3 font-bold rounded-lg flex items-center gap-2 transition-colors ${currentStep === 1 ? 'opacity-0 cursor-default' : 'bg-white text-text-primary border border-border hover:bg-surface-3'}`}
              >
                <ArrowLeft className="w-5 h-5" /> Quay lại
              </button>
              
              <button 
                onClick={handleNext}
                className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-light shadow-brand transition-all-custom button-press flex items-center gap-2"
              >
                {currentStep === totalSteps ? 'Hoàn tất & Xem kết quả' : 'Tiếp theo'} 
                {currentStep !== totalSteps && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* Kết quả */}
        {activeTab === 'results' && (
          <div className="animate-fade-in-up">
            <div className="bg-gradient-to-r from-primary to-indigo-700 rounded-3xl p-8 text-white mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-3xl font-extrabold mb-2">Tuyệt vời! Chúng tôi đã tìm thấy 4 mảnh ghép.</h2>
                <p className="text-white/80 text-lg">Dựa trên khảo sát, đây là những người có lối sống tương đồng với bạn nhất.</p>
              </div>
              <div className="mt-6 md:mt-0 bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-md border border-white/20 text-center">
                <p className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-1">Độ chính xác AI</p>
                <p className="text-4xl font-black text-white">92%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {roommates.map(user => (
                <div key={user.id} className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="p-6 relative">
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <img src={user.avatar} className="w-16 h-16 rounded-full object-cover border-2 border-surface-2" />
                        <div>
                          <h3 className="font-bold text-lg text-text-primary">{user.fullName}</h3>
                          <p className="text-sm font-medium text-primary">{user.university}</p>
                          <p className="text-xs text-text-muted mt-0.5">{user.major} • {user.studentYear}</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-success/20 flex items-center justify-center relative">
                        <span className="font-black text-success text-sm">{user.compatibilityScore}%</span>
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="4" className="text-success" strokeDasharray="113" strokeDashoffset={113 - (113 * (user.compatibilityScore || 0)) / 100} />
                        </svg>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-6">
                      <div className="flex items-center gap-2 text-text-secondary"><Moon className="w-4 h-4 text-text-muted" /> {user.lifestyle.sleepSchedule}</div>
                      <div className="flex items-center gap-2 text-text-secondary"><Sparkle className="w-4 h-4 text-text-muted" /> {user.lifestyle.cleanliness}</div>
                      <div className="flex items-center gap-2 text-text-secondary"><Users className="w-4 h-4 text-text-muted" /> {user.lifestyle.visitors}</div>
                      <div className="flex items-center gap-2 text-text-secondary"><Wallet className="w-4 h-4 text-text-muted" /> {(user.budget/1000000).toFixed(1)}tr/tháng</div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {user.preferredDistricts.map(d => (
                        <span key={d} className="bg-surface-3 text-text-secondary text-xs font-semibold px-2.5 py-1 rounded-md">{d}</span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => handleSkip(user.id)} className="flex-1 h-[48px] bg-surface-3 text-text-muted hover:text-error hover:bg-error/10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0" title="Bỏ qua">
                        <X className="w-6 h-6" />
                      </button>
                      <Link to="/tenant/chat" className="flex-1 h-[48px] bg-surface-3 text-text-primary hover:bg-surface-2 rounded-xl transition-colors flex justify-center items-center border border-border flex-shrink-0" title="Nhắn tin">
                        <MessageSquare className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isLoadingMore && (
              <div className="flex flex-col items-center justify-center py-16">
                <RefreshCw className="w-10 h-10 text-primary animate-spin mb-4" />
                <h3 className="font-bold text-lg text-text-primary">Đang tìm kiếm thêm người phù hợp...</h3>
                <p className="text-text-secondary">Hệ thống đang mở rộng phạm vi tìm kiếm.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
