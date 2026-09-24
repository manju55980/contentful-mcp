# Feature Specification: Get Entries (`get_contentful_entries`)

## Purpose
Allow an AI client such as Cursor to retrieve entries from a configured Contentful space through the MCP server.

## Current Behavior
- **Tool Name**: `get_contentful_entries`
- **Inputs**:
  - `limit` (optional integer, min 1, max 100, default `100`) validated via Zod (`zod/v4`).
- **Contentful Behavior**:
  - Sends an HTTP GET request to `https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&limit=${limit}` using global `fetch`.
- **Outputs**:
  - Returns a text content block containing JSON with:
    - `total`: number of returned entries
    - `entries`: array of objects mapped from Contentful items containing `id`, `contentType`, `createdAt`, `updatedAt`, and `fields`.
- **Error Handling**:
  - Throws an error on server startup if `CONTENTFUL_SPACE_ID` or `CONTENTFUL_ACCESS_TOKEN` are missing.
  - Throws an error if Contentful API responds with a non-200 status code (`response.ok` is false).

## Requirements & Acceptance Criteria

### AC1 — Get Entries Successfully
- **Given** valid `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` environment variables,
- **When** an AI client calls `get_contentful_entries` with an optional `limit`,
- **Then** the MCP server successfully fetches entries from Contentful CDA and returns structured JSON with `total` and mapped `entries`.

### AC2 — Input Validation via Zod
- **Given** an invalid `limit` (e.g. outside 1–100 or non-integer),
- **When** `get_contentful_entries` is invoked,
- **Then** Zod schema validation rejects the input.

### AC3 — Missing Credentials
- **Given** missing `CONTENTFUL_SPACE_ID` or `CONTENTFUL_ACCESS_TOKEN` in environment variables,
- **When** the server starts up,
- **Then** the server throws a configuration error preventing execution.

### AC4 — API Error Handling
- **Given** an invalid access token or space ID resulting in a Contentful API error,
- **When** `get_contentful_entries` executes a fetch request,
- **Then** the server catches non-ok responses and throws a descriptive error including the status code and response body.

## Future / Target Improvements
- Support filtering by content type (`contentType` parameter).
- Support specifying Contentful environment (`CONTENTFUL_ENVIRONMENT`).
- Extract API call logic into `server/services/contentful.js`.
