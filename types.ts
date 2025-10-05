// Fix: Add definitions for File System Access API to resolve 'showDirectoryPicker' error.
// We are defining them here to avoid dependency issues and to provide types for the rest of the application.
import type { FileSystemDirectoryHandle as FSAccessDirectoryHandle, FileSystemFileHandle as FSAccessFileHandle } from 'native-fs-access';

declare global {
  interface Window {
    showDirectoryPicker(): Promise<FSAccessDirectoryHandle>;
  }
}

// Re-exporting with a more local name to be used within the app's types.
export type FileSystemDirectoryHandle = FSAccessDirectoryHandle;
export type FileSystemFileHandle = FSAccessFileHandle;


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

export enum TaskStatus {
  Todo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export interface DevTask {
  id: number;
  week: number;
  title: string;
  status: TaskStatus;
}

export type View = 'Dashboard' | 'Tasks' | 'Organization' | 'Design System' | 'Interaction' | 'Architecture' | 'Settings';

export interface AIAnalysisResult {
  category: string;
  tags: string[];
  summary: string;
  suggested_action: string;
}

export type AnalyzableItem = FileItem | Project;

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}
