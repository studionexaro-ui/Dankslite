
import React from 'react';
import { EmailMessage } from '../types';

interface InboxProps {
  messages: EmailMessage[];
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
}

const Inbox: React.FC<InboxProps> = ({ messages, isOpen, onClose, onMarkRead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-slide-left rounded-l-[2rem]">
        <div className="p-8 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Authorized Inbox</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Danks lite Correspondence</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-50 rounded-2xl transition-colors">
            <i className="fa-solid fa-xmark text-xl text-gray-400"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <i className="fa-solid fa-envelope-open text-6xl mb-4"></i>
              <p className="font-bold">No messages yet</p>
            </div>
          ) : (
            messages.slice().reverse().map((msg) => (
              <div 
                key={msg.id} 
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${msg.read ? 'border-gray-100' : 'border-violet-200 shadow-lg shadow-violet-50'}`}
                onClick={() => onMarkRead(msg.id)}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${msg.type === 'AUTH' ? 'bg-violet-100 text-violet-600' : 'bg-green-100 text-green-600'}`}>
                      {msg.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <h3 className={`text-sm font-bold mb-3 ${msg.read ? 'text-gray-600' : 'text-gray-900'}`}>
                    {msg.subject}
                  </h3>
                  <div 
                    className="text-xs text-gray-500 prose max-h-40 overflow-y-auto scroll-hide border-t pt-4 mt-4"
                    dangerouslySetInnerHTML={{ __html: msg.body }}
                  />
                  {!msg.read && (
                    <div className="mt-4 flex items-center text-violet-600 text-[10px] font-bold uppercase">
                      <div className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-pulse mr-2"></div>
                      New Notification
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
