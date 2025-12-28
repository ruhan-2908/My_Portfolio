import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FileText } from "lucide-react";
import { useWindowManager } from "./hooks/useWindowManager";
import { TopBar } from "./components/TopBar";
import { Dock } from "./components/Dock";
import { Window } from "./components/Window";
import { TerminalApp } from "./apps/TerminalApp";
import { FileManagerApp } from "./apps/FileManagerApp";
import { CalculatorApp } from "./apps/CalculatorApp";
import { SystemMonitorApp } from "./apps/SystemMonitorApp";
import { SettingsApp } from "./apps/SettingsApp";
import { AboutApp } from "./apps/AboutApp";
import { BrowserApp } from "./apps/BrowserApp";
import { TextEditorApp } from "./apps/TextEditorApp";
import { AppType, Notification } from "./types";
import { buildFileSystem, getItemAtPath } from "./fileSystem";

const fileSystem = buildFileSystem();

interface UbuntuDesktopProps {
  onExit: () => void;
}

export function UbuntuDesktop({ onExit }: UbuntuDesktopProps) {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
    restoreWindow,
  } = useWindowManager();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Welcome!",
      message: "Ubuntu Portfolio Mode is ready to explore.",
      timestamp: new Date(),
      read: false,
    },
  ]);

  const handleClearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const handleOpenWindow = useCallback((type: AppType, title: string, content?: string) => {
    openWindow(type, title, content);
  }, [openWindow]);

  const renderAppContent = (type: AppType, content?: string) => {
    switch (type) {
      case "terminal":
        return <TerminalApp />;
      case "files":
        return <FileManagerApp openWindow={handleOpenWindow} />;
      case "calculator":
        return <CalculatorApp />;
      case "monitor":
        return <SystemMonitorApp />;
      case "settings":
        return <SettingsApp />;
      case "about":
        return <AboutApp />;
      case "browser":
        return <BrowserApp />;
      case "texteditor":
        return <TextEditorApp content={content} />;
      default:
        return <div className="p-4 text-white/60">App not found</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Ubuntu wallpaper */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #300a24 0%, #2c001e 50%, #200018 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #e95420 0%, transparent 40%),
                           radial-gradient(circle at 80% 70%, #77216f 0%, transparent 40%)`,
        }} />
      </div>

      {/* Top bar */}
      <TopBar 
        onExit={onExit}
        onOpenSettings={() => handleOpenWindow("settings", "Settings")}
        onOpenAbout={() => handleOpenWindow("about", "About")}
        notifications={notifications}
        onClearNotification={handleClearNotification}
      />

      {/* Desktop icons */}
      <div className="absolute top-12 right-4 flex flex-col gap-3 pt-4">
        {[
          { icon: Folder, label: "Home", action: () => handleOpenWindow("files", "Files") },
          { icon: FileText, label: "About.txt", action: () => handleOpenWindow("texteditor", "About.txt", getItemAtPath(fileSystem, ["home", "ruhan", "About.txt"])?.content) },
          { icon: FileText, label: "Resume.pdf", action: () => handleOpenWindow("texteditor", "Resume.pdf", getItemAtPath(fileSystem, ["home", "ruhan", "Resume.pdf"])?.content) },
        ].map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors group w-20"
          >
            <item.icon className="w-10 h-10 text-white/80 group-hover:text-white" />
            <span className="text-white/80 text-xs text-center group-hover:text-white">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Dock */}
      <Dock 
        windows={windows}
        onOpenWindow={handleOpenWindow}
        onRestoreWindow={restoreWindow}
      />

      {/* Windows */}
      <AnimatePresence>
        {windows.map((window) => (
          !window.isMinimized && (
            <Window
              key={window.id}
              window={window}
              isActive={activeWindowId === window.id}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onFocus={() => bringToFront(window.id)}
              onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
              onSizeChange={(size) => updateWindowSize(window.id, size)}
            >
              {renderAppContent(window.type, window.content)}
            </Window>
          )
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
