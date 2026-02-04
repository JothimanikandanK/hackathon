import type { ContractAnalysis, ClauseAnalysis, RiskItem, ExtractedEntity, ContractType } from '@/types/contract';

// Mock data for demonstration purposes
// In production, this would be replaced with actual AI analysis

const mockClauses: ClauseAnalysis[] = [
  {
    id: '1',
    title: 'Indemnification Clause',
    originalText: 'The Service Provider shall indemnify, defend, and hold harmless the Client from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorney fees) arising out of or relating to the Service Provider\'s negligence or willful misconduct.',
    simplifiedExplanation: 'If the vendor makes mistakes or acts carelessly, they must cover all your losses and legal costs. This protects you financially if something goes wrong due to their fault.',
    riskLevel: 'low',
    clauseType: 'right',
    flagged: false,
  },
  {
    id: '2',
    title: 'Unilateral Termination',
    originalText: 'The Service Provider may terminate this Agreement at any time with thirty (30) days written notice, without cause. The Client may only terminate for material breach after providing sixty (60) days written notice and opportunity to cure.',
    simplifiedExplanation: 'The vendor can end this contract anytime with just 30 days notice, even without a reason. However, YOU can only cancel if they seriously violate the terms, and you must give them 60 days to fix the problem first.',
    riskLevel: 'high',
    riskReason: 'This creates an unfair advantage where the vendor can exit easily while you are bound to stricter termination conditions.',
    clauseType: 'prohibition',
    suggestedAlternative: 'Request equal termination rights: Both parties should be able to terminate with 30-60 days notice. Alternatively, negotiate for termination for convenience with a reasonable notice period for both parties.',
    flagged: true,
    flagReason: 'Unequal termination rights heavily favor the service provider',
  },
  {
    id: '3',
    title: 'Auto-Renewal Clause',
    originalText: 'This Agreement shall automatically renew for successive one (1) year periods unless either party provides written notice of non-renewal at least ninety (90) days prior to the end of the then-current term.',
    simplifiedExplanation: 'The contract will automatically continue for another year unless you send a cancellation letter 90 days before it ends. If you forget, you\'re locked in for another full year.',
    riskLevel: 'medium',
    riskReason: 'Auto-renewal with 90-day notice requirement can trap you in an unwanted contract if you miss the cancellation window.',
    clauseType: 'obligation',
    suggestedAlternative: 'Request a reminder notification clause 120 days before renewal, or negotiate a shorter notice period of 30-45 days.',
    flagged: true,
    flagReason: 'Long notice period for auto-renewal may lead to unintended contract extensions',
  },
  {
    id: '4',
    title: 'Limitation of Liability',
    originalText: 'In no event shall the Service Provider\'s total liability exceed the fees paid by Client in the twelve (12) months preceding the claim. The Service Provider shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
    simplifiedExplanation: 'If the vendor causes you harm, the maximum they\'ll pay is what you paid them in the last 12 months. They won\'t cover lost profits, business opportunities, or other indirect damages.',
    riskLevel: 'medium',
    riskReason: 'Your potential losses could significantly exceed this liability cap, leaving you exposed to substantial unrecovered damages.',
    clauseType: 'prohibition',
    suggestedAlternative: 'Negotiate for higher liability caps (e.g., 2-3x annual fees) or carve-outs for gross negligence, data breaches, or IP infringement.',
    flagged: false,
  },
  {
    id: '5',
    title: 'Intellectual Property Assignment',
    originalText: 'All work product, deliverables, and intellectual property created by the Service Provider in connection with this Agreement shall be the sole and exclusive property of the Client upon full payment.',
    simplifiedExplanation: 'Everything the vendor creates for you under this contract becomes YOUR property once you\'ve paid in full. You own all the work, ideas, and materials they produce.',
    riskLevel: 'low',
    clauseType: 'right',
    flagged: false,
  },
  {
    id: '6',
    title: 'Non-Compete Restriction',
    originalText: 'During the term of this Agreement and for a period of two (2) years thereafter, the Client agrees not to directly or indirectly engage any employee or contractor of the Service Provider.',
    simplifiedExplanation: 'You cannot hire anyone who works for the vendor during the contract and for 2 years after it ends. This prevents you from recruiting their talented staff.',
    riskLevel: 'medium',
    riskReason: 'Two years is a long restriction period that limits your ability to hire talented individuals you may have worked with.',
    clauseType: 'prohibition',
    suggestedAlternative: 'Negotiate to reduce the non-solicitation period to 6-12 months, or limit it only to employees directly involved in your project.',
    flagged: false,
  },
  {
    id: '7',
    title: 'Arbitration & Jurisdiction',
    originalText: 'Any disputes arising from this Agreement shall be resolved through binding arbitration in Mumbai, Maharashtra, in accordance with the Arbitration and Conciliation Act, 1996. The language of arbitration shall be English.',
    simplifiedExplanation: 'If there\'s a disagreement, it will be settled by an arbitrator in Mumbai (not in court). The decision will be final and legally binding.',
    riskLevel: 'low',
    clauseType: 'general',
    flagged: false,
  },
  {
    id: '8',
    title: 'Penalty for Delayed Payment',
    originalText: 'Late payments shall accrue interest at the rate of 24% per annum, compounded monthly. Client shall also be liable for all costs of collection, including reasonable attorney fees.',
    simplifiedExplanation: 'If you pay late, you\'ll be charged 24% annual interest (calculated monthly) on the overdue amount. You\'ll also have to pay their legal fees if they have to chase you for payment.',
    riskLevel: 'high',
    riskReason: '24% interest is significantly higher than standard commercial rates (typically 12-15%). This could lead to substantial additional costs.',
    clauseType: 'obligation',
    suggestedAlternative: 'Negotiate for a more reasonable interest rate of 12-15% per annum, and include a grace period of 7-10 days before interest begins to accrue.',
    flagged: true,
    flagReason: 'Excessive interest rate on late payments',
  },
];

