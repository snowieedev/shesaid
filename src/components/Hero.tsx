import React from "react";
import { Sparkles, HeartHandshake } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="text-center pt-8 sm:pt-14 pb-4 px-4 max-w-3xl mx-auto">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/70 text-sky-700 dark:text-sky-300 text-xs sm:text-sm font-medium mb-5 shadow-sm shadow-sky-100/50 dark:shadow-none animate-subtle-float">
        <Sparkles className="w-3.5 h-3.5 text-sky-500" />
        <span>The AI Subtext & Sarcasm Decoder</span>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <HeartHandshake className="w-3 h-3 text-rose-400" /> Saving relationships daily
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
        She said <span className="text-sky-500 underline decoration-sky-300/60 dark:decoration-sky-600/60 underline-offset-8">what?</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl font-normal text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
        Confused by that message? Let&apos;s decode it. 👀
      </p>

      {/* Subtle Hint */}
      <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 mt-2">
        Paste any cryptic text, choose the relationship, and uncover the subtext.
      </p>
    </section>
  );
};
