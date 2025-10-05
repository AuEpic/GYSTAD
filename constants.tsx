import React from 'react';
import type { DevTask } from './types';
import { TaskStatus } from './types';

// Fix: Add constant definitions for icons, mock data, and theme colors.
// This resolves "Cannot find name" and module resolution errors.

export const ICONS = {
  code: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  document: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  backup: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h4M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h6m-6 4h6m-6-8h6" /></svg>,
  unknown: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  sparkles: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 2a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM9 12a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1zm-6 2a1 1 0 011 1v1h1a1 1 0 010 2H4v1a1 1 0 01-2 0v-1H1a1 1 0 010-2h1v-1a1 1 0 011-1z" clipRule="evenodd" /></svg>,
  close: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  searchOff: <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-neutral-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l.01.01" /></svg>,
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  tasks: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  design: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  interaction: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
  architecture: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  progress: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
};

export const MOCK_TASKS: DevTask[] = [
  { id: 1, title: 'Implement file system access hook', status: TaskStatus.Done, week: 1 },
  { id: 2, title: 'Create reusable Card components for files and projects', status: TaskStatus.Done, week: 1 },
  { id: 3, title: 'Integrate Gemini API for content analysis', status: TaskStatus.Done, week: 2 },
  { id: 4, title: 'Build AI analysis modal view', status: TaskStatus.InProgress, week: 2 },
  { id: 5, title: 'Develop main dashboard layout and view', status: TaskStatus.InProgress, week: 3 },
  { id: 6, title: 'Add settings page for API configuration', status: TaskStatus.Todo, week: 3 },
  { id: 7, title: 'Implement search and filtering functionality', status: TaskStatus.Todo, week: 4 },
  { id: 8, title: 'Refine UI/UX and add micro-interactions', status: TaskStatus.Todo, week: 4 },
];

export const DESIGN_SYSTEM_COLORS = [
    { name: 'Warm White', hex: '#FDFBF6', role: 'Primary Text', var: 'text-warm-white' },
    { name: 'Neutral Gray', hex: '#9393A2', role: 'Secondary Text, Borders', var: 'text-neutral-gray' },
    { name: 'Accent Blue', hex: '#3B82F6', role: 'Interactive Elements, Highlights', var: 'bg-accent-blue' },
    { name: 'Light Blue', hex: '#60A5FA', role: 'Accent Hover, Info Backgrounds', var: 'bg-light-blue' },
    { name: 'Success Green', hex: '#10B981', role: 'Success States, Confirmation', var: 'bg-success-green' },
    { name: 'Warning Amber', hex: '#F59E0B', role: 'Warnings, In-Progress', var: 'bg-warning-amber' },
    { name: 'Error Red', hex: '#EF4444', role: 'Errors, Destructive Actions', var: 'bg-error-red' },
    { name: 'Slate 800', hex: '#1E293B', role: 'Card, Modal Backgrounds', var: 'bg-slate-800' },
];

export const INTERACTION_PRINCIPLES = [
    { title: 'Responsive Feedback', description: 'Every user action should receive immediate and clear visual feedback. This includes hover states, click effects, loading indicators, and success/error messages. This reassures the user that their actions are being processed.' },
    { title: 'Clarity Over Clutter', description: 'Prioritize essential information and actions. Use progressive disclosure to hide secondary options until needed. A clean interface reduces cognitive load and helps users focus on their primary tasks.' },
    { title: 'Consistent and Predictable', description: 'UI elements and interaction patterns should behave consistently throughout the application. This builds user trust and makes the application easier to learn and navigate. Familiar icons and layouts aid in this predictability.' },
    { title: 'Direct Manipulation', description: 'Whenever possible, allow users to interact directly with objects on the screen (e.g., drag-and-drop, inline editing). This makes the interface feel more intuitive and tangible.' },
];

export const ARCHITECTURE_DIAGRAM = `
  +--------------------------------+
  |         React UI Layer         |
  | (Components, Views, Hooks)     |
  +--------------------------------+
               |
  +--------------v---------------+
  |       State Management       |
  | (React Context, useState)    |
  +------------------------------+
               |
  +--------------v---------------+
  |        Service Layer         |
  |   (e.g., geminiService.ts)   |
  +------------------------------+
      |                 |
+-----v-----+     +-----v----------------+
| Gemini API|     | File System Access API |
+-----------+     +----------------------+
`;
