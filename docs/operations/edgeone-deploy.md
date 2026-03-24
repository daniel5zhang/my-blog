# EdgeOne Pages 部署说明

## 构建信息
- 框架：Astro 5
- Node 版本：`20.x`（建议与 `package.json` 的 `engines.node` 保持一致，至少 `20.10.0`）
- 安装命令：`npm install`
- 构建命令：`npm run build`
- 输出目录：`dist`

## Pages 控制台填写
- Framework Preset：`Other`
- Build Command：`npm run build`
- Output Directory：`dist`
- Node Version：`20`
- Install Command：`npm install`

## 必要环境变量
至少配置以下变量：
- `PUBLIC_SITE_URL`：站点正式 URL，例如 `https://your-domain.com`
- `PUBLIC_SITE_TITLE`：站点标题
- `PUBLIC_SITE_DESCRIPTION`：站点描述
- `PUBLIC_AUTHOR`：作者名

## 可选环境变量
### Giscus
未配置时评论区会安全降级为“评论未启用”。
- `PUBLIC_GISCUS_REPO`
- `PUBLIC_GISCUS_REPO_ID`
- `PUBLIC_GISCUS_CATEGORY`
- `PUBLIC_GISCUS_CATEGORY_ID`
- `PUBLIC_GISCUS_MAPPING`
- `PUBLIC_GISCUS_THEME`
- `PUBLIC_GISCUS_LANG`
- `PUBLIC_GISCUS_INPUT_POSITION`
- `PUBLIC_GISCUS_REACTIONS_ENABLED`
- `PUBLIC_GISCUS_EMIT_METADATA`

## Pagefind 说明
- `npm run build` 已包含 `pagefind --site dist`
- 部署产物中需要保留 `dist/pagefind/` 目录
- Pages 只需要发布整个 `dist/`，不需要额外执行搜索索引命令

## 上线前检查
- `PUBLIC_SITE_URL` 已替换为真实域名
- `npm run check` 通过
- `npm run build` 通过
- `dist/rss.xml` 与 `dist/feed.json` 已生成
- 如启用评论，Giscus 所需变量已在控制台完整填写
