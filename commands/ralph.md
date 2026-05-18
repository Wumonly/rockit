---
description: 将 PRD 转换为 prd.json 格式，供 Ralph 自主 agent 系统使用。当用户已有 PRD 文档并需要转为 Ralph 可执行的 JSON 格式、提到"将prd转成prd.json"、"转换prd"、"生成prd.json"、"prd to json"时使用。
---

# Ralph PRD 转换命令

将 Markdown PRD 文档转换为 Ralph 自主 AI 编码系统可执行的 `prd.json` 格式。

## 执行

调用 `ralph` skill：

```
/skill ralph
```

## 流程

1. 读取已有的 PRD 文档（`tasks/prd-<功能名>.md`）
2. 将每个 User Story 转为 JSON 条目，按依赖顺序排列
3. 拆分过大的 Story，补全闭环验收标准
4. 写入 `scripts/ralph/prd.json`
5. 自动运行 `repair_prd_json.py` 修复 JSON 格式问题

## 输出

`scripts/ralph/prd.json` — Ralph 编排器可直接读取执行的 User Story 列表。
