"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareText, Moon, Sun, Info, HelpCircle, History, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenHowItWorks: () => void;
  onOpenAbout: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHowItWorks,
  onOpenAbout,
  onOpenHistory,
  historyCount,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("shesaid_theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("shesaid_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("shesaid_theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-100/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
          aria-label="SheSaid Home"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:shadow-sky-500/30 transition-all">
            <MessageSquareText className="w-5 h-5 transition-transform group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                She<span className="text-sky-500">Said</span>
              </span>
              <span className="text-base select-none">😂</span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-400 -mt-1 hidden sm:inline">
              The Female Language Translator
            </span>
          </div>
        </a>

        {/* Action Items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* How it works */}
          <button
            onClick={onOpenHowItWorks}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="How SheSaid works"
          >
            <HelpCircle className="w-4 h-4 text-sky-500" />
            <span className="hidden sm:inline">How It Works</span>
          </button>

          {/* About */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="About SheSaid"
          >
            <Info className="w-4 h-4 text-sky-500" />
            <span className="hidden sm:inline">About</span>
          </button>

          {/* History */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Recent Decoded Messages"
          >
            <History className="w-4 h-4 text-sky-500" />
            <span className="hidden md:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 rounded-full border border-sky-200 dark:border-sky-800">
                {historyCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg transition-all active:scale-95 ml-1"
          >
            {mounted ? (
              isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )
            ) : (
              <span className="w-4 h-4 block" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
