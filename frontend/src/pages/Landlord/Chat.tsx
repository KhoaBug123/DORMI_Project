import { useState, useRef, useEffect } from 'react';
import { Send, Search, MoreVertical, Image as ImageIcon, Smile, Paperclip, Hand } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function LandlordChat() {
  const { user } = useAuthStore();
  const { messages, sendMessage } = useStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Khởi tạo danh sách người thuê đã nhắn tin (Mock data)
  const contacts = [
    { id: 'tenant-001', name: 'Nguyễn Minh Khoa', role: 'Tenant', online: true, avatar: 'https://i.pravatar.cc/200?img=52' },
    { id: 'u3', name: 'Trần Thị Mai', role: 'Tenant', online: false, avatar: 'https://i.pravatar.cc/150?u=2' },
  ];

  const [selectedContactId, setSelectedContactId] = useState(contacts[0].id);
  const selectedContact = contacts.find(c => c.id === selectedContactId) || contacts[0];

  const chatMessages = messages.filter(m =>
    (m.senderId === user?.id && m.receiverId === selectedContact?.id) ||
    (m.senderId === selectedContact?.id && m.receiverId === user?.id)
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim() || !selectedContact || !user) return;
    sendMessage(user.id, selectedContact.id, inputText);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
          {contacts.map(contact => {
            const isSelectedFixed = selectedContactId === contact.id;
            
            // Lấy tin nhắn cuối cùng với contact này
            const contactMessages = messages.filter(m =>
              (m.senderId === user?.id && m.receiverId === contact.id) ||
              (m.senderId === contact.id && m.receiverId === user?.id)
            );
            const lastMessage = contactMessages.length > 0 ? contactMessages[contactMessages.length - 1].text : 'Chưa có tin nhắn';

            return (
              <div 
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-l-2 ${isSelectedFixed ? 'bg-primary/5 border-primary' : 'border-transparent hover:bg-surface-2'}`}
              >
                <div className="relative">
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                  {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`font-semibold truncate ${isSelectedFixed ? 'text-primary' : 'text-text-primary'}`}>{contact.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-sm truncate text-text-secondary`}>{lastMessage}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#F8FAFC]">
        {/* Header */}
        <div className="h-16 px-6 border-b border-border bg-white flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            <img src={selectedContact.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-bold text-text-primary">{selectedContact.name}</h3>
              <p className="text-xs text-success font-medium">{selectedContact.online ? 'Đang hoạt động' : 'Ngoại tuyến'}</p>
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

          {chatMessages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 mt-20">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-500 mb-4">
                <Hand size={32} />
              </div>
              <p>Hãy gửi lời chào đến {selectedContact.name}!</p>
            </div>
          )}
          
          {chatMessages.map(msg => {
            const isMe = msg.senderId === user?.id;
            return (
              <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                {!isMe && (
                  <img src={selectedContact.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1" />
                )}
                {isMe && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-1 shadow-sm">
                    {user?.name?.charAt(0) || 'CT'}
                  </div>
                )}
                <div>
                  <div className={`${isMe ? 'bg-primary text-white rounded-2xl rounded-tr-none' : 'bg-white text-text-primary rounded-2xl rounded-tl-none border border-border'} p-3 shadow-sm text-sm whitespace-pre-wrap`}>
                    {msg.text}
                  </div>
                  <span className={`text-[11px] text-text-muted mt-1 block ${isMe ? 'mr-1 text-right' : 'ml-1'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-border">
          <div className="flex items-end gap-2 bg-surface-2 p-2 rounded-xl border border-border focus-within:border-primary focus-within:bg-white transition-colors shadow-sm">
            <button className="p-2 text-text-secondary hover:text-primary transition-colors"><Smile className="w-5 h-5" /></button>
            <button className="p-2 text-text-secondary hover:text-primary transition-colors"><Paperclip className="w-5 h-5" /></button>
            <button className="p-2 text-text-secondary hover:text-primary transition-colors"><ImageIcon className="w-5 h-5" /></button>
            
            <textarea 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[40px] py-2 text-sm text-text-primary"
              rows={1}
            />
            
            <button 
              onClick={handleSend}
              className={`p-2 rounded-lg transition-colors flex-shrink-0 mb-0.5 ${inputText.trim() ? 'bg-primary text-white shadow-sm hover:bg-primary-light' : 'bg-surface-3 text-text-muted'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
