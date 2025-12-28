import { motion } from "framer-motion";
import { skills } from "@/data/portfolioData";
import { getRoleContent } from "@/data/roleBasedContent";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { cn } from "@/lib/utils";

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  language: "Languages",
};

const categoryColors = {
  frontend: "from-primary to-primary/70",
  backend: "from-accent to-accent/70",
  database: "from-emerald-500 to-emerald-500/70",
  devops: "from-violet-500 to-violet-500/70",
  language: "from-rose-500 to-rose-500/70",
};

export function SkillsSection() {
  const { role } = usePortfolio();
  const roleContent = getRoleContent(role);
  
  // Filter skills based on role focus categories
  const focusCategories = roleContent?.skills.focusCategories || Object.keys(categoryLabels);
  
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Sort categories to show focused ones first
  const sortedCategories = Object.entries(groupedSkills).sort(([a], [b]) => {
    const aIndex = focusCategories.indexOf(a);
    const bIndex = focusCategories.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

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
              02 {roleContent?.skills.headline.toUpperCase() || "DETECTED CAPABILITIES"}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {roleContent?.skills.headline || "Technical Proficiencies"}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {roleContent?.skills.description || "Comprehensive analysis of technical capabilities across full-stack development domains."}
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCategories.map(([category, categorySkills], categoryIndex) => {
            const isFocused = focusCategories.includes(category);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                className={cn(
                  "p-6 rounded-2xl bg-card border shadow-card transition-all",
                  isFocused ? "border-primary/30" : "border-border opacity-75"
                )}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "w-3 h-3 rounded-full bg-gradient-to-br",
                    categoryColors[category as keyof typeof categoryColors]
                  )} />
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  {isFocused && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-xs">
                      Focus
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm text-foreground">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {skill.proficiency}%
                        </span>
                      </div>
                      
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ 
                            duration: 1, 
                            delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                            ease: "easeOut"
                          }}
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r",
                            categoryColors[category as keyof typeof categoryColors]
                          )}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech stack visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-8 rounded-2xl bg-card border border-border shadow-card"
        >
          <h3 className="font-display font-semibold text-xl text-foreground mb-6">
            Primary Stack
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {["React", "Node.js", "Express.js", "MongoDB", "Spring Boot", "TypeScript", "Tailwind CSS", "Git"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg bg-secondary border border-border font-mono text-sm text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
