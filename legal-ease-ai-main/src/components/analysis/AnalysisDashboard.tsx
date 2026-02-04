import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Shield, AlertTriangle, Lightbulb } from 'lucide-react';
import RiskScoreCard from './RiskScoreCard';
import ExecutiveSummary from './ExecutiveSummary';
import ClauseCard from './ClauseCard';
import RiskList from './RiskList';
import type { ContractAnalysis } from '@/types/contract';

interface AnalysisDashboardProps {
  analysis: ContractAnalysis;
  onBack: () => void;
}

const AnalysisDashboard = ({ analysis, onBack }: AnalysisDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const highRiskCount = analysis.clauses.filter((c) => c.riskLevel === 'high').length;
  const mediumRiskCount = analysis.clauses.filter((c) => c.riskLevel === 'medium').length;
  const lowRiskCount = analysis.clauses.filter((c) => c.riskLevel === 'low').length;

  const handleExport = () => {
    // In a real implementation, this would generate a PDF
    console.log('Exporting analysis to PDF...');
    alert('PDF export functionality would be implemented with a backend service.');
  };

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 gap-2" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          Upload New Contract
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Risk Score */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <RiskScoreCard
                score={analysis.overallRiskScore}
                riskLevel={analysis.riskLevel}
                contractType={analysis.contractType}
                highRiskCount={highRiskCount}
                mediumRiskCount={mediumRiskCount}
                lowRiskCount={lowRiskCount}
              />
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 grid grid-cols-4 w-full max-w-lg">
                <TabsTrigger value="overview" className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="clauses" className="gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Clauses</span>
                </TabsTrigger>
                <TabsTrigger value="risks" className="gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="hidden sm:inline">Risks</span>
                </TabsTrigger>
                <TabsTrigger value="insights" className="gap-2">
                  <Lightbulb className="w-4 h-4" />
                  <span className="hidden sm:inline">Insights</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <ExecutiveSummary analysis={analysis} onExport={handleExport} />
              </TabsContent>

              <TabsContent value="clauses" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold">
                      Clause Analysis ({analysis.clauses.length} clauses)
                    </h2>
                  </div>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-3 pr-4">
                      {analysis.clauses.map((clause, index) => (
                        <ClauseCard key={clause.id} clause={clause} index={index} />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="risks" className="mt-0">
                <RiskList risks={analysis.risks} />
              </TabsContent>

              <TabsContent value="insights" className="mt-0">
                <div className="space-y-6">
                  <h2 className="font-display text-xl font-semibold">AI Insights & Recommendations</h2>
                  
                  {/* Compliance Note */}
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      Indian Law Compliance Notes
                    </h3>
                    <p className="text-sm text-muted-foreground font-body">
                      This contract has been analyzed against common provisions of the Indian Contract Act, 1872. 
                      Specific industry regulations may apply based on your business sector. Always consult with a 
                      qualified legal professional for compliance verification.
                    </p>
                  </div>

                  {/* Risk Mitigation Strategies */}
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-foreground">
                      Risk Mitigation Strategies
                    </h3>
                    {analysis.risks
                      .filter((r) => r.severity === 'high' || r.severity === 'medium')
                      .slice(0, 5)
                      .map((risk) => (
                        <div
                          key={risk.id}
                          className="p-4 rounded-lg bg-card border border-border shadow-soft"
                        >
                          <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-accent mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-foreground text-sm mb-1">
                                {risk.category}
                              </h4>
                              <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Disclaimer */}
                  <div className="p-4 rounded-lg bg-secondary border border-border">
                    <p className="text-xs text-muted-foreground font-body">
                      <strong>Disclaimer:</strong> This analysis is for informational purposes only and does not 
                      constitute legal advice. LegalAssist AI provides automated contract review to help identify 
                      potential issues, but should not replace professional legal counsel. For binding legal matters, 
                      please consult with a qualified attorney.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisDashboard;
