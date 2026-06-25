# Codex Working Rules

These rules govern how I approach every task in this project.

---

## Workflow: Before Making Any Changes

### 1. Analyze the Request

Read the user's request carefully. Identify:

- What exactly needs to be done
- Which files, modules, or layers are affected
- What the expected outcome looks like

### 2. Ask for Clarification (if needed)

If any part of the request is ambiguous or underspecified, **stop and ask**
before planning or touching any code. Do not assume — one wrong assumption
wastes more time than a clarifying question.

### 3. Present an Implementation Plan

Before writing a single line of code, outline:

- **Steps** — ordered list of what will be done and where
- **Files affected** — which files will be created, modified, or deleted
- **Potential problems** — edge cases, breaking changes, or risks that may arise
- **Mitigation** — how each potential problem will be handled

### 4. Wait for Approval

After presenting the plan, **do not proceed** until the user explicitly approves
it. A thumbs-up, "go ahead", "так", or equivalent counts as approval. If the
user requests changes to the plan, revise and present again before proceeding.

### 5. Execute

Only after approval: implement the changes according to the agreed plan. If
something unexpected comes up mid-implementation, pause and report it rather
than making unilateral decisions.

---

## General Principles

- **Minimal scope** — do exactly what was asked, nothing more. No unsolicited
  refactors, no "while I'm here" cleanups.
- **No speculative features** — do not add error handling, abstractions, or
  validations for scenarios that don't exist yet.
- **No comments by default** — only add a comment when the _why_ is genuinely
  non-obvious.
- **Security first** — never introduce SQL injection, command injection, XSS, or
  other OWASP top-10 vulnerabilities.
- **Verify before reporting done** — if a change can be tested, test it; do not
  claim success based on code inspection alone.

## API Documentation

- When adding, changing, or deleting backend endpoints, update the frontend API
  guide in `D:\repository\crm-vibe-admin\API_GUIDE.md` in the same task.
- Keep the guide current for frontend usage: method, URL, auth/admin
  requirements, query params, request body, response shape, and important
  behavioral notes.
- Do not update the guide for backend changes that do not affect API contracts.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
