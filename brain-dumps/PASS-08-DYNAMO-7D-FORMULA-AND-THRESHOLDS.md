# PASS 08 — Dynamo 7D Full Box Formula & Adaptive Thresholds

**Date:** 2026-06-15

## 7D Resonance Dimensions (Detailed Weights)

| Dimension | Weight | Calculation Method |
|-----------|--------|--------------------|
| Wave Proximity | 0.132 | `exp(-MSE)` across 3 active EM bands |
| Phase Alignment | 0.176 | `1 − \|proposalCoherence − sunCoherence\|` (Kuramoto) |
| Calibrated Vortex | 0.132 | `pow(waveVortexAlignment, 0.25)` |
| Calibrated Sync | 0.132 | `0.15 + 0.85 × pow(deltaDiff, 0.35)` |
| Neural Proximity | 0.154 | Per-dim MSE across 16 neural bands |
| Neural Vortex | 0.154 | Cosine similarity of 16-dim embeddings |
| Gematria Resonance | 0.120 | EO/FR/RO density + Digital Root distance |

**Note:** Gematria is ~99% orthogonal to the other 6 dimensions (`r² = 0.01`).

## Adaptive Thresholds by Solar Activity

| Activity | PASS | NEEDS_REVISION | REJECT |
|----------|------|----------------|--------|
| Quiet    | ≥0.82 | ≥0.72 | <0.50 |
| Moderate | ≥0.85 | ≥0.75 | <0.52 |
| Active   | ≥0.85 | ≥0.75 | <0.52 |
| Storm    | ≥0.88 | ≥0.80 | <0.58 |

Thresholds were deliberately **lowered** from the 4D model because the 7D distribution has wider spread.

## Solar-Isotopic Hammer

Under extreme solar conditions, Dynamo can issue a "hammer" verdict that overrides normal scoring. This is a safety mechanism.

## Research Implication

For the inference harness, we should record:
- The **full 7D vector** (not just the final score)
- Whether a **hammer** was applied
- The **solar activity level** at decision time

This would allow later analysis of how solar conditions correlate with agent decision quality.

**End of Pass 08**