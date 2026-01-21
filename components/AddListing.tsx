
import React, { useState, useEffect } from 'react';
import { ListingStrategy } from '../types';
import { PartnerSalesAI } from './PartnerSalesAI';

const DEFAULT_STRATEGY: ListingStrategy = {
  marketingCopy: "The Future of GTA Emergency Roofing is Here. Join the elite network providing 24/7 relief.",
  marketingStrategy: "• Dominant local SEO presence\n• Pre-triaged emergency leads\n• Brand association with GTA Roof Guard",
  pricingOptions: [
    { tier: "Essential", price: "$49", features: ["Basic SEO Listing", "Emergency Lead Notifications", "Standard Support"] },
    { tier: "Professional", price: "$149", features: ["Priority Dispatching", "Vetted Badge", "Advanced Analytics", "24/7 Support"] },
    { tier: "Elite", price: "$399", features: ["Exclusive City Territory", "Dedicated Account Manager", "Custom Marketing Kit", "Unlimited Lead Routing"] }
  ]
};

export const AddListing: React.FC = () => {
  const [strategy, setStrategy] = useState<ListingStrategy>(DEFAULT_STRATEGY);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    address: '',
    city: '',
    email: '',
    phone: '',
    license: '',
    years: '5',
    specialties: [] as string[],
    is247: true,
    hasInsurance: false,
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'complete'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('gta_roof_guard_strategy');
    if (saved) {
      try { setStrategy(JSON.parse(saved)); } catch (e) { console.error("Strategy load error", e); }
    }
  }, []);

  const handleOpenVetting = (tier: any) => {
    setSelectedTier(tier);
    setCurrentStep(1);
    setShowModal(true);
  };

  const finalizePartnership = async () => {
    setIsSubmitting(true);
    setSyncStatus('syncing');

    // Simulate AI Vetting and Payment
    await new Promise(r => setTimeout(r, 2000));

    // Data Sync Logic
    const sheetLink = localStorage.getItem('gta_roof_guard_sheet');
    const webhookUrl = localStorage.getItem('gta_roof_guard_webhook');
    
    if (sheetLink) {
      console.log(`[SYNC] Exporting ${formData.name} data to Google Sheet: ${sheetLink}`);
    }
    if (webhookUrl) {
      console.log(`[SYNC] Triggering Webhook for new Elite Partner: ${webhookUrl}`);
    }

    setSyncStatus('complete');
    setIsSubmitting(false);

    alert(`Success! Vetting Protocol Complete for ${formData.name}.\n\nAI Status: Verified\nTier: ${selectedTier.tier}\nData Sync: ${sheetLink ? 'Pushed to Google Sheets' : 'Local Only'}`);
    
    setShowModal(false);
    setCurrentStep(1);
    setSyncStatus('idle');
    setFormData({
      name: '', website: '', address: '', city: '', email: '', phone: '',
      license: '', years: '5', specialties: [], is247: true, hasInsurance: false
    });
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const toggleSpecialty = (s: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(s) 
        ? prev.specialties.filter(item => item !== s) 
        : [...prev.specialties, s]
    }));
  };

  return (
    <div className="bg-white min-h-screen py-20 font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Sales Agent Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
              Contractor Growth Portal
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tighter">
              Stop Chasing Leads. <br />
              <span className="text-orange-600">Start Dominating.</span>
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-xl">
              Our AI doesn't just find roof leaks; it vets the homeowners, assesses the damage, and dispatches you to high-margin emergency jobs instantly. 
            </p>
            <div className="flex gap-4">
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl">
                 <div className="text-2xl font-black text-orange-600">3x</div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Margin Increase</div>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl">
                 <div className="text-2xl font-black text-orange-600">0%</div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wasted Leads</div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <PartnerSalesAI />
          </div>
        </div>

        <div className="text-center mb-20 space-y-6">
          <div className="h-[1px] w-full bg-gray-100 mb-10"></div>
          <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Vetting Protocol</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Official Network <span className="text-orange-500">Subscription</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium italic">"{strategy.marketingCopy}"</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-xs">01</span>
                Partner Strategy Roadmap
              </h3>
              <div className="space-y-6">
                {strategy.marketingStrategy.split('\n').map((point, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-6 h-6 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center text-orange-600 text-[10px] font-black shrink-0 transition-colors group-hover:bg-orange-500 group-hover:text-white">✓</div>
                    <p className="text-gray-700 font-bold text-sm tracking-tight">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative border border-gray-800">
              <h3 className="text-2xl font-black mb-4">Neural Dispatch Advantage</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">Our AI-driven triage system ensures you only get the leads that matter.</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l-4 border-orange-600 pl-6 space-y-1"><div className="text-4xl font-black text-white">14k+</div><div className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em]">Monthly Inquiries</div></div>
                <div className="border-l-4 border-orange-600 pl-6 space-y-1"><div className="text-4xl font-black text-white">15m</div><div className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em]">Response Sync</div></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2"><span className="w-10 h-[1px] bg-gray-200"></span>Select Membership Level</h3>
            <div className="space-y-4">
              {strategy.pricingOptions.map((tier, idx) => (
                <div key={idx} className={`bg-white border-2 rounded-3xl p-8 transition-all group hover:border-orange-500 ${selectedTier?.tier === tier.tier ? 'border-orange-600 ring-4 ring-orange-500/10 shadow-2xl scale-[1.02]' : 'border-gray-100 shadow-sm'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <div><h4 className="text-xl font-black text-gray-900 tracking-tight">{tier.tier}</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Network Access Plan</p></div>
                    <div className="text-right"><div className="text-3xl font-black text-orange-600">{tier.price}</div><div className="text-[10px] text-gray-400 font-bold uppercase">per month</div></div>
                  </div>
                  <ul className="grid grid-cols-1 gap-3 mb-8">
                    {tier.features.map((f, i) => (
                      <li key={i} className="text-[11px] font-bold text-gray-600 flex items-center gap-3"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>{f}</li>
                    ))}
                  </ul>
                  <button onClick={() => handleOpenVetting(tier)} className="w-full bg-gray-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95 group-hover:-translate-y-1">Partner with {tier.tier}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/90 backdrop-blur-md">
            <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="bg-gray-900 p-8 border-b border-gray-800">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <h3 className="text-white font-black text-lg tracking-tight">Contractor Vetting Protocol</h3>
                       <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">Step {currentStep} of 4</p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">✕</button>
                 </div>
                 <div className="flex gap-2">
                    {[1, 2, 3, 4].map(step => (<div key={step} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step <= currentStep ? 'bg-orange-500' : 'bg-gray-800'}`}></div>))}
                 </div>
              </div>

              <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight text-center">Entity Identification</h4>
                    <div className="grid gap-5">
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="Legal Company Name" />
                      <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="Website URL" />
                      <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="Address" />
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight text-center">Capabilities Profile</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                       {['Asphalt', 'Metal', 'Cedar', 'Slate', 'Flat/TPO', 'Copper'].map(s => (
                          <button key={s} onClick={() => toggleSpecialty(s)} className={`px-4 py-3 rounded-xl text-[11px] font-bold border-2 transition-all ${formData.specialties.includes(s) ? 'bg-orange-600 border-orange-600 text-white' : 'bg-white border-gray-100 text-gray-500'}`}>{s}</button>
                       ))}
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-8 text-center">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">Trust & Safety Vetting</h4>
                    <input type="text" value={formData.license} onChange={e => setFormData({...formData, license: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="Business License #" />
                    <div onClick={() => setFormData({...formData, hasInsurance: !formData.hasInsurance})} className={`p-6 rounded-3xl border-2 cursor-pointer flex gap-4 ${formData.hasInsurance ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-100'}`}>
                       <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${formData.hasInsurance ? 'bg-green-600 text-white' : 'bg-white'}`}>{formData.hasInsurance && '✓'}</div>
                       <div className="text-left"><p className="text-sm font-black text-gray-900">Proof of Insurance ($2M+)</p></div>
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight text-center">Final Sync</h4>
                    <div className="bg-gray-900 rounded-[2rem] p-8 text-white space-y-4">
                       <div className="flex justify-between items-center pb-4 border-b border-gray-800"><span className="text-[10px] uppercase text-gray-500">Tier</span><span className="font-bold text-orange-500">{selectedTier.tier}</span></div>
                       <div className="flex justify-between items-center"><span className="text-[10px] uppercase text-gray-500">Target</span><span className="font-bold">{formData.name}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="Admin Email" />
                       <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="Dispatch #" />
                    </div>
                    <div className="bg-blue-50 p-6 rounded-[2rem] border-2 border-blue-100 text-center">
                       {syncStatus === 'syncing' ? (
                          <div className="space-y-4">
                             <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                             <p className="text-xs font-black text-orange-600 uppercase tracking-widest animate-pulse">Syncing to Google Sheets Lead Database...</p>
                          </div>
                       ) : (
                          <>
                             <span className="text-blue-700 font-black italic text-2xl tracking-tighter">PayPal</span>
                             <button onClick={finalizePartnership} disabled={isSubmitting || !formData.email || !formData.phone} className="w-full bg-[#0070ba] text-white py-4 rounded-2xl font-black text-lg mt-4 shadow-xl active:scale-95 disabled:opacity-50">Complete Authorization</button>
                          </>
                       )}
                    </div>
                  </div>
                )}

                <div className="mt-12 flex justify-between gap-4 pt-8 border-t border-gray-100">
                  {currentStep > 1 && <button onClick={prevStep} className="px-8 py-4 rounded-2xl text-xs font-black uppercase text-gray-400">Back</button>}
                  {currentStep < 4 ? <button onClick={nextStep} disabled={currentStep === 1 && !formData.name} className="flex-1 bg-gray-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all">Continue</button> : <div className="flex-1"></div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
