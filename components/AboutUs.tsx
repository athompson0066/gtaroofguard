
import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* About Hero Section */}
      <section className="bg-gray-900 text-white relative overflow-hidden py-24 lg:py-32">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-orange-600/30">
              The Unit Legacy
            </div>
            <h1 className="text-5xl lg:text-8xl font-black leading-tight tracking-tighter">
              Guardians of the <br />
              <span className="text-orange-500">Toronto Skyline</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
              We aren't just an app. We're a specialized response infrastructure dedicated to neutralizing property damage across the GTA.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {[
                { label: 'Network Size', val: '250+' },
                { label: 'Daily Audits', val: '1.2k' },
                { label: 'Coverage', val: '100%' },
                { label: 'Integrity', val: 'Vetted' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm group hover:border-orange-500/50 transition-colors">
                  <div className="text-2xl font-black text-white group-hover:text-orange-500 transition-colors">{stat.val}</div>
                  <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Content Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                  <span className="w-12 h-1 bg-orange-600 rounded-full"></span>
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  GTA Roof Guard was founded on a simple, non-negotiable premise: <strong>In a roofing emergency, every second counts.</strong>
                </p>
                <p className="text-gray-500 leading-relaxed">
                  When a storm hits or a leak springs, the panic of finding a reliable, available contractor can be overwhelming. We built our AI-powered dispatch system to cut through the noise, verify availability in real-time, and connect Greater Toronto Area homeowners with professionals who are ready to work 24/7.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 py-4">
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:bg-white hover:shadow-xl hover:border-orange-500 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-md mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <h4 className="font-black text-gray-900 text-lg mb-2">Vetted Network</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">We strictly audit our partners for active insurance, liability coverage, and local licensing compliance.</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:bg-white hover:shadow-xl hover:border-orange-500 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-md mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <h4 className="font-black text-gray-900 text-lg mb-2">Neural Triage</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Our dispatcher assesses severity and location in seconds, matching you with the closest active crew.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 sticky top-32">
              <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
                <h3 className="text-2xl font-black mb-6">Regional Domain</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
                  From the heart of downtown Toronto to the borders of Vaughan, Markham, and Mississauga, our network is strategically distributed.
                </p>
                <div className="space-y-4">
                  {['Toronto Core', 'Brampton / Mississauga', 'Vaughan / Richmond Hill', 'Etobicoke / Scarborough'].map((city, i) => (
                    <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-200 uppercase tracking-widest">{city}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
                   <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Response Guarantee</p>
                   <p className="text-sm font-medium">Sub-30 minute connection during peak emergency conditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight italic">
              "We provide the roof over your head, <br />
              <span className="text-orange-600 font-black">when the weather takes yours away."</span>
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Established 2025
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Toronto Headquartered
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
