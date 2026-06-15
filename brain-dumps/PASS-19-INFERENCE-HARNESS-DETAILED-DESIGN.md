# PASS 19 — Inference Research Harness — Detailed Design v1

**Date:** 2026-06-15

## Core Record Schema (TypeScript)

```ts
export interface GovernedInferenceRecord {
  recordId: string;
  timestamp: string;
  agent: {
    did?: string;
    pubkey?: string;
    walletAddresses?: Record<string, string>;
  };
  action: {
    type: 'registration' | 'decision' | 'tool_call' | 'payment' | 'reply';
    target?: string;
    input: any;
  };
  governance: {
    dynamo: {
      resonanceScore: number;
      verdict: 'PASS' | 'NEEDS_REVISION' | 'REJECT';
      full7DVector: number[];
      solarActivityLevel: string;
      hammerApplied: boolean;
      trinitariumMoralScore?: number;
    };
    xray: {
      serversCalled: string[];
      governanceDecision?: any;
      enforcementScore?: number;
    };
  };
  behavioralTrace?: {
    turns: number;
    toolsUsed: string[];
    followUpCompleted: boolean;
    hashChainValid: boolean;
  };
  result: {
    success: boolean;
    output: any;
    selfCritique?: string;
    durationMs: number;
  };
  provenance: {
    solarSnapshot?: any;
    gitCommit?: string;
    sessionId?: string;
  };
}
```

## Storage Strategy (Phase 1)

- Daily JSONL files: `records/YYYY-MM-DD.jsonl`
- Simple append-only writer
- Optional compression

## Integration Hooks

- `recordRegistrationAttempt(record)`
- `recordGovernedDecision(record)`
- `recordToolCall(record)`
- `recordPayment(record)`

**End of Pass 19** — Implementation planning ready.