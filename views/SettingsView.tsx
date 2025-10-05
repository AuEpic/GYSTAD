
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-warm-white">Settings</h2>
      <div className="bg-slate-800 p-6 rounded-lg max-w-2xl">
        <h3 className="text-lg font-bold text-warm-white">API Configuration</h3>
        <p className="text-neutral-gray mt-2">
          The Gemini API key is configured securely via an environment variable (`process.env.API_KEY`).
        </p>
        <p className="text-neutral-gray mt-2">
          There are no additional settings to configure in the application. Ensure the environment variable is correctly set before launching the application.
        </p>
        <div className="mt-4 bg-slate-900/50 p-4 rounded-md font-mono text-sm text-neutral-gray">
          <code>API_KEY=your_api_key_here</code>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
