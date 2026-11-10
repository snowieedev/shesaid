"use client";

import React, { useState, useRef } from "react";
import {
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  AlertCircle,
  Users,
  MessageCircle,
} from "lucide-react";
import { RelationshipType } from "@/types/translation";

const EXAMPLE_MESSAGES: { text: string; tag: string }[] = [
  { text: "Fine, do whatever you want.", tag: "Classic" },
  { text: "I'm not mad.", tag: "High Alert" },
  { text: "Nothing, forget it.", tag: "Subtle" },
  { text: "You should already know.", tag: "Pop Quiz" },
  { text: "It's up to you.", tag: "Trap" },
  { text: "K.", tag: "One Letter" },
  { text: "Have fun with your friends!", tag: "Suspicious" },
  { text: "Do you notice anything different?", tag: "Danger Zone" },
  { text: "We need to talk later.", tag: "Heart Rate 180" },
];

const RELATIONSHIP_OPTIONS: RelationshipType[] = [
  "Partner / Girlfriend",
  "Wife",
  "Crush / Talking Stage",
  "Friend",
  "Co-worker",
  "Ex",
  "Family / Mom",
];

interface TranslationFormProps {
  onSubmit: (data: {
    message: string;
    context?: string;
    relationship?: string;
  }) => void;
  isLoading: boolean;
  error?: string | null;
}

export const TranslationForm: React.FC<TranslationFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [message, setMessage] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("Partner / Girlfriend");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    onSubmit({
      message: message.trim(),
      context: context.trim() ? context.trim() : undefined,
      relationship: relationship ? relationship : undefined,
    });
  };

  const handleSelectExample = (exampleText: string) => {
    setMessage(exampleText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleClear = () => {
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Card Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-xl shadow-sky-100/40 dark:shadow-none p-5 sm:p-7 transition-all"
      >
        {/* Main Textarea */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="message-input"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-sky-500" />
              What she sent you
            </label>
            {message.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <textarea
            id="message-input"
            ref={textareaRef}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste what she said... (e.g., 'Fine! If that's what you wanna do.')"
            className="w-full text-base sm:text-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
            maxLength={1000}
            disabled={isLoading}
            required
          />

          <div className="flex justify-end -mt-1 mb-3">
            <span className="text-[11px] text-slate-400 dark:text-slate-400">
              {message.length}/1000
            </span>
          </div>
        </div>

        {/* Optional Context Toggle Accordion */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-1"
          >
            <span>
              {showAdvanced ? "Hide context options" : "+ Add relationship or backstory (optional)"}
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-4 animate-fadeIn">
              {/* Relationship Type Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mb-2">
                  <Users className="w-3.5 h-3.5 text-sky-500" />
                  Who is she to you?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {RELATIONSHIP_OPTIONS.map((rel) => {
                    const isSelected = relationship === rel;
                    return (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => setRelationship(rel)}
                        className={`text-xs px-2.5 py-1 rounded-full transition-all border ${
                          isSelected
                            ? "bg-sky-500 text-white border-sky-500 font-medium shadow-sm shadow-sky-500/30"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300"
                        }`}
                      >
                        {rel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Backstory Context Textarea */}
              <div>
                <label
                  htmlFor="context-input"
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5"
                >
                  What happened before this? (Optional backstory)
                </label>
                <textarea
                  id="context-input"
                  rows={2}
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. 'I asked if I could go golfing this Saturday, which happens to be her mom's birthday lunch...'"
                  className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-3 py-2 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 resize-none"
                  maxLength={600}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 active:scale-[0.99] text-white font-semibold text-base shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Decoding subtext...</span>
            </span>
          ) : (
            <>
              <span>Decode this</span>
              <span className="text-lg">💬</span>
            </>
          )}
        </button>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-400 mt-3 flex items-center justify-center gap-1">
          <span>Just for fun. We can&apos;t actually read minds.</span>
        </p>
      </form>

      {/* Example Messages Section */}
      <div className="mt-6 pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            Popular examples to try:
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-400">
            Click to populate
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {EXAMPLE_MESSAGES.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectExample(item.text)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-600 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 shadow-sm transition-all text-left flex items-center gap-1.5 group active:scale-95 cursor-pointer"
            >
              <span>&ldquo;{item.text}&rdquo;</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 group-hover:bg-sky-100 font-medium">
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
