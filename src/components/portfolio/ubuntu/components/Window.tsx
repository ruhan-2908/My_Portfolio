import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { WindowState, AppType } from "../types";
import { cn } from "@/lib/utils";

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export function Window({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  children,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    });
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    if (window.isMaximized) return;
    onFocus();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        onPositionChange({
          x: e.clientX - dragOffset.x,
          y: Math.max(32, e.clientY - dragOffset.y),
        });
      }
      
      if (isResizing && resizeDirection && !window.isMaximized) {
        const newSize = { ...window.size };
        const newPosition = { ...window.position };
        
        if (resizeDirection.includes('e')) {
          newSize.width = Math.max(300, e.clientX - window.position.x);
        }
        if (resizeDirection.includes('s')) {
          newSize.height = Math.max(200, e.clientY - window.position.y);
        }
        if (resizeDirection.includes('w')) {
          const diff = window.position.x - e.clientX;
          newSize.width = Math.max(300, window.size.width + diff);
          newPosition.x = e.clientX;
        }
        if (resizeDirection.includes('n')) {
          const diff = window.position.y - e.clientY;
          newSize.height = Math.max(200, window.size.height + diff);
          newPosition.y = Math.max(32, e.clientY);
        }
        
        onSizeChange(newSize);
        if (resizeDirection.includes('w') || resizeDirection.includes('n')) {
          onPositionChange(newPosition);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeDirection, window, onPositionChange, onSizeChange]);

  const handleDoubleClick = () => {
    onMaximize();
  };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        left: window.isMaximized ? 72 : window.position.x,
        top: window.isMaximized ? 32 : window.position.y,
        width: window.isMaximized ? "calc(100% - 72px)" : window.size.width,
        height: window.isMaximized ? "calc(100% - 32px)" : window.size.height,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ zIndex: window.zIndex }}
      className={cn(
        "absolute rounded-xl overflow-hidden shadow-2xl",
        isActive ? "ring-2 ring-[#e95420]/50" : "",
        !window.isMaximized && "resize"
      )}
      onClick={onFocus}
    >
      {/* Window title bar */}
      <div
        className={cn(
          "h-10 flex items-center justify-between px-4 cursor-move select-none",
          isActive ? "bg-[#2d2d2d]" : "bg-[#252525]"
        )}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#e95420] hover:bg-[#ff6f3c] transition-colors flex items-center justify-center group"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-white">×</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#f5c211] hover:bg-[#ffd740] transition-colors flex items-center justify-center group"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-[#333]">−</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#5ac05a] hover:bg-[#6fda6f] transition-colors flex items-center justify-center group"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-white">□</span>
          </button>
        </div>
        
        <span className={cn(
          "text-sm font-medium truncate max-w-[50%] absolute left-1/2 -translate-x-1/2",
          isActive ? "text-white/90" : "text-white/60"
        )}>
          {window.title}
        </span>
        
        <div className="w-16" />
      </div>

      {/* Window content */}
      <div 
        className="bg-[#1e1e1e] overflow-hidden"
        style={{ height: "calc(100% - 40px)" }}
      >
        {children}
      </div>

      {/* Resize handles */}
      {!window.isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-2 h-full cursor-ew-resize"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute top-0 right-0 w-2 h-full cursor-ew-resize"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div
            className="absolute top-0 left-0 w-full h-2 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
        </>
      )}
    </motion.div>
  );
}
