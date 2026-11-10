"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Sparkles, Search, Compass, ShieldAlert } from "lucide-react";

const LOADING_MESSAGES = [
  "Consulting the communication department...",
  "Analyzing the situation...",
  "Looking for context clues...",
  "Decoding the message...",
  "Cross-referencing punctuation and emojis...",
  "Calibrating sarcasm detectors...",
  "Evaluating the danger index of 'Fine'...",
  "Scanning memory archives for prior offences...",
  "Drafting a de-escalation protocol...",
];

export const LoadingState: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-8">
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-sky-100 dark:border-slate-800 p-8 sm:p-10 shadow-lg shadow-sky-100/30 dark:shadow-none text-center">
        {/* Animated Radar Icon */}
        <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-sky-400/20 dark:bg-sky-500/20 animate-ping opacity-75" />
          <div className="absolute -inset-2 rounded-full border border-sky-300/40 dark:border-sky-500/30 animate-pulse" />
          <div className="relative w-14 h-14 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-500">
            <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: "3s" }} />
          </div>
        </div>

        {/* Dynamic cycling humorous message */}
        <div className="h-8 flex items-center justify-center mb-3">
          <p
            key={currentIdx}
            className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 transition-all duration-300 animate-fadeIn"
          >
            {LOADING_MESSAGES[currentIdx]}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 max-w-sm mx-auto">
          Hang tight! The sarcasm algorithm is calculating emotional coordinates...
        </p>

        {/* Subtle progress line */}
        <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full animate-indeterminate" />
        </div>
      </div>
    </div>
  );
};
