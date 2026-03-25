# OpenClaw产品化手册周检查清单

## 使用场景
用于每周检查 `OpenClaw产品化手册` 是否仍保持三层一致：
- Wiki 正文层
- Bitable 索引层
- GitHub 备份层

适用于：
- 一周内发生过多次文档更新
- 本周有新增正文、节点 move、索引变动
- 需要做周度结构校准与缺漏补齐

## 执行步骤
1. 先查看本周是否新增正式正文
2. 检查新增正文是否已进入正确一级主题或二级节点
3. 检查 `OpenClaw产品迭代` 中是否已有对应索引记录
4. 检查索引记录是否补齐知识库链接、GitHub 文档链接、状态、阶段、下一步
5. 检查 GitHub 是否已更新必要镜像 / README / `CHANGELOG.md`
6. 若发现结构错误，判断是否需要 move 节点
7. 若发现规则变化，回写对应 SOP

## 必查项
- 是否有新增正文未进入 Wiki 正式结构
- 是否有正文已写但未进 Bitable 索引层
- 是否有 GitHub 文档已更新但飞书未同步
- 是否有 Bitable 记录状态滞后
- 是否有一级主题下的二级正文归属错误
- 是否有本周授权失败但未留痕的动作

## 输出格式
建议每周输出一段固定结构记录：

- 周期：YYYY-MM-DD ~ YYYY-MM-DD
- 本周新增正文：
- 本周新增/更新索引：
- 本周 GitHub 回写：
- 结构问题：
- 授权问题：
- 下周动作：

## 最小留痕要求
- 至少更新一处真实资产层（Wiki / Bitable / GitHub）
- 若存在结构变化，更新 GitHub 镜像
- 若存在规则变化，更新对应 SOP 与 `CHANGELOG.md`
- 若只是状态变化，至少更新 Bitable 索引层并记录结果

## 与已有 SOP 的关系
- 本文是 `recurring-maintenance-workflow.md` 的周执行模板
- 执行时必须服从：
  - `manual-maintenance-sop.md`
  - `asset-sync-sop.md`
  - `feishu-knowledgebase-sop.md`
