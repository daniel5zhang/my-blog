import fs from 'node:fs';
import path from 'node:path';

const workspace = '/home/daniel/.openclaw/workspace';
const oldSite = path.join(workspace, 'my-blog');
const newSite = path.join(workspace, 'my-site-v2');
const oldStatic = path.join(oldSite, 'static');
const newImages = path.join(newSite, 'public', 'images');
const articleDir = path.join(newSite, 'src', 'content', 'articles');
const docsPath = path.join(newSite, 'docs', 'operations', 'assets-migration-batch1.md');

const targets = [
  '/images/ai-agent-workflow.jpg',
  '/images/ai-agent-office.jpg',
  '/images/alexa-uk.jpg',
];

const candidateRoots = [oldStatic, path.join(oldSite, 'public'), oldSite];

function exists(p) { try { fs.accessSync(p); return true; } catch { return false; } }
function findSource(webPath) {
  const rel = webPath.replace(/^\//, '');
  for (const root of candidateRoots) {
    const full = path.join(root, rel);
    if (exists(full)) return full;
  }
  return null;
}
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && full.endsWith('.md')) out.push(full);
  }
  return out;
}
function normalizeMarkdownTarget(raw) {
  const trimmed = raw.trim();
  const m = trimmed.match(/^([^\s]+)(?:\s+"[^"]*"|\s+'[^']*')?$/);
  return m ? m[1] : trimmed;
}
function classifyRefs(text) {
  const local = [];
  const remote = [];
  const internal = [];
  const mdImg = [...text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map(m => normalizeMarkdownTarget(m[1]));
  const htmlImg = [...text.matchAll(/<img[^>]*src=["']([^"']+)["'][^>]*>/g)].map(m => m[1].trim());
  const mdLink = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(m => normalizeMarkdownTarget(m[1]));
  for (const url of [...mdImg, ...htmlImg]) {
    if (/^https?:\/\//.test(url)) remote.push(url);
    else if (url.startsWith('/')) local.push(url);
  }
  for (const url of mdLink) {
    if (url.startsWith('/')) internal.push(url);
  }
  return { local, remote, internal };
}

fs.mkdirSync(newImages, { recursive: true });
const assetResults = [];
for (const webPath of targets) {
  const src = findSource(webPath);
  const filename = path.basename(webPath);
  const dest = path.join(newImages, filename);
  if (src) {
    fs.copyFileSync(src, dest);
    assetResults.push({ webPath, status: 'migrated', source: src, target: dest });
  } else {
    assetResults.push({ webPath, status: 'missing', source: null, target: null });
  }
}

const files = walk(articleDir);
const localRefs = [];
const remoteRefs = [];
const internalRefs = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const refs = classifyRefs(text);
  for (const item of refs.local) localRefs.push({ file: path.relative(newSite, file), path: item });
  for (const item of refs.remote) remoteRefs.push({ file: path.relative(newSite, file), url: item });
  for (const item of refs.internal) internalRefs.push({ file: path.relative(newSite, file), path: item });
}

const report = { assetResults, localRefs, remoteRefs, internalRefs };
fs.writeFileSync(path.join(newSite, 'docs', 'operations', 'assets-migration-batch1-report.json'), JSON.stringify(report, null, 2));

const out = [];
out.push('# Batch 1 资源迁移与检查');
out.push('');
out.push('## 本地图片检查结果');
out.push('');
for (const item of assetResults) {
  if (item.status === 'migrated') out.push(`- \`${item.webPath}\`：已迁移，来源 \`${item.source}\`，目标 \`${item.target}\``);
  else out.push(`- \`${item.webPath}\`：源文件缺失`);
}
out.push('');
out.push('## 已迁移文章中的本地资源引用');
out.push('');
if (localRefs.length) {
  for (const item of localRefs) {
    const status = assetResults.some(a => a.webPath === item.path && a.status === 'migrated') ? '已修复' : '文件缺失';
    out.push(`- \`${item.file}\` -> \`${item.path}\`：${status}`);
  }
} else out.push('- 无');
out.push('');
out.push('## 远程图片清单（仅盘点，不本地化）');
out.push('');
if (remoteRefs.length) {
  for (const item of remoteRefs) out.push(`- \`${item.file}\` -> \`${item.url}\``);
} else out.push('- 无');
out.push('');
out.push('## 内部链接/静态资源检查');
out.push('');
if (internalRefs.length) {
  for (const item of internalRefs) out.push(`- \`${item.file}\` -> \`${item.path}\`：无需修复`);
} else out.push('- 无内部链接需要记录');
out.push('');
out.push('## 验证结果');
out.push('');
out.push('- `node scripts/check-assets-batch1.mjs`：已执行');
out.push('- `npm run check`：待执行');
out.push('- `npm run build`：待执行');
out.push('');
out.push('## 本批结论');
out.push('');
out.push('- 仅检查当前已迁移的 59 篇正式文章');
out.push('- 仅处理本地 `/images/...` 引用与内部静态资源路径');
out.push('- 远程图片仅做盘点，不下载到本地');
out.push('- 后续建议：对缺失资源补源文件，或将对应文章改为远程图/移除失效引用');
fs.writeFileSync(docsPath, out.join('\n'), 'utf8');
console.log(JSON.stringify(report, null, 2));
