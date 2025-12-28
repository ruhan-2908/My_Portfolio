import { motion } from "framer-motion";
import { timeline, TimelineEvent } from "@/data/portfolioData";
import { getRoleContent } from "@/data/roleBasedContent";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { cn } from "@/lib/utils";
import { GraduationCap, Briefcase, Rocket, Trophy } from "lucide-react";

const typeConfig = {
  education: { icon: GraduationCap, color: "bg-primary", borderColor: "border-primary" },
  experience: { icon: Briefcase, color: "bg-accent", borderColor: "border-accent" },
  project: { icon: Rocket, color: "bg-emerald-500", borderColor: "border-emerald-500" },
  achievement: { icon: Trophy, color: "bg-violet-500", borderColor: "border-violet-500" },
};

export function TimelineSection() {
  const { role } = usePortfolio();
  const roleContent = getRoleContent(role);
  
  // Filter timeline based on role focus types
  const focusTypes = roleContent?.timeline.focusTypes || Object.keys(typeConfig);
  const filteredTimeline = timeline.filter(event => focusTypes.includes(event.type));

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-28 pb-16 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm text-primary tracking-wider">
              04 // {roleContent?.timeline.headline.toUpperCase() || "SYSTEM LOGS"}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {roleContent?.timeline.headline || "Version History"}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {roleContent?.timeline.description || "A chronological record of professional development, milestones, and growth."}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {filteredTimeline.map((event, index) => (
              <TimelineItem 
                key={event.version} 
                event={event} 
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function TimelineItem({ 
  event, 
  index, 
  isLeft 
}: { 
  event: TimelineEvent; 
  index: number;
  isLeft: boolean;
}) {
  const config = typeConfig[event.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className={cn(
        "relative grid md:grid-cols-2 gap-4 md:gap-8",
        isLeft ? "md:text-right" : ""
      )}
    >
      {/* Content */}
      <div className={cn(
        "pl-16 md:pl-0",
        isLeft ? "md:pr-12" : "md:col-start-2 md:pl-12"
      )}>
        <div className={cn(
          "p-6 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated",
          config.borderColor,
          "border-l-4 md:border-l-0",
          isLeft ? "md:border-r-4" : "md:border-l-4"
        )}>
          {/* Version badge */}
          <div className="flex items-center gap-3 mb-3">
            <span className={cn(
              "px-2 py-0.5 rounded font-mono text-sm font-semibold",
              "bg-gradient-to-r from-primary/20 to-primary/10 text-primary"
            )}>
              {event.version}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {event.date}
            </span>
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            {event.title}
          </h3>
          
          <p className="text-muted-foreground mb-4">
            {event.description}
          </p>

          {/* Highlights */}
          <ul className={cn(
            "space-y-1",
            isLeft ? "md:text-left" : ""
          )}>
            {event.highlights.map((highlight, i) => (
              <li 
                key={i} 
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center icon - desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center border-4 border-background",
          config.color
        )}>
          <Icon className="w-6 h-6 text-background" />
        </div>
      </div>

      {/* Left icon - mobile */}
      <div className="md:hidden absolute left-0 top-6">
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center border-4 border-background",
          config.color
        )}>
          <Icon className="w-6 h-6 text-background" />
        </div>
      </div>

      {/* Empty space for grid alignment on desktop */}
      {isLeft && <div className="hidden md:block" />}
    </motion.div>
  );
}
