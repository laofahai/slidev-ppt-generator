---
name: slidev-ppt-generator
description: 使用 Slidev 生成和导出演示文稿。仅在用户明确要 Slidev、Markdown 幻灯片、可预览的 slides.md，或需要导出 PDF/PPTX/HTML 成品时使用。遇到“乔布斯风竖屏 HTML 演示稿”不要使用本技能。
metadata:
  openclaw:
    emoji: "📦"
    requires:
      bins: ["node", "npm"]
    platform: ["macos", "linux"]
---

# Slidev PPT 生成器

使用 Slidev 的标准工作流生成 `slides.md`，并在现有或新建的 Slidev 项目中预览、构建和导出。

## 何时使用

- 用户明确提到 `Slidev`
- 用户要 `slides.md`、Markdown 幻灯片、可本地预览的演示文稿
- 用户要把 Markdown 大纲变成可预览或可导出的 Slidev 演示文稿
- 用户要导出 `PDF`、`PPTX` 或构建静态 HTML

## 不要使用

- 用户要生成可编辑的原生 PPTX，并且不接受基于图片的 Slidev PPTX 导出
- 用户要乔布斯风、极简科技风、9:16 竖屏、单 HTML 演示稿
- 用户只需要单个 HTML 落地页或长文，不需要 Slidev 工作流
- 用户没有本地 Node/npm 环境，且当前任务不允许安装依赖

## 目录结构

- `scripts/generate.js`
  作用：根据主题生成基础版 `slides.md`
- `scripts/export.js`
  作用：在 Slidev 项目目录中导出 `pdf` / `pptx` / `png`
- `templates/tech-share.md`
  作用：技术分享模板参考
- `examples/demo-slides.md`
  作用：示例幻灯片

## 标准工作流

### 1. 确认输出目标

先确认以下信息，如果用户没给全，就按最少必要信息补齐：

1. 主题
2. 风格：`tech` / `product` / `report`
3. 页数范围
4. 最终交付：预览、HTML、PDF、PPTX

如果用户只说“做一个 PPT”，默认：

- 风格：`tech`
- 页数：`10`
- 输出：先生成 `slides.md`，再询问是否要导出

### 2. 检查或初始化 Slidev 项目

优先复用已有 Slidev 项目。若用户未指定目录，默认使用 `~/slidev-ppt`。

检查项目是否存在：

```bash
ls ~/slidev-ppt/package.json ~/slidev-ppt/slides.md
```

若不存在，则初始化。优先使用仓库内脚本自动创建本地项目并安装项目内依赖：

```bash
node scripts/init-project.js --dir ~/slidev-ppt
```

如果用户明确要求后续导出 PDF/PPTX，则初始化时直接带导出依赖：

```bash
node scripts/init-project.js --dir ~/slidev-ppt --with-export-deps
```

等价的手工做法：

```bash
npm init slidev@latest ~/slidev-ppt
cd ~/slidev-ppt
npm install
```

`export.js` 会在当前项目目录缺少导出依赖时自动安装 `playwright-chromium`，不要装到全局环境。

### 3. 生成或更新 slides.md

用脚本先生成基础内容，再按用户需求补充细节：

```bash
node scripts/generate.js \
  --topic "OpenClaw 介绍" \
  --style tech \
  --pages 10 \
  --author "你的名字" \
  --output ~/slidev-ppt/slides.md
```

如果用户给了现成大纲，不要直接覆盖；应先阅读现有 `slides.md`，再在此基础上修改。

### 4. 预览

在 Slidev 项目目录运行：

```bash
npx slidev slides.md
```

如果项目已经提供自定义脚本，也可以使用项目自己的 `npm run dev`。

### 5. 导出

进入 Slidev 项目目录，再运行导出脚本。若当前目录还没有本地 Slidev 依赖，脚本会自动初始化当前项目目录并安装项目内依赖：

```bash
node /path/to/slidev-ppt-generator/scripts/export.js --format pdf --output presentation.pdf
```

或直接使用 Slidev CLI：

```bash
npx slidev export --format pdf --output presentation.pdf
npx slidev export --format pptx --output presentation.pptx
npx slidev build --out dist
```

## 执行要求

- 优先在已有 Slidev 项目里工作，不要到处创建临时目录
- 生成前先确认输出路径，避免覆盖用户现有 `slides.md`
- 如果是导出任务，必须在包含 Slidev 依赖的项目目录执行
- 如果依赖缺失，明确告诉用户缺什么，不要假设全局工具已经安装
- 如果用户要的是正式交付件，导出前至少检查一次生成结果

## 常见错误与处理

### 找不到 Slidev

在目标项目目录执行：

```bash
npx slidev --version
```

如果失败，说明项目没有安装 Slidev 依赖，需要先完成 Slidev 项目初始化或依赖安装。

### 导出失败

优先检查：

1. 当前目录是否是 Slidev 项目目录
2. 是否已安装 `playwright-chromium`
3. `slides.md` 是否能先通过预览启动

### 主题或页数不合法

`generate.js` 只接受：

- 风格：`tech` / `product` / `report`
- 页数：大于等于 `3` 的整数

## 触发后的期望行为

当用户说“帮我做一个关于 OpenClaw 介绍的 PPT”时，应按下面顺序执行：

1. 确认主题、风格、页数、输出目标
2. 检查 Slidev 项目是否存在
3. 生成或更新 `slides.md`
4. 提供预览方式
5. 用户要求导出时，再执行导出

不要只返回命令清单；应实际推进到生成文件、预览或导出这一步。
