# PASS-27: Inference Input Types to 0xRay Governance — Deep Discovery

**Date:** 2026-06-15  
**Goal:** Identify and document the different *kinds* of inference processes that feed proposals into governance.

## Core Finding

Governance does **not** receive raw LLM output. It receives **structured inference artifacts** that have already been processed through one of several distinct pipelines. There are at least **four distinct inference input types**.

---

## Type 1: Retrospective Git-Based Inference (session-capture.js)

**File:** `dist/inference/session-capture.js`

**Mechanism:**
```js
captureSessionInference(fromRef, toRef)
```
- Runs `git log` + `git diff --stat` between two refs.
- Extracts structured inference:
  - `problems` (bug fixes, removals of dead code, circular deps)
  - `approaches`
  - `wrongTurns`
  - `solutions`
  - `reasoningChain`
  - `patterns` (via `analyzeStructuralPatterns`)
  - `metrics` (commits, filesChanged, insertions, deletions, uniqueDirs)

**Characteristics:**
- Post-hoc / historical
- Commit-message driven
- Used for reflection and pattern accumulation
- Output saved as `session-*.json` in `docs/inference/`

This is the "looking back at what happened" inference type.

---

## Type 2: Filesystem Discovery Inference (SessionCapture processor)

**File:** `dist/processors/implementations/session-capture-processor.js`

**Mechanism:**
- `findReflections()` — scans `docs/reflections/` and `docs/reflections/deep/`
- `findLogs()` — scans for routing/activity/session logs
- `findReports()` — scans for `.json` / `.md` reports

**Characteristics:**
- Discovery-oriented
- Used by the inference improvement pipeline to locate existing knowledge artifacts
- Feeds the "what do we already know?" phase before new proposals are formed

---

## Type 3: Live Real-Time Proposal Inference (GovernanceClient)

**File:** `dist/integrations/governance/governance-client.js`

**Mechanism:**
```js
governWithSolar({
  proposal: string,
  baseVoteWeight?: number,
  spectralQuality?: number,
  sharePublicly?: boolean
})
```
- Directly calls the Dynamo `govern_with_solar` tool.
- Returns the full `EnhancedGovernanceDecision` (70+ fields):
  - `resonanceScore`, `isotopicRatio`, `phaseAlignment`
  - `fullBox7DComposite`, `hybrid4DComposite`
  - `trinitariumMoralScore`, `moralTension`
  - `hammerReason`, `solarActivityLevel`, etc.

**Characteristics:**
- Synchronous / live
- The most common path for Groover + Moltbook actions
- This is the **primary input type** the Inference Research Harness should capture

---

## Type 4: Internal Skill MCP Votes (Three Deliberation Servers)

**Discovered via governance-service.js flow:**

Before Dynamo is even called, three dedicated MCP servers produce votes:
- `code-review`
- `security-audit`
- `researcher`

These votes are **also inference outputs** — they represent the internal knowledge-based assessment of the proposal.

Only after these three votes exist does the system call Dynamo (external filter) and then merge via `governance-core.js`.

---

## Summary Table of Inference Input Types

| Type | Source | Timing | Primary Artifacts | Best Capture Point | Relevance to Harness |
|------|--------|--------|-------------------|--------------------|----------------------|
| 1. Retrospective Git | `session-capture.js` | Post-action | problems, reasoningChain, metrics | `captureSessionInference()` | Pattern learning |
| 2. Filesystem Discovery | `SessionCapture` | Pre-action | reflections, logs, reports | `findReflections()` etc. | Knowledge accumulation |
| 3. Live Proposal | `GovernanceClient.governWithSolar` | Real-time | Full `EnhancedGovernanceDecision` | Wrap `govern()` or `callTool('govern_with_solar')` | **Highest value** |
| 4. Skill MCP Votes | code-review / security-audit / researcher | Pre-Dynamo | Vote arrays per proposal | Inside `runGovernanceWithTimeout` | Internal deliberation trace |

---

## Implication for Inference Research Harness

The harness must be **multi-source**:

1. **Primary (highest signal)**: Wrap Type 3 (live `governWithSolar` / `govern`) — this gives the full Dynamo 7D trace + moral overlay.
2. **Secondary**: Capture Type 4 (the three skill votes) so we can see the internal vs external tension.
3. **Tertiary**: Periodically run Type 1 on recent commits to build long-term pattern datasets.

This explains why the user said "there are diff types" — governance is not a single pipe. It is the **merge point** of multiple inference streams.

**End of PASS-27**