#!/usr/bin/env node

/**
 * Slidev PPT 内容生成器
 * 根据用户主题自动生成 slides.md 内容
 * 
 * 用法:
 * node generate.js --topic "你的主题" --output slides.md --pages 10 --style tech
 */

const fs = require('fs');
const path = require('path');

// 命令行参数解析
function parseArgs(args) {
  const options = {
    topic: null,
    output: 'slides.md',
    pages: 10,
    style: 'tech',
    tone: 'formal',
    author: 'AI Assistant'
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--topic':
      case '-t':
        options.topic = args[++i];
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--pages':
      case '-p':
        options.pages = parseInt(args[++i], 10);
        break;
      case '--style':
      case '-s':
        options.style = args[++i];
        break;
      case '--author':
      case '-a':
        options.author = args[++i];
        break;
      case '--tone':
        options.tone = args[++i];
        break;
    }
  }

  return options;
}

function validateOptions(options) {
  const validStyles = new Set(['tech', 'product', 'report']);
  const validTones = new Set(['formal', 'executive', 'technical', 'launch']);

  if (!options.topic || !String(options.topic).trim()) {
    throw new Error('请提供主题 --topic "你的主题"');
  }

  if (!Number.isInteger(options.pages) || options.pages < 3) {
    throw new Error('页数必须是大于等于 3 的整数');
  }

  if (!validStyles.has(options.style)) {
    throw new Error('风格必须是 tech、product 或 report');
  }

  if (!validTones.has(options.tone)) {
    throw new Error('表达风格必须是 formal、executive、technical 或 launch');
  }
}

function resolveTheme(style, tone) {
  if (tone === 'technical') {
    return 'default';
  }

  if (tone === 'executive') {
    return 'seriph';
  }

  if (tone === 'launch') {
    return 'apple-basic';
  }

  if (style === 'report') {
    return 'seriph';
  }

  return 'apple-basic';
}

// 生成幻灯片大纲
function generateOutline(topic, pages, style) {
  const sectionCount = Math.max(3, Math.floor(pages / 3));
  
  const outline = {
    title: topic,
    subtitle: `由 slidev-ppt-generator 生成`,
    sections: []
  };

  // 根据风格生成不同类型的章节
  if (style === 'tech') {
    // 技术分享结构
    outline.sections = [
      { title: '背景与动机', content: '为什么需要这个技术？解决了什么问题？', keyPoint: 'problem' },
      { title: '核心概念', content: '关键技术点和术语解释', keyPoint: 'concept' },
      { title: '架构设计', content: '整体架构和组件关系', keyPoint: 'architecture' },
      { title: '实现细节', content: '核心代码和实现思路', keyPoint: 'implementation' },
      { title: '实践案例', content: '实际应用场景和效果', keyPoint: 'case-study' },
      { title: '总结与展望', content: '关键要点和未来方向', keyPoint: 'summary' }
    ];
  } else if (style === 'product') {
    // 产品演示结构
    outline.sections = [
      { title: '市场痛点', content: '用户面临的核心问题', keyPoint: 'pain-point' },
      { title: '解决方案', content: '我们的产品如何解决问题', keyPoint: 'solution' },
      { title: '核心功能', content: '主要功能亮点展示', keyPoint: 'features' },
      { title: '技术优势', content: '与竞品的差异化优势', keyPoint: 'advantage' },
      { title: '客户案例', content: '成功应用案例', keyPoint: 'testimonial' },
      { title: '下一步行动', content: '合作方式和联系', keyPoint: 'call-to-action' }
    ];
  } else if (style === 'report') {
    // 工作汇报结构
    outline.sections = [
      { title: '工作概览', content: '本期工作整体情况', keyPoint: 'overview' },
      { title: '完成情况', content: '已完成的任务和成果', keyPoint: 'completed' },
      { title: '数据分析', content: '关键指标和数据展示', keyPoint: 'metrics' },
      { title: '问题与挑战', content: '遇到的问题和解决方案', keyPoint: 'challenges' },
      { title: '下步计划', content: '下期工作计划和目标', keyPoint: 'plan' },
      { title: '资源需求', content: '需要的支持和资源', keyPoint: 'resources' }
    ];
  }

  // 根据页数调整章节数量
  outline.sections = outline.sections.slice(0, sectionCount);

  return outline;
}

