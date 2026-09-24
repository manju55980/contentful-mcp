# Project Constitution

## Core Rules
1. **Language & Runtime**: Use Node.js ESM (`"type": "module"`) with explicit `.js` extensions for relative imports.
2. **Protocol**: Use `@modelcontextprotocol/server` with Stdio transport (`serveStdio`).
3. **Security**: Contentful credentials (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`) must remain strictly on the server via environment variables and never be exposed to clients.
4. **Validation**: Use Zod (`zod/v4`) for all tool input schema validations.
5. **Separation of Concerns**: Tool definitions, configuration, and API communication should be organized cleanly.
6. **Spec-Driven Development**: Maintain specs (`constitution.md`, `product.md`, `architecture.md`, `features/get-entries.md`) aligned with actual codebase behavior.
