# PASS 02 — Deep Technical Layers (Groover + Dynamo Core Mechanics)

**Date:** 2026-06-15  
**Focus:** Implementation-level details of the two most critical systems.

---

## Groover — Proof of Autonomy Engine

### Core Flow (from `packages/marketplace/src/index.ts` + `challenge.ts`)

1. **Nonce + Session Creation**
   - `get_registration_challenge` creates both a crypto nonce **and** a full adaptive challenge session.
   - Session stored in-memory `Map<string, ChallengeSession>`.

2. **4-Turn Adaptive Challenge**
   - Turn 1–3: Agent must call required tools (`search_plugins`, `list_mcp_servers`).
   - After turn 3 → server generates **dynamic follow-up prompt** (`followUpPrompt`).
   - Turn 4: Agent must respond to the follow-up.
   - `followUpCompleted` flag is set only when turn 4 is accepted.

3. **Trace Validation (12 Anti-Gaming Gates)**
   - Crypto PoP (ed25519 signature over nonce)
   - Hash chain integrity (each turn hashes previous)
   - Merkle root + attestation
   - Minimum duration (3–4s wall time)
   - Required tools present
   - Reasoning depth (>20 chars)
   - Adaptive follow-up completion
   - Dynamo resonance privileged path (≥0.8 lowers thresholds)
   - Exponential backoff on failures
   - Session TTL sweep (10 min)

4. **Final Registration**
   - `register_plugin` performs:
     - ed25519 signature verification
     - Full trace validation
     - Dynamo governance gate via `xrayBridge.govern()`
     - Codex enforcement via `xrayBridge.enforce()`
   - On success: mints `did:groover:...` + `groover_...` API key

### xrayBridge (0xRay Integration)

Located in `packages/xray/src/index.ts`:

- Makes **real** MCP calls to:
  - `xray-orchestrator`
  - `xray-governance`
  - `xray-enforcer`
- No silent fallbacks — errors propagate if MCP servers are unreachable.
- Used during registration for governance + enforcement.

---

## Dynamo — 7D Solar Temporal Resonance Engine

### Core Pipeline (from `solarGovernanceIntegration.ts` + related files)

1. **Solar Data Ingestion**
   - `solarDataFetcher` pulls live NOAA/X-ray data.
   - Activity levels: `quiet | moderate | active | storm`

2. **TDF Computation (Codex Formula)**
   - Uses canonical `tPTT × TAU × 1/BHS` (not FNV-1a).
   - Both proposal and solar reference get TDF values.

3. **7D Full Box Resonance**
   - **Physical** (Wave Proximity, Calibrated Vortex, Calibrated Sync)
   - **Temporal** (Phase Alignment via Kuramoto)
   - **Neural** (16-dim embeddings)
   - **Numerological** (Gematria: EO/FR/RO + Digital Root)

4. **Adaptive Thresholds**
   - Quiet: PASS ≥0.82
   - Moderate/Active: PASS ≥0.85
   - Storm: PASS ≥0.88
   - Lowered from 4D model because 7D spread is wider.

5. **Solar-Isotopic Hammer**
   - Detects extreme solar conditions and can force verdicts.

6. **Trinitarium Moral Overlay**
   - `computeTrinitariumOverlay()` fuses theological constants (L=3, φ=5/3, etc.) into resonance scoring.

---

## Key Cross-System Integration Points

| Integration | Location | Purpose |
|-------------|----------|---------|
| Groover → Dynamo | `challenge.ts:computeDynamoResonance()` | Privileged registration path |
| Groover → 0xRay | `xrayBridge` | Governance + Enforcement during registration |
| Dynamo → Trinitarium | `trinitariumMoralOverlay.ts` | Theological fusion layer |
| AgentUIManifest → Groover | `get_plugin_ui_manifest` tool | Declarative UI served from registry |

---

## Emerging Architectural Principles (Pass 2)

- **Governance is never optional** for high-value actions.
- **Behavioral proof > static credentials** (the 4-turn adaptive challenge is the real innovation).
- **Solar grounding** provides an external, non-gameable entropy source.
- **Everything is traceable** (hash chains, merkle roots, solar snapshots).

**End of Pass 02** — Ready for Pass 03 (Cross-repo patterns + StringRay/0xRay relationship).