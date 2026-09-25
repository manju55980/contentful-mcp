# Implementation Tasks: Refactoring

## Task 1: Remove Unused Express Dependency
- **Goal**: Remove `express` from server dependencies.
- **Files Involved**:
  - `server/package.json`
- **Changes Required**:
  - Remove `"express": "4.19.2"` from dependencies in `server/package.json`.
- **Verification**:
  - Run `npm install` or check dependency tree to ensure clean dependency resolution.

## Task 2: Remove Unused Client Workspace Reference
- **Goal**: Clean up root workspace configuration by removing the non-existent `client` workspace.
- **Files Involved**:
  - `package.json` (root)
- **Changes Required**:
  - Remove `"client"` from the `workspaces` array in root `package.json`.
- **Verification**:
  - Run workspace commands to confirm workspace structure resolves correctly.

## Task 3: Move Environment Validation into Configuration Module
- **Goal**: Centralize environment variable validation in `server/config/env.js` instead of `server/index.js`.
- **Files Involved**:
  - `server/config/env.js`
  - `server/index.js`
- **Changes Required**:
  - Update `server/config/env.js` to validate that `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` are present, throwing an error if either is missing.
  - Simplify `server/index.js` by removing its manual check for `spaceId` and `accessToken`.
- **Verification**:
  - Run unit tests and verify that missing credentials still throw startup errors (AC3).

## Task 4: Improve Contentful URL Construction
- **Goal**: Use `URL` and `URLSearchParams` for constructing Contentful API request URLs.
- **Files Involved**:
  - `server/services/contentful.js`
- **Changes Required**:
  - Replace string interpolation of URL parameters in `fetchContentfulEntries` with `new URL(...)` and `URLSearchParams`.
- **Verification**:
  - Run unit tests to ensure API fetching and test mocks continue to pass correctly.
