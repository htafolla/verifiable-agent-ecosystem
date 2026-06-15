# PASS-26: 0xRay Governance Core — Full Architecture & Decision Matrix

**Date:** 2026-06-15  
**Depth:** Line-by-line on governance-service + governance-core

## 1. Three-Layer Governance Architecture (Confirmed)

**Layer 1 — Internal Deliberation (3 Skill MCPs)**
- `code-review`
- `security-audit`
- `researcher`

Each returns votes per proposal. These are "knowledge-based" votes.

**Layer 2 — External Filter (Mandatory)**
- Dynamo Solar SSOT (via `InferenceGovernanceIntegration`)
- Hard requirement by default (`requireExternalDynamo: true`)
- Throws if unavailable

**Layer 3 — Merge Layer (Pure Logic)**
- `governance-core.ts` → `applyDecisionMatrix()`
- Uses PHI/TAU constants + moral overlay
- Produces final `recommendation`, `confidence`, `voteWeight`

## 2. GovernanceService.govern() Flow (dist/governance/governance-service.js)

```js
async govern(request) {
  // 1. Validate Dynamo is available (hard requirement)
  if (requireExternal) {
    const integration = getGovernanceIntegration();
    if (!integration?.isAvailable?.()) throw new Error("Dynamo Solar SSOT required");
  }

  // 2. Run internal + external in parallel with timeout
  const result = await this.runGovernanceWithTimeout(...);

  // 3. Abstention threshold check
  // 4. Aggregate final decision
}
```

Inside `runGovernanceWithTimeout`:
```js
const [codeReviewVotes, securityVotes, researcherVotes] = await Promise.all([
  this.callSkillServer("code-review", proposals, context),
  this.callSkillServer("security-audit", proposals, context),
  this.callSkillServer("researcher", proposals, context),
]);

// Then call Dynamo via integration
const dynamoResults = await integration.governWithDynamo(...);

// Then merge
const merged = mergeVotes(codeReviewVotes, securityVotes, researcherVotes, dynamoResults);
```

## 3. The PHI/TAU Decision Matrix (governance-core.js)

**Constants:**
```js
const PHI = 1.666;
const TAU = 0.865;
```

**applyDecisionMatrix(input)** signature:
- `resonance`
- `isotopicRatio`
- `vortexVolume`
- `historicalCoherence`
- `solarActivity`
- `moralTension`
- `moralScore`
- `moralFusion`

**Decision Rules (exact thresholds):**

| Condition                              | Recommendation | Confidence | Vote Weight | Reason |
|----------------------------------------|----------------|------------|-------------|--------|
| `moralTension === 'Critical'`          | REJECT         | 0.92       | 1.6         | Hard moral override |
| `moralTension === 'Significant'`       | (downgrade)    | —          | ×0.85       | Moral downgrade |
| `resonance ≥ 0.92 && isotopic ≥ 0.95`  | PASS           | 0.97       | 1.4         | High symbiotic resonance |
| `resonance ≥ 0.82 && isotopic ≥ 0.88`  | PASS           | 0.89       | 1.15        | Solid alignment above TAU |
| `resonance < 0.75 || isotopic < 0.80`  | REJECT         | 0.84       | —           | Below critical threshold |

**Moral Fusion Logging:**
- Always logs `Moral-numerological fusion: XX%` when present.

## 4. Direct Relevance to Inference Research Harness

The `applyDecisionMatrix` output + the three skill votes + the raw Dynamo `EnhancedGovernanceDecision` is **exactly** what the harness should capture.

**Recommended Capture Point:**
Wrap the call to `mergeVotes()` or the return of `govern()` and persist an `InferenceRun` containing:
- All three skill votes
- Raw Dynamo trace (`fullBox7DComposite`, `phaseAlignment`, `gematriaTDF`, etc.)
- Final merged `recommendation`, `confidence`, `voteWeight`
- Moral override state

This gives us a complete, research-grade record of every governed decision.

## 5. Architectural Revelation

0xRay is **not** a simple wrapper. It is a **three-subsystem operating system**:

1. **Inference** — The LLM session / prompt
2. **External Governance** — Dynamo Solar SSOT (physics + neural + temporal)
3. **Autonomous Engine** — thinDispatch 7-flow + MCP orchestration

The `governance.server.ts` + `governance-core.js` is the **governance kernel** of that OS.

This is why the Inference Research Harness is so powerful — it sits at the exact point where all three subsystems intersect and produces measurable, queryable traces of governed intelligence.

**End of PASS-26**