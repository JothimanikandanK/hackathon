import { AlertTriangle, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/types/contract';

interface RiskScoreCardProps {
  score: number;
  riskLevel: RiskLevel;
  contractType: string;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
}

const RiskScoreCard = ({
  score,
  riskLevel,
  contractType,
  highRiskCount,
  mediumRiskCount,
  lowRiskCount,
}: RiskScoreCardProps) => {
  const getRiskConfig = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return {
          icon: CheckCircle,
          label: 'Low Risk',
          color: 'text-risk-low',
          bgColor: 'bg-risk-low/10',
          borderColor: 'border-risk-low/30',
          description: 'This contract appears to have minimal risk factors.',
        };
      case 'medium':
        return {
          icon: AlertCircle,
          label: 'Medium Risk',
          color: 'text-risk-medium',
          bgColor: 'bg-risk-medium/10',
          borderColor: 'border-risk-medium/30',
          description: 'Some clauses require attention before signing.',
        };
      case 'high':
        return {
          icon: AlertTriangle,
          label: 'High Risk',
          color: 'text-risk-high',
          bgColor: 'bg-risk-high/10',
          borderColor: 'border-risk-high/30',
          description: 'Critical issues detected. Legal review recommended.',
        };
    }
  };

  const config = getRiskConfig(riskLevel);
  const Icon = config.icon;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className={cn('overflow-hidden border-2', config.borderColor)}>
      <CardHeader className={cn('pb-4', config.bgColor)}>
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-xl">Risk Assessment</CardTitle>
          <Badge variant={riskLevel === 'low' ? 'riskLow' : riskLevel === 'medium' ? 'riskMedium' : 'riskHigh'}>
            {config.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-body capitalize">
          {contractType.replace('_', ' ')} Contract
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Circular Progress */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                className={config.color}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  transition: 'stroke-dashoffset 1s ease-out',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn('font-display text-3xl font-bold', config.color)}>
                {score}
              </span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
        </div>

        {/* Risk Description */}
        <div className={cn('flex items-start gap-3 p-3 rounded-lg mb-4', config.bgColor)}>
          <Icon className={cn('w-5 h-5 mt-0.5', config.color)} />
          <p className="text-sm text-foreground font-body">{config.description}</p>
        </div>

        {/* Risk Breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-risk-high/5 border border-risk-high/20">
            <div className="text-2xl font-bold text-risk-high">{highRiskCount}</div>
            <div className="text-xs text-muted-foreground">High</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-risk-medium/5 border border-risk-medium/20">
            <div className="text-2xl font-bold text-risk-medium">{mediumRiskCount}</div>
            <div className="text-xs text-muted-foreground">Medium</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-risk-low/5 border border-risk-low/20">
            <div className="text-2xl font-bold text-risk-low">{lowRiskCount}</div>
            <div className="text-xs text-muted-foreground">Low</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScoreCard;
