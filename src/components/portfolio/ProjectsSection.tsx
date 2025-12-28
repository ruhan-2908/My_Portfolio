import { motion } from "framer-motion";
import { useState } from "react";
import { projects, Project } from "@/data/portfolioData";
import { getRoleContent } from "@/data/roleBasedContent";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { cn } from "@/lib/utils";
import { ChevronRight, ExternalLink, Github, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { role } = usePortfolio();
  const roleContent = getRoleContent(role);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-28 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm text-primary tracking-wider">
              03 // {roleContent?.projects.headline.toUpperCase() || "CASE FILES"}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {roleContent?.projects.headline || "Project Case Studies"}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {roleContent?.projects.description || "Detailed analysis of engineering challenges, decisions, and outcomes."}
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedProject === project.id}
              onToggle={() => setExpandedProject(
                expandedProject === project.id ? null : project.id
              )}
              showSections={roleContent?.projects.showSections}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ProjectCard({ 
  project, 
  index, 
  isExpanded, 
  onToggle,
  showSections
}: { 
  project: Project; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  showSections?: string[];
}) {
  const statusConfig = {
    completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    "in-progress": { icon: Clock, color: "text-accent", bg: "bg-accent/10" },
    planned: { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-muted" },
  };

  const status = statusConfig[project.status];

  // Determine which sections to show based on role
  const shouldShow = (section: string) => {
    if (!showSections) return true;
    return showSections.includes(section);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isExpanded 
          ? "bg-card border-primary/30 shadow-elevated" 
          : "bg-card border-border shadow-card hover:border-primary/20"
      )}
    >
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-muted-foreground">
              {project.codename}
            </span>
            <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full", status.bg)}>
              <status.icon className={cn("w-3 h-3", status.color)} />
              <span className={cn("font-mono text-xs capitalize", status.color)}>
                {project.status.replace("-", " ")}
              </span>
            </div>
          </div>
          
          <h3 className="font-display text-xl font-semibold text-foreground mb-1">
            {project.name}
          </h3>
          <p className="text-muted-foreground">
            {project.description}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-6">
          <div className="h-px bg-border" />

          {/* Problem */}
          {shouldShow("problem") && (
            <div>
              <h4 className="font-mono text-sm text-primary uppercase tracking-wider mb-3">
                Problem Statement
              </h4>
              <p className="text-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {/* Constraints */}
          {shouldShow("constraints") && (
            <div>
              <h4 className="font-mono text-sm text-primary uppercase tracking-wider mb-3">
                Constraints
              </h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {project.constraints.map((constraint, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1.5">•</span>
                    {constraint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Design Decisions */}
          {shouldShow("designDecisions") && (
            <div>
              <h4 className="font-mono text-sm text-primary uppercase tracking-wider mb-3">
                Design Decisions
              </h4>
              <ul className="space-y-2">
                {project.designDecisions.map((decision, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="font-mono text-xs text-accent mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Implementation */}
          {shouldShow("implementation") && (
            <div>
              <h4 className="font-mono text-sm text-primary uppercase tracking-wider mb-3">
                Implementation
              </h4>
              <ul className="space-y-2">
                {project.implementation.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcome */}
          {shouldShow("outcome") && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-mono text-sm text-primary uppercase tracking-wider mb-2">
                Outcome
              </h4>
              <p className="text-foreground">
                {project.outcome}
              </p>
            </div>
          )}

          {/* Technologies */}
          {shouldShow("technologies") && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-secondary font-mono text-sm text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {project.links && (
            <div className="flex gap-4 pt-2">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline font-mono text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline font-mono text-sm"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
