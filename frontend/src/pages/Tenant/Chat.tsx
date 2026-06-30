import { useState } from 'react';
import { mockConversations } from '../../data/mockData';
import { Search, Send, MoreVertical, Image as ImageIcon, Smile, Paperclip, MessageSquare } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function TenantChat() {
  const { user } = useAuthStore();
  const [activeConvId, setActiveConvId] = useState(mockConversations[0]?.id);
  const [msgInput, setMsgInput] = useState('');

  const activeConv = mockConversations.find(c => c.id === activeConvId);
  const otherParticipant = activeConv?.participants.find(p => p.id !== user?.id);

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-surface">
      {/* Inbox List (Left Sidebar) */}
      <div className="w-full md:w-[320px] lg:w-[380px] border-r border-border bg-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary mb-4">Tin nhắn</h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Tìm kiếm người liên hệ..." 
              className="w-full bg-surface-3 border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockConversations.map(conv => {
            const other = conv.participants.find(p => p.id !== user?.id);
            const isActive = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full text-left p-4 border-b border-border hover:bg-surface-2 transition-colors flex gap-3 ${isActive ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="relative">
                  <img src={other?.avatar} className="w-12 h-12 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-text-primary text-sm line-clamp-1">{other?.name}</h3>
                    <span className="text-xs text-text-muted flex-shrink-0">
                      {new Date(conv.lastMessage.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-1 line-clamp-1">{conv.relatedRoom.title}</p>
                  <p className={`text-sm line-clamp-1 ${conv.unreadCount > 0 ? 'font-bold text-text-primary' : 'text-text-secondary'}`}>
                    {conv.lastMessage.senderId === user?.id ? 'Bạn: ' : ''}{conv.lastMessage.content}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-error text-white text-xs font-bold flex items-center justify-center self-center flex-shrink-0">
                    {conv.unreadCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Window (Right Panel) */}
      {activeConv ? (
        <div className="hidden md:flex flex-1 flex-col bg-surface-2">
          {/* Header */}
          <div className="h-[72px] bg-white border-b border-border px-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <img src={otherParticipant?.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-text-primary">{otherParticipant?.name}</h3>
                <p className="text-xs text-success font-medium">Đang hoạt động</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-text-muted">
              <button className="p-2 hover:bg-surface-3 rounded-full transition-colors"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Related Room Banner */}
          <div className="bg-primary/10 border-b border-primary/20 p-3 px-6 flex justify-between items-center text-sm">
            <span className="text-primary font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Bạn đang trao đổi về: {activeConv.relatedRoom.title}
            </span>
            <a href={`/tenant/explore/${activeConv.relatedRoom.id}`} className="text-primary font-bold hover:underline">Xem phòng</a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeConv.messages.map(msg => {
              const isMe = msg.senderId === user?.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && (
                    <img src={otherParticipant?.avatar} className="w-8 h-8 rounded-full object-cover mr-3 self-end" />
                  )}
                  <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${isMe ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-border text-text-primary rounded-bl-none shadow-sm'}`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    <p className={`text-[10px] mt-2 ${isMe ? 'text-white/70 text-right' : 'text-text-muted'}`}>
                      {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-border p-4 px-6 flex items-center gap-3">
            <button className="p-2 text-text-muted hover:text-primary transition-colors"><Paperclip className="w-5 h-5" /></button>
            <button className="p-2 text-text-muted hover:text-primary transition-colors"><ImageIcon className="w-5 h-5" /></button>
            <button className="p-2 text-text-muted hover:text-primary transition-colors"><Smile className="w-5 h-5" /></button>
            
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Nhập tin nhắn..." 
                className="w-full bg-surface-3 border border-border rounded-full px-6 py-3 outline-none focus:border-primary transition-colors pr-12"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && msgInput.trim()) {
                    setMsgInput('');
                  }
                }}
              />
              <button 
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${msgInput.trim() ? 'bg-primary text-white' : 'text-text-muted hover:bg-surface-2'}`}
                onClick={() => {
                  if (msgInput.trim()) setMsgInput('');
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-surface-2 text-text-muted flex-col">
          <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
          <p className="font-medium">Chọn một cuộc hội thoại để bắt đầu nhắn tin</p>
        </div>
      )}
    </div>
  );
}
