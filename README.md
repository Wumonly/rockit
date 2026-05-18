# RocKit

鹏的个人全栈开发插件 — 基于 [Everything Claude Code](https://github.com/anthropics/everything-claude-code) 精选的 Claude Code 资产库。

## 技术栈

- **前端**: React, Vue 3, Next.js, Nuxt 4, Vite, Tailwind CSS
- **后端**: Python (FastAPI), Node.js (Express, NestJS)
- **数据**: PostgreSQL, Redis, Prisma ORM
- **工具**: Docker, GitHub Actions, Playwright

## 内容

| 类型 | 数量 | 说明 |
|------|:----:|------|
| Skills | 50 | 框架模式、测试策略、安全检查、工作流 |
| Agents | 19 | 代码审查、规划、测试、安全分析 |
| Commands | 18 | 斜杠命令快速调用 |
| Hooks | 28 | 自动化质量门禁、格式检查、会话管理 |

## 快速开始

1. 将 `rockit/` 放置到 `~/.claude/plugins/rockit/`
2. 在 `~/.claude/settings.json` 中启用
3. 设置 `ECC_HOOK_PROFILE=standard` 获取推荐体验

## 维护

此仓库是个人资产库，随工作流变化增删：

- 新增 Skill: 将 SKILL.md 放入 `skills/新技能/`
- 新增 Agent: 在 `agents/` 下创建 Markdown 文件
- 新增 Command: 在 `commands/` 下创建 Markdown 文件
- 调整 Hook: 编辑 `hooks/hooks.json`

## 许可

基于个人使用精选，原始 ECC 项目开源。
