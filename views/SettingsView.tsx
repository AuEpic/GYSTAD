import React, { useState } from 'react';

type MCPStatus = 'Disconnected' | 'Connecting' | 'Connected';
type AIProvider = 'gemini' | 'lmstudio';

const SettingsCard: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
        <div className="p-4 bg-slate-900/50 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-warm-white">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const SettingsView: React.FC = () => {
    const [mcpStatus, setMcpStatus] = useState<MCPStatus>('Disconnected');
    const [aiProvider, setAiProvider] = useState<AIProvider>('gemini');

    const handleConnectMcp = () => {
        setMcpStatus('Connecting');
        setTimeout(() => {
            setMcpStatus('Connected');
        }, 2000);
    };
    
    const getStatusColor = () => {
        switch(mcpStatus) {
            case 'Connected': return 'text-success-green';
            case 'Connecting': return 'text-warning-amber';
            case 'Disconnected': return 'text-error-red';
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-warm-white">Settings</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <SettingsCard title="MCP Server Connection">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-neutral-gray">Status</p>
                            <p className={`text-xl font-bold ${getStatusColor()}`}>{mcpStatus}</p>
                        </div>
                        <button
                            onClick={handleConnectMcp}
                            disabled={mcpStatus !== 'Disconnected'}
                            className="px-5 py-2 rounded-lg bg-accent-blue text-white font-bold hover:bg-blue-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            {mcpStatus === 'Disconnected' ? 'Connect' : mcpStatus}
                        </button>
                    </div>
                    <p className="text-sm text-neutral-gray mt-4">
                        The Model Context Protocol (MCP) server provides secure access to the local filesystem.
                    </p>
                </SettingsCard>

                <SettingsCard title="AI Provider">
                    <p className="text-sm text-neutral-gray mb-4">
                        Select the AI model provider for content analysis.
                    </p>
                    <div className="space-y-3">
                        <label className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${aiProvider === 'gemini' ? 'border-accent-blue bg-accent-blue/10' : 'border-slate-700 bg-slate-900/50'}`}>
                            <input type="radio" name="ai-provider" value="gemini" checked={aiProvider === 'gemini'} onChange={() => setAiProvider('gemini')} className="h-5 w-5 text-accent-blue bg-slate-700 border-slate-600 focus:ring-accent-blue" />
                            <div className="ml-4">
                                <p className="font-semibold text-warm-white">Gemini Cloud API</p>
                                <p className="text-sm text-neutral-gray">High-quality analysis via Google's API.</p>
                            </div>
                        </label>
                        <label className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${aiProvider === 'lmstudio' ? 'border-accent-blue bg-accent-blue/10' : 'border-slate-700 bg-slate-900/50'}`}>
                            <input type="radio" name="ai-provider" value="lmstudio" checked={aiProvider === 'lmstudio'} onChange={() => setAiProvider('lmstudio')} className="h-5 w-5 text-accent-blue bg-slate-700 border-slate-600 focus:ring-accent-blue" />
                             <div className="ml-4">
                                <p className="font-semibold text-warm-white">Local LMStudio Agent</p>
                                <p className="text-sm text-neutral-gray">Private, local analysis (requires LMStudio). </p>
                            </div>
                        </label>
                    </div>
                </SettingsCard>

            </div>
        </div>
    );
};

export default SettingsView;
