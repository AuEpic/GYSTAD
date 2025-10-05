
import React, { useState } from 'react';
import type { AnalyzableItem, AIAnalysisResult } from '../types';
import { ICONS } from '../constants';

interface AnalysisModalProps {
  item: AnalyzableItem | null;
  analysisResult: AIAnalysisResult | null;
  isAnalyzing: boolean;
  onClose: () => void;
  onAnalyze: (item: AnalyzableItem, userPrompt: string) => void;
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({
  item,
  analysisResult,
  isAnalyzing,
  onClose,
  onAnalyze,
}) => {
  const [userPrompt, setUserPrompt] = useState('Suggest a category and some tags.');

  if (!item) return null;

  const handleAnalyzeClick = () => {
    if (item) {
      onAnalyze(item, userPrompt);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="p-6 flex justify-between items-center border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            {ICONS.sparkles}
            <h2 className="text-2xl font-bold text-warm-white">AI Analysis</h2>
          </div>
          <button onClick={onClose} className="text-neutral-gray hover:text-warm-white">
            {ICONS.close}
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
          <div className="bg-slate-900/50 p-4 rounded-lg mb-6">
            <p className="text-sm text-neutral-gray">Analyzing:</p>
            <p className="font-bold text-warm-white truncate">{item.name}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="user-prompt" className="block text-sm font-medium text-neutral-gray mb-2">
              Your Request
            </label>
            <textarea
              id="user-prompt"
              rows={2}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-warm-white placeholder-neutral-gray focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
              placeholder="e.g., Is this file important? Suggest a project folder for it."
            />
          </div>

          {isAnalyzing ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto"></div>
              <p className="mt-4 text-neutral-gray">Gemini is thinking...</p>
            </div>
          ) : analysisResult ? (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider">Category</h3>
                <p className="text-lg text-warm-white">{analysisResult.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {analysisResult.tags.map(tag => (
                    <span key={tag} className="bg-slate-700 text-sm text-light-blue px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider">Summary</h3>
                <p className="text-warm-white italic">{analysisResult.summary}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-accent-blue uppercase tracking-wider">Suggested Action</h3>
                <p className="bg-slate-900/50 p-3 rounded-lg text-warm-white font-mono">{analysisResult.suggested_action}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-neutral-gray">
              <p>Enter your request and click "Analyze" to get insights from Gemini.</p>
            </div>
          )}
        </main>
        
        <footer className="p-6 border-t border-slate-700 shrink-0 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-700 text-warm-white hover:bg-slate-600 transition-colors">
                Cancel
            </button>
            <button
                onClick={handleAnalyzeClick}
                disabled={isAnalyzing || !userPrompt}
                className="px-6 py-2 rounded-lg bg-accent-blue text-white font-bold hover:bg-light-blue transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </button>
        </footer>
      </div>
    </div>
  );
};

export default AnalysisModal;
