# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## About RocKit

**RocKit** is a curated Claude Code plugin for the personal full-stack developer (鹏). It contains a battle-tested subset of skills, agents, commands, and hooks optimized for:

- **Frontend**: React, Vue 3, Next.js, Nuxt, Vite
- **Backend**: Python (FastAPI), Node.js (Express/NestJS)
- **Infrastructure**: Docker, PostgreSQL, Redis, Prisma
- **Quality**: TDD, E2E testing, security auditing, code review

## Architecture

```
rockit/
├── agents/         # Specialized AI subagents (planner, reviewers, testers)
├── skills/         # Workflow & domain knowledge (framework patterns, testing, security)
├── commands/       # Slash commands (/plan, /code-review, /build-fix, etc.)
├── hooks/          # Trigger-based automations (pre/post-tool, session lifecycle)
│   └── hooks.json  # Hook definitions and matchers
├── rules/          # Always-follow coding standards and conventions
│   ├── common/     # Language-agnostic rules (coding style, git, security, testing)
│   ├── typescript/ # TypeScript/JavaScript conventions
│   ├── python/     # Python conventions
│   └── web/        # Web development conventions
├── scripts/        # Node.js utilities for hooks, setup, sessions
│   ├── lib/        # Shared libraries (utils, package manager, session manager)
│   └── hooks/      # Hook runner scripts
└── tests/          # Test suite for scripts and hooks
```

## Hooks System

Hooks are controlled via `ECC_HOOK_PROFILE` environment variable:

| Profile | Behavior |
|---------|----------|
| `minimal` | Session persistence + cost tracking only |
| `standard` | Quality gates, formatting, console checks |
| `strict` | GateGuard fact-force, config protection, design checks |

Set in `~/.claude/settings.json` or per-project.

## Running Tests

```bash
node tests/run-all.js
node tests/lib/utils.test.js
node tests/hooks/hooks.test.js
```

## Core Commands

| Command | Purpose |
|---------|---------|
| `/plan` | Create implementation plan before coding |
| `/plan-prd` | Generate PRD from requirements |
| `/feature-dev` | Guided feature development workflow |
| `/code-review` | Review local changes or PR |
| `/build-fix` | Fix build/type errors incrementally |
| `/test-coverage` | Analyze and improve test coverage |
| `/security-scan` | Scan for vulnerabilities |
| `/quality-gate` | Run full quality pipeline |
| `/review-pr` | Comprehensive PR review |
| `/refactor-clean` | Remove dead code safely |
| `/update-codemaps` | Regenerate architecture maps |
| `/update-docs` | Sync documentation from source |
| `/save-session` | Save session for future resume |
| `/resume-session` | Resume from last saved session |
| `/cost-report` | Show token usage and cost |
| `/aside` | Quick side question without losing context |
| `/pr` | Create PR from current branch |
| `/skill-health` | Show skill portfolio health |

## Core Agents

| Agent | Use When |
|-------|----------|
| `planner` | Planning complex features or refactoring |
| `architect` | System design and architecture decisions |
| `code-explorer` | Understanding unfamiliar code |
| `code-reviewer` | **After every code change** |
| `tdd-guide` | Writing new features or fixing bugs |
| `security-reviewer` | Handling auth, input, APIs, secrets |
| `e2e-runner` | Testing critical user flows |
| `build-error-resolver` | Build or type errors |
| `performance-optimizer` | Performance bottlenecks |
| `refactor-cleaner` | Dead code cleanup |
| `silent-failure-hunter` | Finding swallowed errors |
| `type-design-analyzer` | Designing TypeScript/Python types |
| `python-reviewer` | Python code changes |
| `typescript-reviewer` | TypeScript/JavaScript code changes |
| `database-reviewer` | SQL, migrations, schema design |
| `doc-updater` | Updating docs after features |
| `docs-lookup` | Looking up library/framework docs |
| `pr-test-analyzer` | Reviewing PR test coverage |

## Development Notes

- **Runtime**: Node.js >=18, plain CommonJS (no ESM)
- **Test runner**: `node tests/run-all.js`
- **File naming**: lowercase with hyphens
- **Agent format**: Markdown with YAML frontmatter (name, description, tools, model)
- **Skill format**: Markdown (When to Use, How It Works, Examples)
- **Hook format**: JSON with matcher + hooks array
- All hooks must exit 0 on non-critical errors

## When Spawning Subagents

Always pass relevant conventions from skills/ and rules/ into the agent's prompt. Match the agent model tier to task complexity.
