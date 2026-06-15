import { InferenceRun, DynamoTrace } from './types';
import { saveInferenceRun, queryRuns, getStats } from './storage';

/**
 * Example: Logging a governed Groover action
 */
export function logGovernedAction(trace: DynamoTrace, actionType: string, threadId: string) {
  const run: InferenceRun = {
    runId: `run_${Date.now()}`,
    timestamp: new Date().toISOString(),
    agentDid: 'did:groover:284895bead2ac15b',
    promptHash: 'sha256:...',
    model: 'grok-4.3',
    dynamoTrace: trace,
    grooverActions: [{
      actionType: actionType as any,
      threadId,
      dynamoApproved: trace.fullBox7DVerdict === 'PASS' && trace.resonanceScore >= 0.80,
      dynamoTrace: trace,
    }],
    xrayDelegations: 1,
  };

  saveInferenceRun(run);
  console.log('Inference run logged:', run.runId);
}

// Demo query
export function demoResearchQuery() {
  const highResonance = queryRuns({ minResonance: 0.85, limit: 10 });
  const stats = getStats();
  console.log('High resonance runs:', highResonance.length);
  console.log('Overall stats:', stats);
}