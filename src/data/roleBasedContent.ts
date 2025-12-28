import { identity, skills, projects, timeline } from "./portfolioData";
import { UserRole } from "@/contexts/PortfolioContext";

export interface RoleContent {
  identity: {
    headline: string;
    emphasis: string[];
    stats: { label: string; value: string; sublabel: string }[];
  };
  skills: {
    headline: string;
    description: string;
    focusCategories: string[];
  };
  projects: {
    headline: string;
    description: string;
    showSections: string[];
  };
  timeline: {
    headline: string;
    description: string;
    focusTypes: string[];
  };
}

export const roleBasedContent: Record<NonNullable<UserRole>, RoleContent> = {
  recruiter: {
    identity: {
      headline: "Candidate Profile",
      emphasis: ["Available for hire", "Full-stack capable", "Quick learner"],
      stats: [
        { label: "Education", value: "B.E. CSE", sublabel: "PSG Tech (Top Tier)" },
        { label: "Experience", value: "Intern+", sublabel: "Industry Ready" },
        { label: "Projects", value: "2+", sublabel: "Production Apps" },
        { label: "Status", value: "Open", sublabel: "Immediate Join" },
      ],
    },
    skills: {
      headline: "Technical Competencies",
      description: "Industry-standard technologies with proven project experience.",
      focusCategories: ["backend", "frontend", "database"],
    },
    projects: {
      headline: "Delivered Solutions",
      description: "Real-world applications demonstrating professional readiness.",
      showSections: ["problem", "outcome", "technologies"],
    },
    timeline: {
      headline: "Career Trajectory",
      description: "Education and professional development milestones.",
      focusTypes: ["education", "experience"],
    },
  },
  developer: {
    identity: {
      headline: "Developer Profile",
      emphasis: ["MERN Stack", "Spring Boot", "System Design"],
      stats: [
        { label: "Stack", value: "Full", sublabel: "MERN + Spring" },
        { label: "Focus", value: "Backend", sublabel: "API Design" },
        { label: "Code", value: "Clean", sublabel: "Scalable" },
        { label: "Arch", value: "Micro", sublabel: "Service Ready" },
      ],
    },
    skills: {
      headline: "Tech Stack Analysis",
      description: "Deep dive into technical proficiencies and architectural patterns.",
      focusCategories: ["backend", "language", "devops"],
    },
    projects: {
      headline: "Technical Case Files",
      description: "Architecture decisions, constraints, and implementation details.",
      showSections: ["constraints", "designDecisions", "implementation", "technologies"],
    },
    timeline: {
      headline: "Technical Evolution",
      description: "Project-driven growth and skill acquisition timeline.",
      focusTypes: ["project", "achievement"],
    },
  },
  peer: {
    identity: {
      headline: "About Me",
      emphasis: ["Learning Journey", "Open Source", "Collaboration"],
      stats: [
        { label: "Currently", value: "B.E. CSE", sublabel: "PSG Tech" },
        { label: "Building", value: "Projects", sublabel: "Always" },
        { label: "Learning", value: "Daily", sublabel: "New Tech" },
        { label: "Vibe", value: "Chill", sublabel: "Let's Connect" },
      ],
    },
    skills: {
      headline: "What I Work With",
      description: "Technologies I use daily and ones I'm currently exploring.",
      focusCategories: ["frontend", "backend", "language"],
    },
    projects: {
      headline: "My Builds",
      description: "Personal projects and experiments - always building something.",
      showSections: ["problem", "implementation", "outcome"],
    },
    timeline: {
      headline: "My Journey",
      description: "From first line of code to building full-stack apps.",
      focusTypes: ["project", "education", "achievement"],
    },
  },
};

export function getRoleContent(role: UserRole): RoleContent | null {
  if (!role) return null;
  return roleBasedContent[role];
}
