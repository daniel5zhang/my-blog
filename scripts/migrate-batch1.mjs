#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const OLD_SITE = '/home/daniel/.openclaw/workspace/my-blog';
const NEW_SITE = '/home/daniel/.openclaw/workspace/my-site-v2';
const NEW_CONTENT_DIR = path.join(NEW_SITE, 'src/content/articles');

// 配置
const MIGRATION_CONFIG = {
  articles: {
    sourceDir: path.join(OLD_SITE, 'content/articles'),
    category: null, // 普通文章 category 可选
  },
  science: {
    sourceDir: path.join(OLD_SITE, 'content/science'),
    category: 'science', // science 必填
  }
};

// 解析 frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, content };
  
  const frontmatterStr = match[1];
  const restContent = content.slice(match[0].length);
  
  const frontmatter = {};
  const lines = frontmatterStr.split('\n');
  let currentKey = null;
  let currentValue = [];
  
  for (const line of lines) {
    // 检查是否是列表项
    const listMatch = line.match(/^  - (.+)/);
    if (listMatch) {
      if (currentKey) {
        if (!Array.isArray(frontmatter[currentKey])) {
          frontmatter[currentKey] = [];
        }
        frontmatter[currentKey].push(listMatch[1]);
      }
      continue;
    }
    
    // 检查键值对
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      if (currentKey && currentValue.length > 0) {
        frontmatter[currentKey] = currentValue.join(' ').replace(/^"|"$/g, '');
      }
      currentKey = kvMatch[1];
      let value = kvMatch[2].trim();
      
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      if (value.startsWith('[')) {
        // 数组
        currentValue = [];
        const items = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
        frontmatter[currentKey] = items;
        currentKey = null;
      } else if (value) {
        currentValue = [value];
      } else {
        currentValue = [];
      }
    }
  }
  
  // 处理最后一个 key
  if (currentKey && currentValue.length > 0) {
    if (frontmatter[currentKey] === undefined) {
      frontmatter[currentKey] = currentValue.join(' ').replace(/^"|"$/g, '');
    }
  }
  
  return { frontmatter, content: restContent };
}

// 从正文获取第一个非标题自然段作为 summary
function extractFirstParagraph(content) {
  const lines = content.split('\n');
  let paragraph = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    // 跳过空行
    if (!trimmed) {
      continue;
    }
    // 跳过代码块标记
    if (trimmed.startsWith('```') || trimmed === '```') {
      continue;
    }
    // 跳过标题行
    if (trimmed.startsWith('#')) {
      continue;
    }
    // 跳过列表项（无序列表 - 或 * 开头，数字列表 1. 开头）
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      continue;
    }
    // 跳过图片 Markdown（以 ![ 开头）
    if (trimmed.startsWith('![')) {
      continue;
    }
    // 跳过只包含媒体/嵌入标记的行（如 <img>、<iframe> 等）
    if (/^<[^>]+>$/.test(trimmed) && (trimmed.includes('<img') || trimmed.includes('<iframe') || trimmed.includes('<video') || trimmed.includes('<audio'))) {
      continue;
    }
    // 找到第一个自然段
    paragraph = trimmed;
    break;
  }
  
  // 截取适当长度
  if (paragraph.length > 200) {
    paragraph = paragraph.slice(0, 200).trim() + '...';
  }
  
  return paragraph;
}

// 生成新的 frontmatter
function generateFrontmatter(oldFrontmatter, content, category) {
  // 处理日期：提取 YYYY-MM-DD 部分
  let publishedAt = oldFrontmatter.date || new Date().toISOString().split('T')[0];
  if (publishedAt) {
    // 如果是 ISO 格式，提取日期部分
    publishedAt = publishedAt.split('T')[0];
  }
  
  const newFm = {
    title: oldFrontmatter.title || '无标题',
    publishedAt: publishedAt,
    draft: false,
    tags: oldFrontmatter.keywords || oldFrontmatter.tags || [],
  };
  
  // 处理 summary/description
  if (oldFrontmatter.description) {
    newFm.summary = oldFrontmatter.description;
  } else {
    // 尝试从正文获取 summary
    newFm.summary = extractFirstParagraph(content);
  }
  
  // category 处理
  if (category) {
    newFm.category = category;
  }
  
  return newFm;
}

