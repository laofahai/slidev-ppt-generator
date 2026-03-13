#!/usr/bin/env node

/**
 * Slidev 导出封装脚本
 * 简化 PDF/PPTX/HTML 导出流程
 * 
 * 用法:
 * node export.js --format pdf --output presentation.pdf
 * node export.js --format pptx --output presentation.pptx
 * node export.js --format html --output dist/
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 命令行参数解析
function parseArgs(args) {
  const options = {
    format: 'pdf',
    output: null,
    withClicks: false,
    range: null
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--format':
      case '-f':
        options.format = args[++i];
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--with-clicks':
        options.withClicks = true;
        break;
      case '--range':
        options.range = args[++i];
        break;
    }
  }

  return options;
}

function resolveSlidevCommand() {
  const localBin = path.join(process.cwd(), 'node_modules', '.bin', 'slidev');
  return fs.existsSync(localBin) ? [localBin] : null;
}

function ensureProjectDep(name) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const installed = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
  };

  if (installed[name]) {
    return;
  }

  console.log(`⚠️  缺少依赖 ${name}，正在安装到当前项目目录...`);
  execFileSync('npm', ['i', '-D', name], { stdio: 'inherit' });
}

// 检查 Playwright 是否安装（导出 PDF/PPTX 需要）
function checkPlaywright() {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    return pkg.devDependencies && pkg.devDependencies['playwright-chromium'];
  } catch (e) {
    return false;
  }
}

// 执行导出
function exportSlides(slidevCmd, format, output, options) {
  const cmd = [...slidevCmd, 'export'];
  
  cmd.push(`--format`, format);
  
  if (output) {
    cmd.push(`--output`, output);
  }
  
  if (options.withClicks) {
    cmd.push('--with-clicks');
  }
  
  if (options.range) {
    cmd.push(`--range`, options.range);
  }

  console.log(`🚀 执行：${cmd.join(' ')}`);
  
  try {
    execFileSync(cmd[0], cmd.slice(1), { stdio: 'inherit' });
    return true;
  } catch (e) {
    console.error('❌ 导出失败');
    return false;
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Slidev 导出工具

用法:
  node export.js [选项]

选项:
  -f, --format <格式>     导出格式：pdf|pptx|png|md（默认：pdf）
  -o, --output <文件>     输出文件路径
  --with-clicks          包含动画步骤
  --range <范围>         导出指定页（如：1-5,8,10-12）
  -h, --help            显示帮助信息

示例:
  node export.js -f pdf -o presentation.pdf
  node export.js -f pptx -o presentation.pptx
  node export.js -f png --with-clicks
  node export.js -f pdf --range 1-5,8,10
`);
    process.exit(0);
  }

  const options = parseArgs(args);

  console.log('📊 Slidev 导出工具');
  console.log('================');
  console.log('');

  const slidevCmd = resolveSlidevCommand();
  if (!slidevCmd) {
    console.log('⚠️  未检测到本地 Slidev 依赖，正在初始化当前项目...');
    execFileSync('node', [
      path.join(__dirname, 'init-project.js'),
      '--dir',
      process.cwd(),
      ...( ['pdf', 'pptx', 'png'].includes(options.format) ? ['--with-export-deps'] : [] ),
    ], { stdio: 'inherit' });
  }
  const resolvedSlidevCmd = resolveSlidevCommand();
  if (!resolvedSlidevCmd) {
    console.error('❌ Slidev 项目初始化失败，当前目录仍不可用');
    process.exit(1);
  }

  // 检查 Playwright（PDF/PPTX 需要）
  if (['pdf', 'pptx', 'png'].includes(options.format)) {
    if (!checkPlaywright()) {
      ensureProjectDep('playwright-chromium');
    }
  }

  // 确定输出文件名
  let outputFile = options.output;
  if (!outputFile) {
    const ext = {
      pdf: 'pdf',
      pptx: 'pptx',
      png: 'png',
      md: 'md',
      html: 'html'
    }[options.format] || options.format;
    
    outputFile = `slides-export.${ext}`;
  }

  console.log(`📝 格式：${options.format}`);
  console.log(`📁 输出：${outputFile}`);
  console.log('');

  // 执行导出
  const success = exportSlides(resolvedSlidevCmd, options.format, outputFile, options);
  
  if (success) {
    console.log('');
    console.log(`✅ 导出完成：${outputFile}`);
    console.log('');
    
    // 显示文件大小
    try {
      const stats = fs.statSync(outputFile);
      const size = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`📦 文件大小：${size} MB`);
    } catch (e) {
      // 忽略
    }
  } else {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
