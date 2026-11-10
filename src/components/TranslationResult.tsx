"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Heart,
  HelpCircle,
  MessageSquare,
  Skull,
  Gauge,
  Share2,
  BookmarkPlus,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";
import { TranslationResponse, ConfidenceLevel } from "@/types/translation";

interface TranslationResultProps {
  result: TranslationResponse;
  originalMessage: string;
  context?: string;
  relationship?: string;
  onReset: () => void;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({
  result,
  originalMessage,
  context,
  relationship,
  onReset,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#0ea5e9", "#38bdf8", "#7dd3fc", "#fb7185", "#f43f5e"],
      });
    } catch {
      // Ignore if canvas is not ready
    }
  };

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    fireConfetti();
    setTimeout(() => {
      setCopiedSection(null);
    }, 2500);
  };

  const copyEntireResult = () => {
    const formatted = `💬 She said: "${originalMessage}"
${relationship ? `👤 Relationship: ${relationship}\n` : ""}${context ? `📝 Context: ${context}\n` : ""}
🔍 The Translation:
${result.translation}

❤️ Possible Emotion:
${result.possibleEmotion}

🤔 Another Possibility:
${result.alternativeMeaning}

💡 What You Should Reply:
"${result.suggestedReply}"

💀 The Funny Version:
${result.funnyVersion}

📊 Confidence Level: ${result.confidence}

— Decoded with SheSaid (https://shesaid.vercel.app)`;

    copyToClipboard(formatted, "entire");
  };

  const handleShare = () => {
    const shareText = `She said: "${originalMessage}"\nSheSaid Decoded: "${result.translation}" 😂\nDecode yours at`;
    if (navigator.share) {
      navigator
        .share({
          title: "SheSaid — The Female Language Translator",
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(window.location.href)}`;
      window.open(tweetUrl, "_blank");
    }
  };

  // Confidence styling
  const getConfidenceBadge = (confidence: ConfidenceLevel) => {
    switch (confidence) {
      case "High":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
          bar: "w-full bg-emerald-500",
          dot: "bg-emerald-500",
          label: "High Confidence",
          desc: "Signals and emotional patterns are well-established.",
        };
      case "Medium":
        return {
          bg: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800",
          bar: "w-2/3 bg-sky-500",
          dot: "bg-sky-500",
          label: "Medium Confidence",
          desc: "Reasonably clear, but subject to her specific mood and tone.",
        };
      case "Low":
      default:
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
          bar: "w-1/3 bg-amber-500",
          dot: "bg-amber-500",
          label: "Low Confidence",
          desc: "Ambiguous message. Ask directly rather than assuming.",
        };
    }
  };

  const confInfo = getConfidenceBadge(result.confidence);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-8 pb-16 animate-fadeIn">
      {/* Decoded Header Summary Card */}
      <div className="bg-slate-900 text-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-sky-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Original Message Decoded
          </span>
          {relationship && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 dark:bg-slate-700 text-slate-300 border border-slate-700">
              {relationship}
            </span>
          )}
        </div>
        <p className="text-lg sm:text-2xl font-bold italic tracking-tight text-white mb-2">
          &ldquo;{originalMessage}&rdquo;
        </p>
        {context && (
          <p className="text-xs text-slate-400 border-l-2 border-sky-500/40 pl-2 mt-2">
            Context: {context}
          </p>
        )}
      </div>

      {/* Main Grid of 6 Structured Sections */}
      <div className="space-y-4">
        {/* 1. THE TRANSLATION */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-sky-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm shadow-sky-100/50 dark:shadow-none hover:border-sky-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                1. The Translation
              </h2>
            </div>
            <button
              onClick={() => copyToClipboard(result.translation, "translation")}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-sky-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === "translation" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copy
                </>
              )}
            </button>
          </div>
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
            {result.translation}
          </p>
        </div>

        {/* 2. POSSIBLE EMOTION */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:border-rose-200 dark:hover:border-rose-900/60 transition-all">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-500 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              2. Possible Emotion
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {result.possibleEmotion}
          </p>
        </div>

        {/* 3. ANOTHER POSSIBILITY */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:border-amber-200 dark:hover:border-amber-900/60 transition-all">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-500 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              3. Another Possibility
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {result.alternativeMeaning}
          </p>
        </div>

        {/* 4. WHAT YOU SHOULD REPLY */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-sky-400/80 dark:border-sky-500/80 p-5 sm:p-6 shadow-md shadow-sky-100/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-sm shadow-sky-500/30">
                <Send className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                4. What You Should Reply
              </h2>
            </div>
            <button
              onClick={() => copyToClipboard(result.suggestedReply, "reply")}
              className="text-xs px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/70 hover:bg-sky-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              {copiedSection === "reply" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" /> Copied Reply!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copy Reply
                </>
              )}
            </button>
          </div>
          <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-slate-950/60 border border-sky-100 dark:border-slate-800">
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed italic">
              &ldquo;{result.suggestedReply}&rdquo;
            </p>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-2">
            💡 Pro tip: Adapt this in your own voice; sincerity always works best.
          </p>
        </div>

        {/* 5. THE FUNNY VERSION */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-950 dark:to-black text-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
                <Skull className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                5. The Funny Version <span className="select-none">💀</span>
              </h2>
            </div>
            <button
              onClick={() => copyToClipboard(result.funnyVersion, "funny")}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedSection === "funny" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copy
                </>
              )}
            </button>
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {result.funnyVersion}
          </p>
        </div>

        {/* 6. CONFIDENCE LEVEL */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  6. Confidence Level
                </h2>
                <p className="text-xs text-slate-400">{confInfo.desc}</p>
              </div>
            </div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${confInfo.bg} self-start sm:self-auto`}
            >
              <span className={`w-2 h-2 rounded-full ${confInfo.dot} animate-pulse`} />
              <span>{confInfo.label}</span>
            </div>
          </div>

          {/* Visual Gauge Bar */}
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${confInfo.bar} rounded-full transition-all duration-500`} />
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Translate Another Button */}
        <button
          onClick={onReset}
          className="flex-1 py-3 px-5 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-98 text-white font-semibold text-sm shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Decode Another Message</span>
        </button>

        {/* Copy Entire Breakdown */}
        <button
          onClick={copyEntireResult}
          className="flex-1 py-3 px-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-300 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {copiedSection === "entire" ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Entire Result Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-400" />
              <span>Copy Full Breakdown</span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-300 text-slate-700 dark:text-slate-200 hover:text-sky-600 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          title="Share SheSaid"
        >
          <Share2 className="w-4 h-4" />
          <span className="sm:hidden text-sm font-semibold">Share</span>
        </button>
      </div>
    </div>
  );
};
