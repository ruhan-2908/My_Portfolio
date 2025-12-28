import { identity, skills, projects, timeline } from "@/data/portfolioData";

export function AboutApp() {
  return (
    <div className="h-full bg-gradient-to-b from-[#300a24] to-[#2c001e] flex flex-col items-center justify-center p-8 text-center">
      {/* Logo */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e95420] to-[#77216f] flex items-center justify-center mb-6 shadow-lg shadow-[#e95420]/30">
        <span className="text-white text-4xl font-bold">RK</span>
      </div>

      <h1 className="text-white text-2xl font-medium mb-1">
        {identity.name}
      </h1>
      <p className="text-[#e95420] font-medium mb-4">
        {identity.title}
      </p>

      <p className="text-white/60 text-sm max-w-sm mb-6">
        Portfolio Edition • GNOME 45
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <div className="text-2xl font-bold text-white">{skills.length}</div>
          <div className="text-xs text-white/50">Skills</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{projects.length}</div>
          <div className="text-xs text-white/50">Projects</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{timeline.length}</div>
          <div className="text-xs text-white/50">Milestones</div>
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-3">
        <a
          href={`mailto:${identity.email}`}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
        >
          Email
        </a>
        <a
          href={`https://${identity.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={identity.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-[#e95420] hover:bg-[#ff6f3c] text-white text-sm transition-colors"
        >
          Portfolio
        </a>
      </div>

      <p className="text-white/30 text-xs mt-8">
        Author - RUHAN K.B.
      </p>
    </div>
  );
}
