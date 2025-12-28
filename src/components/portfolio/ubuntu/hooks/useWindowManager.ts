import { useState, useCallback } from "react";
import { WindowState, AppType } from "../types";

const DEFAULT_SIZES: Record<AppType, { width: number; height: number }> = {
  files: { width: 800, height: 550 },
  terminal: { width: 700, height: 450 },
  browser: { width: 900, height: 600 },
  texteditor: { width: 750, height: 550 },
  settings: { width: 700, height: 500 },
  calculator: { width: 320, height: 480 },
  monitor: { width: 600, height: 400 },
  about: { width: 450, height: 500 },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const openWindow = useCallback((type: AppType, title: string, content?: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    // Check if window already exists
    const existingWindow = windows.find((w) => w.type === type && w.title === title);
    if (existingWindow) {
      setWindows(prev => 
        prev.map((w) => 
          w.id === existingWindow.id 
            ? { ...w, zIndex: newZIndex, isMinimized: false } 
            : w
        )
      );
      setActiveWindowId(existingWindow.id);
      return;
    }

    const size = DEFAULT_SIZES[type];
    const offset = (windows.length % 5) * 30;
    
    const newWindow: WindowState = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      content,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
      position: { x: 120 + offset, y: 60 + offset },
      size,
    };
    
    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  }, [windows, highestZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => 
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => 
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const bringToFront = useCallback((id: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setWindows(prev =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w
      )
    );
    setActiveWindowId(id);
  }, [highestZIndex]);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  }, []);

  const restoreWindow = useCallback((id: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setWindows(prev =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
      )
    );
    setActiveWindowId(id);
  }, [highestZIndex]);

  return {
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
  };
}
