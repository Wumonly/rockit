# RocKit

鹏的个人全栈开发插件 — 基于 [Everything Claude Code](https://github.com/anthropics/everything-claude-code) 架构，精选 50 个 Skill、19 个 Agent、18 条 Command、28 条 Hooks，覆盖从需求澄清到生产发布的全流程。

## 技术栈

| 层面 | 技术 |
| --- | --- |
| 前端 | React, Vue 3, Next.js, Nuxt 4, Vite, Tailwind CSS |
| 后端 | Python (FastAPI), Node.js (Express, NestJS) |
| 数据 | PostgreSQL, Redis, Prisma ORM |
| 工具 | Docker, GitHub Actions, Playwright |

## 资产清单

```text
rockit/
├── agents/        19  个 — 专用 AI 子代理（规划、审查、测试、安全）
├── skills/        50  个 — 工作流与领域知识（框架模式、测试策略、安全）
├── commands/      18  条 — 斜杠命令快速入口
├── hooks/         28  条 — 触发器自动化（质量门禁、格式化、会话持久化）
├── rules/         28  篇 — 始终生效的编码规范与约定
│   ├── common/    10  篇 — 语言无关（编码风格、Git、安全、测试）
│   ├── python/    6   篇 — Python 专属（FastAPI、编码风格、安全、测试）
│   ├── typescript/ 5  篇 — TypeScript 专属（编码风格、安全、测试）
│   └── web/       7   篇 — Web 专属（设计质量、性能、安全）
├── scripts/       85  个 — Node.js 工具（Hook 运行器、会话管理、工具库）
├── tests/         65  个 — 测试套件（单元测试、Hook 集成测试）
└── mcp-configs/        — MCP 服务器配置模板
```

## 架构

RocKit 采用 **hybrid** 模块组织，资产按类型分目录，按领域分子目录：

```text
资产层 (Markdown/YAML 定义)
  agents/     → 定义 AI 子代理的能力边界和工具集
  skills/     → 定义工作流知识、框架模式和最佳实践
  commands/   → 定义用户可调用的斜杠命令入口
  rules/      → 定义始终生效的编码规范和约定

执行层 (Node.js 脚本)
  scripts/    → Hook 运行器、会话管理器、工具库
  hooks/      → 触发器定义 (hooks.json)，在工具调用前后自动执行

测试层
  tests/      → 脚本和 Hook 的单元/集成测试
```

## Hook 系统

通过 `ECC_HOOK_PROFILE` 环境变量控制自动化程度：

| Profile | 行为 |
| --- | --- |
| `minimal` | 仅会话持久化 + 成本追踪 |
| `standard` | 质量门禁、代码格式化、console 检查 |
| `strict` | GateGuard 事实强制、配置保护、设计检查 |

在 `~/.claude/settings.json` 中配置，也可按项目覆盖。

## 功能管线（8 阶段）

完整的全栈开发工作流，从模糊想法到上线运行：

```text
阶段一：需求澄清
  /product-lens         → 验证想法，产出 go/no-go 建议
  /product-capability   → 将需求拆解为工程级实现约束
  /plan-prd             → 生成正式 PRD

阶段二：架构与规划
  /plan                 → 分析代码库 → 评估风险 → 输出分步实现计划
  rockit:architect      → 架构选型决策
  /plan-orchestrate     → 自动分解成 Agent 链路
  /architecture-decision-records → 记录架构决策为 ADR

阶段三：开发实施
  /tdd-workflow         → TDD 三步：RED → GREEN → IMPROVE
  rockit:code-explorer  → 追踪执行路径，理解陌生代码
  /codebase-onboarding  → 为新仓库生成架构地图和 CLAUDE.md
  /search-first         → 写代码前搜索已有方案，避免重复造轮子
  /build-fix            → 检测构建系统，最小化修复构建/类型错误

阶段四：测试
  rockit:tdd-guide      → 强制 TDD 入口（先测试再实现）
  /test-coverage        → 分析覆盖率，定位缺口，目标 80%+
  /python-testing       → pytest 引导（fixture、参数化、mock）
  rockit:e2e-runner     → Playwright E2E 测试（关键用户流程）
  /browser-qa           → 部署前浏览器自动化验证
  /benchmark            → 性能基线与回归检测
  /verification-loop    → lint → type-check → test → security → build

阶段五：安全检查
  rockit:security-reviewer → 专项代码安全审查（认证、API、输入处理）
  /security-scan        → 全表面扫描（Agent、Hook、MCP、权限、密钥）
  /production-audit     → 上线前生产环境审计

阶段六：代码审查
  /code-review          → 本地未提交改动审查（每次必做）
  /review-pr            → GitHub PR 全面审查（覆盖、安全、架构一致性）
  rockit:silent-failure-hunter → 发现被吞掉的异常、错误的降级逻辑

阶段七：部署与发布
  /quality-gate         → 完整质量管道，全部通过则绿灯发布
  /pr                   → 分析 diff → 创建 PR → 推送

阶段八：维护与清理
  /refactor-clean       → 运行 knip/depcheck，安全删除死代码
  /update-docs          → 从源码同步文档
  /update-codemaps      → 重新生成架构地图
  /save-session         → 保存会话，下次 /resume-session 恢复
  /cost-report          → 查看 Token 消耗和费用报告
  /skill-health         → 查看 Skill 组合健康度
```

详细用例和示例对话见 [USAGE.md](USAGE.md)。

## 快速开始

### 方式一：插件市场安装（推荐）

```bash
# 添加市场源，然后安装
/plugin marketplace add rockit https://github.com/roc-kit/rockit
/plugin install rockit
```

### 方式二：本地路径安装

```bash
# 直接从本地目录安装
/plugin install /path/to/rockit
```

### 方式三：手动安装

1. 将 `rockit/` 放置到 `~/.claude/plugins/rockit/`
2. 在 `~/.claude/settings.json` 中启用插件
3. 设置 `ECC_HOOK_PROFILE=standard` 获取推荐体验

```json
{
  "plugins": {
    "rockit": {
      "enabled": true
    }
  },
  "env": {
    "ECC_HOOK_PROFILE": "standard"
  }
}
```

## 本地开发

```bash
# 运行全部测试
node tests/run-all.js

# 运行单独测试文件
node tests/lib/utils.test.js
node tests/hooks/hooks.test.js

# Markdown 格式检查
npx markdownlint-cli '**/*.md' --ignore node_modules
```

### 开发约定

| 项 | 规范 |
| --- | --- |
| Runtime | Node.js >=18，纯 CommonJS（无 ESM） |
| 文件命名 | lowercase-with-hyphens |
| Agent 格式 | Markdown + YAML frontmatter（name, description, tools, model） |
| Skill 格式 | Markdown（适用场景、工作流程、示例） |
| Hook 格式 | JSON matcher + hooks 数组；所有 Hook 非关键错误必须 exit 0 |
| 脚本上限 | Hook 脚本 <200 行，公共逻辑提取到 `scripts/lib/` |
| 测试 | `scripts/lib/` 新文件须配 `tests/lib/` 同名测试；新 Hook 须配集成测试 |

## 可用 Agent 速查

| Agent | 触发时机 |
| --- | --- |
| `rockit:planner` | 复杂功能、重构 |
| `rockit:architect` | 系统设计、架构决策 |
| `rockit:code-explorer` | 理解陌生代码 |
| `rockit:code-reviewer` | **每次代码变更后** |
| `rockit:tdd-guide` | 新功能、Bug 修复 |
| `rockit:security-reviewer` | 认证、输入处理、API、密钥 |
| `rockit:e2e-runner` | 关键用户流程测试 |
| `rockit:build-error-resolver` | 构建或类型错误 |
| `rockit:performance-optimizer` | 性能瓶颈 |
| `rockit:refactor-cleaner` | 死代码清理 |
| `rockit:silent-failure-hunter` | 被吞掉的异常 |
| `rockit:type-design-analyzer` | TypeScript / Python 类型设计 |
| `rockit:python-reviewer` | Python 代码变更 |
| `rockit:typescript-reviewer` | TypeScript / JS 代码变更 |
| `rockit:database-reviewer` | SQL、迁移、Schema 设计 |
| `rockit:doc-updater` | 功能完成后更新文档 |
| `rockit:docs-lookup` | 查询库/框架文档 |
| `rockit:pr-test-analyzer` | PR 测试覆盖审查 |

完整 Agent 列表和详细说明见 [CLAUDE.md](CLAUDE.md)。

## 维护

此仓库是个人资产库，随工作流变化增删：

```bash
# 新增 Skill
mkdir -p skills/新技能/ && cp template.md skills/新技能/SKILL.md

# 新增 Agent
cp template.md agents/新代理.md

# 新增 Command
cp template.md commands/新命令.md

# 调整 Hook
vim hooks/hooks.json
```

## 许可

MIT — 基于个人使用精选，原始 ECC 项目开源。
