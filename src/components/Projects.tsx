const Projects = () => {
  const projects = [
    {
      title: 'Login System',
      description: 'Secure authentication interface with form validation using Node.js and Express.',
      tech: ['Node.js', 'Express', 'JavaScript', 'HTML/CSS'],
      icon: '🔐'
    },
    {
      title: 'E-commerce Landing',
      description: 'Responsive product showcase page with CSS animations and dynamic layout.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      icon: '🛍️'
    },
    {
      title: 'Railway Reservation',
      description: 'CLI ticket booking system in C (team project) with structured approach.',
      tech: ['C', 'CLI', 'Team Project', 'Data Structures'],
      icon: '🚂'
    }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            📂 Projects
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills and passion for development.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-purple to-accent-gold mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300 glow-on-hover group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {project.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent-cyan transition-colors">
                {project.title}
              </h3>
              
              <p className="text-foreground-muted mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-background-tertiary text-accent-cyan text-sm rounded-full border border-accent-cyan/30 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-accent-cyan to-accent-blue text-primary-foreground py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  View Details
                </button>
                <button className="p-2 border border-accent-cyan text-accent-cyan rounded-lg hover:bg-accent-cyan hover:text-primary-foreground transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-accent-purple to-accent-cyan text-primary-foreground py-3 px-8 rounded-lg font-semibold hover:scale-105 transition-all duration-300 glow-on-hover">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;