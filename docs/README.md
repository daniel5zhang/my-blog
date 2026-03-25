# Daniel实验室 文档总索引

## 总体口径
Daniel实验室 当前文档资产分为三类：
- **运营线资产**：围绕日常推进、台账、排期、审核、复盘的协作资产
- **OpenClaw 产品化资产**：围绕规则、手册、流程、角色机制、能力建设和长期可复刻交付的产品化资产
- **网站资产**：围绕站点源码、页面、配置、正式文章和公开站点基线的资产

这三类资产必须严格分层维护，避免混层。

## 一、运营线资产
主目录：`docs/operations/`

### 适用内容
- 选题池、内容日历、待改写池、待发布池、审核记录、反馈复盘
- 试运行方案、发布前执行口径
- 飞书主控台镜像模板与运营同步规则

### 维护原则
- 飞书主控台是主协作面
- GitHub 保留镜像、规则、模板与关键快照
- 重点看：`docs/operations/README.md`

## 二、OpenClaw 产品化资产
主目录：`docs/openclaw/`

### 适用内容
- Agent 职责边界、协作机制、自动化边界
- 产品建设日志、标准提示词库、执行模板、同步规则
- OpenClaw产品化手册及其维护 SOP
- 面向复刻、交付、销售表达的结构化产品资料

### 三层结构
- **Wiki 正文层**：`OpenClaw产品化手册`（飞书 Wiki）
- **Bitable 索引层**：`OpenClaw产品迭代`（飞书多维表格）
- **GitHub 备份层**：`docs/openclaw/`、`docs/operations/bitable-mirror/`、README、SOP、`CHANGELOG.md`

### 维护原则
- 长正文优先进入 Wiki 正文层
- 状态、阶段、链接、下一步优先进入 Bitable 索引层
- GitHub 承担镜像、SOP、README、日志与审计留痕
- 重点看：`docs/openclaw/README.md`

## 三、网站资产
主位置：
- `src/`
- `src/content/articles/`
- `src/pages/`
- `src/layouts/`
- `CHANGELOG.md`

### 适用内容
- 站点源码、页面、布局、配置
- 已发布文章与正式内容基线

### 维护原则
- GitHub 为主维护面
- 飞书不作为站点正文和源码的主维护层
- 飞书只承接必要的引用信息，不承接站点正文与源码

## 四、建议阅读顺序
1. 先判断任务属于哪一类资产
2. 再进入对应 README
3. 再根据 SOP / 模板 / 镜像文档执行
