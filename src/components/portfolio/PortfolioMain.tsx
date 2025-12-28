import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Navigation } from "./Navigation";
import { IdentitySection } from "./IdentitySection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { TimelineSection } from "./TimelineSection";
import { Terminal } from "./Terminal";
import { UbuntuDesktop } from "./ubuntu/UbuntuDesktop";
import { identity } from "@/data/portfolioData";
import { getRoleContent } from "@/data/roleBasedContent";
import { ArrowRight } from "lucide-react";

export function PortfolioMain() {
  const { activeSection, setActiveSection, role } = usePortfolio();
  const [showUbuntu, setShowUbuntu] = useState(false);
  const roleContent = getRoleContent(role);

  const roleLabels = {
    recruiter: "Evaluating potential",
    developer: "Inspecting technical depth",
    peer: "Exploring the journey",
  };

  if (showUbuntu) {
    return <UbuntuDesktop onExit={() => setShowUbuntu(false)} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Background effects */}
      <div className="fixed inset-0 system-grid opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      
      <Navigation onLaunchUbuntu={() => setShowUbuntu(true)} />

      <AnimatePresence mode="wait">
        {!activeSection ? (
          <HeroView 
            role={role} 
            roleLabel={roleLabels[role as keyof typeof roleLabels]}
            roleContent={roleContent}
            onSelectSection={setActiveSection} 
          />
        ) : (
          <>
            {activeSection === "identity" && <IdentitySection />}
            {activeSection === "skills" && <SkillsSection />}
            {activeSection === "projects" && <ProjectsSection />}
            {activeSection === "timeline" && <TimelineSection />}
          </>
        )}
      </AnimatePresence>

      {/* Terminal */}
      <Terminal />
    </div>
  );
}

function HeroView({ 
  role, 
  roleLabel,
  roleContent,
  onSelectSection 
}: { 
  role: string | null;
  roleLabel: string;
  roleContent: ReturnType<typeof getRoleContent>;
  onSelectSection: (section: "identity" | "skills" | "projects" | "timeline") => void;
}) {
  const quickLinks = [
    { 
      id: "identity" as const, 
      label: roleContent?.identity.headline || "View Profile", 
      description: roleContent?.identity.emphasis[0] || "Personal overview & contact" 
    },
    { 
      id: "skills" as const, 
      label: roleContent?.skills.headline || "Explore Skills", 
      description: roleContent?.skills.focusCategories.slice(0, 2).join(" & ") || "Technical capabilities" 
    },
    { 
      id: "projects" as const, 
      label: roleContent?.projects.headline || "Case Studies", 
      description: roleContent?.projects.showSections[0] || "Project deep-dives" 
    },
    { 
      id: "timeline" as const, 
      label: roleContent?.timeline.headline || "Version History", 
      description: roleContent?.timeline.focusTypes.join(" & ") || "Professional journey" 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Role indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8"
        >
          <div className="status-indicator" />
          <span className="font-mono text-sm text-muted-foreground">
            Mode: {roleLabel}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-foreground">{identity.name.split(" ")[0]}</span>
          <br />
          <span className="text-gradient-primary">{identity.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-xl text-primary mb-4"
        >
          {identity.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {identity.summary}
        </motion.p>

        {/* Quick navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {quickLinks.map((link, index) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSection(link.id)}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-left shadow-card hover:shadow-elevated"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <p className="font-mono text-sm text-muted-foreground capitalize">
                {link.description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Subtle footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 font-mono text-xs text-muted-foreground/50"
        >
          Press terminal icon to explore via CLI
        </motion.p>
      </div>
    </motion.div>
  );
}