const mockRisks: RiskItem[] = [
  {
    id: '1',
    category: 'Unequal Termination Rights',
    description: 'The service provider can terminate with 30 days notice without cause, while you need to prove material breach and give 60 days notice.',
    severity: 'high',
    clauseReference: 'Clause 2',
    recommendation: 'Negotiate for equal termination rights. Request the same 30-day notice period for both parties, or at minimum, mutual termination for convenience clause.',
  },
  {
    id: '2',
    category: 'Excessive Late Payment Penalty',
    description: 'Late payment interest at 24% per annum is significantly above market rates and may be considered unreasonable under Indian Contract Act.',
    severity: 'high',
    clauseReference: 'Clause 8',
    recommendation: 'Request reduction to 12-15% per annum, which is more aligned with RBI guidelines and commercial practice in India.',
  },
  {
    id: '3',
    category: 'Auto-Renewal Lock-in',
    description: 'The 90-day notice requirement for preventing auto-renewal creates a risk of unintended contract extensions.',
    severity: 'medium',
    clauseReference: 'Clause 3',
    recommendation: 'Add a clause requiring the vendor to send a renewal reminder 120 days before the term ends, or reduce notice period to 30-45 days.',
  },
  {
    id: '4',
    category: 'Limited Liability Cap',
    description: 'Liability is capped at 12 months of fees, which may not cover significant damages from service failures.',
    severity: 'medium',
    clauseReference: 'Clause 4',
    recommendation: 'Negotiate for higher caps (2-3x annual fees) or exceptions for gross negligence, data breaches, and confidentiality violations.',
  },
  {
    id: '5',
    category: 'Extended Non-Solicitation Period',
    description: 'Two-year non-solicitation of vendor employees may be overly restrictive for your business needs.',
    severity: 'medium',
    clauseReference: 'Clause 6',
    recommendation: 'Negotiate to reduce to 6-12 months, or limit the restriction to key personnel directly involved in your project.',
  },
  {
    id: '6',
    category: 'Strong IP Protection',
    description: 'Clear assignment of intellectual property to you upon payment provides good protection.',
    severity: 'low',
    clauseReference: 'Clause 5',
    recommendation: 'No changes needed. This clause is favorable and well-drafted.',
  },
  {
    id: '7',
    category: 'Appropriate Dispute Resolution',
    description: 'Mumbai arbitration under Indian law is suitable for domestic contracts.',
    severity: 'low',
    clauseReference: 'Clause 7',
    recommendation: 'Consider specifying a neutral arbitration institution like Mumbai Centre for International Arbitration (MCIA) for added procedural certainty.',
  },
];

