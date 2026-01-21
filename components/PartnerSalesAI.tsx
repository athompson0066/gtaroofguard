
import React, { useState, useRef, useEffect } from 'react';
import { engagePartnerSales } from '../services/gemini';
import { ChatMessage } from '../types';

/**
 * A lightweight Markdown component to render basic formatting from the Sales Agent.
 * Handles: ### headers, **bold**, and bullet points.
 */
const MarkdownLite: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  
  return (
    <div className="space-y-4">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;

        // Header Check
        if (trimmed.startsWith('###')) {
          return (
            <h3 key={i} className="text-lg font-black text-orange-500 mt-6 mb-2 tracking-tight uppercase">
              {trimmed.replace(/^###\s?/, '')}
            </h3>
          );
        }

        // List Check
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const content = trimmed.substring(2);
          return (
            <div key={i} className="flex gap-3 pl-4 group">
              <span className="text-orange-600 font-bold">•</span>
              <p className="text-sm text-gray-300 font-medium">
                {parseBold(content)}
              </p>
            </div>
          );
        }

        return (
          <p key={i} className="text-sm leading-relaxed text-gray-300">
            {parseBold(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

// Simple helper to parse **bold** text into React elements
function parseBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-orange-400 font-black tracking-tight">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export const PartnerSalesAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "### Welcome to the Inner Circle\n\nI'm Marcus, your **Senior Growth Consultant**. You're here because you run one of the best crews in the GTA and you're ready for high-margin, **pre-triaged emergency volume**.\n\nAsk me about our dispatch protocol, your specific territory ROI, or how we verify jobs before they hit your desk.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await engagePartnerSales(userMsg.content, messages);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: "Our neural sales network is currently under maintenance. Please proceed to the vetting form below.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden flex flex-col h-[550px] ring-1 ring-white/5 relative">
      {/* Sales Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-700 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl ring-2 ring-white/10">
            M
          </div>
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest">Marcus | Senior Consultant</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">Live Partnership Analysis</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
           <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">B2B Verified</p>
        </div>
      </div>

      {/* Chat History */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-900 custom-scrollbar relative"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`relative max-w-[90%] p-6 rounded-[2rem] ${
              msg.role === 'user' 
                ? 'bg-orange-600 text-white rounded-tr-none shadow-xl border border-orange-500' 
                : msg.role === 'system'
                  ? 'bg-red-900/20 text-red-400 border border-red-900/50 text-xs italic'
                  : 'bg-gray-800/40 text-gray-200 rounded-tl-none border border-gray-700/50 shadow-inner backdrop-blur-sm'
            }`}>
              {msg.role === 'assistant' && (
                <div className="absolute -left-12 top-0">
                   <div className="w-8 h-8 bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center text-orange-500 text-[10px] font-black">AI</div>
                </div>
              )}
              
              {msg.role === 'assistant' ? (
                <MarkdownLite text={msg.content} />
              ) : (
                <p className="text-sm leading-relaxed font-bold">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl rounded-tl-none p-6 flex flex-col gap-3 backdrop-blur-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Synthesizing Market ROI...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} className="p-6 bg-gray-900 border-t border-gray-800 relative z-10">
        <div className="flex gap-3">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask Marcus: 'What is the margin on a leak repair?'"
            className="flex-1 bg-gray-800 border-2 border-gray-700 rounded-2xl px-6 py-4 text-sm text-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-gray-600 font-medium"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-500 disabled:opacity-50 transition-all active:scale-95 shadow-2xl flex items-center gap-2"
          >
            ENGAGE
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </button>
        </div>
      </form>
    </div>
  );
};
