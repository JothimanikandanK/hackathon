import { Scale, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Scale className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <span className="font-display text-lg font-semibold">LegalAssist</span>
                <span className="block text-[10px] text-primary-foreground/60 uppercase tracking-wider">
                  AI-Powered
                </span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 font-body leading-relaxed">
              Empowering Indian SMEs with AI-powered legal contract analysis. 
              Understand your contracts, protect your business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Analyze Contract', 'Templates', 'Knowledge Base', 'Pricing', 'About Us'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/70 hover:text-accent transition-colors font-body"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contract Types */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contract Types</h4>
            <ul className="space-y-2">
              {[
                'Employment Agreements',
                'Vendor Contracts',
                'Lease Agreements',
                'Partnership Deeds',
                'Service Contracts',
              ].map((type) => (
                <li key={type}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors font-body"
                  >
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/70 font-body">
                  support@legalassist.ai
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/70 font-body">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-sm text-primary-foreground/70 font-body">
                  Mumbai, Maharashtra, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50 font-body">
              © 2024 LegalAssist AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-primary-foreground/50 hover:text-accent transition-colors font-body"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-primary-foreground/50 hover:text-accent transition-colors font-body"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-primary-foreground/50 hover:text-accent transition-colors font-body"
              >
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
