# Implementation Tasks: Get Entries Feature

## Task 1: Implement Contentful Service Layer
- **Goal**: Extract Contentful Content Delivery API (CDA) request and response mapping logic into a dedicated service module.
- **Files Involved**:
  - `server/services/contentful.js`
- **What Needs to Change**:
  - Implement and export `fetchContentfulEntries({ spaceId, accessToken, limit })`.
  - Perform HTTP GET request to `https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${encodeURIComponent(accessToken)}&limit=${limit}` using `fetch`.
  - Handle non-ok response statuses by throwing descriptive errors including status and response text.
  - Map raw Contentful items to structured objects containing `id`, `contentType`, `createdAt`, `updatedAt`, and `fields`.
- **Verification**:
  - Verify module exports correctly using Node.js ESM import.

## Task 2: Implement Modular Tool Definition
- **Goal**: Extract the `get_contentful_entries` tool definition and Zod schema validation into a dedicated tool module.
- **Files Involved**:
  - `server/tools/getEntries.js`
- **What Needs to Change**:
  - Implement and export a registration function (e.g., `registerGetContentfulEntriesTool(server, { spaceId, accessToken })`).
  - Register the `get_contentful_entries` tool with Zod input validation (`limit` integer, min 1, max 100, default 100).
  - Invoke the service layer to fetch entries and return structured text content containing JSON (`total` and `entries`).
- **Verification**:
  - Verify schema validation correctly accepts valid limits and rejects invalid ones.

## Task 3: Refactor Server Entrypoint
- **Goal**: Connect configuration loading, service layer, and tool registration in the main server entrypoint.
- **Files Involved**:
  - `server/index.js`
- **What Needs to Change**:
  - Load environment configuration from `server/config/env.js`.
  - Validate presence of `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` on startup (throwing error if missing).
  - Initialize `McpServer`, register tools via `server/tools/getEntries.js`, and start Stdio transport (`serveStdio`).
- **Verification**:
  - Run `npm run dev:server` to verify the server starts up cleanly over stdio without configuration errors.

## Task 4: Add Unit Tests
- **Goal**: Implement comprehensive unit testing covering all acceptance criteria (AC1–AC4).
- **Files Involved**:
  - `tests/getEntries.test.js`
- **What Needs to Change**:
  - Write test cases verifying:
    - **AC1**: Successful retrieval and mapping of Contentful entries with limit.
    - **AC2**: Zod input validation rejecting invalid limits.
    - **AC3**: Startup failure when credentials are missing.
    - **AC4**: Graceful handling of Contentful API error responses.
- **Verification**:
  - Run test command to confirm all tests pass successfully.
