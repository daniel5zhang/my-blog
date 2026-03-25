# 飞书知识库操作与排障 SOP

## 背景
Daniel实验室 / OpenClaw 在把产品化资产升级为“Wiki 正文层 / Bitable 索引层 / GitHub 备份层”的过程中，已经验证了多种飞书知识库操作路径。为了避免后续继续踩 `field validation failed`、重复授权和错误调用方式，需要把当前最稳的执行口径正式固化。

## 目标
- 明确不同场景下应该使用哪一种飞书知识库操作路径。
- 解释 `field validation failed` 的高概率原因与排查方法。
- 固定 OpenClaw 后续在知识库相关任务中的执行顺序。
- 把授权前置条件、常见失败与排查方式写成标准 SOP。

## 当前结论
- 对于“把正式正文写入指定 Wiki 空间”这一主场景，当前最稳路径是：**优先使用 `feishu_create_doc` 并显式传 `wiki_space`**。
- `feishu_wiki_space_node.create` 不是默认首选，它适合处理节点级结构管理，但调用时必须满足更严格的字段要求。
- 若已经存在普通云文档，需要挂到知识库时，优先采用 **`move_docs_to_wiki` 路径**（本地工具若后续封装，应遵守 `parent_wiki_token + obj_type + obj_token` 参数口径）。

## 一、场景与工具选择

### 1. 直接在知识库 / Wiki 空间写正式正文
**使用：** `feishu_create_doc`

**适用场景：**
- 已知目标 Wiki 空间
- 需要直接创建新的正式正文
- 需要快速、稳定地把内容落到知识库

**推荐调用口径：**
- 指定 `title`
- 指定 `wiki_space=<space_id>`
- 正文使用 `markdown`

**当前结论：**
- 这是 Daniel实验室 / OpenClaw 目前验证最稳定的正文写入路径
- 应作为默认首选

### 2. 需要管理 Wiki 节点结构、节点关系、快捷方式
**使用：** `feishu_wiki_space_node.create`

**适用场景：**
- 需要显式创建 Wiki 节点
- 需要区分实体节点与快捷方式
- 需要做节点移动、复制、结构管理

**关键规则：**
- `node_type` 必填
- 实体节点必须显式传：`node_type=origin`
- 快捷方式使用：`node_type=shortcut` + `origin_node_token`

**注意：**
- 不能再把它当成“随手创建正文”的默认路径
- 若只是写正文，应优先回到 `feishu_create_doc`

### 3. 已有普通云文档，需要挂到 Wiki 知识库
**使用：** `move_docs_to_wiki`

**适用场景：**
- 文档已经存在
- 现在需要把它纳入知识库节点结构
- 需要复用既有正文，不想重建

**正确参数口径：**
- `parent_wiki_token`
- `obj_type`
- `obj_token`

**当前结论：**
- 这是“先有 doc，再入 wiki”的正确路径
- 适合补挂已有文档，不适合替代正文创建主路径

## 二、`field validation failed` 的原因分析

### 高概率原因
此前出现 `field validation failed`，高概率原因是：
- 本地工具把 `node_type` 设成了可选
- 实际飞书接口要求 `wiki/v2/spaces/{space_id}/nodes` 的 create 调用显式传 `node_type`
- 调用时漏传，导致字段校验失败

### 进一步说明
- 创建实体节点：必须 `node_type=origin`
- 创建快捷方式：必须 `node_type=shortcut`，并提供 `origin_node_token`
- 如果还涉及父节点、对象类型、已有文档挂载关系，参数组合必须严格匹配接口要求

## 三、OpenClaw 固定执行顺序

后续凡是涉及飞书知识库正文层的任务，OpenClaw 默认按以下顺序执行：

1. **先确认目标 Wiki 空间**
   - 优先精确匹配空间名称
   - 拿到 `space_id` 后再写入

2. **判断本次动作属于哪一类**
   - 新写正文 → `feishu_create_doc`
   - 管节点结构 / 快捷方式 → `feishu_wiki_space_node.create`
   - 挂已有文档进 Wiki → `move_docs_to_wiki`

3. **正文优先走稳定路径**
   - 正式正文默认用 `feishu_create_doc(wiki_space=...)`

4. **写成功后再更新索引层**
   - 更新 Bitable 中的知识库链接、状态、阶段、下一步

5. **最后回写 GitHub 备份层**
   - 镜像、README、同步规则、`CHANGELOG.md`

## 四、授权前置条件

在飞书知识库相关动作前，至少确认：
- 用户对当前飞书账号的 OAuth 授权已完成
- 对应 Wiki / 文档 / Bitable 写入权限已具备
- 目标空间或目标表对当前用户可见

## 五、常见失败与排查

### 1. `need_user_authorization`
**含义：**
- 当前动作所需授权未完成，或者授权粒度不覆盖当前资源类型

**排查顺序：**
1. 确认是否刚切换了资源类型（表创建 / 表写入 / Wiki 读取 / 文档创建 / 表更新）
2. 让用户完成对应授权
3. 授权后重新执行原动作

### 2. `field validation failed`
**含义：**
- 参数组合不满足接口要求

**排查顺序：**
1. 确认是否漏传 `node_type`
2. 确认 `node_type=origin` 还是 `shortcut`
3. 若为快捷方式，确认是否提供 `origin_node_token`
4. 若目标只是创建正文，改走 `feishu_create_doc`

### 3. 找不到 Wiki 空间
**排查顺序：**
1. 先列出空间
2. 优先找精确同名
3. 若没有，停止执行并准确汇报卡点，不伪造后续状态

## 六、实施步骤
1. 确认本轮是否涉及知识库正文层
2. 锁定目标 Wiki 空间
3. 判断用 `feishu_create_doc`、`feishu_wiki_space_node.create` 还是 `move_docs_to_wiki`
4. 完成正文 / 节点 / 挂载动作
5. 成功后更新索引层
6. 最后回写 GitHub 备份层

## 七、已完成内容
- 已验证 `feishu_create_doc(wiki_space=7621060014035193021)` 可直接把正文写入 `OpenClaw产品化手册`
- 已验证 Wiki 节点读取在授权后可用
- 已确认 `feishu_wiki_space_node.create` 直接调用时存在 `node_type` 参数要求
- 已把当前最稳执行口径收敛为正式 SOP

## 八、风险与限制
- 飞书授权可能按资源类型分段触发，不能假设一次授权覆盖全部动作
- 当前本地工具若未完整暴露 `node_type` 或 `move_docs_to_wiki` 能力，仍可能需要绕行稳定路径
- 若节点结构操作优先级不高，不要为了“结构纯正”牺牲正文写入稳定性

## 九、后续演进
- 若本地工具补齐 `node_type` 与 `move_docs_to_wiki` 的一等支持，应回写本 SOP
- 后续可补一份“知识库节点管理最佳实践”作为本 SOP 的延伸文档

## 关联链接
- `docs/openclaw/asset-sync-sop.md`
- `docs/openclaw/role-execution-templates.md`
- `docs/openclaw/prompt-library.md`
- `docs/operations/bitable-sync-rules.md`
