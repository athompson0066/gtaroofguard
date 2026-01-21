
import React from 'react';
import { Roofer } from '../types';

interface Props {
  roofer: Roofer;
}

export const RooferResult: React.FC<Props> = ({ roofer }) => {
  return (
    <div className="bg-white border-2 border-orange-500 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{roofer.name}</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">{roofer.address || 'Location Verified'}</p>
        </div>
        {roofer.rating && (
          <div className="flex flex-col items-end">
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
              ★ {roofer.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">Vetted Provider</span>
          </div>
        )}
      </div>

      {roofer.reviewSnippet && (
        <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-orange-300 italic text-sm text-gray-700">
          "{roofer.reviewSnippet}"
        </div>
      )}

      {roofer.location && (
        <div className="h-24 bg-gray-200 rounded-lg overflow-hidden relative border border-gray-200">
          <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i13!2i2318!3i2974!2m3!1e0!2sm!3i420120488!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2!23i1301875')] bg-center opacity-50 grayscale"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-2 rounded-full shadow-lg border border-orange-500 animate-bounce">
               <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-gray-900 shadow-sm border border-gray-100">
            ~15-30 min ETA
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <a 
          href={roofer.uri} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-white border border-gray-900 text-gray-900 text-center py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Google Map
        </a>
        <button 
          onClick={() => window.alert('Connecting you with ' + roofer.name + ' Emergency Dispatch...')}
          className="flex-[1.5] bg-orange-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.455 5.455l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
          Call Dispatch
        </button>
      </div>
    </div>
  );
};
