## Code Quality & Simplicity

* Prefer simple, readable solutions over clever or complex ones.
* Keep files small and focused on one responsibility.
* Prefer functions with a single clear purpose.
* Avoid unnecessary abstractions, wrappers, classes, and design patterns.
* Reuse existing utilities and services before creating new ones.
* Do not duplicate logic.
* Keep MCP tools thin; business/API logic should live in services.
* Keep external API calls isolated from MCP tool definitions.
* Use clear, descriptive names.
* Follow standard Node.js/JavaScript and MCP best practices.
* Prefer the simplest solution that satisfies the specification.
* Do not add dependencies unless they provide clear value.
* Do not refactor unrelated code while implementing a task.
* Avoid premature optimization.
* Keep individual files reasonably small; if a file becomes difficult to understand, consider splitting it by responsibility.
* Comments should explain why something is necessary, not simply repeat what the code does.
* Maintain the existing architecture unless the specification requires a change.

### Before Adding Complexity

Ask:

1. Can the existing code be reused?
2. Can this be solved with a small function?
3. Does this abstraction solve a real current problem?
4. Will another developer understand this code quickly?
5. Does the added complexity directly support a requirement?

If a simpler implementation satisfies the specification, choose the simpler implementation.
