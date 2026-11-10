"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TranslationForm } from "@/components/TranslationForm";
import { LoadingState } from "@/components/LoadingState";
import { TranslationResult } from "@/components/TranslationResult";
import { HowItWorksModal } from "@/components/HowItWorksModal";
import { AboutModal } from "@/components/AboutModal";
import { RecentHistory } from "@/components/RecentHistory";
import { Footer } from "@/components/Footer";
import {
  TranslationRequest,
  TranslationResponse,
  StoredTranslation,
} from "@/types/translation";

const STORAGE_KEY = "shesaid_history_v1";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TranslationResponse | null>(null);
  const [activeMessage, setActiveMessage] = useState<string>("");
  const [activeContext, setActiveContext] = useState<string | undefined>(undefined);
  const [activeRelationship, setActiveRelationship] = useState<string | undefined>(
    undefined
  );

  const [history, setHistory] = useState<StoredTranslation[]>([]);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage safely on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to load history from localStorage:", e);
    }
  }, []);

  const saveToHistory = (
    newResult: TranslationResponse,
    msg: string,
    ctx?: string,
    rel?: string
  ) => {
    try {
      const entry: StoredTranslation = {
        ...newResult,
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        originalMessage: msg,
        context: ctx,
        relationship: rel,
        createdAt: Date.now(),
      };
      const updated = [entry, ...history.filter((h) => h.originalMessage !== msg)].slice(
        0,
        25
      );
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to save translation to history:", e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear history:", e);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to update history:", e);
    }
  };

  const handleSelectHistoryItem = (item: StoredTranslation) => {
    setActiveMessage(item.originalMessage);
    setActiveContext(item.context);
    setActiveRelationship(item.relationship);
    setResult({
      translation: item.translation,
      possibleEmotion: item.possibleEmotion,
      alternativeMeaning: item.alternativeMeaning,
      suggestedReply: item.suggestedReply,
      funnyVersion: item.funnyVersion,
      confidence: item.confidence,
    });
    setError(null);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDecode = async (data: {
    message: string;
    context?: string;
    relationship?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setActiveMessage(data.message);
    setActiveContext(data.context);
    setActiveRelationship(data.relationship);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Decoding failed. Please try again.");
      }

      setResult(responseData);
      saveToHistory(responseData, data.message, data.context, data.relationship);

      // Smooth scroll to result section
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-200">
      {/* Navigation Bar */}
      <Header
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <Hero />

        {/* Form Container */}
        <div ref={formRef} className="pt-2">
          <TranslationForm
            onSubmit={handleDecode}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {/* Loading Spinner / Humorous Cycling Messages */}
        {isLoading && <LoadingState />}

        {/* Results Card */}
        {result && !isLoading && (
          <div ref={resultRef}>
            <TranslationResult
              result={result}
              originalMessage={activeMessage}
              context={activeContext}
              relationship={activeRelationship}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Modals and Drawers */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <RecentHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={handleSelectHistoryItem}
        onClear={handleClearHistory}
        onDelete={handleDeleteHistoryItem}
      />
    </div>
  );
}
