export interface WindowState {
  id: string;
  type: AppType;
  title: string;
  content?: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export type AppType = 
  | "files" 
  | "terminal" 
  | "browser" 
  | "texteditor" 
  | "settings" 
  | "calculator"
  | "monitor"
  | "about";

export interface FileSystemItem {
  name: string;
  type: "file" | "folder";
  content?: string;
  icon?: string;
  children?: FileSystemItem[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
