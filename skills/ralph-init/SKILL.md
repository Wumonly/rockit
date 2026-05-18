---
name: ralph-init
description: 将 Ralph 自主 AI 编码系统初始化到目标项目中。复制 Ralph 运行时文件（编排器、仪表盘、Agent 指令）和配套技能（PRD 生成器、PRD 转 JSON 转换器、浏览器自动化）到项目中。当用户在新项目或已有项目中配置 Ralph、提到"init ralph"、"setup ralph"、"初始化 ralph"、"安装 ralph"、"配置 ralph"、"引入 ralph"时使用。
---

# Ralph 初始化

将 Ralph 自主 AI 编码系统初始化到目标项目中。

Ralph 是一个自主 AI 编码循环执行器。它读取 `prd.json`，然后循环启动 Developer Agent 和 Validator Agent，逐个实现 User Story——无需人工干预。

## 会安装什么

| 目标位置 | 内容 |
|---------|------|
| `scripts/ralph/` | 6 个 Ralph 运行时文件（ralph.py、dashboard.py、dashboard.html、dashboard-p.html、CLAUDE.md、VALIDATOR.md） |
| `.claude/skills/ralph/` | PRD 转 JSON 转换器（含 repair_prd_json.py） |
| `.claude/skills/prd/` | PRD 生成器 |
| `.claude/skills/agent-browser-skill/` | 浏览器自动化（用于 UI 验证） |

## 使用方法

在 ralph-init 技能目录下运行初始化脚本：

```
node .claude/skills/ralph-init/scripts/init.js --target <项目路径>
```

指定 Ralph 版本：

```
node .claude/skills/ralph-init/scripts/init.js --target <项目路径> --version 2.1
```

**参数说明：**

- `--target <路径>` — 目标项目目录（必填）
- `--version <X.Y>` — 要安装的 Ralph 版本（默认：最新版本）
- `--help` — 显示帮助信息

## 版本管理

Ralph 运行时文件按版本存放在 `references/ralph-v<X.Y>/` 中。初始化脚本会自动检测最新版本。使用 `--version` 可锁定特定版本。

可用版本通过 `references/` 目录下的文件夹名自动发现。

## 完整工作流

1. 对目标项目运行初始化脚本
2. 在目标项目中创建 PRD（`tasks/prd-<功能名>.md`，或使用 `prd` 技能）
3. 将 PRD 转换为 JSON（输出到 `scripts/ralph/prd.json`，或使用 `ralph` 技能）
4. 在目标项目根目录启动 Ralph：
   ```
   python scripts/ralph/ralph.py
   ```
5. 在浏览器中监控进度：`http://localhost:7331`
