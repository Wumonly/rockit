---
description: 为新功能生成 Product Requirements Document (PRD)。在规划功能、启动新项目或需要编写产品需求文档时使用。当用户提到"创建prd"、"写prd"、"生成prd"、"需求文档"、"产品需求"、"create prd"、"write prd"时使用。
---

# PRD 生成命令

为新功能生成结构化、可执行的 Product Requirements Document。

## 执行

调用 `prd` skill：

```
/skill prd
```

## 流程

1. 提出 3-5 个关键澄清问题（带字母选项，用户可快速回复如 "1A, 2C, 3B"）
2. 根据答案生成结构化 PRD，包含：
   - 功能概述与目标
   - User Story（含可观测的验收标准）
   - 功能需求（编号列表）
   - 非目标（明确范围边界）
   - 技术考量与成功指标
3. 保存到 `tasks/prd-<功能名>.md`

## 验收标准要求

PRD 中所有验收标准都是可验证、可观测的，避免模糊描述如"工作正常"、"接入接口"。UI story 必须写明浏览器验证的具体页面、操作和预期结果。

## 输出

`tasks/prd-<功能名>.md` — 可直接交给 Ralph 系统执行的产品需求文档。
