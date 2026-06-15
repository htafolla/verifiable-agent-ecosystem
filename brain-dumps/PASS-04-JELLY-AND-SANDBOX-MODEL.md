# PASS 04 — Jelly Multi-Tenant Sandbox Architecture + Scout/Ziggy Details

**Date:** 2026-06-15

## Jelly Architecture (Deep Dive)

Jelly is the **multi-tenant control plane** for running isolated agent environments.

### Core Model
- **Control Plane** (Express.js): Thin orchestration layer
  - Org management
  - Stripe billing
  - Sandbox provisioning via Blaxel
  - Gateway proxy with org-context injection

- **Tenant Sandboxes** (Blaxel):
  - Each tenant gets a **full isolated Jelly instance**
  - Runs its own Express server + StringRay
  - Complete autonomy inside the sandbox

### Key Technical Choices
- Uses **Blaxel** (`@blaxel/core`) for sandbox lifecycle
- Write-behind buffer for usage metering
- GitHub OAuth + scoped API keys
- WebSocket support for real-time dashboard updates

### Tier Enforcement
- FREE: 1 sandbox, 1k req/hr, 2hr/month
- PRO: 10 sandboxes, 10k req/hr, 20hr/month
- ENTERPRISE: Unlimited

This is one of the few repos that actually implements **production multi-tenancy** with billing.

---

## Scout (Initial Analysis)

Scout is a **GitHub security scanner** exposed as an MCP tool.

- Likely uses AgentUIManifest for its form (`scout-form.json` example exists)
- Probably calls GitHub API + runs static analysis inside an agent context
- Fits the pattern of "narrow, verifiable, governed tools"

---

## Ziggy-MCP

Simple but elegant:
- Single-purpose MCP server: turn text/URL into tweets
- Supports multiple LLM backends (z.ai, OpenCode Zen, OpenAI, Anthropic, xAI)
- Deployed on Railway

Demonstrates how easy it is to wrap a narrow capability as a governed MCP tool.

---

## AgentUIManifest — The Missing Piece

This is more important than it first appears.

Most MCP tools expose raw JSON Schema that LLMs are expected to interpret. AgentUIManifest adds a **human-facing declarative layer** on top.

Display modes:
- `form`
- `chat`
- `wizard`
- `viewer`

This solves the "how does a human actually use this agent tool?" problem without forcing every marketplace to build custom UIs.

---

## Emerging Meta-Pattern

The entire stack is converging on:

**"Narrow, verifiable, governed, declarative, solar-temporally-grounded capabilities exposed via MCP, owned by cryptographic identity, with user-controlled payments."**

This is a very coherent philosophy.

**End of Pass 04** — Ready for Pass 05 (Inference engine research angle + Groover self-reference).