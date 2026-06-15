# PASS 14 — Dynamo Kuramoto Phase Alignment Implementation

**Date:** 2026-06-15

## Kuramoto Oscillator Core

The phase alignment dimension in Dynamo uses a modified Kuramoto model.

### Constants
```ts
const PHI_DARK = Math.PI / 6;
const K = 0.5;           // Coupling strength
const N = 3;             // Number of oscillators
const S = 0.1;           // Fractal scaling factor
const TIMESTEPS = 20;
const DT = 0.05;
```

### Isotope Factors
```ts
export const ISOTOPES = {
  'C-12': { type: 'C-12', factor: 1.0 },
  'C-14': { type: 'C-14', factor: 0.8 },
};
```

### Kuramoto Step Function
```ts
function kuramotoStep(
  thetas: number[],
  omegas: number[],
  idx: number,
  phaseType: PhaseType,
  isotope: Isotope,
  fractalToggle: boolean
): number {
  const phiOffset = phaseType === 'push' ? Math.PI / 4 : -Math.PI / 4;
  let sum = 0;
  for (let j = 0; j < Math.min(N, thetas.length); j++) {
    if (j !== idx && !isNaN(thetas[j])) {
      sum += Math.sin(
        thetas[j] - thetas[idx] + PHI_DARK + phiOffset +
        (fractalToggle ? S * isotope.factor : 0)
      );
    }
  }
  return omegas[idx] + (K / Math.max(N - 1, 1)) * sum;
}
```

**Key Insight:** The model uses a "dark phase offset" (`PHI_DARK`) and supports both push and pull dynamics. This is used to compute the `phaseAlignment` dimension in the 7D resonance score.

**End of Pass 14** — Continuing Dynamo deep dive.