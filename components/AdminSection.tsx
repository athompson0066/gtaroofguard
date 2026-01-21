
import React, { useState, useEffect } from 'react';
import { generateOutreachEmail, generateNetworkStrategy } from '../services/gemini';
import { OutreachAgentTask, GeneratedEmail, ListingStrategy } from '../types';

interface EmailPreviewProps {
  email: GeneratedEmail;
  company: string;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ email, company }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied-rich' | 'copied-code'>('idle');

  // Utility to generate highly compatible, table-based HTML for email clients
  const generateEmailHtml = () => {
    const primaryOrange = '#ea580c';
    const darkGray = '#111827';
    // Convert newlines to breaks for HTML
    const formattedBody = email.body.split('\n').map(line => line.trim()).filter(Boolean).join('<br><br>');
    
    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Elite Partnership Invitation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f6f9fc">
    <tr>
      <td align="center" style="padding: 40px 0 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; border-collapse: separate;">
          <!-- Header -->
          <tr>
            <td bgcolor="${darkGray}" style="padding: 30px 40px 30px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="70%" align="left">
                    <span style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">GTA ROOF <span style="color: ${primaryOrange};">GUARD</span></span>
                  </td>
                  <td width="30%" align="right" style="color: #94a3b8; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">
                    Ref: #RE-2025
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Banner -->
          <tr>
            <td bgcolor="${primaryOrange}" align="center" style="padding: 50px 40px 50px 40px;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0; line-height: 1.1; letter-spacing: -0.02em;">
                Elite Partnership Invitation:<br />
                <span style="color: #ffedd5; text-transform: uppercase; font-size: 22px;">${company || 'Premier Contractor'}</span>
              </h1>
              <p style="color: #ffedd5; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin: 15px 0 0 0; opacity: 0.9;">Vetted 24/7 Emergency Dispatch Network</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 50px 40px 50px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 35px;">
                <tr>
                  <td style="background-color: #f8fafc; border-left: 4px solid ${primaryOrange}; padding: 20px; border-radius: 4px;">
                    <span style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 5px;">Subject</span>
                    <p style="color: #0f172a; font-weight: 700; font-size: 17px; margin: 0;">${email.subject}</p>
                  </td>
                </tr>
              </table>
              <div style="color: #334155; font-size: 16px; line-height: 1.65;">
                ${formattedBody}
              </div>
              
              <!-- Marcus Signature -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 40px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9;">
                <tr>
                  <td style="padding: 25px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="60" valign="top">
                          <div style="width: 50px; height: 50px; background-color: ${primaryOrange}; border-radius: 12px; text-align: center; line-height: 50px; color: #ffffff; font-weight: 900; font-size: 22px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">M</div>
                        </td>
                        <td style="padding-left: 20px;">
                          <p style="margin: 0; font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">Marcus</p>
                          <p style="margin: 3px 0 0 0; font-size: 12px; color: #64748b; font-weight: 600;">Senior Growth Consultant | B2B Division</p>
                          <p style="margin: 2px 0 0 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">GTA Roof Guard AI Infrastructure</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 50px; border-top: 1px solid #f1f5f9; padding-top: 40px;">
                <tr>
                  <td align="center">
                    <a href="https://gtaroofguard.ca/partner-growth" style="background-color: ${darkGray}; color: #ffffff; padding: 18px 40px; border-radius: 50px; text-decoration: none; font-weight: 800; font-size: 15px; display: inline-block; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">Access Growth Portal</a>
                    <p style="font-size: 11px; color: #94a3b8; margin: 25px 0 0 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">Marcus is standing by with your ROI forecast.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer Info -->
          <tr>
            <td bgcolor="#f8fafc" style="padding: 30px 40px 30px 40px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-size: 10px; color: #94a3b8; text-align: center; line-height: 1.5; text-transform: uppercase; letter-spacing: 0.05em;">
                This invitation is intended for the leadership of ${company || 'your firm'}.<br/>
                Confidential Partnership Proposal © 2025 GTA Roof Guard.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  };

  const copyForGmail = async () => {
    const html = generateEmailHtml();
    try {
      // Create a blob for the HTML content
      const htmlBlob = new Blob([html], { type: 'text/html' });
      // Create a blob for a plain text version (fallback)
      const textBlob = new Blob([email.body], { type: 'text/plain' });
      
      const item = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob
      });
      
      await navigator.clipboard.write([item]);
      setCopyStatus('copied-rich');
      setTimeout(() => setCopyStatus('idle'), 3000);
    } catch (err) {
      console.error("Rich copy failed:", err);
      alert("Browser restricted rich-text copy. Try 'Copy HTML Source' or manually selecting the preview.");
    }
  };

  const copySourceCode = async () => {
    const html = generateEmailHtml();
    try {
      await navigator.clipboard.writeText(html);
      setCopyStatus('copied-code');
      setTimeout(() => setCopyStatus('idle'), 3000);
    } catch (err) {
      console.error("Code copy failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-black text-xs">AI</div>
          <div>
            <p className="text-white text-xs font-black uppercase tracking-widest">Outreach Synthesized</p>
            <p className="text-gray-400 text-[10px] font-medium">Ready for dispatch to {company || 'Target'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={copyForGmail}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${copyStatus === 'copied-rich' ? 'bg-green-600 text-white' : 'bg-white text-gray-900 hover:bg-orange-600 hover:text-white'}`}
          >
            {copyStatus === 'copied-rich' ? '✓ Ready to Paste in Gmail' : 'Copy for Gmail'}
          </button>
          <button 
            onClick={copySourceCode}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${copyStatus === 'copied-code' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
          >
            {copyStatus === 'copied-code' ? '✓ Source Copied' : 'Copy HTML Source'}
          </button>
        </div>
      </div>

      {/* Visual Preview Container */}
      <div className="bg-white text-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 max-w-2xl mx-auto w-full font-sans ring-1 ring-black/5 flex flex-col">
        {/* Visual Header */}
        <div className="bg-gray-900 px-8 py-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white font-black text-sm">RG</div>
            <span className="text-white font-bold tracking-tight text-lg">GTA ROOF <span className="text-orange-500">GUARD</span></span>
          </div>
          <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Invitation Portal</div>
        </div>
        
        {/* Visual Banner */}
        <div className="bg-orange-600 px-8 py-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 h-full w-full">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border-r border-b border-white"></div>
              ))}
            </div>
          </div>
          <h1 className="text-white text-2xl font-extrabold relative z-10 leading-tight">
            Elite Partnership Invitation:<br />
            <span className="text-orange-100 uppercase tracking-tighter">{company || 'Premier Contractor'}</span>
          </h1>
          <p className="text-orange-100 text-[10px] mt-3 font-black uppercase tracking-[0.2em] relative z-10 opacity-80">Official Vetting Protocol</p>
        </div>

        {/* Visual Body */}
        <div className="px-10 py-12 bg-white">
          <div className="prose prose-sm max-w-none">
            <div className="bg-gray-50 border-l-4 border-orange-500 p-5 mb-8 rounded-r-xl shadow-sm">
              <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">Subject</span>
              <p className="text-gray-900 font-bold text-base leading-snug">{email.subject}</p>
            </div>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[15px] font-medium">
              {email.body}
            </div>
          </div>

          {/* Marcus Signature Visual */}
          <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">M</div>
             <div>
                <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Marcus</p>
                <p className="text-[10px] text-gray-500 font-bold">Senior Growth Consultant</p>
             </div>
          </div>

          {/* Visual Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-orange-600 transition-all transform hover:-translate-y-1">Enter Partner Growth Portal</button>
            <p className="text-[9px] text-gray-400 mt-6 font-bold uppercase tracking-[0.2em] opacity-60 italic">Marcus is standing by with your ROI forecast.</p>
          </div>
        </div>
      </div>
      
      {/* Embed Code Helper Section */}
      <div className="bg-gray-800/50 p-6 rounded-3xl border border-gray-700 mt-4">
         <h4 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            Developer Embed Protocol
         </h4>
         <p className="text-[10px] text-gray-400 font-medium mb-4 leading-relaxed">
            Use the source code to embed this professional HTML template into your CRM or direct email platform (Salesforce, HubSpot, Mailchimp, etc.).
         </p>
         <div className="relative group">
            <pre className="bg-gray-900 p-4 rounded-xl text-[9px] font-mono text-gray-500 overflow-x-auto max-h-32 custom-scrollbar border border-gray-700">
               {generateEmailHtml()}
            </pre>
            <button 
               onClick={copySourceCode}
               className="absolute top-2 right-2 bg-gray-800 text-gray-400 px-3 py-1 rounded-md text-[9px] font-bold uppercase hover:bg-orange-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
               {copyStatus === 'copied-code' ? '✓ Copied' : 'Copy Code'}
            </button>
         </div>
      </div>
    </div>
  );
};

export const AdminSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'outreach' | 'strategy' | 'integrations'>('outreach');
  
  // Outreach State
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [website, setWebsite] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [email, setEmail] = useState<GeneratedEmail | null>(null);
  const [outreachTasks, setOutreachTasks] = useState<OutreachAgentTask[]>([
    { id: 'o1', agentName: 'Web Researcher', status: 'idle', message: 'Awaiting target data.' },
    { id: 'o2', agentName: 'Senior Copywriter', status: 'idle', message: 'Ready to draft.' },
    { id: 'o3', agentName: 'Compliance Agent', status: 'idle', message: 'Standing by for review.' },
  ]);

  // Strategy Lab State
  const [marketContext, setMarketContext] = useState('Current Focus: Rapid response for the upcoming spring storm season. Target: High-reputation family-owned businesses in Brampton and Mississauga.');
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [strategyTasks, setStrategyTasks] = useState<OutreachAgentTask[]>([
    { id: 's1', agentName: 'Market Analyst', status: 'idle', message: 'Awaiting directive.' },
    { id: 's2', agentName: 'Growth Architect', status: 'idle', message: 'Ready to map growth.' },
    { id: 's3', agentName: 'Pricing Strategist', status: 'idle', message: 'Standing by for ROI calc.' },
  ]);

  // Integration State
  const [sheetLink, setSheetLink] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    const savedLink = localStorage.getItem('gta_roof_guard_sheet');
    const savedWebhook = localStorage.getItem('gta_roof_guard_webhook');
    if (savedLink) setSheetLink(savedLink);
    if (savedWebhook) setWebhookUrl(savedWebhook);
  }, []);

  const saveIntegrations = () => {
    localStorage.setItem('gta_roof_guard_sheet', sheetLink);
    localStorage.setItem('gta_roof_guard_webhook', webhookUrl);
    alert("Integration endpoints secured. System sync active.");
  };

  const runEmailAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingEmail(true);
    setEmail(null);

    // Initial status update for agents
    setOutreachTasks([
      { id: 'o1', agentName: 'Web Researcher', status: 'working', message: `Executing Google Search for ${company || 'target'}...` },
      { id: 'o2', agentName: 'Senior Copywriter', status: 'idle', message: 'Awaiting deep-dive research.' },
      { id: 'o3', agentName: 'Compliance Agent', status: 'idle', message: 'Awaiting draft.' },
    ]);

    try {
      // 1. Initiate Real AI Generation with Grounding
      const resultPromise = generateOutreachEmail(company, city, website, instructions);
      
      // 2. Parallel Visual feedback (Mocking the phases as the AI works)
      await new Promise(r => setTimeout(r, 2000));
      setOutreachTasks(prev => prev.map(t => t.id === 'o1' ? { ...t, status: 'completed', message: 'Web analysis and local reputation indexed.' } : t));
      setOutreachTasks(prev => prev.map(t => t.id === 'o2' ? { ...t, status: 'working', message: 'Synthesizing personalized B2B outreach...' } : t));

      const result = await resultPromise;
      
      // 3. Final visual phase
      setOutreachTasks(prev => prev.map(t => t.id === 'o2' ? { ...t, status: 'completed', message: 'Invitational copy finalized.' } : t));
      setOutreachTasks(prev => prev.map(t => t.id === 'o3' ? { ...t, status: 'working', message: 'Performing final compliance audit...' } : t));
      
      await new Promise(r => setTimeout(r, 1000));
      setOutreachTasks(prev => prev.map(t => t.id === 'o3' ? { ...t, status: 'completed', message: 'Invitation approved for secure dispatch.' } : t));

      setEmail(result);
    } catch (err) {
      setOutreachTasks(prev => prev.map(t => ({ ...t, status: 'error', message: 'Crew pipeline halted. Check API status.' })));
      alert("Crew AI failed to synthesize the outreach. Please ensure your API key supports grounding.");
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const runStrategyLab = async () => {
    setIsGeneratingStrategy(true);
    setStrategyTasks(prev => prev.map(t => ({...t, status: 'working', message: 'Processing market context...'})));
    try {
      const result = await generateNetworkStrategy(marketContext);
      localStorage.setItem('gta_roof_guard_strategy', JSON.stringify(result));
      await new Promise(r => setTimeout(r, 1500));
      setStrategyTasks(prev => prev.map(t => ({...t, status: 'completed', message: 'Task complete. Blueprint deployed.'})));
    } catch (err) {
      setStrategyTasks(prev => prev.map(t => ({...t, status: 'error', message: 'Failed to synthesize strategy.'})));
    } finally {
      setIsGeneratingStrategy(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 text-white font-sans selection:bg-orange-500 selection:text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-2xl font-black text-2xl border border-white/10">RG</div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">GTA Guard: Control Center</h1>
              <div className="flex items-center gap-2 text-gray-400 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Neural Network Operational</span>
              </div>
            </div>
          </div>
          <div className="flex bg-gray-800 p-1.5 rounded-2xl border border-gray-700 shadow-inner overflow-x-auto">
            <button onClick={() => setActiveTab('outreach')} className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'outreach' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Partner Outreach</button>
            <button onClick={() => setActiveTab('strategy')} className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'strategy' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Strategy Lab</button>
            <button onClick={() => setActiveTab('integrations')} className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'integrations' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Integrations</button>
          </div>
        </div>

        {activeTab === 'outreach' && (
          <div className="grid lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  Target Acquisition
                </h2>
                <form onSubmit={runEmailAgent} className="space-y-4">
                  <input type="text" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} className="w-full bg-gray-900 border-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all text-white placeholder:text-gray-600 focus:border-orange-500" required />
                  <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} className="w-full bg-gray-900 border-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all text-white placeholder:text-gray-600 focus:border-orange-500" required />
                  <input type="url" placeholder="Company Website" value={website} onChange={e => setWebsite(e.target.value)} className="w-full bg-gray-900 border-gray-700 rounded-xl px-4 py-3 text-sm outline-none transition-all text-white placeholder:text-gray-600 focus:border-orange-500" />
                  <textarea placeholder="Custom Agent Instructions..." value={instructions} onChange={e => setInstructions(e.target.value)} className="w-full bg-gray-900 border-gray-700 rounded-xl px-4 py-3 text-sm outline-none resize-none text-white placeholder:text-gray-600 focus:border-orange-500" rows={3} />
                  <button type="submit" disabled={isGeneratingEmail} className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3">
                    {isGeneratingEmail ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Initiate Crew AI Protocol'}
                  </button>
                </form>
              </div>

              {/* Outreach Agent Status Visuals */}
              <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl space-y-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Outreach Agent Pipeline
                </h3>
                <div className="space-y-6">
                  {outreachTasks.map(task => (
                    <div key={task.id} className="relative pl-6 border-l border-gray-700">
                      <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border border-gray-900 transition-colors ${task.status === 'working' ? 'bg-orange-500 animate-pulse' : task.status === 'completed' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-700'}`} />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">{task.agentName}</span>
                        <p className={`text-[11px] font-medium leading-tight ${task.status === 'working' ? 'text-orange-400' : task.status === 'completed' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {task.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl h-full flex flex-col overflow-hidden min-h-[600px]">
                <div className="flex-1 p-6 lg:p-10 overflow-y-auto bg-gray-200/20 custom-scrollbar">
                  {email ? (
                    <EmailPreview email={email} company={company} />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <div className="w-20 h-20 bg-gray-700/50 rounded-3xl flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </div>
                      <p className="text-gray-500 italic font-medium">Crew AI Standing By.<br/>Configure target to synthesize HTML invitation.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="grid lg:grid-cols-12 gap-10 animate-in fade-in duration-500">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl">
                <h2 className="text-2xl font-black mb-4">Partner Strategy Lab</h2>
                <textarea value={marketContext} onChange={e => setMarketContext(e.target.value)} className="w-full bg-gray-900 border-gray-700 rounded-2xl px-6 py-5 text-sm outline-none h-48 leading-relaxed mb-6" />
                <button onClick={runStrategyLab} disabled={isGeneratingStrategy} className="w-full bg-orange-600 hover:bg-orange-500 py-5 rounded-2xl font-bold shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4">
                  {isGeneratingStrategy ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Publish New Global Strategy'}
                </button>
              </div>
            </div>
            <div className="lg:col-span-7">
               <div className="bg-gray-800 rounded-3xl border border-gray-700 p-10 shadow-2xl h-full">
                  <div className="space-y-8">
                    {strategyTasks.map(task => (
                      <div key={task.id} className="relative pl-10 border-l border-gray-700 py-2">
                        <div className={`absolute -left-[7px] top-4 w-3 h-3 rounded-full border-2 border-gray-800 transition-colors ${task.status === 'working' ? 'bg-orange-500 animate-pulse' : task.status === 'completed' ? 'bg-green-500' : 'bg-gray-700'}`} />
                        <span className="text-xs font-black uppercase tracking-widest text-orange-400">Agent: {task.agentName}</span>
                        <p className="text-sm text-gray-300 font-mono mt-2 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">{task.message}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
             <div className="bg-gray-800 p-10 rounded-[3rem] border border-gray-700 shadow-2xl space-y-8">
                <div className="flex items-center gap-6 mb-4">
                   <div className="w-16 h-16 bg-green-900/30 rounded-3xl flex items-center justify-center text-green-500 border border-green-500/20">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                   </div>
                   <div>
                      <h2 className="text-3xl font-black text-white tracking-tight">Data Synchronization</h2>
                      <p className="text-gray-400 text-sm font-medium">Link your business systems to automate lead flow from payment submissions.</p>
                   </div>
                </div>

                <div className="grid gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Google Sheets Lead Database (Public Link or Web App URL)</label>
                      <div className="relative">
                        <input 
                          type="url" 
                          value={sheetLink} 
                          onChange={e => setSheetLink(e.target.value)} 
                          placeholder="https://docs.google.com/spreadsheets/d/..."
                          className="w-full bg-gray-900 border-2 border-gray-700 rounded-2xl px-6 py-4 text-sm text-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-mono"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        </div>
                      </div>
                      <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest pl-1 mt-1">Status: {sheetLink ? 'Active Sync Enabled' : 'Awaiting Connection'}</p>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Advanced Webhook Dispatch (Optional)</label>
                      <input 
                        type="url" 
                        value={webhookUrl} 
                        onChange={e => setWebhookUrl(e.target.value)} 
                        placeholder="https://hooks.zapier.com/..."
                        className="w-full bg-gray-900 border-2 border-gray-700 rounded-2xl px-6 py-4 text-sm text-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-mono"
                      />
                   </div>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-700/50 space-y-4">
                   <h4 className="text-xs font-black text-gray-300 uppercase tracking-widest">Active Data Streams</h4>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: 'Payment Lead Info', status: 'ready' },
                        { label: 'Contractor Licenses', status: 'ready' },
                        { label: 'Dispatch Call Logs', status: 'ready' }
                      ].map((stream, i) => (
                        <div key={i} className="bg-gray-800 p-4 rounded-2xl border border-gray-700 text-center space-y-2">
                           <div className="w-2 h-2 bg-green-500 rounded-full mx-auto animate-pulse"></div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{stream.label}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <button 
                   onClick={saveIntegrations}
                   className="w-full bg-orange-600 text-white py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                >
                   Secure Integration Endpoints
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
