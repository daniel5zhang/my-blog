# Daniel实验室 - 飞书主控台与 GitHub 备份层同步规则

## 一、角色定义
- 飞书多维表格：未来运营主控台
- GitHub：正式内容、规则文档、台账备份和产品建设流程留痕层

## 二、同步原则
### 1. 飞书负责“活状态”
适合在飞书维护的数据：
- 日常状态流转
- 协作分工
- 排期调整
- 审核进度
- 反馈复盘

### 2. GitHub负责“资产沉淀”
适合在 GitHub 保留的数据：
- 正式网站内容
- 规则文档
- 模板文档
- 台账镜像模板
- 产品建设流程日志
- 阶段性关键状态快照

## 三、何时回写 GitHub
以下情况应回写 GitHub：
- 主控台结构发生重要变化
- 新增或调整关键规则字段
- 某轮试运行完成，形成稳定经验
- 某条审核/复盘结论升级为长期规则
- 阶段性里程碑需要留痕

## 四、何时只留在飞书
以下情况可只保留在飞书主控台：
- 临时排期调整
- 日常负责人变更
- 尚未定型的细碎状态更新
- 单次沟通备注

## 五、同步边界
- GitHub 不追求实时同步飞书每一次状态波动
- GitHub 只保留“值得沉淀”的镜像与里程碑
- 飞书一旦正式落表，字段结构应优先与 GitHub 镜像模板对齐

## 六、提示词库的同步口径
- `提示词库` 属于“运营线 + OpenClaw 产品化”的双留存资产。
- 飞书中的 `提示词库` 表，承接后续日常查询与调用。
- GitHub 中对应的主文档为：`docs/openclaw/prompt-library.md`
- GitHub 中对应的镜像文档为：`docs/operations/bitable-mirror/prompt-library-mirror.md`
- 当提示词新增、删除、角色归属变化、留痕要求变化时：
  - 先更新主文档 `docs/openclaw/prompt-library.md`
  - 再同步更新飞书 `提示词库`
  - 最后回写镜像文档与 `CHANGELOG.md`

## 七、OpenClaw产品迭代的同步口径
- `OpenClaw产品迭代` 属于 OpenClaw 产品化的双留存资产。
- 飞书中的 `OpenClaw产品迭代` 表，用于后续按产品迭代维度查询核心资产与阶段记录。
- GitHub 中对应主文档分布于：
  - `docs/openclaw/product-build-log.md`
  - `docs/openclaw/asset-sync-sop.md`
  - `docs/openclaw/role-execution-templates.md`
  - `docs/openclaw/prompt-library.md`
  - `docs/openclaw/automation-boundaries.md`
  - `docs/openclaw/agent-roles.md`
- GitHub 中对应镜像文档为：`docs/operations/bitable-mirror/openclaw-product-iteration-mirror.md`
- 当 OpenClaw 产品化核心资产新增、删除、阶段变化、责任角色变化时：
  - 先更新 GitHub 主文档
  - 再同步飞书 `OpenClaw产品迭代`
  - 最后回写镜像文档与 `CHANGELOG.md`
