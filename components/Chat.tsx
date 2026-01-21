
import React, { useState, useRef, useEffect } from 'react';
import { sendEmergencyMessage } from '../services/gemini.js';
import { ChatMessage, LocationState, Roofer } from '../types.js';
import { RooferResult } from './RooferResult.js';
import { CostEstimator } from './CostEstimator.js';

export const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dispatch' | 'estimator'>('dispatch');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "GTA Roof Guard unit active. Active leak? Tree on the roof? I'm here to dispatch vetted 24/7 roofing crews instantly. What is your location (Postal Code) and the severity of the damage?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LocationState>({});
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading, activeTab]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Location access denied", err)
      );
    }
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedInput,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendEmergencyMessage(trimmedInput, messages, location);
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
        roofers: response.roofers
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `Connection Issue: ${error.message || "Unable to reach dispatch center."} Please check your connection or call emergency services if you are in immediate danger.`,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (activeTab === 'estimator') {
    return (
      <div className="relative">
         <div className="absolute -top-12 left-0 right-0 flex justify-center gap-4 px-2">
            <button 
              onClick={() => setActiveTab('dispatch')}
              className="bg-gray-800 text-gray-400 px-6 py-2 rounded-t-xl text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all border-x border-t border-gray-700"
            >
              Emergency Dispatch
            </button>
            <button 
              className="bg-orange-600 text-white px-6 py-2 rounded-t-xl text-[10px] font-bold uppercase tracking-widest shadow-lg border-x border-t border-orange-500"
            >
              Cost Estimator
            </button>
        </div>
        <CostEstimator />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -top-12 left-0 right-0 flex justify-center gap-4 px-2">
          <button 
            className="bg-gray-900 text-white px-6 py-2 rounded-t-xl text-[10px] font-bold uppercase tracking-widest shadow-lg border-x border-t border-gray-800"
          >
            Emergency Dispatch
          </button>
          <button 
            onClick={() => setActiveTab('estimator')}
            className="bg-gray-800 text-gray-400 px-6 py-2 rounded-t-xl text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all border-x border-t border-gray-700"
          >
            Cost Estimator
          </button>
      </div>
      <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="bg-gray-900 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
              RG
            </div>
            <div>
              <h2 className="text-white font-bold leading-tight">Emergency Dispatch AI</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Unit Online - GTA Only</span>
              </div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-white text-[10px] font-mono opacity-50 uppercase">Secured Channel</span>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 scroll-smooth custom-scrollbar"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${
                msg.role === 'user' 
                  ? 'bg-orange-600 text-white rounded-2xl rounded-tr-none' 
                  : msg.role === 'system'
                    ? 'bg-red-50 text-red-800 border border-red-200 rounded-lg text-xs italic'
                    : 'bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm'
              } p-4`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content}
                </div>
                
                {msg.roofers && msg.roofers.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-[1px] flex-1 bg-gray-200"></div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Verified Dispatch Options</p>
                      <div className="h-[1px] flex-1 bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {msg.roofers.slice(0, 3).map((roofer, idx) => (
                        <RooferResult key={idx} roofer={roofer} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-gray-500 font-bold ml-1 italic">Locating nearest crews...</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              autoFocus
              placeholder="Type your Postal Code or 'Roof Leak'..."
              className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border-2 border-transparent focus:border-orange-500 focus:bg-white focus:ring-0 text-sm text-gray-900 transition-all outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? '...' : 'SEND'}
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 px-1">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">
              Emergency Triage Protocol v2.5
            </p>
            <p className="text-[9px] text-gray-400 font-bold italic">
              {location.lat ? 'GPS Active' : 'Manual Location Mode'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
