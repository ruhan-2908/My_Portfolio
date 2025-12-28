import { identity } from "@/data/portfolioData";
import { Globe, ExternalLink } from "lucide-react";

export function BrowserApp() {
  const links = [
    { label: "GitHub", url: "https://github.com/ruhan-2908", icon: "🐙" },
    { label: "LinkedIn", url: `https://${identity.linkedin}`, icon: "💼" },
    { label: "Portfolio", url: identity.portfolio, icon: "🌐" },
    { label: "Email", url: `mailto:${identity.email}`, icon: "📧" },
  ];

  const quickLinks = [
    { label: "React Docs", url: "https://react.dev" },
    { label: "TypeScript", url: "https://www.typescriptlang.org" },
    { label: "Tailwind CSS", url: "https://tailwindcss.com" },
    { label: "Node.js", url: "https://nodejs.org" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Browser toolbar */}
      <div className="h-10 bg-[#2d2d2d] flex items-center gap-2 px-3 border-b border-white/10">
        <div className="flex gap-1">
          <button className="w-8 h-8 rounded hover:bg-white/10 text-white/60 flex items-center justify-center">←</button>
          <button className="w-8 h-8 rounded hover:bg-white/10 text-white/60 flex items-center justify-center">→</button>
          <button className="w-8 h-8 rounded hover:bg-white/10 text-white/60 flex items-center justify-center">⟳</button>
        </div>
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e1e1e]">
          <Globe className="w-4 h-4 text-white/40" />
          <span className="text-white/60 text-sm">ruhan.portfolio.dev</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e95420] to-[#77216f] flex items-center justify-center mx-auto mb-4">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-white text-2xl font-medium mb-2">Quick Links</h1>
            <p className="text-white/50">Navigate to external resources</p>
          </div>

          {/* Main links */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors group"
              >
                <span className="text-3xl">{link.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{link.label}</p>
                  <p className="text-white/40 text-sm truncate">{link.url}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-white/60 text-sm uppercase tracking-wider mb-3">Developer Resources</h2>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white/80 text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
