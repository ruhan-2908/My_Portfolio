import { motion } from "framer-motion";
import { useState } from "react";
import { usePortfolio, Section, ViewMode } from "@/contexts/PortfolioContext";
import { User, Cpu, FolderKanban, GitBranch, ArrowLeft, Layers, Clock, FileText, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const sections: { id: Section; label: string; systemLabel: string; icon: typeof User }[] = [
  { id: "identity", label: "Identity", systemLabel: "Target Overview", icon: User },
  { id: "skills", label: "Skills", systemLabel: "Detected Capabilities", icon: Cpu },
  { id: "projects", label: "Projects", systemLabel: "Case Files", icon: FolderKanban },
  { id: "timeline", label: "Timeline", systemLabel: "System Logs", icon: GitBranch },
];

const viewModes: { id: ViewMode; label: string; icon: typeof Layers }[] = [
  { id: "investigation", label: "Investigate", icon: Layers },
  { id: "timeline", label: "Versions", icon: Clock },
  { id: "caseStudy", label: "Cases", icon: FileText },
];

interface NavigationProps {
  onLaunchUbuntu?: () => void;
}

export function Navigation({ onLaunchUbuntu }: NavigationProps) {
  const { 
    activeSection, 
    setActiveSection, 
    viewMode, 
    setViewMode,
    setHasEnteredPortfolio,
    setRole 
  } = usePortfolio();

  const handleBack = () => {
    setHasEnteredPortfolio(false);
    setRole(null);
    setActiveSection(null);
  };

  const handleViewModeClick = (mode: ViewMode) => {
    setViewMode(mode);
    // Navigate to relevant section based on mode
    if (mode === "investigation") {
      setActiveSection("identity");
    } else if (mode === "timeline") {
      setActiveSection("timeline");
    } else if (mode === "caseStudy") {
      setActiveSection("projects");
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-card/80 backdrop-blur-xl border border-border shadow-card">
          {/* Left: Back button and logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-secondary transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2">
              <div className="status-indicator" />
              <span className="font-mono text-sm font-medium text-foreground">
                RUHAN 
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                
              </span>
            </div>
          </div>

          {/* Center: Section navigation */}
          <div className="flex items-center gap-1 bg-secondary/50 rounded-xl p-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "relative px-3 py-2 rounded-lg font-mono text-sm transition-all duration-200 flex items-center gap-2",
                  activeSection === section.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <section.icon className="w-4 h-4 relative z-10" />
                <span className="hidden md:inline relative z-10">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Right: View mode anchors + Ubuntu button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-secondary/50 rounded-xl p-1">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleViewModeClick(mode.id)}
                  className={cn(
                    "relative px-3 py-2 rounded-lg font-mono text-xs transition-all duration-200 flex items-center gap-2",
                    viewMode === mode.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {viewMode === mode.id && (
                    <motion.div
                      layoutId="activeMode"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <mode.icon className="w-4 h-4 relative z-10" />
                  <span className="hidden lg:inline relative z-10">{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Ubuntu Mode Button */}
            {onLaunchUbuntu && (
              <button
                onClick={onLaunchUbuntu}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e95420]/10 hover:bg-[#e95420]/20 border border-[#e95420]/30 text-[#e95420] font-mono text-xs transition-all duration-200"
                title="Launch Ubuntu Mode (Experimental)"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden xl:inline">Ubuntu</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
