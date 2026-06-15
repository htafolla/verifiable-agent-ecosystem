# PASS 09 — Cross-System Identity & Governance Binding Opportunities

**Date:** 2026-06-15

## Current State of Identity

| System | Identity Primitive | Verifiability |
|--------|--------------------|---------------|
| Groover | `did:groover:...` + ed25519 | High (behavioral + crypto) |
| Zigzag | BIP-39 seed phrase | Medium (wallet control) |
| Jelly | GitHub OAuth + API keys | Low (traditional auth) |
| Dynamo | None (pure oracle) | N/A |

## High-Value Binding Opportunities

### 1. Groover DID ↔ Zigzag Wallet
- An agent could register a Groover DID, then bind a Zigzag wallet to that DID.
- Payments made via x402 could carry the Groover DID for provenance.
- This would create **verifiable economic activity** by governed agents.

### 2. Groover DID ↔ Jelly Sandbox
- When provisioning a Jelly sandbox, require the tenant to present a valid Groover DID.
- The sandbox could then enforce Dynamo gates on all high-value actions inside it.

### 3. Dynamo Resonance as Runtime Gate (Not Just Registration)
- Currently Dynamo is mostly used at Groover registration time.
- Opportunity: Allow agents to call Dynamo at decision time for ongoing governance.

### 4. AgentUIManifest + Governance Declaration
- Extend AgentUIManifest to let agents declare:
  - "This tool requires Dynamo resonance ≥ 0.80"
  - "This action requires Groover DID verification"

---

## Recommended Research Direction

The most powerful next artifact would be a **design document** for binding these identity layers together, with Groover DID as the root of trust.

**End of Pass 09**