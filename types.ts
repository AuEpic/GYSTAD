// Fix: Add definitions for types used across the application.
// This resolves "Cannot find name" and module resolution errors.
import type { FileSystemDirectoryHandle, FileSystemFileHandle } from 'native-fs-access';

export type View = 'Dashboard' | 'Tasks' | 'Design System' | 'Interaction' | 'Architecture' | 'Settings' | 'Organization Progress';

export enum FileType {
  Code = 'Code',
  Document = 'Document',
  Image = 'Image',
  Backup = 'Backup',
  Unknown = 'Unknown',
}

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  lastModified: string;
  content_summary: string;
  handle: FileSystemFileHandle;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  progress: number;
  lastCommit: string;
  content_summary: string;
  handle: FileSystemDirectoryHandle;
}

export type AnalyzableItem = FileItem | Project;

export interface AIAnalysisResult {
  category: string;
  tags: string[];
  summary: string;
  suggested_action: string;
}

export enum TaskStatus {
  Todo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export interface DevTask {
  id: number;
  title: string;
  status: TaskStatus;
  week: number;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}

// Fix: Add type definition for window.showDirectoryPicker to resolve TypeScript error.
declare global {
  interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  }
}
