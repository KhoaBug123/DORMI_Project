import { useState } from 'react';
import { Send, Search, MoreVertical, Image as ImageIcon, Smile, Paperclip } from 'lucide-react';

export default function LandlordChat() {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');

  const contacts = [
    { id: 1, name: 'Nguyễn Văn Khoa', lastMsg: 'Dạ, anh cho em hỏi phòng số 3...', time: '10:30', unread: 2, online: true, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Trần Thị Mai', lastMsg: 'Cảm ơn anh ạ.', time: 'Hôm qua', unread: 0, online: false, avatar: 'https://i.pravatar.cc/150?u=2' },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-surface animate-fade-in-up">
      {/* Sidebar - Danh sách chat */}
      <div className="w-[350px] border-r border-border bg-white flex flex-col h-full flex-shrink-0">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary mb-4">Tin nhắn (Chủ trọ)</h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tin nhắn..." 
              className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-transparent focus:border-primary focus:bg-white rounded-lg text-sm outline-none transition-all-custom"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-l-2 ${activeChat === contact.id ? 'bg-primary/5 border-primary' : 'border-transparent hover:bg-surface-2'}`}
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-semibold truncate ${activeChat === contact.id ? 'text-primary' : 'text-text-primary'}`}>{contact.name}</h3>
                  <span className="text-xs text-text-muted flex-shrink-0 ml-2">{contact.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-sm truncate ${contact.unread ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>{contact.lastMsg}</p>
                  {contact.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 ml-2">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#F8FAFC]">
        {/* Header */}
        <div className="h-16 px-6 border-b border-border bg-white flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <img src={contacts[0].avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-bold text-text-primary">{contacts[0].name}</h3>
              <p className="text-xs text-success font-medium">Đang hoạt động</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-full transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-center">
            <span className="text-xs font-medium text-text-muted bg-surface-2 px-3 py-1 rounded-full border border-border">Hôm nay</span>
          </div>
          
          <div className="flex gap-3 max-w-[80%]">
            <img src={contacts[0].avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1" />
            <div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-border text-text-primary text-sm">
                Dạ, anh cho em hỏi phòng số 3 ở cơ sở Quận 10 còn trống không ạ?
              </div>
              <span className="text-[11px] text-text-muted mt-1 ml-1 block">10:30</span>
            </div>
          </div>

          <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-1 shadow-sm">
              CT
            </div>
            <div>
              <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm">
                Chào em, phòng đó hiện tại vẫn còn trống nhé. Em muốn qua xem phòng lúc nào?
              </div>
              <span className="text-[11px] text-text-muted mt-1 mr-1 block text-right">10:35</span>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-border">
          <div className="flex items-end gap-2 bg-surface-2 p-2 rounded-xl border border-border focus-within:border-primary focus-within:bg-white transition-colors shadow-sm">
            <button className="p-2 text-text-secondary hover:text-primary transition-colors"><Smile className="w-5 h-5" /></button>
            <button className="p-2 text-text-secondary hover:text-primary transition-colors"><Paperclip className="w-5 h-5" /></button>
            <button className="p-2 text-text-secondary hover:text-primary transition-colors"><ImageIcon className="w-5 h-5" /></button>
            
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[40px] py-2 text-sm text-text-primary"
              rows={1}
            />
            
            <button 
              className={`p-2 rounded-lg transition-colors flex-shrink-0 mb-0.5 ${message.trim() ? 'bg-primary text-white shadow-sm hover:bg-primary-light' : 'bg-surface-3 text-text-muted'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
