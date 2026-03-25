# 更新记录

> 规则：从现在开始，每次提交并 push 到 GitHub 前，都必须同步更新这里，写清本次改了什么、增加了什么功能或流程能力。

## 2026-03-25 - 第14阶段：生产仓库二次审计与收口
- 审计了当前生产仓库新增的未提交改动，并将其分类为“纳入版本控制 / 保留本地”。
- 收口了可安全纳入版本控制的站点视觉改版：首页、文章列表页、归档页和全局布局改为更明显的手绘草图风格。
- 建立了固定更新记录机制：后续每次提交前，必须更新 `CHANGELOG.md`。
- 保留了内容类本地改动（AI 新闻草稿、science 改稿、diary）不纳入本轮提交，避免把“内容生产”与“仓库收口”混在一起。

## 2026-03-25 - 第15阶段：内容层遗留改动收口
- 只审计并处理了 4 个内容层遗留改动，不扩展到 UI、结构、部署或文档体系。
- 将 3 篇已成型的文章内容纳入版本控制：
  - `src/content/articles/2026-03-24-ai-news.md`
  - `src/content/articles/2026-03-25-science.md`
  - `src/content/articles/2026-03-25-ai-news.md`
- 保留 `src/content/diary/2026-03-25.md` 为本地内容，不纳入当前正式 Daniel实验室 资产基线。
- 本轮目标是恢复飞书落表前更干净的内容层基线。

## 2026-03-25 - 第16阶段：GitHub 资产三分类归档收口
- 按最新确认的三类资产边界，重构了 GitHub 侧文档归档方式。
- 保留 `docs/operations/` 作为运营线与飞书主控台镜像资产目录。
- 新增 `docs/openclaw/`，承接 OpenClaw 产品化内容、能力建设与过程留痕文档。
- 新增 `docs/README.md` 作为总索引，明确三类资产分别看哪里。

## 2026-03-25 - 第17阶段：隔离本地 diary 私有内容
- 将 `src/content/diary/` 明确隔离为本地私有草稿 / 随记区。
- 通过 Git 忽略规则让该目录不再出现在 `git status` 中。
- 补充仓库规则：该目录不进入正式站点、运营资产、OpenClaw 产品化资产，也不接入发布流。

## 2026-03-25 - 第18阶段：飞书运营主控台正式落地
- 已在飞书创建多维表格 App：`Daniel实验室-运营主控台`。
- 已按既定顺序创建 6 张表：选题池、内容日历、待改写池、待发布池、审核记录、反馈复盘。
- 首版字段按 GitHub 镜像模板原样落地。
- 补充仓库落地记录：主控台名称、创建时间、表清单、维护入口、与 GitHub 镜像的对应关系。

## 2026-03-25 - 第19阶段：三类资产同步规则 SOP 固化
- 新增三类资产同步规则 SOP，明确运营线、OpenClaw 产品化、网站资产的定义、边界、触发条件、责任 Agent、飞书动作、GitHub 动作、回写条件与每轮最低留痕要求。
- 在 `docs/operations/README.md` 与 `docs/openclaw/README.md` 中补充索引。
- 本轮只固化操作规范，不改站点代码，不新增飞书表，不做内容发布。

## 2026-03-25 - 第20阶段：按角色执行模板固化
- 新增按角色执行模板，分别固化 `yunying`、`creator`、`main+jinhua` 的标准执行口令、输入要求、执行步骤、飞书动作、GitHub 动作、最低留痕要求、禁止事项与完成汇报格式。
- 在 `docs/openclaw/README.md` 与总索引中补充入口。
- 本轮只补可执行模板，不改站点代码，不改飞书表结构，不做发布。

## 2026-03-25 - 第21阶段：标准提示词库固化
- 新增标准提示词库，覆盖运营线状态更新、选题推进、母稿生产、平台改写、规则 / SOP 更新、站点资产调整、阶段复盘 / 里程碑记录 7 类场景。
- 每条提示词都明确了适用场景、可直接复制使用的提示词正文、预期产出、最低留痕要求与禁止事项。
- 在 `docs/openclaw/README.md` 与总索引中补充入口。

## 2026-03-25 - 第22阶段：提示词库入飞书主控台
- 在飞书 `Daniel实验室-运营主控台` 中新增表：`提示词库`。
- 按既定字段落地首版结构，并写入 7 条标准提示词记录。
- 在 GitHub 中新增提示词库镜像文档，并补充 `docs/operations/README.md`、`docs/operations/bitable-sync-rules.md`、总索引与 `CHANGELOG.md`。
- 本轮作为“运营线 + OpenClaw 产品化”的双留存资产处理。

