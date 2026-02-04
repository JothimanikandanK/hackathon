import { ShieldCheck, Zap, Globe, FileSearch, Scale, Users } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Risk Scoring',
    description: 'Get instant risk scores from 0-100 with clause-level breakdown identifying potential legal issues.',
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description: 'Upload your contract and receive comprehensive analysis in under 2 minutes.',
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Analyze contracts in English and Hindi with explanations in simple business language.',
  },
  {
    icon: FileSearch,
    title: 'Clause-by-Clause Review',
    description: 'Every clause explained in plain language with alternative suggestions where needed.',
  },
  {
    icon: Scale,
    title: 'Indian Law Compliance',
    description: 'Check compliance with Indian Contract Act and relevant business regulations.',
  },
  {
    icon: Users,
    title: 'SME Focused',
    description: 'Built specifically for small and medium business owners in India.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features for Business Owners
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Everything you need to understand, analyze, and protect your business interests 
            in any contract negotiation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-medium"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/0 group-hover:bg-accent rounded-b-xl transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
