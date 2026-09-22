# Contentful MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that lets AI coding tools (Cursor, Claude Code, and others) query entries from a Contentful space over stdio.

## Features

- MCP server built with `@modelcontextprotocol/server`
- Stdio transport for IDE / agent integration
- Zod-validated tool inputs
- Fetches live entries from the Contentful Content Delivery API (CDA)

## Tool

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_contentful_entries` | Returns entries from the configured Contentful space | `limit` (optional, 1–100, default `100`) |

Each entry includes `id`, `contentType`, `createdAt`, `updatedAt`, and `fields`.

## Project structure

```
contentful-mcp/
├── server/
│   ├── index.js       # MCP server entry point
│   └── package.json
├── .env               # Local credentials (not committed)
├── .gitignore
├── package.json       # npm workspaces root
└── README.md
```

## Prerequisites

- Node.js 18+ (recommended)
- A Contentful space with:
  - **Space ID**
  - **Content Delivery API (CDA) access token**

## Setup

1. Clone the repository and install dependencies from the project root:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_cda_access_token
```

3. Start the MCP server:

```bash
npm run dev:server
```

Or from the server workspace:

```bash
npm run start --workspace=server
```

## Cursor MCP configuration

Add the server to your Cursor MCP config (e.g. `.cursor/mcp.json` or your user MCP settings):

```json
{
  "mcpServers": {
    "contentful-helper": {
      "command": "node",
      "args": ["path/to/contentful-mcp/server/index.js"],
      "env": {
        "CONTENTFUL_SPACE_ID": "your_space_id",
        "CONTENTFUL_ACCESS_TOKEN": "your_cda_access_token"
      }
    }
  }
}
```

Alternatively, keep credentials in the project `.env` (loaded by the server) and point `args` at `server/index.js` only.

After saving, restart Cursor (or reload MCP servers) and try prompts like:

- “List all Contentful entries”
- “Get Contentful entries with limit 10”

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CONTENTFUL_SPACE_ID` | Yes | Contentful space ID |
| `CONTENTFUL_ACCESS_TOKEN` | Yes | Content Delivery API (CDA) token |

Do not commit `.env`. It is listed in `.gitignore`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm install` | Install root workspace dependencies |
| `npm run dev:server` | Run the MCP server (`node server/index.js`) |

## How it works

1. The server reads `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` from `.env`.
2. It registers `get_contentful_entries` with the MCP runtime.
3. On each tool call, it requests:

   `https://cdn.contentful.com/spaces/{SPACE_ID}/entries?access_token=...&limit=...`

4. Results are returned to the client as JSON text content over stdio.

## License

Private project (`"private": true` in `package.json`). Add a license file if you plan to open-source it.
