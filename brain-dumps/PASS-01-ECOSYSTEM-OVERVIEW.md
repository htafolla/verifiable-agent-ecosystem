# PASS 01 — Ecosystem Overview & Core Relationships (htafolla Stack)

**Date:** 2026-06-15  
**Goal:** Establish high-level architecture, ownership, and cross-repo relationships.

## Core Thesis of the Stack

This is a **governed, verifiable, temporally-grounded autonomous agent ecosystem** built around three interlocking pillars:

1. **Proof of Autonomy** (Groover)
2. **External Governance** (Dynamo + Trinitarium)
3. **Agent Infrastructure** (Zigzag, Jelly, AgentUIManifest, Ziggy, Scout)

The unifying principle: **No agent should act without verifiable identity + governance approval + temporal provenance.**

---

## Repository Map & Primary Purpose

| Repo | Primary Role | Governance Layer | Identity | Payments | UI |
|------|--------------|------------------|----------|----------|-----|
| **groover** | Agent Registry + Proof-of-Autonomy | Dynamo gate on registration | DID:groover: + ed25519 PoP | — | Agent UI Manifest |
| **chrono-warp-drive** | Dynamo (Solar Temporal Resonance Engine) | 7D Full Box governance | — | — | React + shadcn |
| **trinitarium** | Theological-Mathematical Foundation (TLM, Blurrn Codex) | Source of Dynamo | — | — | rium.app |
| **zigzag** | Non-custodial Agent Wallet + x402 | — | BIP-39 seed | x402 (user-approved) | Web + MCP hybrid |
| **agent-marketplace-starters** | Production MCP templates | — | Wallet-native | x402 | Declarative |
| **jelly** | Multi-tenant Orchestration (Blaxel sandboxes) | StringRay + Dynamo | — | Stripe | Dashboard |
| **ziggy-mcp** | Tweet generation MCP server | — | — | — | — |
| **agentuimanifest** | Declarative UI schema for MCP tools | — | — | — | Form / Chat / Wizard |
| **scout** | GitHub security scanner (MCP) | — | — | — | — |

---

## Key Cross-Correlations (Pass 1)

### 1. Groover ↔ Dynamo
- Groover registration uses **Dynamo resonance** as a privileged path (resonance ≥ 0.8 lowers thresholds).
- `computeDynamoResonance()` is called inside `challenge.ts`.
- Every high-value registration action is gated by Dynamo.

### 2. Groover ↔ AgentUIManifest
- `get_plugin_ui_manifest` tool exists in Groover.
- Agents can declare UI via AgentUIManifest schema and have it served from the registry.

### 3. Dynamo ↔ Trinitarium
- Dynamo is the **production implementation** of the Blurrn Quantum Codex (TLM, isotopic vortex, Kuramoto coupling, gematria).
- Trinitarium is the deeper theological source; Dynamo is the deployed solar oracle.

### 4. Zigzag ↔ Agent-Marketplace-Starters
- Zigzag is a **production consumer** of the patterns in `agent-marketplace-starters`.
- Both emphasize in-process MCP, wallet-native identity, and x402 payments.

### 5. Jelly ↔ StringRay / 0xRay
- Jelly uses StringRay for multi-agent orchestration inside sandboxes.
- Strong overlap with 0xRay (three-subsystem model: Inference + Dynamo Governance + thinDispatch).

### 6. AgentUIManifest ↔ Scout / Ziggy
- Scout and Ziggy are example implementations of AgentUIManifest.

---

## Architectural Patterns Emerging

- **Everything is MCP-first** (Streamable HTTP preferred).
- **Identity is always cryptographic** (ed25519 PoP or wallet signatures).
- **Governance is external and solar-grounded** (Dynamo never bypassed for high-value actions).
- **UI is declarative** (AgentUIManifest) rather than LLM-interpreted.
- **Payments are user-approved** (x402 in Zigzag) — never auto-sign.
- **Multi-tenancy via sandboxing** (Jelly + Blaxel).

---

## Open Questions for Deeper Passes

1. How exactly does the 4-turn adaptive challenge work in `challenge.ts` (hash chain + follow-up logic)?
2. What is the precise 7D resonance formula and adaptive threshold logic in Dynamo?
3. How does xrayBridge integrate 0xRay MCP servers into Groover registration?
4. What is the relationship between StringRay and 0xRay (are they the same lineage)?
5. How does Scout actually use AgentUIManifest in practice?

**End of Pass 01** — Foundation established. Ready for deeper technical passes.