// 格式化 frontmatter 为字符串
function formatFrontmatter(frontmatter) {
  let lines = ['---'];
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        lines.push(`${key}:`);
        for (const item of value) {
          lines.push(`  - ${item}`);
        }
      } else {
        lines.push(`${key}: []`);
      }
    } else if (typeof value === 'string') {
      // 检查是否需要引号
      // 处理包含引号、冒号、井号的字符串，需要用双引号包裹并转义内部的引号
      if (value.includes(':') || value.includes('#') || value.includes('"') || value.includes('\\')) {
        // 先反转义再转义，确保一致性
        const unescaped = value.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        lines.push(`${key}: "${unescaped.replace(/"/g, '\\"')}"`);
      } else {
        lines.push(`${key}: ${value}`);
      }
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

// 迁移单个文件
function migrateFile(sourcePath, targetDir, category) {
  const content = fs.readFileSync(sourcePath, 'utf-8');
  const { frontmatter, content: bodyContent } = parseFrontmatter(content);
  
  const newFrontmatter = generateFrontmatter(frontmatter, bodyContent, category);
  const newContent = formatFrontmatter(newFrontmatter) + '\n' + bodyContent;
  
  const filename = path.basename(sourcePath);
  const targetPath = path.join(targetDir, filename);
  
  fs.writeFileSync(targetPath, newContent, 'utf-8');
  
  return { filename, title: newFrontmatter.title };
}

// 主迁移函数
function migrate() {
  console.log('开始第一批内容迁移...\n');
  
  // 清理目标目录（移除脚手架示例）
  if (fs.existsSync(NEW_CONTENT_DIR)) {
    const existingFiles = fs.readdirSync(NEW_CONTENT_DIR);
    for (const file of existingFiles) {
      const filePath = path.join(NEW_CONTENT_DIR, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        fs.unlinkSync(filePath);
        console.log(`删除: ${file}`);
      }
    }
  } else {
    fs.mkdirSync(NEW_CONTENT_DIR, { recursive: true });
  }
  
  let totalArticles = 0;
  let totalScience = 0;
  
  // 迁移 articles
  console.log('迁移 articles...');
  const articlesDir = MIGRATION_CONFIG.articles.sourceDir;
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const sourcePath = path.join(articlesDir, file);
      try {
        migrateFile(sourcePath, NEW_CONTENT_DIR, MIGRATION_CONFIG.articles.category);
        console.log(`  ✓ ${file}`);
        totalArticles++;
      } catch (e) {
        console.error(`  ✗ ${file}: ${e.message}`);
      }
    }
  }
  
  // 迁移 science
  console.log('\n迁移 science...');
  const scienceDir = MIGRATION_CONFIG.science.sourceDir;
  if (fs.existsSync(scienceDir)) {
    const files = fs.readdirSync(scienceDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const sourcePath = path.join(scienceDir, file);
      try {
        migrateFile(sourcePath, NEW_CONTENT_DIR, MIGRATION_CONFIG.science.category);
        console.log(`  ✓ ${file}`);
        totalScience++;
      } catch (e) {
        console.error(`  ✗ ${file}: ${e.message}`);
      }
    }
  }
  
  console.log('\n========== 迁移完成 ==========');
  console.log(`articles: ${totalArticles} 篇`);
  console.log(`science: ${totalScience} 篇`);
  console.log(`总计: ${totalArticles + totalScience} 篇`);
  console.log(`输出目录: ${NEW_CONTENT_DIR}`);
  
  // 列出迁移后的文件
  console.log('\n迁移后的文件列表:');
  const resultFiles = fs.readdirSync(NEW_CONTENT_DIR).filter(f => f.endsWith('.md'));
  console.log(`共 ${resultFiles.length} 个 .md 文件`);
}

migrate();