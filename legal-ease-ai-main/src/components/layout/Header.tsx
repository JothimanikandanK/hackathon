import { Scale, Shield, FileText, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const Header = () => {
  const navItems = [
    { label: 'Analyze Contract', href: '#analyze' },
    { label: 'Templates', href: '#templates' },
    { label: 'Knowledge Base', href: '#knowledge' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-soft">
              <Scale className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold text-foreground">
                LegalAssist
              </span>
              <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">
                AI-Powered
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </Button>
            <Button variant="gold" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              Upload Contract
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-lg font-body text-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <hr className="my-4 border-border" />
                <Button variant="gold" className="gap-2 w-full">
                  <FileText className="h-4 w-4" />
                  Upload Contract
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
