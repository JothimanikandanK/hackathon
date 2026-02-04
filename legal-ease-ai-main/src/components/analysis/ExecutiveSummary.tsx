import { FileText, AlertTriangle, CheckCircle, Download, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ContractAnalysis } from '@/types/contract';

interface ExecutiveSummaryProps {
  analysis: ContractAnalysis;
  onExport: () => void;
}

const ExecutiveSummary = ({ analysis, onExport }: ExecutiveSummaryProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="shadow-medium">
      <CardHeader className="border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-accent" />
              <CardTitle className="font-display text-xl">{analysis.fileName}</CardTitle>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="navy">
                {analysis.contractType.charAt(0).toUpperCase() + analysis.contractType.slice(1)} Contract
              </Badge>
              <Badge variant="gold">
                {analysis.language === 'english' ? 'English' : analysis.language === 'hindi' ? 'हिंदी' : 'Mixed'}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Analyzed on {formatDate(analysis.uploadedAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="gold" size="sm" className="gap-2" onClick={onExport}>
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Executive Summary */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">
            Executive Summary
          </h3>
          <p className="text-muted-foreground font-body leading-relaxed">
            {analysis.executiveSummary}
          </p>
        </div>

        {/* Key Findings */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">
            Key Findings
          </h3>
          <div className="space-y-2">
            {analysis.keyFindings.map((finding, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-foreground font-body">{finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">
            Recommendations
          </h3>
          <div className="space-y-2">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-risk-low/10 border border-risk-low/20">
                <CheckCircle className="w-4 h-4 text-risk-low mt-0.5 shrink-0" />
                <p className="text-sm text-foreground font-body">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extracted Entities */}
        {analysis.entities.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">
              Key Information Extracted
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {analysis.entities.map((entity, index) => (
                <div key={index} className="p-3 rounded-lg bg-card border border-border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {entity.type}
                  </div>
                  <div className="text-sm font-medium text-foreground">{entity.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;
