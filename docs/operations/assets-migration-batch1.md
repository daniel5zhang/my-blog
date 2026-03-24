# Batch 1 资源迁移与检查

## 本地图片检查结果

- `/images/ai-agent-workflow.jpg`：源文件缺失
- `/images/ai-agent-office.jpg`：源文件缺失
- `/images/alexa-uk.jpg`：源文件缺失

## 已迁移文章中的本地资源引用

- `src/content/articles/2026-03-23-ai-agents-workplace.md` -> `/images/ai-agent-office.jpg`：文件缺失
- `src/content/articles/2026-03-23-alexa-uk.md` -> `/images/alexa-uk.jpg`：文件缺失
- `src/content/articles/2026-03-24-ai-news.md` -> `/images/ai-agent-workflow.jpg`：文件缺失

## 远程图片清单（仅盘点，不本地化）

- `src/content/articles/2026-03-19-openclaw-analysis.md` -> `https://mintcdn.com/clawdhub/-t5HSeZ3Y_0_wH4i/assets/openclaw-logo-text-dark.png`
- `src/content/articles/2026-03-23-ai-moderation-replacement.md` -> `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop`
- `src/content/articles/2026-03-23-ai-news.md` -> `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80`
- `src/content/articles/2026-03-23-wordpress-ai-writing.md` -> `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop`

## 内部链接/静态资源检查

- `src/content/articles/2026-03-23-ai-agents-workplace.md` -> `/images/ai-agent-office.jpg`：文件缺失
- `src/content/articles/2026-03-24-ai-news.md` -> `/images/ai-agent-workflow.jpg`：文件缺失

## 验证结果

- `node scripts/check-assets-batch1.mjs`：已执行
- `npm run check`：通过
- `npm run build`：通过

## 本批结论

- 仅检查当前已迁移的 59 篇正式文章
- 仅处理本地 `/images/...` 引用与内部静态资源路径
- 远程图片仅做盘点，不下载到本地
- 后续建议：对缺失资源补源文件，或将对应文章改为远程图/移除失效引用