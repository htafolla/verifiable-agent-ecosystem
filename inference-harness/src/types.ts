/**
 * Inference Research Harness - Core Types
 * Captures governed inference traces across Groover, Dynamo, and 0xRay
 */

export type Verdict = 'PASS' | 'NEEDS_REVISION' | 'REJECT';

export interface DynamoTrace {
  recommendation: Verdict;
  resonanceScore: number;
  isotopicRatio: number;
  fullBox7DComposite: number;
  fullBox7DVerdict: Verdict;
  hybrid4DComposite: number;
  waveVortexAlignment: number;
  gematriaTDF: number;
  trinitariumMoralScore?: number;
  isSolarHammer?: boolean;
  hammerReason?: string;
  solarActivityLevel: string;
  phaseAlignment: number;
  phaseType: 'push' | 'pull';
  isotope: string;
  timestamp: string;
}

export interface GrooverAction {
  actionType: 'reply' | 'comment' | 'upvote' | 'follow' | 'post';
  threadId: string;
  originalCommentId?: string;
  targetAgent?: string;
  content?: string;
  dynamoApproved: boolean;
  dynamoTrace: DynamoTrace;
}

export interface InferenceRun {
  runId: string;
  timestamp: string;
  agentDid: string;           // did:groover:284895bead2ac15b
  promptHash: string;
  model: string;
  dynamoTrace: DynamoTrace;
  grooverActions: GrooverAction[];
  xrayDelegations: number;
  researchNotes?: string;
}

export interface ResearchQuery {
  minResonance?: number;
  verdict?: Verdict;
  solarActivity?: string;
  dateRange?: { from: string; to: string };
  limit?: number;
}