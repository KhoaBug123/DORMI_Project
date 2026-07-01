import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockTenants } from '../../data/mockData';
import { useStore } from '../../store/useStore';
import { Sparkles, Moon, Sparkle, Users, Wallet, MessageSquare, X, RefreshCw, Heart } from 'lucide-react';

export default function RoommateMatcher() {
  const { likedRoommates, addLikedRoommate } = useStore();
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

  const handleLike = (id: string) => {
    const userToLike = roommates.find(r => r.id === id);
    if (userToLike && !likedRoommates.find(l => l.id === id)) {
      addLikedRoommate({
        id: userToLike.id,
        name: userToLike.fullName,
        image: userToLike.avatar,
        matchScore: userToLike.compatibilityScore || 0,
        age: 20
      });
    }
    handleSkip(id);
  };

  return (
    <div className="bg-surface-2 min-h-[calc(100vh-64px)] w-full py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        {/* Kết quả */}
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

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cột trái: Thẻ người dùng hiện tại */}
              <div className="w-full lg:w-2/3">
                {roommates.length > 0 ? (
                  <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden transition-all duration-300">
                    <div className="p-8 relative">
                      
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-6">
                          <img src={roommates[0].avatar} className="w-24 h-24 rounded-full object-cover border-4 border-surface-2 shadow-sm" />
                          <div>
                            <h3 className="font-bold text-2xl text-text-primary mb-1">{roommates[0].fullName}</h3>
                            <p className="font-medium text-primary text-lg">{roommates[0].university}</p>
                            <p className="text-text-muted mt-1">{roommates[0].major} • {roommates[0].studentYear}</p>
                          </div>
                        </div>
                        <div className="w-20 h-20 rounded-full border-8 border-success/20 flex items-center justify-center relative shadow-sm">
                          <span className="font-black text-success text-xl">{roommates[0].compatibilityScore}%</span>
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="36" cy="36" r="32" fill="none" stroke="currentColor" strokeWidth="8" className="text-success" strokeDasharray="201" strokeDashoffset={201 - (201 * (roommates[0].compatibilityScore || 0)) / 100} />
                          </svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-base mb-8 bg-surface-2 p-6 rounded-2xl border border-border">
                        <div className="flex items-center gap-3 text-text-secondary"><Moon className="w-5 h-5 text-text-muted" /> {roommates[0].lifestyle.sleepSchedule}</div>
                        <div className="flex items-center gap-3 text-text-secondary"><Sparkle className="w-5 h-5 text-text-muted" /> {roommates[0].lifestyle.cleanliness}</div>
                        <div className="flex items-center gap-3 text-text-secondary"><Users className="w-5 h-5 text-text-muted" /> {roommates[0].lifestyle.visitors}</div>
                        <div className="flex items-center gap-3 text-text-secondary"><Wallet className="w-5 h-5 text-text-muted" /> {(roommates[0].budget/1000000).toFixed(1)}tr/tháng</div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-bold text-sm text-text-primary mb-3 uppercase tracking-wider">Khu vực mong muốn</h4>
                        <div className="flex flex-wrap gap-2">
                          {roommates[0].preferredDistricts.map(d => (
                            <span key={d} className="bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-lg border border-primary/20">{d}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-border flex gap-4">
                        <button onClick={() => handleSkip(roommates[0].id)} className="flex-1 h-14 bg-surface-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-2xl flex items-center justify-center gap-2 transition-colors font-bold border border-border">
                          <X className="w-5 h-5" /> Bỏ qua
                        </button>
                        <button onClick={() => handleLike(roommates[0].id)} className="flex-1 h-14 bg-pink-50 text-pink-500 hover:bg-pink-100 rounded-2xl flex items-center justify-center gap-2 transition-colors font-bold border border-pink-100">
                          <Heart className="w-5 h-5" /> Quan tâm
                        </button>
                        <Link to="/tenant/chat" className="flex-1 h-14 bg-primary text-white hover:bg-primary-light rounded-2xl transition-colors flex justify-center items-center gap-2 font-bold shadow-brand">
                          <MessageSquare className="w-5 h-5" /> Nhắn tin
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl shadow-sm border border-border p-12 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mb-6">
                      <Sparkles className="w-10 h-10 text-text-muted" />
                    </div>
                    <h3 className="font-bold text-2xl text-text-primary mb-2">Đã xem hết danh sách</h3>
                    <p className="text-text-secondary mb-8">Vui lòng thay đổi tiêu chí hoặc quay lại sau để xem thêm gợi ý.</p>
                    <button onClick={() => setRoommates(mockTenants.filter(t => t.id !== 'tenant-001' && t.compatibilityScore))} className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light shadow-sm transition-all-custom">
                      Làm mới danh sách
                    </button>
                  </div>
                )}
              </div>

              {/* Cột phải: Danh sách quan tâm */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-3xl shadow-sm border border-border p-6 sticky top-24">
                  <h3 className="font-bold text-xl text-text-primary mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" /> Đã quan tâm
                  </h3>
                  
                  {likedRoommates.length > 0 ? (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                      {likedRoommates.map(liked => (
                        <div key={liked.id} className="flex gap-4 items-center p-3 rounded-2xl border border-border hover:bg-surface-2 transition-colors">
                          <img src={liked.image} alt={liked.name} className="w-14 h-14 rounded-full object-cover border border-border" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-text-primary truncate">{liked.name}</h4>
                            <p className="text-xs font-medium text-success mb-1">Hợp {liked.matchScore}%</p>
                            <Link to="/tenant/chat" className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" /> Nhắn tin
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-surface-2 rounded-2xl border border-border border-dashed">
                      <Heart className="w-10 h-10 text-text-muted mx-auto mb-3" />
                      <p className="text-sm text-text-secondary">Chưa có ai trong danh sách.<br/>Hãy thả tim người bạn thích nhé!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isLoadingMore && (
              <div className="flex flex-col items-center justify-center py-16">
                <RefreshCw className="w-10 h-10 text-primary animate-spin mb-4" />
                <h3 className="font-bold text-lg text-text-primary">Đang tìm kiếm thêm người phù hợp...</h3>
                <p className="text-text-secondary">Hệ thống đang mở rộng phạm vi tìm kiếm.</p>
              </div>
            )}
          </div>
        
      </div>
    </div>
  );
}
