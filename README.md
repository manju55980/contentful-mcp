# Custom MCP Node.js Project

A runnable **Node.js MCP server** that can be connected to AI clients such as **Cursor**.

The project is designed as a starting point for building a custom MCP (Model Context Protocol) server. The MCP server exposes custom tools that an AI client can discover and use.

## Project Structure

```text
custom-mcp/
├── client/              # Optional frontend application
├── server/              # Node.js MCP server
│   ├── src/
│   │   ├── tools/       # Custom MCP tools
│   │   ├── index.ts     # MCP server entry point
│   │   └── ...
│   └── package.json
├── supabase/            # Supabase migrations/functions if required
├── .env.example
├── .env.local
├── package.json
└── README.md
```

## Getting Started

Install dependencies from the project root:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env.local
```

Add the required environment variables.

### Start the Node.js MCP Server

```bash
npm run dev:server
```

The server will start locally according to the configured MCP transport.

If the project also contains the Next.js client, run:

```bash
npm run dev
```

in a separate terminal.

## MCP Server

The main purpose of this project is the **custom Node.js MCP server**.

The server contains custom tools that can be exposed to MCP-compatible clients.

Example:

```text
AI Client
   │
   │ MCP
   ▼
Node.js MCP Server
   │
   ├── Custom Tool 1
   ├── Custom Tool 2
   └── Custom Tool 3
```

The AI client can discover the available tools and call them when needed.

## Connecting to Cursor

After creating and running the MCP server, it can be connected to **Cursor** using Cursor's MCP configuration.

The project itself contains the MCP implementation.

The **Cursor connection is a client-side configuration step**.

Typical flow:

```text
1. Create / modify MCP project
        ↓
2. Install dependencies
        ↓
3. Run the Node.js MCP server
        ↓
4. Add the MCP server to Cursor
        ↓
5. Cursor discovers the available tools
        ↓
6. Use the tools from Cursor
```

The MCP configuration should point Cursor to this project's MCP server entry point or start command, depending on the transport used by the project.

### Important

The MCP server code should be maintained inside this project.

Cursor configuration is only required to connect Cursor to the server.

You do **not** need to manually recreate the MCP tools inside Cursor.

## Creating a Custom MCP Tool

Custom tools should be added inside the server's tool structure.

For example:

```text
server/
└── src/
    └── tools/
        ├── get-project-info.ts
        ├── search-content.ts
        └── create-ticket.ts
```

A tool should generally contain:

```text
Tool
 ├── name
 ├── description
 ├── input schema
 └── handler
```

For example, conceptually:

```text
search-content
    ↓
Input:
    searchText

    ↓
Node.js handler

    ↓
Contentful / API / Database

    ↓
Result returned to AI client
```

## Environment Variables

Add required values to `.env.local`.

Example:

```env
PORT=4000

API_BASE_URL=http://localhost:4000

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Only add variables that are actually required by the tools implemented in the project.

Do not commit `.env.local` or secret keys to Git.

## Supabase

Supabase is optional and should only be used when a custom MCP tool requires database functionality.

Supabase migrations are located under:

```text
supabase/migrations/
```

Supabase Edge Functions, if required, are located under:

```text
supabase/functions/
```

Apply migrations to the configured Supabase project before using tools that depend on those tables.

## Development Commands

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Run the Node.js MCP server:

```bash
npm run dev:server
```

Build the project:

```bash
npm run build
```

## Adding More MCP Tools

When adding a new capability:

```text
1. Create the tool
        ↓
2. Define its input schema
        ↓
3. Implement the Node.js handler
        ↓
4. Register the tool with the MCP server
        ↓
5. Restart the MCP server
        ↓
6. Refresh/reconnect the MCP server in Cursor
        ↓
7. Test the tool from Cursor
```

Keep business logic inside the server rather than inside the Cursor configuration.

## Example Use Case

A custom Contentful MCP could expose tools such as:

```text
Contentful MCP
│
├── search_entries
├── get_entry
├── get_content_type
├── search_assets
└── update_entry
```

Then Cursor could use those tools when the user asks:

```text
"Find the Aveeno hero component for this page."
```

Cursor:

```text
AI
 ↓
Contentful MCP
 ↓
search_entries
 ↓
Contentful
 ↓
Result
 ↓
AI response
```

## Architecture

The overall architecture is:

```text
                 ┌──────────────┐
                 │    Cursor    │
                 │   AI Client  │
                 └──────┬───────┘
                        │
                       MCP
                        │
                        ▼
              ┌──────────────────┐
              │ Node.js MCP      │
              │ Server           │
              └────────┬─────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Custom Tools  Supabase    External APIs
```

## Important Notes

* This project is the **custom MCP implementation**.
* Node.js contains the MCP server and its tools.
* Cursor is an MCP client.
* Cursor only needs to be configured to connect to the running MCP server.
* New capabilities should be implemented as MCP tools in the Node.js project.
* Keep API keys and secrets in environment variables.
* Do not commit `.env.local`.
* Restart or reconnect the MCP server after changing tool definitions.

## Next Steps

To create a new custom MCP:

```text
Create Node.js project
        ↓
Install MCP SDK
        ↓
Create MCP server
        ↓
Create custom tools
        ↓
Register tools
        ↓
Run server
        ↓
Connect server to Cursor
        ↓
Test tools
```

This project can then be extended with integrations such as **Contentful, Jira, Figma, Supabase, GitHub, or other APIs**.
