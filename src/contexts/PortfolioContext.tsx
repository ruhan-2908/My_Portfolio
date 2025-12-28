import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "recruiter" | "developer" | "peer" | null;
export type ViewMode = "investigation" | "pipeline" | "timeline" | "caseStudy";
export type Section = "identity" | "skills" | "projects" | "timeline" | null;

interface PortfolioContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  hasEnteredPortfolio: boolean;
  setHasEnteredPortfolio: (entered: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("investigation");
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [hasEnteredPortfolio, setHasEnteredPortfolio] = useState(false);

  return (
    <PortfolioContext.Provider
      value={{
        role,
        setRole,
        viewMode,
        setViewMode,
        activeSection,
        setActiveSection,
        hasEnteredPortfolio,
        setHasEnteredPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
