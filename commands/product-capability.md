---
description: 将 PRD、Roadmap 或产品讨论转化为可落地的能力计划 — 暴露约束、不变性、接口和待决问题。当产品意图明确但实现约束尚不清晰、跨服务/团队需要能力契约、或需要 PRD 到 SRS 的工程转化时使用。
---

# Product Capability 命令

将产品意图转化为明确的工程约束和能力契约，确保多服务协作开始前所有隐藏约束已被显式化。

## 执行

调用 `product-capability` skill：

```
/skill product-capability
```

## 流程

1. **重述能力** — 一句话压缩：谁、获得什么新能力、什么结果因此改变
2. **解析约束** — 业务规则、范围边界、不变性、数据所有权、生命周期
3. **定义实现契约** — actors、surfaces、state transitions、接口/数据影响
4. **转化执行** — 标出：可直接实现 / 需要架构审查 / 需要产品澄清

## 输出

```
CAPABILITY    — 单段重述
CONSTRAINTS   — 固定规则、不变性、边界
IMPLEMENTATION CONTRACT — actors、surfaces、states
NON-GOALS     — 明确不做什么
OPEN QUESTIONS — 仍需澄清的阻断问题
HANDOFF       — 下一步及交给哪个 lane
```

## 上游

如果产品意图尚不清晰，先使用 `product-lens` 做诊断。
