const Skills = () => {
  const skills = [
    { name: 'Java', category: 'Backend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'C', category: 'Programming' },
    { name: 'Git & GitHub', category: 'Tools' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend': return 'from-accent-cyan to-accent-blue';
      case 'Backend': return 'from-accent-purple to-accent-cyan';
      case 'Database': return 'from-accent-gold to-accent-cyan';
      case 'Programming': return 'from-accent-blue to-accent-purple';
      case 'Tools': return 'from-accent-cyan to-accent-gold';
      default: return 'from-accent-cyan to-accent-blue';
    }
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            🛠️ Tech Stack & Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-blue mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-tag p-4 rounded-lg text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(skill.category)} rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}></div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent-cyan transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-foreground-muted font-mono">
                {skill.category}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="glass-card p-8 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text-gold">🌱 Currently Learning</h3>
            <p className="text-lg text-accent-cyan font-mono mb-4">
              Passionate Learner & Exploring Modern Web Tech
            </p>
            <blockquote className="text-foreground-muted italic">
              💭 "The more you sweat in peace, the less you bleed in war."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;