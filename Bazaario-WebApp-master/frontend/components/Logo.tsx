import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center gap-2 select-none ${className}`}>
    <img
      src="/logo.png"
      alt="Bazaario logo icon"
      className="h-10 w-10 object-contain"
      loading="lazy"
    />
    <div className="leading-tight">
      <div className="text-xl md:text-2xl font-black tracking-[0.05em] uppercase bg-gradient-to-r from-black via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
        BAZAARIO
      </div>
      <div className="text-[0.58rem] md:text-[0.72rem] font-semibold tracking-[0.005em] text-pink-600 dark:text-pink-300 mt-1">
        SEE IT LIVE. GET IT NOW
      </div>
    </div>
  </div>
);