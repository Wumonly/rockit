# RocKit 使用指南

> 鹏的个人全栈开发工作流手册 — 什么时候调用什么指令。

## 全局约定

- 所有命令以 `/rockit:` 为命名空间前缀，如 `/rockit:plan`
- 所有 Agent 以 `rockit:` 前缀调用，如 `rockit:planner`
- 所有 Skill 以 `rockit:` 前缀激活，如 `rockit:tdd-workflow`

---

## 阶段一：需求澄清

> 目标：把模糊想法变成明确需求，避免做了没人要的功能。

### 场景：刚有一个想法，不确定值不值得做

```
/rockit:product-lens
```

**示例对话**：
```
> 我想做一个团队知识库管理工具
> 自动激活 rockit:product-lens skill
> Claude 追问：目标用户是谁？竞品是谁？最痛的使用场景是什么？...
```

### 场景：已明确需求，需要拆解成功能点

```
/rockit:product-capability
```

**示例对话**：
```
> 我们的知识库需要支持 Markdown 编辑、全文搜索、权限管理三个模块
> rockit:product-capability 生成：接口定义、数据流、约束条件、待确认项...
```

### 场景：需要生成正式 PRD

```
/rockit:plan-prd
```

**示例对话**：
```
> /rockit:plan-prd
> Claude 交互式提问 → 输出完整 PRD（问题陈述、假设、范围、验收标准）
```

---

## 阶段二：架构与规划

> 目标：想清楚再写，避免推倒重来。

### 场景：拿到 PRD 后，需要制定实现计划

```
/rockit:plan
```

**示例对话**：
```
> /rockit:plan
> Claude 分析代码库 → 评估风险 → 输出分步实现计划 → 等待你确认
```

### 场景：复杂架构决策（选型、分层设计）

```
rockit:architect
```

**示例对话**：
```
> 我们这个项目应该用 JWT 还是 session 认证？
> 调用 rockit:architect agent → 分析两种方案的 tradeoff → 给出推荐
```

### 场景：多步骤复杂规划，需要自动分解成 Agent 链

```
/rockit:plan-orchestrate
```

**示例对话**：
```
> /rockit:plan-orchestrate
> 读入计划文档 → 自动分解 → 为每步生成专用 Agent 链路
```

### 场景：记录架构决策

```
/rockit:architecture-decision-records
```

**示例对话**：
```
> 为什么我们选了 Redis 而不是 Kafka 做事件总线？
> 自动捕获上下文 → 生成 ADR 文档（背景、备选方案、决策理由）
```

---

## 阶段三：开发实施

> 目标：高质量编码，自动审查，不积累技术债。

### 场景：开始写新功能（强制 TDD）

```
/rockit:tdd-workflow
```

**示例对话**：
```
> /rockit:tdd-workflow
> 1. RED: 先生成测试用例 → 运行确认失败
> 2. GREEN: 写最小实现 → 运行确认通过
> 3. IMPROVE: 重构优化 → 确认测试依然通过
```

### 场景：写 Python 后端代码后 —— 自动审查

写完 Python 代码后，无需手动调用。但可以显式触发：

```
rockit:python-reviewer
/rockit:code-review
```

**示例对话**：
```
> rockit:python-reviewer 帮我审查刚写的 UserService
> 检查：PEP 8 规范、类型注解、SQL 注入、异常处理、性能问题
> 输出：CRITICAL/HIGH/MEDIUM 分级建议
```

### 场景：写 TypeScript/React 组件后 —— 自动审查

```
rockit:typescript-reviewer
```

**示例对话**：
```
> rockit:typescript-reviewer 审查 ./components/DataTable.tsx
> 检查：类型安全、React 最佳实践、性能、可访问性、SSR 安全
```

### 场景：写 SQL 或 Prisma schema

```
rockit:database-reviewer
```

**示例对话**：
```
> rockit:database-reviewer 审查 prisma/schema.prisma
> 检查：索引策略、N+1 风险、事务边界、迁移安全性
```

### 场景：设计类型系统

```
rockit:type-design-analyzer
```

**示例对话**：
```
> rockit:type-design-analyzer 分析我们的 API 响应类型设计
> 检查：封装性、不变量表达、类型有用性、强制力
```

### 场景：接手的陌生代码库 —— 快速理解

