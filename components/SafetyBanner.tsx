
import React from 'react';

export const SafetyBanner: React.FC = () => {
  return (
    <div className="bg-red-600 text-white p-3 text-center text-sm font-bold uppercase tracking-widest animate-pulse sticky top-0 z-50">
      ⚠️ LIFE SAFETY WARNING: DO NOT CLIMB ONTO THE ROOF DURING A STORM. CALL 911 FOR FIRE OR INJURIES.
    </div>
  );
};
