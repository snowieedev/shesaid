"use client";

import React, { useEffect } from "react";
import { X, Sparkles, MessageCircle, Heart, ShieldCheck, CheckCircle2 } from "lucide-react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            How SheSaid Works
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Ever received a message like &ldquo;Fine&rdquo; or &ldquo;K&rdquo; and felt your life flash before your eyes? Here is how we help decode it.
        </p>

        {/* Steps */}
        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-800">
            <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Context-Aware Parsing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We consider the exact wording, punctuation marks, emojis, relationship type, and whatever happened right before.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-800">
            <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                6-Point Dimensional Analysis
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Rather than giving you a single cynical guess, we break down the primary translation, likely underlying emotion, alternative possibilities, and a constructive reply.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-800">
            <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Nuance & Confidence Scoring
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We acknowledge uncertainty! If a message is genuinely ambiguous, our confidence level warns you to ask directly instead of jumping to conclusions.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Callout */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>Important Reminder</span>
          </div>
          Women are people, not puzzles with a single master key! SheSaid is intended for humor, empathy, and laughter. Honest, open communication will always beat guessing games.
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-all shadow-md shadow-sky-500/20"
        >
          Got it, let&apos;s decode!
        </button>
      </div>
    </div>
  );
};
