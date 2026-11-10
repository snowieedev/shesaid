"use client";

import React, { useEffect } from "react";
import { X, Heart, Sparkles, MessageSquareHeart, Shield } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
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
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            About SheSaid
          </h2>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          SheSaid was born out of those moments where someone stares at their phone for 20 minutes wondering whether &ldquo;It&apos;s fine&rdquo; means dinner is still happening or they should begin drafting a formal apology letter.
        </p>

        {/* Philosophy Card */}
        <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-800 mb-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-500" />
            Our Philosophy
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe that comedy brings perspective. By playfully calling out common communication traps, SheSaid encourages people to slow down, reflect on the other person&apos;s feelings, and reply with kindness instead of defensiveness.
          </p>
        </div>

        {/* Product Rules */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sky-500 font-bold">•</span>
            <span>No toxic stereotypes or generalizing all women</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sky-500 font-bold">•</span>
            <span>No manipulation, toxic games, or passive aggression</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sky-500 font-bold">•</span>
            <span>Always promotes honest, respectful conversation</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Version 1.0.0</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for clear communication
          </span>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-all shadow-md shadow-sky-500/20"
        >
          Back to Decoder
        </button>
      </div>
    </div>
  );
};
