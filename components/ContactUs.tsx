
import React from 'react';

export const ContactUs: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-xl">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-gray-500 mb-8 font-medium italic">For non-emergency inquiries, partnerships, or feedback.</p>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Feedback received. Thank you."); }}>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
              <input type="text" className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input type="email" className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
              <textarea rows={4} className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none" placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
              Send Message
            </button>
          </form>
          
          <div className="mt-10 pt-10 border-t border-gray-100 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-gray-400">Headquarters</p>
            <p className="text-gray-600 font-bold">123 King St W, Toronto, ON M5H 1J8</p>
            <p className="text-orange-600 font-bold">admin@gtaroofguard.ca</p>
          </div>
        </div>
      </div>
    </div>
  );
};