const mockEntities: ExtractedEntity[] = [
  { type: 'party', value: 'TechSolutions Pvt. Ltd. (Service Provider)', confidence: 0.95 },
  { type: 'party', value: 'Your Company Name (Client)', confidence: 0.92 },
  { type: 'date', value: 'January 15, 2024 (Effective Date)', confidence: 0.98 },
  { type: 'date', value: 'January 14, 2025 (Initial Term End)', confidence: 0.97 },
  { type: 'jurisdiction', value: 'Mumbai, Maharashtra', confidence: 0.99 },
  { type: 'amount', value: '₹12,00,000 per annum', confidence: 0.94 },
  { type: 'duration', value: '12 months (Initial Term)', confidence: 0.96 },
  { type: 'liability', value: '₹12,00,000 (Liability Cap)', confidence: 0.91 },
];

function detectContractType(fileName: string): ContractType {
  const name = fileName.toLowerCase();
  if (name.includes('employ') || name.includes('hiring') || name.includes('job')) return 'employment';
  if (name.includes('vendor') || name.includes('supplier') || name.includes('purchase')) return 'vendor';
  if (name.includes('lease') || name.includes('rent') || name.includes('property')) return 'lease';
  if (name.includes('partner') || name.includes('jv') || name.includes('joint')) return 'partnership';
  if (name.includes('service') || name.includes('consult') || name.includes('agreement')) return 'service';
  if (name.includes('nda') || name.includes('confidential') || name.includes('disclosure')) return 'nda';
  return 'service'; // Default to service contract
}

export async function analyzeContract(file: File, onProgress: (progress: number) => void): Promise<ContractAnalysis> {
  // Simulate processing stages
  const stages = [
    { progress: 10, delay: 300 },
    { progress: 25, delay: 500 },
    { progress: 40, delay: 400 },
    { progress: 60, delay: 600 },
    { progress: 75, delay: 400 },
    { progress: 90, delay: 300 },
    { progress: 100, delay: 200 },
  ];

  for (const stage of stages) {
    await new Promise((resolve) => setTimeout(resolve, stage.delay));
    onProgress(stage.progress);
  }

  const contractType = detectContractType(file.name);
  const highRiskClauses = mockClauses.filter((c) => c.riskLevel === 'high').length;
  const mediumRiskClauses = mockClauses.filter((c) => c.riskLevel === 'medium').length;
  
  // Calculate overall risk score (lower is better)
  // High risk clauses contribute more to the score
  const riskScore = Math.min(100, Math.round(
    30 + (highRiskClauses * 20) + (mediumRiskClauses * 8)
  ));

  const riskLevel = riskScore >= 70 ? 'high' : riskScore >= 40 ? 'medium' : 'low';

  return {
    id: `analysis-${Date.now()}`,
    fileName: file.name,
    uploadedAt: new Date(),
    contractType,
    language: 'english',
    overallRiskScore: riskScore,
    riskLevel,
    entities: mockEntities,
    clauses: mockClauses,
    risks: mockRisks,
    executiveSummary: `This ${contractType} contract contains ${mockClauses.length} significant clauses with an overall risk score of ${riskScore}/100 (${riskLevel} risk). Our analysis identified ${highRiskClauses} high-priority issues requiring immediate attention, including unequal termination rights and excessive late payment penalties. ${mediumRiskClauses} clauses require review before signing. The contract follows standard Indian legal frameworks with Mumbai as the arbitration venue.`,
    keyFindings: [
      'Unequal termination rights favor the service provider - they can exit with 30 days notice while you need to prove breach',
      'Late payment penalty at 24% is above market rates and may be negotiable',
      'Auto-renewal with 90-day notice period could lead to unintended contract extensions',
      'IP assignment clause properly protects your ownership of deliverables',
      'Liability cap at 12 months of fees may be insufficient for major service failures',
    ],
    recommendations: [
      'Negotiate equal termination rights with 30-60 day notice for both parties',
      'Request reduction of late payment interest to 12-15% per annum',
      'Add a reminder clause for auto-renewal notifications 120 days before term end',
      'Consider increasing liability cap to 2-3x annual fees for critical services',
      'Have a legal professional review the modified terms before signing',
    ],
  };
}