```
rockit:codebase-onboarding
rockit:code-explorer
```

**示例对话**：
```
> /rockit:codebase-onboarding
> 分析整个仓库 → 生成架构地图、入口点、约定 → 输出 CLAUDE.md

> rockit:code-explorer 追踪 POST /api/auth/login 的完整执行路径
> 从路由 → Controller → Service → DB 的全链路追踪
```

### 场景：写代码前先搜索已有方案（避免重复造轮子）

```
/rockit:search-first
```

**示例对话**：
```
> /rockit:search-first
> 自动搜索 npm/PyPI/GitHub → "这个功能已有成熟的库，建议直接用 xyz"
```

### 场景：构建失败 —— 快速修复

```
/rockit:build-fix
```

**示例对话**：
```
> Build failed: TypeError: Property 'id' does not exist on type 'User'
> /rockit:build-fix
> 自动检测构建系统 → 定位错误 → 最小化修复
```

### 场景：定期清理死代码

```
/rockit:refactor-clean
```

**示例对话**：
```
> /rockit:refactor-clean
> 运行 knip/depcheck → 发现 12 个未使用的文件/导出 → 逐个安全删除
```

---

## 阶段四：测试

> 目标：确保代码正确，上线不炸。

### 场景：写新功能前（强制 TDD 入口）

```
rockit:tdd-guide
```

**示例对话**：
```
> rockit:tdd-guide 我要给 UserService 加一个 changePassword 方法
> 1. 先生成测试用例
> 2. 再写实现
> 3. 验证覆盖率 >= 80%
```

### 场景：检查当前测试覆盖率

```
/rockit:test-coverage
```

### 场景：写 Python 测试

```
/rockit:python-testing
```

**示例对话**：
```
> /rockit:python-testing
> 引导生成 pytest 测试：fixture、参数化、mock 外部依赖
```

### 场景：写 E2E 测试（关键用户流程）

```
rockit:e2e-runner
/rockit:e2e-testing
```

**示例对话**：
```
> rockit:e2e-runner 为用户注册→登录→下单 流程生成 E2E 测试
> 生成 Playwright 测试脚本 → 运行 → 报告结果
```

### 场景：部署前 UI 自动化验证

```
/rockit:browser-qa
```

### 场景：性能基线测试

```
/rockit:benchmark
```

**示例对话**：
```
> /rockit:benchmark 对比 PR #42 前后的 API 响应时间
> 输出：PR 前后对比报告 → 发现 GET /users 慢了 30%
```

### 场景：发布前全量验证

```
/rockit:verification-loop
```

**示例对话**：
```
> /rockit:verification-loop
> 依次运行：lint → type-check → test → security → build → deploy-check
```

---

## 阶段五：安全检查

> 目标：不漏密钥、不埋漏洞、不踩 OWASP Top 10。

### 场景：写了认证/API/输入处理代码后

```
rockit:security-reviewer
/rockit:security-review
```

**示例对话**：
```
> rockit:security-reviewer 审查 ./api/auth/login.ts
> 检查：JWT 过期策略、SQL 注入、XSS、CSRF、速率限制、错误消息泄露
```

### 场景：全面安全扫描

```
/rockit:security-scan
```

**示例对话**：
```
> /rockit:security-scan
> 扫描 .claude/ 配置 → 检查 settings.json → 审计 MCP 服务器 → 标记风险
```

### 场景：上线前产线审计

```
/rockit:production-audit
```

**示例对话**：
```
> /rockit:production-audit
> 检查：环境变量完整性、日志级别、健康检查端点、CORS 配置、DB 连接池
```

---

## 阶段六：代码审查

> 目标：每次改动都过审，单人也能有团队级质量。

### 场景：写完代码后 —— 每次必做

```
/rockit:code-review
```

**示例对话**：
```
> /rockit:code-review
> 审查所有未提交的改动 → 输出 CRITICAL/HIGH/MEDIUM/LOW 分级报告
```

### 场景：审查 GitHub PR

```
/rockit:review-pr
```

**示例对话**：
```
> /rockit:review-pr https://github.com/xxx/pull/42
> 审查 PR #42 → 测试覆盖分析 → 安全审查 → 架构一致性检查
```

### 场景：寻找代码中的静默失败

```
rockit:silent-failure-hunter
```

