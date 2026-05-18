---
name: rockit
description: RocKit — 鹏的个人全栈开发插件。React/Vue + Python/Node.js + Next/NestJS 全栈工作流。Conventional commits。
---

# RocKit

> 鹏的个人 Claude Code 开发资产库，基于 ECC 精选

## 技术栈

- **前端**: React, Vue 3, Next.js, Nuxt 4, Vite, Tailwind CSS, motion
- **后端**: Python (FastAPI), Node.js (Express, NestJS)
- **数据**: PostgreSQL, Redis, Prisma ORM
- **工具**: Docker, GitHub Actions, Playwright
- **语言**: TypeScript, JavaScript, Python

## 何时使用此 Skill

在 RocKit 仓库内工作时自动激活：
- 增删 skills、agents、commands
- 调整 hooks 配置
- 更新 rules 目录

## 提交规范

遵循 Conventional Commits 格式：

### 前缀

- `feat` — 新功能、新 skill/agent/command
- `fix` — 修复问题
- `refactor` — 重构（不改变行为）
- `docs` — 文档更新
- `test` — 测试相关
- `chore` — 维护性工作

### 提交示例

```text
feat(skills): add nuxt4-patterns skill
```

```text
fix(hooks): correct format-typecheck path for Windows
```

```text
docs: update CLAUDE.md with new command list
```

## 架构

### 目录结构

```
rockit/
├── agents/         # 专业化 AI 子代理（19 个）
├── skills/         # 工作流与领域知识（50 个）
├── commands/       # 斜杠命令（18 个）
├── hooks/          # 触发器自动化（28 个）
│   └── hooks.json
├── rules/          # 编码规范
│   ├── common/     # 通用规则
│   ├── typescript/ # TS/JS 规则
│   ├── python/     # Python 规则
│   └── web/        # Web 规则
├── scripts/        # Node.js 工具与钩子
│   ├── lib/        # 共享库
│   └── hooks/      # 钩子脚本
└── tests/          # 测试套件
```

### 文件命名

- **文件**: lowercase-with-hyphens（如 `python-reviewer.md`, `tdd-workflow.md`）
- **函数**: camelCase
- **常量**: SCREAMING_SNAKE_CASE

### 代码风格

- CommonJS（`require`/`module.exports`），不使用 ESM
- 优先使用 `const`，禁止 `var`
- 钩子脚本不超过 200 行，超出则提取到 `scripts/lib/`
- 所有钩子必须在非关键错误上 `exit 0`

## 测试

```bash
# 运行所有测试
node tests/run-all.js

# 单个测试文件
node tests/lib/utils.test.js
node tests/hooks/hooks.test.js
```

## 常见工作流

### 新增 Skill

1. 在 `skills/新技能名/` 下创建 `SKILL.md`
2. 包含 frontmatter（name, description）和正文（When to Use, How It Works, Examples）
3. 运行 `node scripts/skills-health.js` 检查

### 新增 Agent

1. 在 `agents/` 下创建 `agent-name.md`
2. 包含 YAML frontmatter（name, description, tools, model）
3. 更新 CLAUDE.md 中的 agent 列表

### 新增 Command

1. 在 `commands/` 下创建 `command-name.md`
2. 第一行写入 `description:` 
3. 更新 CLAUDE.md 中的 command 列表

### 调整 Hook

1. 编辑 `hooks/hooks.json`
2. 如有新脚本放入 `scripts/hooks/`
3. 在 `tests/hooks/` 中添加对应测试
4. 运行 `node tests/run-all.js` 验证

---

*基于个人工作流持续维护*
