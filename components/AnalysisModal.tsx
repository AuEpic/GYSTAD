import React, { useState, useCallback, useContext } from 'react';
import type { AnalyzableItem, AIAnalysisResult } from '../types';
import { analyzeContent } from '../services/geminiService';
import { ICONS } from '../constants';
import { ToastContext } from '../contexts/ToastContext';

interface AnalysisModalProps {
  item: AnalyzableItem;
  onClose: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center">
        <svg className="animate-spin h-10 w-10 text-accent-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-warm-white">AI is analyzing...</p>
        <p className="text-neutral-gray">This may take a moment.</p>
    </div>
);


const AnalysisModal: React.FC<AnalysisModalProps> = ({ item, onClose }) => {
  const [prompt, setPrompt] = useState('Suggest a category and tags.');
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useContext(ToastContext);

  const handleAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const analysisResult = await analyzeContent(item.content_summary, prompt);
      setResult(analysisResult);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [item, prompt]);

  const handleApplySuggestion = useCallback(() => {
    if (result) {
        addToast(`Action applied: "${result.suggested_action}"`, 'success');
        onClose();
    }
  }, [result, addToast, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl border border-slate-700 transform transition-all">
        <div className="flex justify-between items-center p-5 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-warm-white">AI Analysis</h2>
          <button onClick={onClose} className="text-neutral-gray hover:text-warm-white">{ICONS.close}</button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-lg text-warm-white truncate">{item.name}</h3>
            <p className="text-sm text-neutral-gray mt-1">{item.content_summary}</p>
          </div>
          
          {!result && !isLoading && (
            <>
              <label htmlFor="prompt" className="block text-sm font-medium text-warm-white mb-2">Your Request:</label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-warm-white placeholder-neutral-gray focus:outline-none focus:ring-2 focus:ring-accent-blue"
                rows={2}
              ></textarea>
            </>
          )}

          {isLoading && <div className="py-12"><LoadingSpinner /></div>}
          
          {error && <div className="text-error-red bg-error-red/10 p-4 rounded-lg my-4">{error}</div>}

          {result && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-semibold text-accent-blue border-b border-slate-700 pb-2">Analysis Complete</h3>
              <div>
                <p className="text-sm text-neutral-gray font-semibold">Category</p>
                <p className="text-lg text-warm-white">{result.category}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-gray font-semibold">Tags</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {result.tags.map((tag, index) => (
                    <span key={index} className="bg-light-blue/20 text-accent-blue text-xs font-mono px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
               <div>
                <p className="text-sm text-neutral-gray font-semibold">Summary</p>
                <p className="text-warm-white">{result.summary}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-gray font-semibold">Suggested Action</p>
                <p className="font-mono text-success-green bg-success-green/10 p-3 rounded-md">{result.suggested_action}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-5 border-t border-slate-700 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-700 text-warm-white hover:bg-slate-600 transition-colors">Close</button>
          {!result && (
            <button 
              onClick={handleAnalysis} 
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-accent-blue text-white font-bold hover:bg-blue-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? 'Analyzing...' : <> {ICONS.sparkles} Run Analysis </>}
            </button>
          )}
           {result && (
            <button 
              onClick={handleApplySuggestion}
              className="px-6 py-2 rounded-lg bg-success-green text-white font-bold hover:bg-green-500 transition-colors"
            >
              Apply Suggestion
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
