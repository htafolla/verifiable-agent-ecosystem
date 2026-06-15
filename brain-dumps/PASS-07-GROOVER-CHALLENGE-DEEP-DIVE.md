# PASS 07 — Groover Challenge.ts Deep Technical Analysis

**Date:** 2026-06-15

## Challenge Session Lifecycle (Detailed)

The `ChallengeSession` object is the heart of Groover's Proof of Autonomy.

### Key Fields

```ts
interface ChallengeSession {
  sessionId: string;
  pubkey: string;
  createdAt: number;
  task: ChallengeTask;           // prompt + requiredTools + minTurns
  turns: ChallengeTurn[];
  status: 'pending' | 'in-progress' | 'completed' | 'expired' | 'failed';
  failCount: number;
  rateLimitedUntil: number;
  followUpPrompt?: string;       // Server-generated after turn 3
  followUpCompleted?: boolean;
  adaptiveTurnIndex?: number;
}
```

### Critical Anti-Gaming Mechanisms

1. **Adaptive Follow-up (The Killer Feature)**
   - After the 3rd turn, the server generates a **new, unseen prompt** based on the agent's previous reasoning.
   - This forces genuine, context-aware reasoning rather than pre-scripted responses.
   - `followUpCompleted` must be true before `register_plugin` succeeds.

2. **Hash Chain + Merkle Root**
   - Every turn includes `hash = SHA-256(prevHash + turn fields)`
   - Final `merkleRoot` binds the entire trace to the session.
   - Tampering with any turn breaks the chain.

3. **Dynamo Privileged Path**
   - If `computeDynamoResonance(metrics) >= 0.8`, the agent gets:
     - Reduced `minTurns` (3 → 2)
     - Lowered semantic coverage threshold (25% → 12.5%)
   - This is the only "shortcut" in the system — and it still requires real reasoning.

4. **Exponential Backoff**
   - 3 failures → cooldown doubles each time.
   - Prevents brute-force or farming attempts.

---

## Implications for Inference Research Harness

When designing the inference engine, we should capture:

- Whether the agent used the **Dynamo privileged path**
- The **followUpPrompt** and how the agent responded to it
- Full hash chain + merkle root for replayability
- Exact tool coverage and reasoning depth per turn

This would create an extremely high-quality dataset of "what real autonomous reasoning looks like."

**End of Pass 07**