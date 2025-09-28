import ParticleBackground from '@/components/ParticleBackground';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import GitHubStats from '@/components/GitHubStats';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background relative overflow-x-hidden">
      <ParticleBackground />
      
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <GitHubStats />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
