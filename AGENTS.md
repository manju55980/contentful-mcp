# AGENTS.md

## Repository Overview & Architecture

* **Type**: Model Context Protocol (MCP) Node.js server.
* **Key Directory**: `server/` contains the MCP implementation.
* **Protocol**: Built using `@modelcontextprotocol/server` with Stdio transport (`serveStdio`).
* **Tool**: `get_contentful_entries` queries the Contentful Content Delivery API (CDA) directly via `fetch`.
* **Validation**: Uses Zod (`zod/v4`) for tool input schema validation.

## Commands

* **Install Dependencies**: `npm install`
* **Run Server**: `npm run dev:server`
* **Start Server**: `npm run start --workspace=server`

## Environment & Configuration

Required `.env` variables:

* `CONTENTFUL_SPACE_ID`

* `CONTENTFUL_ACCESS_TOKEN`

* **Module System**: Node.js ESM (`"type": "module"` in `server/package.json`).

* Use explicit `.js` extensions for relative imports.

## SDD Workflow

Before making changes:

1. Read the relevant specification in `specs/`.
2. Read the relevant task file in `specs/tasks/`.
3. Implement only the current/incomplete task.

### Rules

* Specifications are the source of truth.
* Do not invent requirements.
* Do not implement future tasks.
* Do not modify unrelated files.
* Keep changes small and simple.
* Reuse existing code where appropriate.
* Run relevant tests/checks after changes.
* Report what changed and whether verification passed.

### Development Flow

`SPEC → TASK → IMPLEMENT → VERIFY → NEXT TASK`
