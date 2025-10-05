import { useState, useCallback } from 'react';
import { FileSystemDirectoryHandle, FileSystemFileHandle } from 'native-fs-access';
import { FileItem, Project, FileType } from '../types';

function getFileType(fileName: string): FileType {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (!extension) return FileType.Unknown;

    const codeExtensions = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp', 'cs', 'go', 'rb', 'php', 'html', 'css', 'scss', 'json', 'xml', 'yaml', 'md'];
    const docExtensions = ['doc', 'docx', 'pdf', 'txt', 'rtf', 'odt'];
    const imgExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'];
    const backupExtensions = ['bak', 'tmp', 'old'];

    if (codeExtensions.includes(extension)) return FileType.Code;
    if (docExtensions.includes(extension)) return FileType.Document;
    if (imgExtensions.includes(extension)) return FileType.Image;
    if (backupExtensions.includes(extension)) return FileType.Backup;

    return FileType.Unknown;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function useFileSystem() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);

  const openDirectory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setFiles([]);
    setProjects([]);
    try {
      const handle = await window.showDirectoryPicker();
      setDirectoryHandle(handle);
      const tempFiles: FileItem[] = [];
      const tempProjects: Project[] = [];

      for await (const entry of handle.values()) {
        if (entry.kind === 'file') {
            const fileHandle = entry as FileSystemFileHandle;
            const file = await fileHandle.getFile();
            tempFiles.push({
                id: fileHandle.name + file.lastModified,
                name: fileHandle.name,
                type: getFileType(fileHandle.name),
                size: formatBytes(file.size),
                lastModified: new Date(file.lastModified).toLocaleDateString(),
                content_summary: `This is a ${getFileType(fileHandle.name)} file named ${fileHandle.name} with a size of ${formatBytes(file.size)}.`,
                handle: fileHandle,
            });
        } else if (entry.kind === 'directory') {
            const dirHandle = entry as FileSystemDirectoryHandle;
            // Simple project detection logic, can be expanded later
            tempProjects.push({
                id: dirHandle.name,
                name: dirHandle.name,
                description: 'A project directory. Contains multiple files and subdirectories that makeup a software project.',
                language: 'Mixed',
                progress: Math.floor(Math.random() * 100),
                lastCommit: `${Math.floor(Math.random() * 10) + 1} days ago`,
                content_summary: `This is a project directory named ${dirHandle.name}.`,
                handle: dirHandle,
            });
        }
      }
      setFiles(tempFiles);
      setProjects(tempProjects);

    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error("Error opening directory:", err);
        setError("Failed to open directory. Please check permissions and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { files, projects, isLoading, error, openDirectory, directoryHandle };
}
