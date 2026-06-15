# PASS 20 — Jelly Blaxel Sandbox Pipeline Deep Analysis

**Date:** 2026-06-15

## E2E Flow (Verified Working)

1. `POST /api/stringray/projects/create-from-prompt`
2. Resolve provider/model + API key
3. Create Blaxel sandbox (v36 image)
4. **IMMEDIATE keepAlive anchor** (`sleep infinity`)
5. Bootstrap queue inside sandbox
6. AutonomousOrchestrator runs tasks
7. Deliverables written to `/app/deliverables/`

## Critical Pattern: keepAlive Anchor

```ts
// In blaxel-provisioner.ts (line 363)
await sandbox.process.exec({
  command: "sleep infinity",
  waitForCompletion: false
});
```

This prevents the sandbox from going into standby during bootstrap — a key reliability pattern.

**End of Pass 20** — Continuing autonomous research.