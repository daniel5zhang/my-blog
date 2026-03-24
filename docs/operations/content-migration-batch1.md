# 内容迁移 - 第一批

本文档记录第一批内容迁移的详细说明。

## 迁移命令

```bash
node scripts/migrate-batch1.mjs
```

## 字段映射

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| title | title | 文章标题 |
| date | publishedAt | 发布日期，格式 YYYY-MM-DD |
| keywords | tags | 标签（数组） |
| tags | tags | 标签（数组） |
| description | summary | 文章摘要 |
| - | draft | 固定为 false |
| - | category | articles 为空，science 为 "science" |

## 跳过范围

第一批迁移**跳过**以下内容：

- **源目录**：content/diary、content/easyclaw、content/skills（保留到第二批）
- 草稿状态的文章（draft: true）
- 非 .md 格式文件

## 样板文章处理

脚手架示例文章会在迁移时被清理。
- **content-workflow.md** 已从正式内容目录移除，不计入 59 篇正式迁移内容。

## 第二批保留项

以下内容**保留到第二批**处理：

- slug 精确映射（旧站URL与新站URL对应关系）
- diary/easyclaw/skills 目录迁移
- 图片资源迁移（content/ 下的图片需迁移到 public/ 目录）
- 内部链接修复（确保新旧 URL 兼容）
- SEO 元数据补齐（补充缺失的 description、og:image 等）

## 验证命令

```bash
# 检查文章数量
ls src/content/articles/*.md | wc -l

# 运行检查
npm run check

# 构建项目
npm run build
```

预期结果：src/content/articles/ 目录应有 59 篇文章。