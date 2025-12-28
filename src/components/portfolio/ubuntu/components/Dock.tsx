import { motion } from "framer-motion";
import { 
  Folder, Terminal, Globe, FileText, Settings, 
  Calculator, Activity, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WindowState, AppType } from "../types";

interface DockProps {
  windows: WindowState[];
  onOpenWindow: (type: AppType, title: string) => void;
  onRestoreWindow: (id: string) => void;
}

const dockApps: { type: AppType; icon: typeof Folder; label: string; color?: string }[] = [
  { type: "files", icon: Folder, label: "Files", color: "#e95420" },
  { type: "terminal", icon: Terminal, label: "Terminal", color: "#300a24" },
  { type: "browser", icon: Globe, label: "Firefox", color: "#ff7139" },
  { type: "texteditor", icon: FileText, label: "Text Editor", color: "#3465a4" },
  { type: "calculator", icon: Calculator, label: "Calculator", color: "#4a4a4a" },
  { type: "monitor", icon: Activity, label: "System Monitor", color: "#73d216" },
  { type: "settings", icon: Settings, label: "Settings", color: "#555" },
  { type: "about", icon: Info, label: "About", color: "#77216f" },
];

export function Dock({ windows, onOpenWindow, onRestoreWindow }: DockProps) {
  const handleClick = (app: typeof dockApps[0]) => {
    // Check if there's a minimized window of this type
    const minimizedWindow = windows.find(w => w.type === app.type && w.isMinimized);
    if (minimizedWindow) {
      onRestoreWindow(minimizedWindow.id);
    } else {
      onOpenWindow(app.type, app.label);
    }
  };

  const getWindowsOfType = (type: AppType) => 
    windows.filter(w => w.type === type);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      className="absolute left-0 top-1/2 -translate-y-1/2 w-[72px] py-3 bg-[#1a1a1a]/90 backdrop-blur-xl rounded-r-2xl flex flex-col items-center gap-1 shadow-2xl border-r border-y border-white/10"
    >
      {dockApps.map((app, index) => {
        const appWindows = getWindowsOfType(app.type);
        const isOpen = appWindows.length > 0;
        const hasMinimized = appWindows.some(w => w.isMinimized);
        
        return (
          <motion.div
            key={app.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="relative group"
          >
            <motion.button
              whileHover={{ scale: 1.15, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(app)}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200",
                "hover:bg-white/10",
                isOpen && !hasMinimized && "bg-white/5"
              )}
              style={{
                boxShadow: isOpen ? `0 0 20px ${app.color}40` : undefined
              }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: app.color }}
              >
                <app.icon className="w-5 h-5 text-white" />
              </div>
            </motion.button>
            
            {/* Running indicator */}
            {isOpen && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r"
                style={{ 
                  height: `${Math.min(appWindows.length * 8, 24)}px`,
                  backgroundColor: app.color 
                }}
              />
            )}

            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              <div className="bg-[#2d2d2d] text-white text-sm px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-white/10">
                {app.label}
                {appWindows.length > 1 && (
                  <span className="ml-2 text-white/50">({appWindows.length})</span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Separator */}
      <div className="w-8 h-px bg-white/20 my-2" />

      {/* Show minimized windows */}
      {windows.filter(w => w.isMinimized).map((window) => (
        <motion.button
          key={window.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRestoreWindow(window.id)}
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all relative group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#3d3d3d] flex items-center justify-center">
            <span className="text-white/60 text-xs font-mono truncate max-w-[32px]">
              {window.title.substring(0, 3)}
            </span>
          </div>
          
          {/* Minimized badge */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-[#e95420]" />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            <div className="bg-[#2d2d2d] text-white text-sm px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-white/10">
              {window.title} (minimized)
            </div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