// 构建 slides.md 内容
function buildSlidesMarkdown(outline, style, tone, author) {
  const theme = resolveTheme(style, tone);
  const colorSchema = tone === 'technical' ? 'dark' : 'light';
  const authorName = author || outline.author || 'AI Assistant';

  let content = `---
theme: ${theme}
highlighter: shiki
lineNumbers: true
colorSchema: ${colorSchema}
layout: cover
title: ${outline.title}
author: ${authorName}
themeConfig:
  tone: ${tone}
---

# ${outline.title}

${outline.subtitle}

<div class="pt-4 text-sm opacity-80">
${authorName}
</div>

---
layout: section
---

# 目录

`;

  // 添加目录页
  outline.sections.forEach((section, index) => {
    content += `- ${section.title}\n`;
  });

  // 添加内容页
  outline.sections.forEach((section, index) => {
    content += `
---
layout: two-cols
---

# ${section.title}

${section.content}

::right::

\`\`\`javascript
// ${section.keyPoint}
console.log('${section.keyPoint}')
\`\`\`

---
layout: center
class: text-center
---

# ${section.title}

要点回顾

- 要点 1
- 要点 2
- 要点 3
`;
  });

  // 结束页
  content += `
---
layout: center
class: text-center
---

# 谢谢

## Q&A

<div class="pt-4 text-sm opacity-80">
${authorName}
</div>
`;

  return content;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Slidev PPT 生成器

用法:
  node generate.js [选项]

选项:
  -t, --topic <主题>     PPT 主题（必需）
  -o, --output <文件>    输出文件路径（默认：slides.md）
  -p, --pages <页数>     期望页数（默认：10）
  -s, --style <风格>     风格类型：tech|product|report（默认：tech）
  --tone <表达>          表达风格：formal|executive|technical|launch（默认：formal）
  -a, --author <作者>    作者姓名（默认：AI Assistant）
  -h, --help            显示帮助信息

示例:
  node generate.js --topic "OpenClaw 介绍" --output slides.md
  node generate.js -t "产品演示" -s product --tone launch -p 15
  node generate.js -t "工作汇报" -s report -a "张三"
`);
    process.exit(0);
  }

  const options = parseArgs(args);
  try {
    validateOptions(options);
  } catch (err) {
    console.error(`❌ 错误：${err.message}`);
    console.error('使用 --help 查看帮助');
    process.exit(1);
  }

  console.log(`🎯 生成主题：${options.topic}`);
  console.log(`📊 风格：${options.style}`);
  console.log(`🎨 表达：${options.tone}`);
  console.log(`📄 页数：约${options.pages}页`);
  console.log(`📝 输出：${options.output}`);
  console.log('');

  // 生成大纲
  const outline = generateOutline(options.topic, options.pages, options.style);
  
  // 生成 slides.md
  const slidesContent = buildSlidesMarkdown(
    outline,
    options.style,
    options.tone,
    options.author,
  );
  
  // 写入文件
  const outputPath = path.resolve(options.output);
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, slidesContent, 'utf-8');
  
  console.log('');
  console.log(`✅ 已生成 ${outputPath}`);
  console.log('');
  console.log('下一步:');
  console.log(`  1. 将 ${path.basename(outputPath)} 放到你的 Slidev 项目目录中`);
  console.log('  2. 在该目录运行 npx slidev slides.md');
  console.log('  3. 访问 http://localhost:3030');
  console.log('');
}

main().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
