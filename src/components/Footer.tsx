const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-card-border bg-background-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold gradient-text mb-2">RUHAN K.B.</h3>
            <p className="text-foreground-muted text-sm">
              Full Stack Developer | PSG Tech
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="https://github.com/ruhan-2908" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-accent-cyan transition-colors animated-underline"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/ruhankb29/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-accent-cyan transition-colors animated-underline"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:ruhankb29@gmail.com"
              className="text-foreground-muted hover:text-accent-cyan transition-colors animated-underline"
            >
              Email
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground-muted">
            <p>&copy; 2025 RUHAN K.B. All rights reserved.</p>
            <p className="font-mono">
              Designed with <span className="text-red-500">❤️</span> and lots of <span className="text-accent-cyan">coffee</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;