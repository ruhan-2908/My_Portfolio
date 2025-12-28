import { motion } from "framer-motion";
import { identity } from "@/data/portfolioData";
import { getRoleContent } from "@/data/roleBasedContent";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { MapPin, Mail, Phone, Linkedin, ExternalLink, Globe } from "lucide-react";

export function IdentitySection() {
  const { role } = usePortfolio();
  const roleContent = getRoleContent(role);

  const stats = roleContent?.identity.stats || [
    { label: "Education", value: "B.E. CSE", sublabel: "PSG Tech" },
    { label: "Focus", value: "Full Stack", sublabel: "MERN + Spring" },
    { label: "Projects", value: "2+", sublabel: "Production Ready" },
    { label: "Status", value: "Open", sublabel: "For Opportunities" },
  ];

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
              01 {roleContent?.identity.headline.toUpperCase() || "TARGET OVERVIEW"}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main identity card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-2xl bg-card border border-border shadow-card relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-8">
                  {/* Avatar placeholder with initials */}
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border">
                    <span className="font-display text-3xl font-bold text-gradient-primary">
                      RK
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="status-indicator" />
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                        {identity.status}
                      </span>
                    </div>
                    
                    <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                      {identity.name}
                    </h1>
                    
                    <p className="font-mono text-lg text-primary">
                      {identity.title}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                  {identity.summary}
                </p>

                {/* Role-based emphasis tags */}
                {roleContent && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {roleContent.identity.emphasis.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-sm text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Languages */}
                <div className="flex flex-wrap gap-2">
                  {identity.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 rounded-full bg-secondary font-mono text-sm text-secondary-foreground"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            <ContactCard
              icon={MapPin}
              label="Location"
              value={identity.location}
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value={identity.email}
              href={`mailto:${identity.email}`}
            />
            <ContactCard
              icon={Phone}
              label="Phone"
              value={identity.phone}
              href={`tel:${identity.phone}`}
            />
            <ContactCard
              icon={Linkedin}
              label="LinkedIn"
              value="@ruhan29"
              href={`https://${identity.linkedin}`}
              external
            />
            <ContactCard
              icon={Globe}
              label="Portfolio"
              value="View Live"
              href={identity.portfolio}
              external
            />
          </motion.div>
        </div>

        {/* Stats row - role-based */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} label={stat.label} value={stat.value} sublabel={stat.sublabel} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function ContactCard({ 
  icon: Icon, 
  label, 
  value, 
  href, 
  external 
}: { 
  icon: typeof MapPin; 
  label: string; 
  value: string; 
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group interactive-card">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-foreground font-medium truncate">{value}</p>
        </div>
        {external && (
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return content;
}

function StatCard({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border text-center">
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="font-display text-2xl font-bold text-gradient-primary mb-1">
        {value}
      </p>
      <p className="font-mono text-sm text-muted-foreground">
        {sublabel}
      </p>
    </div>
  );
}
