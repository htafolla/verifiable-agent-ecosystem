# PASS 03 — Cross-System Patterns & StringRay / 0xRay Lineage

**Date:** 2026-06-15

## Observed Patterns Across the Entire Stack

### 1. Three-Subsystem Model (Repeated Everywhere)
Almost every major system follows the same tripartite architecture:

- **Inference / Session Capture**
- **External Governance** (Dynamo via solar resonance)
- **Autonomous Engine** (thinDispatch / orchestration layer)

Seen in:
- 0xRay AGENTS.md
- Groover xrayBridge
- Jelly (StringRay inside sandboxes)
- chrono-warp-drive governance layer

### 2. MCP as the Universal Transport
Every component that needs to be callable by agents uses **Streamable HTTP MCP** (`POST /mcp` with JSON-RPC 2.0).

- Groover registry
- Ziggy tweet generator
- Scout (presumed)
- Zigzag MCP server
- Dynamo MCP server (mcp-production-80e2.up.railway.app)

### 3. Cryptographic Identity + Behavioral Proof
- Groover: ed25519 PoP + 4-turn adaptive challenge
- Zigzag: BIP-39 seed + x402 user approval (no auto-sign)
- Agent-Marketplace-Starters: wallet signatures for registration

### 4. Declarative UI Layer
AgentUIManifest is the unifying schema. Used by:
- Groover (`get_plugin_ui_manifest`)
- Zigzag marketplace
- Scout security scanner

### 5. Solar / Temporal Grounding as Anti-Gaming Primitive
Dynamo is not just a governance engine — it is an **external, non-forgeable clock and entropy source**. This pattern appears in:
- Groover privileged registration path
- Potential future use in Zigzag payment timing
- Trinitarium theological constants fused into scoring

---

## StringRay vs 0xRay Relationship

From the files examined:

- **StringRay** appears to be the **earlier / broader framework** (used in Jelly, zigzag, many AGENTS.md files).
- **0xRay** is the **refined, production-grade evolution** focused on:
  - Codex compliance
  - Dynamo governance integration
  - thinDispatch 7-flow orchestration
  - MCP skill servers (`xray-enforcer`, `xray-governance`, `xray-orchestrator`)

**Hypothesis (to be confirmed in later passes):**
0xRay is the **governed core** that StringRay agents are expected to migrate toward. Groover was explicitly built to verify agents running the 0xRay model.

---

## Wallet & Payment Philosophy

Zigzag represents a very strong stance:
- **Never auto-sign**
- User must explicitly approve every x402 payment
- Same BIP-39 seed works in both browser and local MCP

This is in direct contrast to many agent wallets that optimize for frictionless execution.

---

## Next Pass Targets (Pass 04)

- Deep dive into Jelly sandbox architecture
- Scout implementation details
- How AgentUIManifest is actually rendered in practice
- Relationship between Groover DID and potential Zigzag identity binding

**End of Pass 03**