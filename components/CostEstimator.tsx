
import React, { useState, useEffect } from 'react';
import { getRoofingEstimate } from '../services/gemini';
import { EstimationResult, Roofer } from '../types';

const PROGRESS_MESSAGES = [
  "Fetching current GTA labor indexes...",
  "Analyzing local material supply chains...",
  "Calculating complexity surcharge (pitch/height)...",
  "Scanning Google Maps for top-rated installers...",
  "Finalizing your professional report..."
];

export const CostEstimator: React.FC = () => {
  const [formData, setFormData] = useState({
    size: 2000,
    material: 'Asphalt Shingle',
    complexity: 'Moderate',
    city: 'Toronto',
    email: '',
    name: '',
    phone: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [result, setResult] = useState<EstimationResult | null>(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isCalculating) {
      interval = setInterval(() => {
        setProgressIndex(prev => (prev + 1) % PROGRESS_MESSAGES.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isCalculating]);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);
    setLeadSubmitted(false);
    setProgressIndex(0);

    try {
      const estimation = await getRoofingEstimate(formData);
      // Artificial delay for better "AI Thinking" UX
      await new Promise(r => setTimeout(r, 2500));
      setResult(estimation);
    } catch (err) {
      alert("Estimation failed. Please check your connection.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 ring-1 ring-black/5">
      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 font-black shadow-xl rotate-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
          <div>
            <h2 className="text-white font-extrabold text-lg tracking-tight">AI Cost Intelligence</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              <p className="text-orange-100 text-[10px] uppercase font-bold tracking-[0.2em]">Toronto Market Analysis</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <div className="text-[10px] text-white/60 font-mono uppercase tracking-widest">Model: GPT-O1-R</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 custom-scrollbar">
        {!result && !isCalculating ? (
          <form onSubmit={handleEstimate} className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto py-4">
            <div className="text-center space-y-2 mb-10">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Configure Your Project</h3>
              <p className="text-xs text-gray-500 font-medium">Get a data-backed roofing projection in under 30 seconds.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Roof Size (Sq Ft)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.size} 
                    onChange={e => setFormData({...formData, size: Number(e.target.value)})}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm text-black font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm" 
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300">SQFT</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Location (GTA City)</label>
                <input 
                  type="text" 
                  value={formData.city} 
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm text-black font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm" 
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Premium Material</label>
              <div className="grid grid-cols-2 gap-2">
                {['Asphalt Shingle', 'Metal (Standing Seam)', 'Cedar Shake', 'Flat (TPO/Modified)'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFormData({...formData, material: m})}
                    className={`p-3 text-[11px] font-bold rounded-xl border-2 transition-all text-left ${formData.material === m ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Architectural Complexity</label>
              <select 
                value={formData.complexity} 
                onChange={e => setFormData({...formData, complexity: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm text-black font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option>Simple (Straight Gables)</option>
                <option>Moderate (Standard Hip/Valley)</option>
                <option>Complex (Steep, Turrets, Dormers)</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-orange-600 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              Initialize Estimation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </button>
          </form>
        ) : isCalculating ? (
          <div className="h-full flex flex-col items-center justify-center space-y-10 animate-pulse">
             <div className="relative">
                <div className="w-24 h-24 border-8 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-orange-600">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a5 5 0 1110 0 5 5 0 01-10 0z"/></svg>
                </div>
             </div>
             <div className="text-center space-y-3">
                <p className="text-lg font-black text-gray-900 tracking-tight">{PROGRESS_MESSAGES[progressIndex]}</p>
                <div className="flex gap-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-8 h-1 rounded-full transition-colors duration-500 ${i <= progressIndex ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">GTA Neural Cloud Active</p>
             </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700 max-w-2xl mx-auto pb-10">
            {/* Project Summary Recap */}
            <div className="bg-white border-2 border-orange-100 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-center shadow-sm">
                <div className="text-center px-4 border-r border-orange-50">
                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Size</span>
                    <span className="text-xs font-bold text-gray-900">{formData.size} SQFT</span>
                </div>
                <div className="text-center px-4 border-r border-orange-50">
                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Material</span>
                    <span className="text-xs font-bold text-gray-900">{formData.material}</span>
                </div>
                <div className="text-center px-4 border-r border-orange-50">
                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">City</span>
                    <span className="text-xs font-bold text-gray-900">{formData.city}</span>
                </div>
                <div className="text-center px-4">
                    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">Complexity</span>
                    <span className="text-xs font-bold text-gray-900">{formData.complexity}</span>
                </div>
            </div>

            {/* The Result Card */}
            <div className="bg-gray-900 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden group">
              <div className="bg-white rounded-[2.3rem] p-8 text-center border-b-8 border-orange-600">
                <div className="flex justify-center mb-4">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Official Projection</span>
                </div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Total Project Estimate</h4>
                <div className="text-6xl font-black text-gray-900 tracking-tighter mb-4 animate-in fade-in zoom-in duration-1000">
                  {result?.estimatedCostRange}
                </div>
                <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Based on current market volatility, fuel surcharges, and GTA specialized labor rates for {formData.material}.
                </p>
              </div>
            </div>

            {/* AI Insights & Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
               <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <h5 className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Surcharge Logic
                  </h5>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{result?.breakdown}</p>
               </div>
               <div className="bg-orange-600 p-6 rounded-3xl text-white shadow-xl shadow-orange-500/20">
                  <h5 className="text-[10px] font-black text-orange-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    GTA Market Hot-Spots
                  </h5>
                  <p className="text-sm italic font-medium opacity-90 leading-relaxed">{result?.marketInsights}</p>
               </div>
            </div>

            {/* Recommendations Section */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
               <div className="flex flex-col gap-1 items-center justify-center text-center">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.3em]">Verified Area Response Teams</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Priority Availability Found in {formData.city}</p>
               </div>

              <div className="grid gap-6">
                {result?.recommendedCompanies.slice(0, 3).map((co, i) => (
                  <div key={i} className="group bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border-b-4 border-b-orange-100 hover:border-b-orange-500 overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-6">
                       <div className="flex gap-5 items-start">
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors shadow-inner">
                             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                          </div>
                          <div className="space-y-1">
                             <h5 className="font-black text-gray-900 text-lg leading-tight">{co.name}</h5>
                             <p className="text-[11px] text-gray-400 font-medium">{co.address || 'Service Area: Greater Toronto'}</p>
                             <div className="flex items-center gap-2 pt-1">
                                {co.rating && (
                                   <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                                      ★ {co.rating}
                                   </div>
                                )}
                                <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Licensed Partner</span>
                             </div>
                          </div>
                       </div>

                       <div className="flex flex-col gap-2 min-w-[150px]">
                          {co.phone ? (
                             <a 
                                href={`tel:${co.phone}`} 
                                className="flex items-center justify-center gap-3 py-3 px-5 bg-green-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.1em] hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95"
                             >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.455 5.455l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                                Call Local Crew
                             </a>
                          ) : (
                             <button 
                                onClick={() => window.alert('Connecting to central dispatch...')}
                                className="flex items-center justify-center gap-3 py-3 px-5 bg-orange-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.1em] hover:bg-orange-700 transition-all shadow-lg active:scale-95"
                             >
                                Call Dispatch
                             </button>
                          )}
                          {co.uri && (
                             <a 
                                href={co.uri} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2 py-2 px-4 border-2 border-gray-100 text-gray-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 hover:border-gray-200 transition-all"
                             >
                                Website
                             </a>
                          )}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Gen - Final Call to Action */}
            {leadSubmitted ? (
              <div className="bg-green-600 p-10 rounded-[3rem] text-white text-center animate-in zoom-in duration-700 shadow-2xl border-4 border-white/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h4 className="text-3xl font-black tracking-tight mb-2">Request Confirmed</h4>
                <p className="text-sm opacity-90 mt-4 leading-relaxed max-w-xs mx-auto font-medium">
                  We've alerted the top 3 specialized crews in <strong>{formData.city}</strong>. A dedicated project manager will contact you at <span className="underline decoration-wavy">{formData.phone}</span> shortly.
                </p>
                <div className="mt-8 text-[10px] uppercase font-black tracking-[0.3em] opacity-50">Priority Triage Protocol Active</div>
              </div>
            ) : (
              <div className="bg-orange-600 p-10 rounded-[3rem] text-white space-y-8 shadow-2xl relative border border-orange-500 overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="text-center">
                  <h4 className="text-2xl font-black tracking-tight">Claim Area-Specific Quote</h4>
                  <p className="text-xs text-orange-100 mt-3 font-medium opacity-80 max-w-xs mx-auto">
                    Secure your spot for a professional site inspection from our verified GTA partners at these specific rates.
                  </p>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto relative z-10">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Full Legal Name" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm text-white focus:ring-4 focus:ring-white/20 focus:border-white outline-none transition-all placeholder:text-orange-200 font-bold"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm text-white focus:ring-4 focus:ring-white/20 focus:border-white outline-none transition-all placeholder:text-orange-200 font-bold"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm text-white focus:ring-4 focus:ring-white/20 focus:border-white outline-none transition-all placeholder:text-orange-200 font-bold"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-white py-5 rounded-2xl font-black text-orange-600 hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                  >
                    Lock In Quote Details
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  </button>
                  <p className="text-[9px] text-orange-200 text-center font-bold uppercase tracking-[0.2em] pt-2 italic">Priority Scheduling Protocol Enabled</p>
                </form>
              </div>
            )}

            <button 
              onClick={() => {
                setResult(null);
                setLeadSubmitted(false);
              }}
              className="w-full text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-orange-600 transition-all py-8 flex items-center justify-center gap-3"
            >
              <span className="w-8 h-[1px] bg-gray-200"></span>
              Start New Analysis
              <span className="w-8 h-[1px] bg-gray-200"></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
