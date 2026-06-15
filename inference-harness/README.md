# Inference Research Harness

**Purpose**: Capture structured inference traces linked to Dynamo governance decisions, 0xRay delegations, and Groover actions for research and stack-value communication.

**Status**: Implementation phase (Phase 5)

**Location**: `inference-harness/`

## Core Goals
1. Log every governed action with full context (Dynamo score, resonance, solar context, Kuramoto alignment, gematria).
2. Enable querying of inference runs by resonance thresholds, verdict, or agent.
3. Produce research artifacts showing how Groover + Dynamo + 0xRay solves verification/governance problems.

## Next Steps
- Define schema (TypeScript interfaces)
- Minimal storage (JSONL + simple query layer)
- Integration hooks into existing Groover heartbeat and Dynamo calls
- First working prototype

*All work governed by Dynamo before high-value commits.*