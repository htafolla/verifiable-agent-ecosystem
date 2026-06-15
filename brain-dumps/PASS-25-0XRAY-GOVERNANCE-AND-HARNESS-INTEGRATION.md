# PASS-25: 0xRay Governance MCP + Inference Harness Integration

**Date:** 2026-06-15
**Focus:** Deep line-by-line on 0xRay governance server and how it becomes the canonical hook for the Inference Research Harness.

## Key Files Read

### 1. governance.server.ts (lines 1-50+)
- Primary governance entry point for Hermes, Grok, Jelly, CI/CD.
- Forces **every proposal** through:
  1. Three real skill MCP servers (`code-review`, `security-audit`, `researcher`)
  2. Dynamo Solar SSOT filter (mandatory)
- Uses `getGovernanceService()` + `getCodexPolicyService()`
- Supports both Stdio and StreamableHTTP transports.

### 2. orchestrator/server.ts
- Facade over `MultiAgentOrchestrationCoordinator`
- Handlers: TaskHandler, ComplexityHandler, StatusHandler
- thinDispatch complexity routing lives here (Simple ≤15, Moderate ≤25, Complex ≤50, Enterprise >50)

### 3. execution-planner.ts
- Validates task IDs, descriptions, types, and dependency graphs before execution.

## Critical Insight for Inference Harness

The `governance.server.ts` `governProposals` tool is the **perfect insertion point** for the harness:

```ts
// Every call to governProposals already produces:
- proposal id, type, title, description, evidence
- Dynamo trace (via getGovernanceService)
- Codex policy evaluation
- Final verdict + resonance

// We can wrap this to also emit an InferenceRun record
```

**Recommended Integration Pattern:**
1. Create a thin wrapper around `governProposals` in the harness.
2. After Dynamo returns the `EnhancedGovernanceDecision`, call `saveInferenceRun(...)`.
3. This gives us 100% coverage of all governed actions without modifying 0xRay itself.

## Cross-System Finding

0xRay is not "just build tooling" — it is the **Autonomous Engine** layer that:
- Routes via thinDispatch 7-flow
- Enforces Dynamo governance on every non-trivial action
- Exposes MCP surfaces so Groover (and future agents) can delegate safely

This makes the Inference Research Harness a natural extension of the existing governance pipeline rather than a separate system.

**Verdict:** Phase 5 design is validated. Next step = implement the wrapper in the harness that listens to governance decisions.