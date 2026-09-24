# Architecture Specification

## Current Behavior & Data Flow
```
Cursor / AI Client (stdio)
  ↓
MCP Server (`server/index.js`)
  ↓
Zod Input Validation (`zod/v4`)
  ↓
Contentful CDA Fetch (`cdn.contentful.com`)
  ↓
JSON Response Formatting
```

## Component Boundaries
- **Server Entrypoint**: `server/index.js` initializes `McpServer`, validates required environment variables (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`), registers tools, and starts `serveStdio`.
- **Configuration**: `server/config/env.js` manages environment variables loading.

## Future / Target Improvements
- Extract Contentful API request logic into dedicated service modules (`server/services/contentful.js`).
- Modularize tool registrations into separate files under `server/tools/`.
