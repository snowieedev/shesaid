"use client";

import React, { useEffect } from "react";
import { X, Trash2, History, ArrowRight, MessageSquare, Clock } from "lucide-react";
import { StoredTranslation } from "@/types/translation";

interface RecentHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: StoredTranslation[];
  onSelect: (item: StoredTranslation) => void;
  onClear: () => void;
  onDelete: (id: string) => void;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({
  isOpen,
  onClose,
  history,
  onSelect,
  onClear,
  onDelete,
}) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col shadow-2xl z-10 animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Decoded History
              </h2>
              <p className="text-xs text-slate-400">
                {history.length} {history.length === 1 ? "entry" : "entries"} saved locally
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <MessageSquare className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm font-medium">No decoded messages yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                When you translate messages, they will appear here so you can revisit them anytime.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-sky-300 dark:hover:border-sky-700 transition-all cursor-pointer relative"
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                    &ldquo;{item.originalMessage.slice(0, 45)}
                    {item.originalMessage.length > 45 ? "..." : ""}&rdquo;
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded transition-all"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-2 font-normal">
                  {item.translation}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="text-sky-500 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Clear All */}
        {history.length > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onClear}
              className="w-full py-2.5 px-4 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
