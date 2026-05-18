---
name: feature-development
description: Workflow command scaffold for feature-development in RocKit.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-development

Use this workflow when working on **feature-development** in RocKit.

## Goal

Standard feature implementation workflow for personal full-stack projects.

## Tech Stack

- Frontend: React, Vue 3, Next.js, Vite
- Backend: Python (FastAPI), Node.js (Express, NestJS)
- Data: PostgreSQL, Redis, Prisma

## Suggested Sequence

1. **Plan first** — use `/plan` to break down the feature
2. **Write tests** — follow TDD: red → green → refactor
3. **Implement** — minimal, clean code following conventions
4. **Review** — use `/code-review` before committing
5. **Secure** — use `/security-scan` if touching auth/API/input
6. **Document** — update relevant docs

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.
