import { ArrowRight, Shield, FileSearch, Scale, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const features = [
    'Risk Assessment & Scoring',
    'Plain Language Explanations',
    'Compliance Checking',
    'Export for Legal Review',
  ];

  return (
    <section className="relative min-h-[90vh] gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground/20 blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 right-[15%] animate-float hidden lg:block">
        <div className="w-16 h-16 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
          <FileSearch className="w-8 h-8 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-32 left-[10%] animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
        <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
          <Shield className="w-7 h-7 text-primary-foreground" />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8 animate-fade-in">
            <Scale className="w-4 h-4 text-accent" />
            <span className="text-sm font-body text-primary-foreground/90">
              Trusted by 500+ Indian SMEs
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            Understand Your Contracts.
            <span className="block text-accent">Protect Your Business.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 font-body mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            AI-powered legal assistant that analyzes complex contracts, identifies risks, 
            and provides actionable advice in plain language for Indian business owners.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button variant="hero" size="xl" onClick={onGetStarted} className="gap-2 group">
              Analyze Your Contract
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl">
              View Sample Analysis
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/5 border border-primary-foreground/10"
              >
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-sm font-body text-primary-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '10,000+', label: 'Contracts Analyzed' },
            { value: '₹50Cr+', label: 'Risks Identified' },
            { value: '99.2%', label: 'Accuracy Rate' },
            { value: '< 2 min', label: 'Average Analysis Time' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-body text-primary-foreground/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
