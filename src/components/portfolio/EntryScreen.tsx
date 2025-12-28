import { motion } from "framer-motion";
import { usePortfolio, UserRole } from "@/contexts/PortfolioContext";
import { Users, Code, GraduationCap } from "lucide-react";

const roles = [
  {
    id: "recruiter" as UserRole,
    label: "Recruiter",
    description: "Evaluate potential and fit",
    icon: Users,
  },
  {
    id: "developer" as UserRole,
    label: "Developer",
    description: "Inspect technical depth",
    icon: Code,
  },
  {
    id: "peer" as UserRole,
    label: "Peer / Student",
    description: "Explore the journey",
    icon: GraduationCap,
  },
];

export function EntryScreen() {
  const { setRole, setHasEnteredPortfolio } = usePortfolio();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    setHasEnteredPortfolio(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 system-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-accent/5 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "20%", right: "15%" }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* System status indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="status-indicator" />
          <span className="font-mono text-sm text-muted-foreground tracking-wider">
            SYSTEM READY
          </span>
        </motion.div>

        {/* Main question */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          <span className="text-foreground">What are you here to</span>
          <br />
          <span className="text-gradient-primary">evaluate?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto"
        >
          Select your perspective to explore the portfolio through a tailored lens.
        </motion.p>

        {/* Role selection cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect(role.id)}
              className="group relative p-6 md:p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-elevated"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/10 transition-colors duration-300">
                  <role.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="font-display font-semibold text-xl mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {role.label}
                </h3>
                
                <p className="font-mono text-sm text-muted-foreground">
                  {role.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-primary/50 to-transparent" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Subtle footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 font-mono text-xs text-muted-foreground/60"
        >
          RUHAN K.B. // FULL STACK DEVELOPER // SYSTEM v3.0
        </motion.p>
      </div>
    </div>
  );
}
