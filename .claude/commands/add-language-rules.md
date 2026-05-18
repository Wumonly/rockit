---
name: add-language-rules
description: Workflow command scaffold for add-language-rules in RocKit.
allowed_tools: ["Bash", "Read", "Write", "Glob"]
---

# /add-language-rules

Adds a new programming language to the rules system.

## Goal

Extend RocKit's coding standards to a new language with coding style, patterns, security, and testing guidelines.

## Current Languages

- TypeScript/JavaScript (`rules/typescript/`)
- Python (`rules/python/`)
- Web (`rules/web/`)
- Common (`rules/common/`)

## Suggested Sequence

1. Create `rules/{language}/` directory
2. Add `coding-style.md`, `patterns.md`, `security.md`, `testing.md`
3. Reference any relevant skills in the rules
4. Update CLAUDE.md if needed

## Notes

- Only add languages you actually use
- Keep rules concise — these are for Claude Code, not human onboarding
