# PASS 11 — Groover Challenge.ts — Full Code-Level Analysis

**Date:** 2026-06-15

## Key Code Excerpts & Analysis

### 1. Adaptive Follow-up Generation (The Core Anti-Gaming Mechanism)

```ts
export function generateFollowUp(session: ChallengeSession): string {
  const lastTurn = session.turns[session.turns.length - 1];
  const priorReasoning = lastTurn?.reasoning?.slice(0, 60) || 'your prior analysis';
  const priorTool = lastTurn?.toolCall || 'exploration';

  const prompts = [
    `Your ${priorTool} work touched on \"${priorReasoning}...\". Now search the registry for plugins related to this concept and critique how they compare — use search_plugins.`,
    `Based on your insight \"${priorReasoning}...\", investigate which MCP servers would implement this. Use list_mcp_servers and cross-reference.`,
    `You mentioned \"${priorReasoning}...\". Now search the Groover registry for existing solutions addressing this gap and explain how your approach differs — use search_plugins.`,
    `Follow up on \"${priorReasoning}...\". Look up current governance signals in the registry via search_plugins, then critique alignment.`,
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}
```

**Insight:** The follow-up is not static. It references the agent's own previous reasoning (`priorReasoning`). This forces context retention and genuine multi-turn reasoning. Scripts that don't maintain state across turns will fail here.

### 2. Privileged Path Logic (Dynamo Integration)

```ts
const dynamoResonance = computeDynamoResonance(options?.dynamoMetrics);
const isPrivileged = dynamoResonance >= 0.8;
const effectiveMinTurns = isPrivileged ? Math.max(2, session.task.minTurns - 1) : session.task.minTurns;
const effectiveCoverageThreshold = isPrivileged ? 0.125 : 0.25;
```

**Critical Finding:** When resonance ≥ 0.8, the system:
- Reduces required turns from 3 → 2
- Lowers semantic coverage threshold from 25% → 12.5%

This is the only "shortcut" in the entire system. It still requires real tool use and reasoning — it just relaxes the bar slightly for agents that demonstrate strong temporal alignment.

### 3. Hash Chain Construction

```ts
export function computeTurnHash(prevHash: string, turn: Omit<ChallengeTurn, 'hash'>): string {
  const content = JSON.stringify({
    prevHash,
    toolCall: turn.toolCall,
    input: turn.input,
    output: turn.output,
    reasoning: turn.reasoning,
    timestamp: turn.timestamp,
  });
  return crypto.createHash('sha256').update(content).digest('hex');
}
```

Every turn commits to the previous hash. Tampering with any field (even timestamp) breaks the chain. This is the primary tamper-evidence mechanism.

### 4. Merkle Root + Attestation

```ts
export function computeMerkleRoot(hashes: string[]): string {
  if (hashes.length === 0) return crypto.createHash('sha256').update('empty').digest('hex');
  if (hashes.length === 1) return hashes[0];
  let level = hashes;
  while (level.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : left;
      next.push(crypto.createHash('sha256').update(left + right).digest('hex'));
    }
    level = next;
  }
  return level[0];
}

const attestation = computeMerkleRoot([merkleRoot, sessionId]);
```

The attestation binds the entire trace to the specific session ID issued by the server. This prevents replay attacks across different sessions.

### 5. Semantic Coverage Check (Fallback Mode)

```ts
export function computeReasoningCoverage(taskPrompt: string, turns: ChallengeTurn[]): number {
  const significantTerms = taskPrompt
    .toLowerCase()
    .replace(/[^a-z0-9_\\s-]/g, '')
    .split(/\\s+/)
    .filter(w => w.length > 4 && !STOP_WORDS.has(w));

  const allReasoning = turns.map(t => t.reasoning?.toLowerCase() || '').join(' ');
  const reasoningWords = allReasoning.split(/\\s+/);

  const matched = significantTerms.filter(term => {
    const prefix = term.slice(0, 5);
    return reasoningWords.some(w => w.startsWith(prefix) || w.includes(term));
  }).length;

  return matched / significantTerms.length;
}
```

When `xrayReasoningScore` is not provided, the system falls back to simple keyword prefix matching. This is a lightweight but effective way to detect shallow or off-topic reasoning.

---

## Deep Findings

1. **The 12 Gates are not independent** — several gates (minimum turns, semantic coverage) are dynamically adjusted based on Dynamo resonance.
2. **The adaptive follow-up is the strongest anti-gaming primitive** — it is the only gate that cannot be pre-computed.
3. **The system gracefully degrades** when xray MCP servers are unavailable (uses keyword fallback for reasoning coverage).

**End of Pass 11** — Continuing to next critical file.