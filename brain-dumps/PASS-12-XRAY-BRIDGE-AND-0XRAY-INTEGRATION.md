# PASS 12 — XrayBridge & 0xRay Integration Deep Analysis

**Date:** 2026-06-15

## Core Implementation

The `XrayBridge` class is the single point of integration between Groover and the 0xRay governance/orchestration layer.

### Key Code

```ts
export class XrayBridge implements MCPBridge {
  async govern(proposal: any) {
    return await this._mcpCall('xray-governance', 'tools/call', {
      name: 'govern_proposals',
      arguments: { proposals: [proposal] }
    });
  }

  async orchestrate(description: string, tasks: Array<...>) {
    return await this._mcpCall('xray-orchestrator', 'tools/call', {
      name: 'orchestrate-task',
      arguments: { description, tasks }
    });
  }

  async enforce(operation: string, files: string[], newCode?: string) {
    return await this._mcpCall('xray-enforcer', 'tools/call', {
      name: 'codex-enforcement',
      arguments: { operation, files, newCode }
    });
  }
}
```

### Critical Design Decision

**No graceful degradation at the bridge level.** If an MCP server is unreachable, the error propagates. The only place graceful degradation occurs is in `registerPlugin` (in `index.ts`), where the resonance check is wrapped in a try/catch.

This means:
- During registration, if `xray-governance` is down, the agent still proceeds (but without the privileged Dynamo path).
- During normal operation, governance and enforcement calls are hard dependencies.

---

## MCP Server Inventory (from `listMcpServers`)

The system maintains an explicit inventory of 10 MCP servers:

**Primary 0xRay Stack:**
- `xray-orchestrator` (thinDispatch 7-flow)
- `xray-governance` (Codex + Dynamo proposals)
- `xray-enforcer` (Codex compliance)
- `xray-skills`

**Parallel StringRay Stack:**
- `strray-orchestrator`
- `strray-governance`
- `strray-enforcer`
- `strray-skills`

**Domain-Specific:**
- `Dynamo` (20 tools)
- `grok_com_github` (44 tools)

This dual-stack design provides resilience and shows the evolutionary path from StringRay → 0xRay.

**End of Pass 12**