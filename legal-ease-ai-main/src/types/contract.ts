export type RiskLevel = 'low' | 'medium' | 'high';

export type ContractType = 
  | 'employment'
  | 'vendor'
  | 'lease'
  | 'partnership'
  | 'service'
  | 'nda'
  | 'unknown';

export interface ExtractedEntity {
  type: 'party' | 'date' | 'jurisdiction' | 'amount' | 'liability' | 'duration';
  value: string;
  confidence: number;
}

export interface ClauseAnalysis {
  id: string;
  title: string;
  originalText: string;
  simplifiedExplanation: string;
  riskLevel: RiskLevel;
  riskReason?: string;
  clauseType: 'obligation' | 'right' | 'prohibition' | 'definition' | 'general';
  suggestedAlternative?: string;
  flagged: boolean;
  flagReason?: string;
}

export interface RiskItem {
  id: string;
  category: string;
  description: string;
  severity: RiskLevel;
  clauseReference?: string;
  recommendation: string;
}

export interface ContractAnalysis {
  id: string;
  fileName: string;
  uploadedAt: Date;
  contractType: ContractType;
  language: 'english' | 'hindi' | 'mixed';
  
  // Overall metrics
  overallRiskScore: number; // 0-100
  riskLevel: RiskLevel;
  
  // Extracted data
  entities: ExtractedEntity[];
  clauses: ClauseAnalysis[];
  risks: RiskItem[];
  
  // Summary
  executiveSummary: string;
  keyFindings: string[];
  recommendations: string[];
}

export interface UploadedFile {
  file: File;
  preview?: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  progress: number;
  analysis?: ContractAnalysis;
  error?: string;
}
