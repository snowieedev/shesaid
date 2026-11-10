"use client";

import React, { useState } from "react";
import { MessageSquare, Sparkles, Lightbulb } from "lucide-react";

interface FooterProps {
  onOpenHowItWorks: () => void;
  onOpenAbout: () => void;
}

const DATING_TIPS = [
  "Golden Rule: Never say 'I don't care' when asked what to eat. Offer two specific restaurants.",
  "If she says 'I'm fine', bring a snack or water before asking what's on her mind.",
  "When she is venting about her day, first ask: 'Do you want comfort or solutions?'",
  "A surprise iced coffee has an 89% conflict resolution success rate.",
  "Remember: Active listening is 80% maintaining eye contact and 20% validating feelings.",
];

export const Footer: React.FC<FooterProps> = ({ onOpenHowItWorks, onOpenAbout }) => {
  const [tipIdx, setTipIdx] = useState(0);

  const cycleTip = () => {
    setTipIdx((prev) => (prev + 1) % DATING_TIPS.length);
  };

  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 py-10 px-4 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Playful Dating Tip Banner */}
        <div
          onClick={cycleTip}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 text-xs text-sky-800 dark:text-sky-300 max-w-md cursor-pointer hover:border-sky-400 transition-all select-none group"
          title="Click for another survival tip"
        >
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="font-medium text-left">{DATING_TIPS[tipIdx]}</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
          <button
            onClick={onOpenHowItWorks}
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            How It Works
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button
            onClick={onOpenAbout}
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            About & Philosophy
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            Deployable on Vercel
          </a>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="space-y-1.5 text-xs text-slate-400 dark:text-slate-400 max-w-lg">
          <p>
            © 2026 SheSaid. An entertainment tool crafted with humor, empathy, and AI.
          </p>
          <p className="text-[11px] leading-relaxed">
            Disclaimer: SheSaid is built purely for fun, smiles, and conversational perspective. It is not licensed psychological advice. Always talk to the real human in front of you!
          </p>
        </div>
      </div>
    </footer>
  );
};
