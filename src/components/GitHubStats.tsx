const GitHubStats = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            📊 GitHub Stats
          </h2>
          <p className="text-foreground-muted text-lg">
            My coding journey in numbers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-blue mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-6 rounded-xl glow-on-hover">
            <h3 className="text-xl font-bold mb-4 text-center gradient-text-gold">GitHub Stats</h3>
            <div className="bg-background-tertiary rounded-lg p-4 border border-card-border">
              <img 
                src="https://github-readme-stats.vercel.app/api?username=ruhan-2908&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00FFFF&icon_color=3B82F6&text_color=C9D1D9" 
                alt="GitHub Stats"
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-xl glow-on-hover">
            <h3 className="text-xl font-bold mb-4 text-center gradient-text-gold">Most Used Languages</h3>
            <div className="bg-background-tertiary rounded-lg p-4 border border-card-border">
              <img 
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=ruhan-2908&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00FFFF&text_color=C9D1D9" 
                alt="Top Languages"
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="glass-card p-8 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">GitHub Activity</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-cyan mb-2">50+</div>
                <div className="text-foreground-muted text-sm">Commits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-blue mb-2">10+</div>
                <div className="text-foreground-muted text-sm">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-purple mb-2">5+</div>
                <div className="text-foreground-muted text-sm">Languages</div>
              </div>
            </div>
            <a 
              href="https://github.com/ruhan-2908" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-gradient-to-r from-accent-cyan to-accent-blue text-primary-foreground py-2 px-6 rounded-lg font-semibold hover:scale-105 transition-all duration-300 glow-on-hover"
            >
              Visit GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;