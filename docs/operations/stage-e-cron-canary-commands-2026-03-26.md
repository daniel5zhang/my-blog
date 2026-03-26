# 阶段 E · Cron 灰度启用命令清单

**日期：** 2026-03-26
**目标：** 提供可执行的 cron 命令清单，用于验证和灰度启用 `每日运营报告`
**原则：** 仅输出命令，不执行；启用须人工确认前置条件全部满足

---

## 前置检查命令（启用前必须逐项通过）

```bash
# 1. 确认作业当前状态
openclaw cron list --include-disabled | grep 8de2a424

# 预期：显示 id、name、enabled=false、lastRunStatus

# 2. 读取作业详情，确认 payload 无旧名称残留
openclaw cron get 8de2a424-0fbb-4a3b-af3f-2c5329611d9c

# 人工检查项：
#   - message 内容不含"鲍勃的思考空间"、"Hugo"
#   - delivery.channel 已填写（非空）
#   - 博客地址为当前真实地址

# 3. 检查最近一次运行结果
openclaw cron runs 8de2a424-0fbb-4a3b-af3f-2c5329611d9c --limit 1

# 预期：lastRunStatus=ok，lastDeliveryStatus=delivered
```

**通过条件：** 以上 3 项全部OK方可进入手动触发阶段。

---

## 手动触发命令（Canary Test）

```bash
# 4. 手动触发一次，不启用（观察是否报错）
openclaw cron run 8de2a424-0fbb-4a3b-af3f-2c5329611d9c

# 等待执行完成（一般 60~90 秒）

# 5. 检查触发结果
openclaw cron runs 8de2a424-0fbb-4a3b-af3f-2c5329611d9c --limit 1

# 通过条件：
#   - lastRunStatus = ok
#   - lastDeliveryStatus = delivered
#   - 无 Channel 报错
```

**通过条件：** 手动触发完成且飞书收到报告内容，方可正式 enable。

---

## 启用与回滚命令

```bash
# === 正式启用（确认前置检查 + Canary Test 全部通过后执行）===
openclaw cron edit 8de2a424-0fbb-4a3b-af3f-2c5329611d9c --enabled true

# === 回滚（出现问题时立即执行）===
openclaw cron edit 8de2a424-0fbb-4a3b-af3f-2c5329611d9c --enabled false

# === 验证回滚生效 ===
openclaw cron list --include-disabled | grep 8de2a424
# 确认 enabled = false
```

---

## 验收标准

| 阶段 | 验收项 | 通过标准 |
|------|--------|----------|
| 前置检查 | 作业状态可见 | `openclaw cron list` 能列出该作业 |
| 前置检查 | payload 无旧名称 | 人工确认无"鲍勃"、"Hugo"残留 |
| 前置检查 | delivery.channel 已填写 | 非空，已指定 chat_id 或 open_id |
| Canary Test | 手动触发成功 | `lastRunStatus = ok` |
| Canary Test | delivery 成功 | `lastDeliveryStatus = delivered` |
| Canary Test | 报告内容正确 | 飞书收到，含三栏目统计，无乱码 |
| 启用后 | 调度正常 | 次日 12:00 北京时间自动触发 |
| 启用后 | 无报错 | 连续 3 次 `lastRunStatus = ok` |

---

*本清单由 main 代理生成，阶段 E Cron 灰度启用命令于 2026-03-26*
