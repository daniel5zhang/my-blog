# 内容清单（Content Inventory）

本文档记录旧站内容资产，为迁移规划提供数据支持。

---

## 一、旧站内容统计

### 1.1 按栏目统计

| 栏目 | 文章数量 | 路径 | 迁移状态 |
|------|----------|------|----------|
| articles | 50 | `content/articles/*` | 第一批迁移 |
| science | 9 | `content/science/*` | 第一批迁移（合并至 articles） |
| diary | 5 | `content/diary/*` | **第一批不迁移**，待后续决策 |
| easyclaw | 待统计 | `content/easyclaw/*` | 待处理 |
| skills | 待统计 | `content/skills/*` | 待处理 |
| **合计** | **64+** | | |

### 1.2 articles 列表

> 共 50 篇文章（第一批迁移）

```
2026-03-19-ai-news.md
2026-03-19-openclaw-analysis.md
2026-03-20-ai-news.md
2026-03-21-ai-news.md
2026-03-22-ai-news.md
2026-03-23-ai-agent.md
2026-03-23-ai-agents-workplace.md
2026-03-23-ai-agent-trend.md
2026-03-23-ai-agent-work.md
2026-03-23-ai-art-design.md
2026-03-23-ai-chip-investment.md
2026-03-23-ai-coding.md
2026-03-23-ai-customer-service.md
2026-03-23-ai-dominance.md
2026-03-23-ai-education.md
2026-03-23-ai-hardware.md
2026-03-23-ai-image-generation.md
2026-03-23-ai-image-model.md
2026-03-23-ai-linkedin-ban.md
2026-03-23-ai-medical.md
2026-03-23-ai-memory.md
2026-03-23-ai-mental-health.md
2026-03-23-ai-moderation-replacement.md
2026-03-23-ai-music.md
2026-03-23-ai-news.md
2026-03-23-ai-openclaw-china.md
2026-03-23-ai-privacy.md
2026-03-23-ai-programmer.md
2026-03-23-ai-programming.md
2026-03-23-ai-programming-news.md
2026-03-23-ai-reasoning.md
2026-03-23-ai-science.md
2026-03-23-ai-screen.md
2026-03-23-ai-search.md
2026-03-23-ai-security.md
2026-03-23-ai-space-datacenter.md
2026-03-23-ai-superapp.md
2026-03-23-ai-video-generation.md
2026-03-23-ai-video-news.md
2026-03-23-ai-voice-cloning.md
2026-03-23-ai-writing-creator.md
2026-03-23-alexa-uk.md
2026-03-23-china-ai-rise.md
2026-03-23-gemini-mac-app.md
2026-03-23-nemoclaw-launch.md
2026-03-23-wordpress-ai-blog.md
2026-03-23-wordpress-ai-writing.md
2026-03-24-ai-news.md
ai-learning.md
test-article.md
```

### 1.3 science 列表

> 共 9 篇文章（第一批迁移，合并至 articles，使用 category: science）

```
2026-03-19-science.md
2026-03-20-science.md
2026-03-21-science.md
2026-03-22-science.md
2026-03-23-science.md
2026-03-24-science.md
2026-03-25-science.md
2026-03-26-science.md
what-is-llm.md
```

### 1.4 diary 列表

> 共 5 篇文章（**第一批不迁移**，待后续决策）

```
2026-03-19.md
2026-03-21.md
2026-03-22.md
2026-03-24.md
first-day.md
```

---

## 二、迁移状态汇总

### 2.1 第一批迁移（Batch 1）

| 来源 | 数量 | 目标 | 状态 |
|------|------|------|------|
| articles | 50 | src/content/articles | 待迁移 |
| science | 9 | src/content/articles (category: science) | 待迁移 |
| **小计** | **59** | | |

### 2.2 第二批处理（Batch 2）

- 文章级 slug 精确映射（59 篇文章的 URL 对应关系）
- 验证 301 重定向规则

### 2.3 待定（TBD）

| 来源 | 数量 | 原因 |
|------|------|------|
| diary | 5 | 第一批不迁移，需要决策处理方式 |
| easyclaw | 待统计 | 待定 |
| skills | 待统计 | 待定 |

---

## 三、注意事项

1. **文件命名**：旧站使用日期命名（YYYY-MM-DD-title.md），迁移后可能需要调整
2. **Frontmatter**：需要将 Hugo frontmatter 转换为 Astro frontmatter
3. **分类标签**：science 合并后需要添加 `category: science` 字段
4. **图片路径**：检查文章内的图片引用路径

---

*文档版本：v1.0*
*创建时间：2026-03-24*
*数据来源：/home/daniel/.openclaw/workspace/my-blog/content/*