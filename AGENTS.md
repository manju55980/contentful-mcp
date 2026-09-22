# AGENTS.md

## Repository Overview & Architecture
- **Type**: Model Context Protocol (MCP) Node.js server monorepo.
- **Key Directory**: `server/` contains the active MCP implementation (`server/index.js` & `server/package.json`).
- **Protocol**: Built using `@modelcontextprotocol/server` with Stdio transport (`serveStdio`).

## Commands
- **Install Dependencies**: `npm install` (root workspace).
- **Run Server**: `npm run dev:server` (executes `node index.js` in `server/`).

## Development & Real-World Transition (Contentful)
- **Current State**: `server/index.js` uses hardcoded mock return values for the `search_contentful` tool.
- **Transitioning to Real Contentful API**:
  1. Install the official Contentful SDK: `npm install contentful --workspace=server`.
  2. Add environment variables for Contentful credentials (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENVIRONMENT`) in `.env` / `.env.example`.
  3. Replace the mock array generation in `server/index.js` inside `server.registerTool('search_contentful', ...)` with real Contentful client queries (`createClient({ space, accessToken })`).
- **Module System**: Node.js ESM (`"type": "module"` in `server/package.json`). Uses Zod for schema validation.
