import { AlertTriangle, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RiskItem } from '@/types/contract';

interface RiskListProps {
  risks: RiskItem[];
}

const RiskList = ({ risks }: RiskListProps) => {
  const highRisks = risks.filter((r) => r.severity === 'high');
  const mediumRisks = risks.filter((r) => r.severity === 'medium');
  const lowRisks = risks.filter((r) => r.severity === 'low');

  const getRiskIcon = (severity: RiskItem['severity']) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-risk-high" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-risk-medium" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-risk-low" />;
    }
  };

  const RiskSection = ({
    title,
    risks,
    severity,
  }: {
    title: string;
    risks: RiskItem[];
    severity: RiskItem['severity'];
  }) => {
    if (risks.length === 0) return null;

    const bgColor = {
      high: 'bg-risk-high/5 border-risk-high/20',
      medium: 'bg-risk-medium/5 border-risk-medium/20',
      low: 'bg-risk-low/5 border-risk-low/20',
    }[severity];

    return (
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          {getRiskIcon(severity)}
          {title} ({risks.length})
        </h3>
        <div className="space-y-3">
          {risks.map((risk) => (
            <Card key={risk.id} className={cn('border', bgColor)}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <Badge
                      variant={
                        severity === 'high'
                          ? 'riskHigh'
                          : severity === 'medium'
                          ? 'riskMedium'
                          : 'riskLow'
                      }
                      className="mb-2"
                    >
                      {risk.category}
                    </Badge>
                    <p className="text-sm text-foreground font-body">{risk.description}</p>
                  </div>
                  {risk.clauseReference && (
                    <button className="flex items-center gap-1 text-xs text-accent hover:underline shrink-0">
                      <ExternalLink className="w-3 h-3" />
                      View Clause
                    </button>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <p className="text-xs text-muted-foreground font-body">
                    <span className="font-semibold text-foreground">Recommendation: </span>
                    {risk.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Risk Analysis</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-risk-high" />
            {highRisks.length} High
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-risk-medium" />
            {mediumRisks.length} Medium
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-risk-low" />
            {lowRisks.length} Low
          </span>
        </div>
      </div>

      <RiskSection title="Critical Risks" risks={highRisks} severity="high" />
      <RiskSection title="Attention Required" risks={mediumRisks} severity="medium" />
      <RiskSection title="Minor Concerns" risks={lowRisks} severity="low" />

      {risks.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-risk-low mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            No Significant Risks Detected
          </h3>
          <p className="text-muted-foreground font-body">
            This contract appears to be well-structured with standard clauses.
          </p>
        </div>
      )}
    </div>
  );
};

export default RiskList;
