import { FileText, Briefcase, Home, Handshake, Wrench, Lock, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const contractTypes = [
  {
    icon: Briefcase,
    title: 'Employment Agreements',
    description: 'Analyze hiring contracts, NDAs, non-compete clauses',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Wrench,
    title: 'Vendor Contracts',
    description: 'Review supplier agreements, SLAs, and terms',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: Home,
    title: 'Lease Agreements',
    description: 'Commercial & residential property contracts',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Handshake,
    title: 'Partnership Deeds',
    description: 'Business partnership and JV agreements',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: FileText,
    title: 'Service Contracts',
    description: 'Consulting, maintenance & service agreements',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
  },
  {
    icon: Lock,
    title: 'NDAs & IP Agreements',
    description: 'Confidentiality and intellectual property terms',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
];

const ContractTypesSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contract Types We Analyze
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Our AI is trained on thousands of Indian business contracts to provide accurate 
            analysis across all major contract categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contractTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.title}
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-lg flex items-center justify-center shrink-0',
                        type.bgColor
                      )}
                    >
                      <Icon className={cn('w-6 h-6', type.color)} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                        {type.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <a
            href="#knowledge"
            className="inline-flex items-center gap-2 text-accent hover:underline font-body"
          >
            <HelpCircle className="w-4 h-4" />
            View all supported contract types and FAQs
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContractTypesSection;
