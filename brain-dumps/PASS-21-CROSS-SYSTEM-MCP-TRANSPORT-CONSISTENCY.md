# PASS 21 — Cross-System MCP Transport Consistency

**Date:** 2026-06-15

## Observed Pattern

Every major system in the stack uses **Streamable HTTP MCP** as the primary transport:

- Groover: `POST /mcp`
- Ziggy: `POST /mcp`
- Dynamo: `POST /mcp` (mcp-production-80e2.up.railway.app)
- 0xRay servers: `POST /mcp`
- Zigzag MCP server: `POST /mcp`

**Finding:** The ecosystem has converged on JSON-RPC 2.0 over HTTP POST as the universal agent-to-agent and agent-to-tool communication layer. This is a strong architectural decision.

**End of Pass 21**