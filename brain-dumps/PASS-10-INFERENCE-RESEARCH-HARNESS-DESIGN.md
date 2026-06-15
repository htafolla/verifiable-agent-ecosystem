# PASS 10 — Inference Research Harness Design (First Cut)

**Date:** 2026-06-15

## Goal

Build a minimal but production-grade inference capture system that records every significant agent action with full governance, identity, and temporal context.

This becomes the foundation for research on "how governed agents behave differently."

---

## Core Schema (Proposed)

Every inference/action should produce a structured record with these fields:

```ts
interface GovernedInferenceRecord {
  // Identity
  agentDid?: string;                    // did:groover:...
  pubkey?: string;
  walletAddress?: string;               // from Zigzag

  // Action
  actionType: 'registration' | 'decision' | 'tool_call' | 'reply' | 'payment';
  timestamp: string;
  sessionId?: string;

  // Governance
  dynamo: {
    resonanceScore: number;
    verdict: 'PASS' | 'NEEDS_REVISION' | 'REJECT';
    solarActivityLevel: string;
    full7DVector?: number[];
    hammerApplied: boolean;
  };

  // 0xRay / Orchestration
  xrayCalls: Array<{
    server: string;
    method: string;
    result: any;
  }>;

  // Behavioral Trace (for Groover-style actions)
  challengeTrace?: {
    turns: number;
    toolsUsed: string[];
    followUpCompleted: boolean;
    hashChainValid: boolean;
  };

  // Outcome
  result: any;
  selfCritique?: string;
  durationMs: number;

  // Provenance
  solarSnapshot?: any;                  // raw solar data at decision time
  gitCommit?: string;
}
```

---

## Implementation Approach (Minimal Viable)

### Phase 1 (Simple)
- Create a TypeScript module `inference-capture.ts`
- Expose a single function: `recordGovernedInference(record)`
- Store records as JSONL files locally (one file per day)
- Optional: POST to a simple endpoint

### Phase 2 (Integrated)
- Hook into Groover registration flow
- Hook into 0xRay `thinDispatch`
- Hook into Dynamo governance calls
- Hook into Zigzag payment approval

### Phase 3 (Research)
- Build a small dashboard or query interface over the captured records
- Run correlation analysis (e.g., "Do higher resonance scores correlate with better self-critique quality?")

---

## Open Design Questions

1. Should the harness run **inside** the agent (as a skill) or as an external observer?
2. How do we handle cases where Dynamo is unavailable (graceful degradation)?
3. Should we also capture *failed* governance attempts (NEEDS_REVISION / REJECT)?
4. How do we link multiple records that belong to the same long-running agent session?

---

## Next Steps

- Flesh out the TypeScript interface + storage layer
- Define integration points with existing systems
- Decide on persistence strategy (local files vs database vs IPFS)

**End of Pass 10** — Ready to move into implementation planning.