#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

function parseArgs(args) {
  const options = {
    dir: path.join(os.homedir(), 'slidev-ppt'),
    withExportDeps: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--dir':
      case '-d':
        options.dir = args[++i];
        break;
      case '--with-export-deps':
        options.withExportDeps = true;
        break;
    }
  }

  return options;
}

function ensureDir(projectDir) {
  fs.mkdirSync(projectDir, { recursive: true });
}

function ensurePackageJson(projectDir) {
  const packageJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    return;
  }

  execFileSync('npm', ['init', '-y'], {
    cwd: projectDir,
    stdio: 'inherit',
  });
}

function readPackageJson(projectDir) {
  const packageJsonPath = path.join(projectDir, 'package.json');
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
}

function ensureDeps(projectDir, packages) {
  const pkg = readPackageJson(projectDir);
  const installed = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
  };

  const missing = packages.filter((name) => !installed[name]);
  if (missing.length === 0) {
    return;
  }

  console.log(`📦 安装项目依赖：${missing.join(', ')}`);
  execFileSync('npm', ['i', '-D', ...missing], {
    cwd: projectDir,
    stdio: 'inherit',
  });
}

function ensureSlides(projectDir) {
  const slidesPath = path.join(projectDir, 'slides.md');
  if (fs.existsSync(slidesPath)) {
    return;
  }

  const starter = `---
theme: default
title: Slidev Presentation
---

# Slidev Presentation

准备开始
`;

  fs.writeFileSync(slidesPath, starter, 'utf8');
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const projectDir = path.resolve(options.dir);

  console.log(`📁 项目目录：${projectDir}`);
  ensureDir(projectDir);
  ensurePackageJson(projectDir);
  ensureDeps(projectDir, [
    '@slidev/cli',
    '@slidev/theme-default',
    '@slidev/theme-seriph',
  ]);

  if (options.withExportDeps) {
    ensureDeps(projectDir, ['playwright-chromium']);
  }

  ensureSlides(projectDir);

  console.log('✅ Slidev 项目已就绪');
  console.log(`   - slides.md: ${path.join(projectDir, 'slides.md')}`);
}

main();
