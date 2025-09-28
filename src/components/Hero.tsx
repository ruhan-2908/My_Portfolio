import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text animate-gradient-shift bg-[length:200%_200%]">
            RUHAN K.B.
          </h1>
          
          <div className="text-xl md:text-2xl font-mono text-accent-cyan mb-4 animate-fade-in-left animation-delay-300">
            <span className="text-foreground-muted">const </span>
            <span className="text-accent-gold">developer</span>
            <span className="text-foreground-muted"> = </span>
            <span className="text-primary">"Full Stack Developer"</span>
          </div>
          
          <p className="text-lg md:text-xl text-foreground-muted mb-4 animate-fade-in-right animation-delay-500">
            2nd Year CSE @ PSG Tech
          </p>
          
          <p className="text-base md:text-lg text-foreground-muted max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in animation-delay-700">
            Passionate about full-stack development with experience building web applications. 
            Currently enhancing my skills in Java and web technologies while maintaining strong 
            academic performance at PSG Tech.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in animation-delay-1000">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-3 rounded-lg glow-on-hover"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-primary-foreground font-semibold px-8 py-3 rounded-lg glow-on-hover"
            >
              Get In Touch
            </Button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full opacity-10 blur-xl animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-accent-purple to-accent-gold rounded-full opacity-10 blur-xl animate-float animation-delay-2000"></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent-cyan rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-cyan rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;