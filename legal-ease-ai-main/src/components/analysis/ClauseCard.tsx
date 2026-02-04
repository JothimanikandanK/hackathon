import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ClauseAnalysis } from '@/types/contract';

interface ClauseCardProps {
  clause: ClauseAnalysis;
  index: number;
}

const ClauseCard = ({ clause, index }: ClauseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskIcon = () => {
    switch (clause.riskLevel) {
      case 'low':
        return <CheckCircle className="w-4 h-4 text-risk-low" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-risk-medium" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-risk-high" />;
    }
  };

  const getClauseTypeBadge = () => {
    const variants: Record<string, string> = {
      obligation: 'bg-blue-100 text-blue-700 border-blue-200',
      right: 'bg-green-100 text-green-700 border-green-200',
      prohibition: 'bg-red-100 text-red-700 border-red-200',
      definition: 'bg-purple-100 text-purple-700 border-purple-200',
      general: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return variants[clause.clauseType] || variants.general;
  };

  return (
    <Card
      className={cn(
        'transition-all duration-200 overflow-hidden',
        clause.flagged && 'border-risk-high/50 bg-risk-high/5',
        isExpanded && 'shadow-medium'
      )}
    >
      <CardHeader
        className="cursor-pointer hover:bg-secondary/30 transition-colors p-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3">
          {/* Risk Indicator */}
          <div className="mt-1">{getRiskIcon()}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs text-muted-foreground font-body">
                Clause {index + 1}
              </span>
              <Badge
                variant={
                  clause.riskLevel === 'low'
                    ? 'riskLow'
                    : clause.riskLevel === 'medium'
                    ? 'riskMedium'
                    : 'riskHigh'
                }
              >
                {clause.riskLevel.charAt(0).toUpperCase() + clause.riskLevel.slice(1)} Risk
              </Badge>
              <span className={cn('text-xs px-2 py-0.5 rounded border', getClauseTypeBadge())}>
                {clause.clauseType.charAt(0).toUpperCase() + clause.clauseType.slice(1)}
              </span>
            </div>
            <h4 className="font-display font-semibold text-foreground">{clause.title}</h4>
            <p className="text-sm text-muted-foreground font-body mt-1 line-clamp-2">
              {clause.simplifiedExplanation}
            </p>
          </div>

          {/* Expand Button */}
          <Button variant="ghost" size="icon" className="shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 px-4 pb-4 border-t border-border">
          {/* Original Text */}
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-foreground mb-2 font-body">
              Original Contract Language
            </h5>
            <div className="p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-foreground font-body italic">
                "{clause.originalText}"
              </p>
            </div>
          </div>

          {/* Plain Language Explanation */}
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-foreground mb-2 font-body">
              What This Means for You
            </h5>
            <p className="text-sm text-muted-foreground font-body">
              {clause.simplifiedExplanation}
            </p>
          </div>

          {/* Risk Reason */}
          {clause.riskReason && (
            <div className="mt-4 p-3 rounded-lg bg-risk-medium/10 border border-risk-medium/30">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-risk-medium mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-1">Why This Matters</h5>
                  <p className="text-sm text-muted-foreground">{clause.riskReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Suggested Alternative */}
          {clause.suggestedAlternative && (
            <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-1">
                    Suggested Alternative
                  </h5>
                  <p className="text-sm text-muted-foreground">{clause.suggestedAlternative}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ClauseCard;
