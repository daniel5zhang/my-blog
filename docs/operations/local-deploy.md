# 本地部署指南

本指南说明如何在本地启动 Astro 站点。

## 环境要求

- Node.js >= 18.0.0
- Docker & Docker Compose（可选）

## 方式一：本地 npm 启动

### 安装依赖

```bash
npm install
```

### 开发模式（热重载）

```bash
npm run dev
```

访问 http://localhost:4321

### 生产构建预览

```bash
npm run build
npm run preview
```

## 方式二：Docker 启动

### 开发模式

```bash
docker compose --profile dev up dev
```

访问 http://localhost:4321

### 生产模式（构建 + 预览）

```bash
docker compose --profile prod up web
```

访问 http://localhost:4321

## 环境变量

在项目根目录创建 `.env.local` 文件，参考 `.env.example`：

```bash
cp .env.example .env.local
```

| 变量 | 说明 | 默认值 |
|------|------|--------|
| PUBLIC_SITE_TITLE | 站点标题 | My Site |
| PUBLIC_SITE_DESCRIPTION | 站点描述 | Daniel 的个人网站... |
| PUBLIC_SITE_URL | 站点 URL | https://example.com |
| PUBLIC_AUTHOR | 作者 | Daniel |

## 常用命令

```bash
npm run check     # TypeScript 类型检查
npm run build     # 生产构建
npm run preview   # 预览构建结果
```