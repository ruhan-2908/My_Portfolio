import { useState } from "react";
import { User, Palette, Bell, Monitor, Wifi, Shield, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { identity } from "@/data/portfolioData";

export function SettingsApp() {
  const [activeSection, setActiveSection] = useState("appearance");

  const sections = [
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "displays", label: "Displays", icon: Monitor },
    { id: "network", label: "Network", icon: Wifi },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "about", label: "About", icon: Info },
    { id: "users", label: "Users", icon: User },
  ];

  return (
    <div className="h-full flex bg-[#1e1e1e]">
      {/* Sidebar */}
      <div className="w-56 bg-[#2d2d2d] border-r border-white/10">
        <div className="p-4">
          <h2 className="text-white font-medium mb-4">Settings</h2>
          <div className="space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeSection === section.id
                    ? "bg-[#e95420] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeSection === "appearance" && (
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Appearance</h3>
            <div className="space-y-6">
              <div>
                <label className="text-white/60 text-sm block mb-2">Style</label>
                <div className="flex gap-3">
                  {["Dark", "Light", "Auto"].map(style => (
                    <button
                      key={style}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm transition-colors",
                        style === "Dark"
                          ? "bg-[#e95420] text-white"
                          : "bg-[#3d3d3d] text-white/60 hover:text-white"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-2">Accent Color</label>
                <div className="flex gap-2">
                  {["#e95420", "#77216f", "#3465a4", "#4e9a06", "#f5c211"].map(color => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-[#1e1e1e] transition-transform hover:scale-110",
                        color === "#e95420" ? "ring-white" : "ring-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "about" && (
          <div>
            <h3 className="text-white text-lg font-medium mb-4">About</h3>
            <div className="bg-[#2d2d2d] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e95420] to-[#77216f] flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">RK</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">{identity.name}</h4>
                  <p className="text-white/60 text-sm">{identity.title}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/40">Device Name</span>
                  <p className="text-white">ubuntu-portfolio</p>
                </div>
                <div>
                  <span className="text-white/40">OS Name</span>
                  <p className="text-white">Ubuntu Portfolio Edition</p>
                </div>
                <div>
                  <span className="text-white/40">OS Type</span>
                  <p className="text-white">64-bit</p>
                </div>
                <div>
                  <span className="text-white/40">GNOME Version</span>
                  <p className="text-white">45.0</p>
                </div>
                <div>
                  <span className="text-white/40">Windowing System</span>
                  <p className="text-white">Wayland</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "users" && (
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Users</h3>
            <div className="bg-[#2d2d2d] rounded-xl p-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e95420] to-[#77216f] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">ruhan</p>
                  <p className="text-white/50 text-sm">Administrator</p>
                </div>
                <span className="px-2 py-1 rounded bg-[#4e9a06]/20 text-[#4e9a06] text-xs">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}

        {activeSection === "notifications" && (
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Notifications</h3>
            <div className="space-y-4">
              {["Do Not Disturb", "Lock Screen Notifications", "Show Message Content"].map((setting, i) => (
                <div key={setting} className="flex items-center justify-between p-4 bg-[#2d2d2d] rounded-xl">
                  <span className="text-white/80">{setting}</span>
                  <button className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    i === 1 ? "bg-[#e95420]" : "bg-[#4d4d4d]"
                  )}>
                    <div className={cn(
                      "absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all",
                      i === 1 ? "right-0.5" : "left-0.5"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {["displays", "network", "privacy"].includes(activeSection) && (
          <div className="h-full flex items-center justify-center">
            <p className="text-white/40">Settings section coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
