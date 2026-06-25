# Claude Working Rules

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
