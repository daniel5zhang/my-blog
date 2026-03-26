# 阶段 D · 运营恢复最小方案

**日期：** 2026-03-26
**目标：** 在不恢复旧自动发文作业的前提下，提供一条可启用作业的最小方案
**原则：** 本阶段不 enable 任何 cron 作业，只输出方案和执行建议

---

## 一、仅保留作业

**唯一保留对象：** `每日运营报告`

| 字段 | 值 |
|------|-----|
| ID | `8de2a424-0fbb-4a3b-af3f-2c5329611d9c` |
| 当前状态 | disabled |
| 调度 | `0 12 * * *`（北京时间每天中午） |
| 用途 | 生成前一日内容发布统计与运营建议 |

**保留理由：**
- 唯一最近运行状态为 ok 的作业（lastRunStatus: ok，lastDurationMs: 76786）
- 覆盖面完整：diary + articles + science 三栏目统计
- 定位清晰：只做报告，不改内容，不侵入业务逻辑
- 已引用正确路径 `/home/daniel/.openclaw/workspace/my-blog`

---

## 二、建议调度

| 项目 | 当前值 | 建议 |
|------|--------|------|
| 调度 | `0 12 * * *` | **保持不变**（中午 12:00 北京时间，与人工运营节奏匹配） |
| agent | main | 保持 |
| model | `aliyun/MiniMax-M2.5` | 保持，或升级为 `MiniMax-M2.7` 供更稳定推理 |
| delivery | feishu | 必须显式指定 `delivery.channel`，解决历史 channel 报错 |

**建议 payload 清理项（启用前必须更新）：**
- [ ] 确认 message 内容中无"鲍勃的思考空间"等旧站点名称残留
- [ ] 确认博客地址 `http://localhost:1313/` 是否为当前正确地址（Astro）
- [ ] delivery.channel 需明确填写目标 chat_id 或 open_id

---

## 三、启用前置条件

以下 3 项全部满足前，**禁止 enable** 该作业：

| # | 条件 | 验证方式 |
|---|------|----------|
| 1 | payload 文本已更新为 Daniel实验室 当前定位 | 人工审查 message 内容 |
| 2 | delivery.channel 已明确指定 | 填写飞书 chat_id 或 open_id |
| 3 | 在非生产环境完成一次手动触发验证 | 调用 `cron run` 测试，观察是否仍报错 |

---

## 四、回滚步骤

若启用后出现异常，执行以下步骤：

```bash
# 立即禁用该作业（禁止 remove）
openclaw cron edit <job-id> --enabled false

# 检查最近一次 run 输出
openclaw cron runs <job-id>

# 若内容异常，审查 delivery 告警，修正后再次验证
```

回滚原则：**只 disable，不 remove**，保留历史记录。

---

## 五、验收标准

| 验收项 | 通过条件 |
|--------|----------|
| 报告生成 | 作业触发后 90 秒内完成，不报错 |
| 内容正确 | 报告包含三栏目（diary/articles/science）各篇数统计 |
| 格式规范 | 输出包含 📊 📝 💡 三类标签，中文，无乱码 |
| delivery 成功 | `lastDeliveryStatus: delivered`，飞书可收到 |
| 无旧名称残留 | 报告中无"鲍勃"、"Hugo"等旧站点词汇 |

---

*本方案由 main 代理生成，阶段 D 最小运营恢复方案于 2026-03-26*