## 2026-03-25 - 第23阶段：OpenClaw 产品迭代内容入飞书主控台
- 在飞书 `Daniel实验室-运营主控台` 中新增表：`OpenClaw产品迭代`。
- 按既定字段落地首版结构，并写入 6 条 OpenClaw 产品化核心资产记录。
- 在 GitHub 中新增 `OpenClaw产品迭代` 镜像文档，并补充 `docs/operations/README.md`、`docs/operations/bitable-sync-rules.md`、总索引与 `CHANGELOG.md`。
- 本轮作为 OpenClaw 产品化双留存资产处理。

## 2026-03-25 - 第24阶段：AI新闻日更改写与重建
- 基于 TechCrunch、The Verge、36氪 的当日 AI 相关线索，重写当日 AI 新闻稿。
- 将 `src/content/articles/2026-03-25-ai-news.md` 更新为围绕 Anthropic 与五角大楼冲突的中文短文，统一站内 schema 与 SEO 字段。
- 保持中文口语化、傅盛风格表达，不扩展到站点结构、组件或部署配置。
- 完成后重新执行站点构建，验证内容可正常进入发布产物。

## 2026-03-25 - 第24阶段：OpenClaw 产品化知识库入飞书
- 建立 OpenClaw 产品化知识库正文层，首批写入 10 个主题。
- 将 `OpenClaw产品迭代` 表升级为索引层，补充首批 6 条核心资产的知识库链接、GitHub 文档链接、状态、阶段与下一步。
- 在 GitHub 中新增知识库索引镜像文档，并更新 `docs/operations/README.md`、`docs/operations/bitable-sync-rules.md`、总索引与 `docs/openclaw/README.md`。
- 本轮结构明确为：知识库为正文层、表格为索引层、GitHub 为备份层。

## 2026-03-25 - 第25阶段：OpenClaw产品化手册工程（正式版）
- 在 `OpenClaw产品化手册` Wiki 空间下建立正式手册结构，已覆盖 8 个目录节点。
- 已写入首批 15+ 篇正式正文，用于承载 OpenClaw 产品化核心资产、配置、协作、建站、运营自动化、交付与迭代内容。
- 已将 `OpenClaw产品迭代` 表更新为索引层，补充核心资产的知识库链接、GitHub 文档链接、状态、阶段与下一步。
- 已在 GitHub 中回写正式镜像、README、同步规则与 CHANGELOG，明确“Wiki 正文层 / Bitable 索引层 / GitHub 备份层”结构。

## 2026-03-25 - 第26阶段：飞书知识库操作与排障 SOP 固化
- 新增 `docs/openclaw/feishu-knowledgebase-sop.md`，固化飞书知识库正文创建、Wiki 节点管理、已有文档挂载与授权排障口径。
- 在 `docs/openclaw/README.md` 与 `docs/operations/README.md` 补充 SOP 索引入口。
- 明确当前默认稳定路径：正式正文优先用 `feishu_create_doc(wiki_space=...)`，不把 `feishu_wiki_space_node.create` 作为默认正文创建路径。

## 2026-03-25 - 第27阶段：OpenClaw产品化手册导航与索引补强
- 在 `OpenClaw产品迭代` 表中新增 `飞书知识库操作与排障 SOP` 索引记录，补入知识库链接与 GitHub 文档链接。
- 为 `OpenClaw产品化手册` 增加可导航结构：更新 `00-总览` 总导航，并为 8 个一级主题页补充导航信息。
- 已验证 `feishu_wiki_space_node.create` 在显式传 `node_type=origin` 时可用，本轮保留“文档级导航已完成”的结果，不强行重建完整节点树。

## 2026-03-25 - 第28阶段：OpenClaw产品化手册节点层级管理
- 盘点 `OpenClaw产品化手册` 根节点下现有节点清单，确认根级已具备 `00-总览` 到 `07-迭代日志` 的正式一级主题。
- 复用并移动现有正文节点，建立第一批正式二级层级，覆盖环境、角色、模型、安全、网站与运营、交付、迭代日志等主题。
- 验证 `feishu_wiki_space_node.move` 可用，`feishu_wiki_space_node.create` 在显式传 `node_type=origin` 时可用。

## 2026-03-25 - 第29阶段：OpenClaw产品化手册节点收尾
- 完成 `迭代日志总表 -> 07-迭代日志` 的节点归位确认。
- 明确当前结构为：8 个一级主题保留在根级，关键二级正文已按主题 move 到对应一级节点下。

## 2026-03-25 - 第30阶段：OpenClaw产品化手册后续维护规范收口
- 新增 `docs/openclaw/manual-maintenance-sop.md`，固化正式手册的后续维护规则。
- 明确正文层、索引层、备份层的维护边界，以及正文新增、索引更新、节点 move、最小留痕与失败排障顺序。
- 在 `docs/openclaw/README.md` 补充入口，并更新 `CHANGELOG.md`。