**示例对话**：
```
> rockit:silent-failure-hunter 检查 services/
> 发现 3 处 try-catch 吞掉了错误 → 2 处 fallback 返回了错误默认值
```

---

## 阶段七：部署与发布

> 目标：平滑上线，快速验证，安全回滚。

### 场景：上线前最终质量门禁

```
/rockit:quality-gate
```

**示例对话**：
```
> /rockit:quality-gate
> 运行完整质量管道 → 全部通过 → 绿灯允许发布
```

### 场景：创建 GitHub PR

```
/rockit:pr
```

### 场景：部署健康检查

```
/rockit:deployment-patterns
/rockit:canary-watch (如果有)
```

---

## 阶段八：维护与清理

> 目标：代码库持续健康，不会积累腐化。

### 场景：定期清理代码

```
/rockit:refactor-clean
```

### 场景：更新项目文档

```
/rockit:update-docs
/rockit:update-codemaps
```

### 场景：会话持久化（分多次完成的大任务）

```
/rockit:save-session
```

**示例对话**：
```
> 今天实现到一半，明天继续
> /rockit:save-session
```

下次：
```
> /rockit:resume-session
```

### 场景：快速侧问（不丢失当前上下文）

```
/rockit:aside
```

**示例对话**：
```
> /rockit:aside Python 3.12 的 type 语句和 TypeAlias 有什么区别？
> Claude 回答 → 自动切回原任务
```

### 场景：查看 Token 消耗

```
/rockit:cost-report
```

### 场景：查看 Skill 健康状态

```
/rockit:skill-health
```

---

## 快速索引

| 我想做什么 | 调用 |
|-----------|------|
| 验证想法是否值得做 | `/rockit:product-lens` |
| 把需求拆成功能点 | `/rockit:product-capability` |
| 生成正式 PRD | `/rockit:plan-prd` |
| 制定实现计划 | `/rockit:plan` |
| 架构选型决策 | `rockit:architect` |
| 记录架构决策 | `/rockit:architecture-decision-records` |
| TDD 开发新功能 | `/rockit:tdd-workflow` 或 `rockit:tdd-guide` |
| 审查 Python 代码 | `rockit:python-reviewer` |
| 审查 TS/React 代码 | `rockit:typescript-reviewer` |
| 审查 SQL/Schema | `rockit:database-reviewer` |
| 审查类型设计 | `rockit:type-design-analyzer` |
| 快速理解陌生代码 | `/rockit:codebase-onboarding` 或 `rockit:code-explorer` |
| 写代码前搜已有方案 | `/rockit:search-first` |
| 修复构建错误 | `/rockit:build-fix` |
| 写 Python 测试 | `/rockit:python-testing` |
| 写 E2E 测试 | `rockit:e2e-runner` |
| 检查测试覆盖率 | `/rockit:test-coverage` |
| 安全检查 | `rockit:security-reviewer` 或 `/rockit:security-scan` |
| 上线前审计 | `/rockit:production-audit` |
| 每次写完代码审查 | `/rockit:code-review` |
| 审查 GitHub PR | `/rockit:review-pr` |
| 查找静默失败 | `rockit:silent-failure-hunter` |
| 发布前质量门禁 | `/rockit:quality-gate` |
| 清理死代码 | `/rockit:refactor-clean` |
| 更新项目文档 | `/rockit:update-docs` |
| 保存/恢复会话 | `/rockit:save-session` / `/rockit:resume-session` |
| 快速侧问 | `/rockit:aside` |
| 查看花费 | `/rockit:cost-report` |

---

## 典型一日工作流

```
早上 9:00  ─ /rockit:resume-session         # 恢复昨天进度
         ─ /rockit:plan                     # 规划今天的任务
早上 10:00 ─ /rockit:tdd-workflow            # TDD 写功能
         ─ rockit:python-reviewer           # 审查后端代码
下午 2:00  ─ rockit:typescript-reviewer     # 审查前端代码
         ─ /rockit:code-review              # 全量代码审查
下午 4:00  ─ /rockit:test-coverage          # 检查覆盖率
         ─ /rockit:security-scan            # 安全扫描
下午 5:30  ─ /rockit:quality-gate           # 质量门禁
         ─ /rockit:pr                       # 创建 PR
         ─ /rockit:save-session             # 保存进度
```
