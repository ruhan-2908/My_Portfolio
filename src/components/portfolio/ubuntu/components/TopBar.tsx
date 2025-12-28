import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, Battery, Volume2, ChevronDown, Power, Settings, 
  User, Moon, Sun, Bell, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Notification } from "../types";

interface TopBarProps {
  onExit: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  notifications: Notification[];
  onClearNotification: (id: string) => void;
}

export function TopBar({ 
  onExit, 
  onOpenSettings, 
  onOpenAbout,
  notifications,
  onClearNotification 
}: TopBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSystemMenu, setShowSystemMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="absolute top-0 left-0 right-0 h-8 bg-[#1a1a1a] flex items-center justify-between px-3 z-[200] select-none">
      {/* Left: Activities */}
      <div className="flex items-center gap-4">
        <button 
          className="text-white/90 text-sm font-medium hover:bg-white/10 px-3 py-1 rounded transition-colors"
        >
          Activities
        </button>
      </div>

      {/* Center: Date/Time */}
      <button 
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded transition-colors"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <span className="text-white/90 text-sm font-medium">
          {currentTime.toLocaleDateString("en-US", { 
            weekday: "short", 
            month: "short", 
            day: "numeric" 
          })}
        </span>
        <span className="text-white/90 text-sm">
          {currentTime.toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit" 
          })}
        </span>
        {unreadCount > 0 && (
          <span className="w-2 h-2 rounded-full bg-[#e95420] animate-pulse" />
        )}
      </button>

      {/* Right: System tray */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-1.5 hover:bg-white/10 rounded transition-colors"
        >
          <Bell className="w-4 h-4 text-white/80" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#e95420] text-[8px] text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* System menu trigger */}
        <button
          onClick={() => setShowSystemMenu(!showSystemMenu)}
          className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded transition-colors"
        >
          <Wifi className="w-4 h-4 text-white/80" />
          <Volume2 className="w-4 h-4 text-white/80" />
          <Battery className="w-4 h-4 text-white/80" />
          <ChevronDown className="w-3 h-3 text-white/60" />
        </button>

        {/* Exit button */}
        <button
          onClick={onExit}
          className="ml-2 px-3 py-1 rounded bg-[#e95420]/20 hover:bg-[#e95420]/40 text-[#e95420] text-xs font-mono transition-colors"
        >
          Exit
        </button>
      </div>

      {/* System Menu Dropdown */}
      <AnimatePresence>
        {showSystemMenu && (
          <>
            <div 
              className="fixed inset-0 z-[198]" 
              onClick={() => setShowSystemMenu(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-3 top-9 w-72 bg-[#2d2d2d] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-[199]"
            >
              {/* Quick toggles */}
              <div className="grid grid-cols-3 gap-2 p-3 border-b border-white/10">
                <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Wifi className="w-5 h-5 text-[#e95420]" />
                  <span className="text-white/60 text-xs">Wi-Fi</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Volume2 className="w-5 h-5 text-white/80" />
                  <span className="text-white/60 text-xs">Sound</span>
                </button>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {isDark ? (
                    <Moon className="w-5 h-5 text-[#e95420]" />
                  ) : (
                    <Sun className="w-5 h-5 text-white/80" />
                  )}
                  <span className="text-white/60 text-xs">Dark</span>
                </button>
              </div>

              {/* Sliders */}
              <div className="p-3 space-y-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-white/60" />
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-[#e95420] rounded-full" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-white/60" />
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#e95420] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="p-2">
                <button
                  onClick={() => {
                    onOpenSettings();
                    setShowSystemMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-4 h-4 text-white/60" />
                  <span className="text-white/90 text-sm">Settings</span>
                </button>
                <button
                  onClick={() => {
                    onOpenAbout();
                    setShowSystemMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <User className="w-4 h-4 text-white/60" />
                  <span className="text-white/90 text-sm">About This System</span>
                </button>
                <div className="h-px bg-white/10 my-2" />
                <button
                  onClick={onExit}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Power className="w-4 h-4 text-[#e95420]" />
                  <span className="text-white/90 text-sm">Power Off / Exit</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <div 
              className="fixed inset-0 z-[198]" 
              onClick={() => setShowNotifications(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-1/2 -translate-x-1/2 top-9 w-80 bg-[#2d2d2d] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-[199]"
            >
              <div className="p-3 border-b border-white/10">
                <h3 className="text-white font-medium">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-white/40 text-sm">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "p-3 border-b border-white/5 flex items-start gap-3",
                        !notif.read && "bg-white/5"
                      )}
                    >
                      <div className="flex-1">
                        <p className="text-white/90 text-sm font-medium">{notif.title}</p>
                        <p className="text-white/60 text-xs mt-0.5">{notif.message}</p>
                      </div>
                      <button
                        onClick={() => onClearNotification(notif.id)}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <X className="w-3 h-3 text-white/40" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
