# PASS 16 — Dynamo TDF Parameter Derivation (Codex Formula)

**Date:** 2026-06-15

## Canonical TDF Formula

Dynamo uses the Codex formula: `tPTT × TAU × 1/BHS`

### Proposal Parameter Derivation

```ts
function deriveProposalCodexParams(words: string[], solarData: SolarData): VortexTdfParams {
  const effective = words.length >= MIN_FINGERPRINT_WORDS
    ? words
    : [...words, ...ANCHOR_WORDS.slice(0, MIN_FINGERPRINT_WORDS - words.length)];

  const wordCount = Math.max(effective.length, 1);
  const combined = effective.join(' ');
  const totalChars = combined.length;
  const uniqueChars = new Set(combined).size;
  const temporalNonce = Math.floor(Date.now() / 1000) ^ Math.floor((solarData.xray?.long ?? 0) * 1e6);
  const hashVal = fnvHash(combined + String(temporalNonce));

  const T_c = 0.5 + (wordCount / 50) + (uniqueChars / Math.max(totalChars, 1)) * 0.5;
  const P_s = 0.1 + (hashVal % 100000) / 100000;
  const E_t = 0.1 + (uniqueChars / Math.max(totalChars, 1));
  const activityOrdinal = ACTIVITY_ORDINAL[solarData.activityLevel] ?? 1;
  const delta_t = 1 + activityOrdinal * 2;
  const voids = 7;
  const bhs_n = 2 + (hashVal % 4);

  return { T_c, P_s, E_t, delta_t, voids, bhs_n };
}
```

This shows how text is turned into temporal vortex parameters using solar activity as a modulator.

**End of Pass 16** — Continuing deeper analysis.