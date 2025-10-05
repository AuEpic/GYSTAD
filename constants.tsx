import React from 'react';
import type { DevTask } from './types';
import { TaskStatus } from './types';

// Using simple SVG elements for icons to keep it self-contained.
export const ICONS = {
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  tasks: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  organization: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  design: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  interaction: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
  architecture: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  sparkles: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2 2-2.828-2.828a1 1 0 010-1.414L7.464 7.464M12 12l2-2 2.828 2.828a1 1 0 010 1.414L14.707 16.707" /></svg>,
  close: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  code: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  document: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  backup: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h4M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h4m-4 4h4m2 4H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2h-4l-2 2z" /></svg>,
  unknown: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  searchOff: <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-neutral-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l2 2m-2-2l-2 2" /></svg>,
};


export const MOCK_TASKS: DevTask[] = [
  { id: 1, week: 24, title: 'Implement Gemini API for content analysis', status: TaskStatus.Done },
  { id: 2, week: 24, title: 'Design the file and project card components', status: TaskStatus.Done },
  { id: 3, week: 25, title: 'Develop main dashboard view and layout', status: TaskStatus.InProgress },
  { id: 4, week: 25, title: 'Set up File System Access API for directory scanning', status: TaskStatus.InProgress },
  { id: 5, week: 26, title: 'Create the analysis modal with loading states', status: TaskStatus.Todo },
  { id: 6, week: 26, title: 'Add search and filtering functionality', status: TaskStatus.Todo },
  { id: 7, week: 27, title: 'Deploy application to staging environment', status: TaskStatus.Todo },
];

export const DESIGN_SYSTEM_COLORS = [
    { name: 'Slate 900', role: 'Primary Background', hex: '#0f172a' },
    { name: 'Slate 800', role: 'Secondary Background', hex: '#1e293b' },
    { name: 'Slate 700', role: 'UI Elements, Borders', hex: '#334155' },
    { name: 'Warm White', role: 'Primary Text', hex: '#f1f5f9' },
    { name: 'Neutral Gray', role: 'Secondary Text, Placeholders', hex: '#94a3b8' },
    { name: 'Accent Blue', role: 'Primary Accent, CTAs', hex: '#38bdf8' },
    { name: 'Light Blue', role: 'Accent Hover', hex: '#7dd3fc' },
    { name: 'Success Green', role: 'Success States', hex: '#34d399' },
    { name: 'Error Red', role: 'Error States', hex: '#f87171' },
    { name: 'Warning Amber', role: 'Warning States', hex: '#fbbf24' },
];

export const INTERACTION_PRINCIPLES = [
    { title: 'Immediate Feedback', description: 'The system should provide immediate and clear feedback for every user action. This includes loading states, success messages, and error notifications to keep the user informed about what is happening.' },
    { title: 'Consistency', description: 'UI elements and interaction patterns should be consistent throughout the application. This reduces the cognitive load on the user, as they can predict how different parts of the UI will behave.' },
    { title: 'Clarity and Simplicity', description: 'The interface should be clean, uncluttered, and easy to understand. Avoid jargon and complex workflows. Prioritize the most important actions and information to guide the user.' },
    { title: 'User Control', description: 'Users should feel in control of the application. Provide clear ways to navigate, undo actions, and customize their experience. Avoid unexpected changes or modal dialogs that interrupt their workflow without their consent.' },
];

export const ARCHITECTURE_DIAGRAM = `
  [Frontend: React + TypeScript]
           |
           v
  [UI Components (TailwindCSS)]
           |
           v
  [State Management & Hooks] --- (useFileSystem, useState)
           |
           |----------------------> [Services] --- (geminiService.ts)
           |                              |
           v                              v
  [File System Access API]        [Gemini API]
  (Local Directory)                 (Cloud AI)
`;
