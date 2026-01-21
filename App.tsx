
import React, { useState } from 'react';
import { SafetyBanner } from './components/SafetyBanner.js';
import { Header } from './components/Header.js';
import { Chat } from './components/Chat.js';
import { HowItWorks } from './components/HowItWorks.js';
import { AboutUs } from './components/AboutUs.js';
import { ContactUs } from './components/ContactUs.js';
import { AddListing } from './components/AddListing.js';
import { AdminSection } from './components/AdminSection.js';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'listing':
        return <AddListing />;
      case 'admin':
        return <AdminSection />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <header className="bg-gray-900 text-white relative overflow-hidden py-24 lg:py-32">
              {/* Background Overlay Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="grid grid-cols-12 h-full">
                  {[...Array(48)].map((_, i) => (
                    <div key={i} className="border-r border-b border-white h-24"></div>
                  ))}
                </div>
              </div>

              <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                  <div className="lg:w-1/2 space-y-8">
                    <div className="inline-flex items-center gap-2 bg-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-300"></span>
                      </span>
                      Active GTA Dispatch
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-black leading-tight tracking-tighter">
                      GTA Roof <br />
                      <span className="text-orange-500">Guard AI</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-xl leading-relaxed font-medium">
                      Toronto's premier emergency response network. Whether you need immediate 24/7 dispatch or a real-world cost projection, our neural agents provide instant resolution.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                      <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 flex items-center gap-6">
                        <div className="text-4xl font-black text-orange-500">20m</div>
                        <div className="text-[10px] uppercase font-black text-gray-400 leading-tight tracking-widest">Avg. Response<br/>Time Today</div>
                      </div>
                      <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 flex items-center gap-6">
                        <div className="text-4xl font-black text-orange-500">100%</div>
                        <div className="text-[10px] uppercase font-black text-gray-400 leading-tight tracking-widest">Vetted GTA<br/>Partners</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 w-full max-w-2xl mt-12 lg:mt-0">
                    <Chat />
                  </div>
                </div>
              </div>
            </header>

            {/* How It Works Section */}
            <HowItWorks />

            {/* Trust & Features */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 text-center lg:text-left">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mx-auto lg:mx-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Geo-Locked Precision</h3>
                    <p className="text-gray-600 font-medium">Strictly GTA-focused. We only dispatch crews with active licenses in Toronto, Mississauga, Vaughan, and surrounding areas.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mx-auto lg:mx-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Crisis Triage</h3>
                    <p className="text-gray-600 font-medium">Our AI identifies life-safety issues and power-line hazards first, ensuring you follow proper safety protocols before repairs begin.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mx-auto lg:mx-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Instant Mitigation</h3>
                    <p className="text-gray-600 font-medium">Immediate connection to "Tarp & Temporary Fix" specialists to stop water damage before it destroys your property.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-orange-500 selection:text-white">
      <SafetyBanner />
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Liability Footer */}
      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Legal & Safety Protocol Disclaimer</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              GTA Roof Guard is an AI-powered dispatch and estimation tool. While we recommend vetted 24/7 roofing professionals, any contracting, pricing, and service guarantees are strictly between the homeowner and the respective contractor. GTA Roof Guard does not perform repairs or provide insurance binding. <strong>NEVER CLIMB ONTO YOUR ROOF DURING A STORM.</strong> If you see fire or smoke, or if someone is injured, call 911 immediately.
            </p>
            <div className="pt-6 flex justify-center gap-6 border-t border-gray-50">
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Toronto, ON</span>
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Est. 2025</span>
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Licensed Network</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
