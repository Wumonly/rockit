---
description: 将 Ralph 自主 AI 编码系统初始化到目标项目中。复制运行时文件（编排器、仪表盘、Agent 指令）和配套技能（PRD 生成器、PRD 转 JSON、浏览器自动化）到项目中。当用户在新项目或已有项目中配置 Ralph、提到"init ralph"、"setup ralph"、"初始化 ralph"、"安装 ralph"、"配置 ralph"时使用。
---

# Ralph Init 命令

初始化 Ralph 自主 AI 编码系统到目标项目。

## 执行

调用 `ralph-init` skill：

```
/skill ralph-init
```

## 流程

Skill 触发后将引导以下步骤：

1. 确认目标项目路径
2. 运行 `node .claude/skills/ralph-init/scripts/init.js --target <项目路径> [--version <X.Y>]`
3. 核对安装结果（6 个运行时文件 + 3 个配套技能）

## 安装内容

| 目标位置 | 内容 |
|---------|------|
| `scripts/ralph/` | ralph.py、dashboard.py、dashboard.html、dashboard-p.html、CLAUDE.md、VALIDATOR.md |
| `.claude/skills/ralph/` | PRD 转 JSON 转换器 |
| `.claude/skills/prd/` | PRD 生成器 |
| `.claude/skills/agent-browser-skill/` | 浏览器自动化（UI 验证） |

## 版本

默认安装最新版本。可用 `--version` 指定具体版本。
