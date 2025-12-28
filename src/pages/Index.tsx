import { AnimatePresence } from "framer-motion";
import { PortfolioProvider, usePortfolio } from "@/contexts/PortfolioContext";
import { EntryScreen } from "@/components/portfolio/EntryScreen";
import { PortfolioMain } from "@/components/portfolio/PortfolioMain";

function PortfolioContent() {
  const { hasEnteredPortfolio } = usePortfolio();

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <AnimatePresence mode="wait">
        {!hasEnteredPortfolio ? (
          <EntryScreen key="entry" />
        ) : (
          <PortfolioMain key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}

const Index = () => {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
};

export default Index;
