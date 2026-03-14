---
name: slidev-ppt-generator
description: Generate and export presentations using Slidev. Use only when the user explicitly asks for Slidev, Markdown slides, a previewable slides.md, or needs to export PDF/PPTX/HTML. Do NOT use for Jobs-style vertical HTML presentations.
metadata:
  openclaw:
    emoji: "📊"
    tags: ["slidev", "ppt", "presentation", "markdown", "slides"]
    requires:
      bins: ["node", "npm"]
    platform: ["macos", "linux"]
---

# Slidev PPT Generator / Slidev PPT 生成器

Generate `slides.md` using the standard Slidev workflow, then preview, build, and export within an existing or new Slidev project.

使用 Slidev 的标准工作流生成 `slides.md`，并在现有或新建的 Slidev 项目中预览、构建和导出。

## When to Use / 何时使用

- User explicitly mentions `Slidev`
- 用户明确提到 `Slidev`
- User wants `slides.md`, Markdown slides, or a locally previewable presentation
- 用户要 `slides.md`、Markdown 幻灯片、可本地预览的演示文稿
- User wants to turn a Markdown outline into a previewable or exportable Slidev presentation
- 用户要把 Markdown 大纲变成可预览或可导出的 Slidev 演示文稿
- User wants to export `PDF`, `PPTX`, or build static HTML
- 用户要导出 `PDF`、`PPTX` 或构建静态 HTML

## When NOT to Use / 不要使用

- User wants an editable native PPTX and does not accept image-based Slidev PPTX export
- 用户要生成可编辑的原生 PPTX，并且不接受基于图片的 Slidev PPTX 导出
- User wants a Jobs-style, minimalist tech-feel, 9:16 vertical, single-HTML presentation
- 用户要乔布斯风、极简科技风、9:16 竖屏、单 HTML 演示稿
- User only needs a single HTML landing page or long-form article, not the Slidev workflow
- 用户只需要单个 HTML 落地页或长文，不需要 Slidev 工作流
- User has no local Node/npm environment, and the current task does not allow installing dependencies
- 用户没有本地 Node/npm 环境，且当前任务不允许安装依赖

## Directory Structure / 目录结构

- `scripts/generate.js`
  Purpose: Generate a basic `slides.md` from a given topic
  作用：根据主题生成基础版 `slides.md`
- `scripts/export.js`
  Purpose: Export `pdf` / `pptx` / `png` from within a Slidev project directory
  作用：在 Slidev 项目目录中导出 `pdf` / `pptx` / `png`
- `templates/tech-share.md`
  Purpose: Tech-share template reference
  作用：技术分享模板参考
- `examples/demo-slides.md`
  Purpose: Example slides
  作用：示例幻灯片
- `references/presentation-design.md`
  Purpose: Presentation design and layout rules; must be consulted when generating a formal deck
  作用：演示文稿设计与排版规则，生成正式 deck 时必须参考

## Standard Workflow / 标准工作流

### 1. Confirm Output Target / 确认输出目标

Confirm the following information first. If the user has not provided everything, fill in the minimum necessary defaults:

先确认以下信息，如果用户没给全，就按最少必要信息补齐：

1. Topic / 主题
2. Style: `tech` / `product` / `report` / 风格：`tech` / `product` / `report`
3. Page count range / 页数范围
4. Language: `auto` / `zh` / `en` / 语言：`auto` / `zh` / `en`
5. Final deliverable: preview, HTML, PDF, PPTX / 最终交付：预览、HTML、PDF、PPTX
6. Tone: `formal` / `executive` / `technical` / `launch` / 表达风格：`formal` / `executive` / `technical` / `launch`
7. Official theme preference: auto-detect, or user-specified `default` / `seriph` / `apple-basic` / 官方主题偏好：自动判断，或用户明确指定 `default` / `seriph` / `apple-basic`

If the user just says "make a PPT", use these defaults:

如果用户只说"做一个 PPT"，默认：

- Style / 风格：`tech`
- Pages / 页数：`10`
- Language / 语言：`auto`
- Output / 输出：Generate `slides.md` first, then ask whether to export / 先生成 `slides.md`，再询问是否要导出
- Tone / 表达风格：`formal`
- Theme / 主题：auto-detect / 自动判断

Language rules / 语言规则：

- If the user explicitly requests English, the entire deck should be in English
- 如果用户明确要求英文，整份 deck 用英文
- If the user explicitly requests Chinese, the entire deck should be in Chinese
- 如果用户明确要求中文，整份 deck 用中文
- If the user does not specify, default to the primary language of the user's current message
- 如果用户没指定，默认跟随用户当前消息主语言
- Keep titles, body text, export prompts, and error messages in the same language; avoid mixing Chinese and English
- 标题、正文、导出提示、错误提示尽量保持同一语言，不要中英混杂
- Do not generate bilingual pages unless the user explicitly requests it
- 除非用户明确要求双语，否则不要生成双语页

### 2. Check or Initialize Slidev Project / 检查或初始化 Slidev 项目

Prefer reusing an existing Slidev project. If the user does not specify a directory, default to `~/slidev-ppt`.

优先复用已有 Slidev 项目。若用户未指定目录，默认使用 `~/slidev-ppt`。

Check whether the project exists:

检查项目是否存在：

```bash
ls ~/slidev-ppt/package.json ~/slidev-ppt/slides.md
```

If it does not exist, initialize it. Prefer using the in-repo script to auto-create a local project and install project-level dependencies along with official themes:

若不存在，则初始化。优先使用仓库内脚本自动创建本地项目并安装项目内依赖与官方主题：

```bash
node scripts/init-project.js --dir ~/slidev-ppt
```

If the user explicitly requests PDF/PPTX export later, initialize with export dependencies included:

如果用户明确要求后续导出 PDF/PPTX，则初始化时直接带导出依赖：

```bash
node scripts/init-project.js --dir ~/slidev-ppt --with-export-deps
```

Equivalent manual setup:

等价的手工做法：

```bash
npm init slidev@latest ~/slidev-ppt
cd ~/slidev-ppt
npm install
```

The init script installs these official themes by default for the skill to auto-select:

初始化脚本默认安装这些官方主题，供 skill 自动选择：

- `@slidev/theme-default`
- `@slidev/theme-seriph`
- `@slidev/theme-apple-basic`
- `@slidev/theme-bricks`
- `@slidev/theme-shibainu`

`export.js` will automatically install `playwright-chromium` in the current project directory if export dependencies are missing. Do not install it globally.

`export.js` 会在当前项目目录缺少导出依赖时自动安装 `playwright-chromium`，不要装到全局环境。

If the final target includes `PDF` or `PPTX`, prefer initializing the project with export dependencies upfront rather than waiting for an export error:

如果最终目标包含 `PDF` 或 `PPTX`，优先直接初始化带导出依赖的项目，不要等到导出报错后再补装：

```bash
node scripts/init-project.js --dir ~/slidev-ppt --with-export-deps
```

### 3. Generate or Update slides.md / 生成或更新 slides.md

Use the script to generate baseline content, then refine according to user needs:

用脚本先生成基础内容，再按用户需求补充细节：

```bash
node scripts/generate.js \
  --topic "OpenClaw 介绍" \
  --style tech \
  --tone technical \
  --pages 10 \
  --author "你的名字" \
  --output ~/slidev-ppt/slides.md
```

If the user provides an existing outline, do not overwrite directly; read the existing `slides.md` first, then modify on top of it.

如果用户给了现成大纲，不要直接覆盖；应先阅读现有 `slides.md`，再在此基础上修改。

### 4. Preview / 预览

Run in the Slidev project directory:

在 Slidev 项目目录运行：

```bash
npx slidev slides.md
```

If the project already provides custom scripts, you can also use the project's own `npm run dev`.

如果项目已经提供自定义脚本，也可以使用项目自己的 `npm run dev`。

### 5. Export / 导出

Navigate to the Slidev project directory, then run the export script. If the current directory does not yet have local Slidev dependencies, the script will automatically initialize the project directory and install project-level dependencies:

进入 Slidev 项目目录，再运行导出脚本。若当前目录还没有本地 Slidev 依赖，脚本会自动初始化当前项目目录并安装项目内依赖：

```bash
node /path/to/slidev-ppt-generator/scripts/export.js --format pdf --output presentation.pdf
```

Or use the Slidev CLI directly:

或直接使用 Slidev CLI：

```bash
npx slidev export --format pdf --output presentation.pdf
npx slidev export --format pptx --output presentation.pptx
npx slidev build --out dist
```

## Execution Requirements / 执行要求

- Prefer working within an existing Slidev project; do not create temporary directories everywhere
- 优先在已有 Slidev 项目里工作，不要到处创建临时目录
- Confirm the output path before generating to avoid overwriting the user's existing `slides.md`
- 生成前先确认输出路径，避免覆盖用户现有 `slides.md`
- Export tasks must be executed in a project directory that contains Slidev dependencies
- 如果是导出任务，必须在包含 Slidev 依赖的项目目录执行
- If dependencies are missing, clearly tell the user what is missing; do not assume global tools are installed
- 如果依赖缺失，明确告诉用户缺什么，不要假设全局工具已经安装
- If the user needs a formal deliverable, check the generated result at least once before exporting
- 如果用户要的是正式交付件，导出前至少检查一次生成结果

## Design Requirements / 设计要求

- Do not produce "hollow title page + generic slogan + placeholder bullet" template decks
- 不要产出"空洞目录页 + 泛化口号 + 占位 bullet"式模板稿
- One page, one main conclusion. Prefer a compact 8-14 page deck rather than splitting synonymous content across many empty pages
- 一页只讲一个主结论，优先做 8-14 页的紧凑 deck，而不是把同义内容拆成很多空页
- Every deck should first establish a clear visual direction, then execute layouts; do not just apply the default black-on-white template
- 每份 deck 都要先确定一个清晰视觉方向，再落版式；不要直接套默认黑底白字模板
- The cover page must include a clear title, subtitle, and context positioning; it cannot just be stacked text
- 封面页必须包含明确标题、副标题和场景定位，不能只是标题堆字
- Body pages should prioritize one of the following structures:
- 正文页优先使用以下结构之一：
  - Problem / Cost / Opportunity / 问题 / 代价 / 机会
  - Architecture / Layers / Data Flow / 架构 / 分层 / 数据流
  - Scenario / Role / Result / 场景 / 角色 / 结果
  - Comparison / Advantage / Action Recommendation / 对比 / 优势 / 行动建议
- Include at least 1 page with genuine information density (architecture page), 1 scenario page, and 1 value comparison page
- 至少包含 1 页真正有信息密度的架构页，1 页场景页，1 页价值对比页
- Avoid information-free "What is X?" standalone title pages unless the next page immediately follows up with a core conclusion
- 避免无信息的"什么是 X？"单独大标题页，除非下一页立刻承接核心结论
- Avoid multiple consecutive pages with just a single slogan; limit tagline pages to 1-2 at most
- 避免连续多页只有一句口号；金句页最多 1-2 页
- Copy should be specific -- use real nouns, platform names, module names, capability names; avoid filling everything with abstract adjectives
- 文案要具体，尽量使用真实名词、平台名、模块名、能力名，不要全是抽象形容词
- If the topic is tech or product-related, prioritize making the content look like a "ready-to-present" formal share, not an AI auto-summary
- 如果主题偏技术或产品介绍，优先让内容看起来像"能去讲"的正式分享，而不是 AI 自动摘要
- Prefer native Markdown structures and Slidev layouts; do not abuse raw HTML for formatting convenience
- 优先使用 Markdown 原生结构与 Slidev 布局，不要为了排版方便滥写原始 HTML
- Prefer Markdown tables; only consider HTML tables when Markdown tables clearly cannot express the content
- 表格优先使用 Markdown table；只有在 Markdown table 明显无法表达时，才考虑 HTML table
- If HTML tables are necessary, write the complete structure: `<table><thead>...<tbody>...</tbody></table>`; never place `<tr>` directly under `<table>`
- 如果必须使用 HTML table，必须写完整结构：`<table><thead>...<tbody>...</tbody></table>`，禁止直接把 `<tr>` 放在 `<table>` 下
- For information comparison, prefer card grids, two-column layouts, or Markdown tables; do not cram an entire page into a single dense HTML table
- 信息对比优先使用卡片网格、双栏或 Markdown table，不要把一整页堆成大而密的 HTML 表格

Before generating a formal presentation, you must read [references/presentation-design.md](references/presentation-design.md) and follow its density control, hierarchy, whitespace, and overflow rules.

生成正式演示稿前，必须阅读 [references/presentation-design.md](references/presentation-design.md)，并按其中的密度控制、层级、留白和溢出控制规则执行。

## Style Parameters / 风格参数

Style parameters should be determined by the current task, not hard-coded into the skill. Before generating, determine or fill in which style this deck best matches:

风格参数应由当前任务决定，而不是写死在 skill 里。生成前先判断或补齐这次 deck 更接近哪一种：

- `formal`
  Suitable for formal introductions, client communication, general company overviews. Visually restrained, stable structure, minimal decoration.
  适合正式介绍、客户沟通、通用公司介绍。视觉克制、结构稳定、少装饰。
- `executive`
  Suitable for management reporting, proposal presentations, decision materials. Emphasizes conclusions, comparisons, and action recommendations.
  适合管理层汇报、方案陈述、决策材料。强调结论、对比和行动建议。
- `technical`
  Suitable for tech shares, architecture walkthroughs, product capability descriptions. Allows higher information density, but hierarchy must be controlled.
  适合技术分享、架构讲解、产品能力说明。允许更高信息密度，但必须控制层级。
- `launch`
  Suitable for launches, keynotes, brand-style presentations. Stronger visual impact is acceptable, but information clarity must not be sacrificed.
  适合发布、宣讲、品牌型演示。可以更强视觉冲击，但不能牺牲信息清晰度。

If the user does not specify, default to `formal`.
If the user explicitly says "minimalist tech feel" or "more like a keynote", switch to `launch`.
If the user explicitly says "architecture talk" or "tech share", prefer `technical`.

如果用户没有指定，默认使用 `formal`。
如果用户明确说"极简科技感""更像发布会"，再切到 `launch`。
如果用户明确说"讲架构""技术分享"，优先 `technical`。

## Official Theme Selection / 官方主题选择

Prefer official themes; do not invent custom themes first. Recommended mapping:

优先使用官方主题，不要先发明自定义主题。推荐映射：

- `technical` -> `default`
- `formal` -> `apple-basic`
- `executive` -> `seriph`
- `launch` -> `apple-basic`

Only consider these when the user explicitly requests something more playful or visually experimental:

只有当用户明确要求更俏皮、更强视觉实验时，才考虑：

- `bricks`
- `shibainu`

If the user directly specifies a theme name, prioritize the user's request; otherwise the skill should auto-select based on the mapping above.

如果用户直接指定主题名，优先满足用户要求；否则由 skill 按上面的映射自动判断。

Do not search the web to "choose a theme". The official theme mapping is stable enough -- just follow the mapping directly.

不要为了"选择主题"额外搜索网络。官方主题映射已经足够稳定，直接按映射执行即可。

## Language Parameter / 语言参数

Language parameters should also be determined by the current task, not hard-coded into the skill:

语言参数同样应由当前任务决定，而不是写死在 skill 里：

- `auto`
  Default value. Follow the primary language of the user's current message.
  默认值。跟随用户当前消息主语言。
- `zh`
  Generate a Chinese deck. Suitable for Chinese reports, Chinese documentation, Chinese client communication.
  生成中文 deck，适合中文汇报、中文文档沉淀、中文客户沟通。
- `en`
  Generate an English deck. Suitable for English introductions, international team communication, external-facing materials.
  生成英文 deck，适合英文介绍、国际团队沟通、对外材料。

If the user does not explicitly specify a language, do not force English; prefer `auto`.

如果用户没有明确指定语言，不要强制英文；优先遵循 `auto`。

## Post-Generation Checklist / 生成后检查

After completing `slides.md`, perform at least one round of layout self-review:

完成 `slides.md` 之后，至少做一轮版式自检：

1. Are there any hollow title pages? / 是否存在空洞标题页
2. Does any page carry multiple main conclusions? / 是否有页面承担多个主结论
3. Does any single page have more than 6 main blocks? / 是否有单页元素超过 6 个主块
4. Are there obviously long paragraphs or overly tall cards? / 是否有明显超长段落或卡片过高
5. Do the last page, architecture page, or two-column pages have overflow risk? / 最后一页、架构页、双栏页是否存在溢出风险
6. Is there mixed Chinese-English text or inconsistent terminology translation? / 是否出现中英混杂、术语翻译前后不一致
7. Is there non-standard HTML, especially table structures missing `<thead>` / `<tbody>`? / 是否写入了不规范 HTML，尤其是缺少 `<thead>` / `<tbody>` 的表格结构

If delivering PDF/PPTX, prefer exporting PDF first to check layout, then continue exporting other formats.

如果要交付 PDF/PPTX，优先先导出 PDF 检查版式，再继续导出其他格式。

## Common Errors and Handling / 常见错误与处理

### Slidev Not Found / 找不到 Slidev

Run in the target project directory:

在目标项目目录执行：

```bash
npx slidev --version
```

If it fails, the project does not have Slidev dependencies installed. Complete the Slidev project initialization or dependency installation first.

如果失败，说明项目没有安装 Slidev 依赖，需要先完成 Slidev 项目初始化或依赖安装。

### Export Failure / 导出失败

Check the following first:

优先检查：

1. Is the current directory a Slidev project directory? / 当前目录是否是 Slidev 项目目录
2. Is `playwright-chromium` installed? / 是否已安装 `playwright-chromium`
3. Can `slides.md` start successfully in preview mode? / `slides.md` 是否能先通过预览启动

### Invalid Theme or Page Count / 主题或页数不合法

`generate.js` only accepts:

`generate.js` 只接受：

- Style / 风格：`tech` / `product` / `report`
- Pages / 页数：integer >= `3` / 大于等于 `3` 的整数

## Expected Behavior After Triggering / 触发后的期望行为

When the user says "help me make a PPT about OpenClaw introduction", execute in this order:

当用户说"帮我做一个关于 OpenClaw 介绍的 PPT"时，应按下面顺序执行：

1. Confirm topic, style, page count, output target / 确认主题、风格、页数、输出目标
2. Check whether a Slidev project exists / 检查 Slidev 项目是否存在
3. Generate or update `slides.md` / 生成或更新 `slides.md`
4. Provide preview method / 提供预览方式
5. When the user requests export, then execute export / 用户要求导出时，再执行导出

Do not just return a list of commands; actually push forward to the step of generating files, previewing, or exporting.

不要只返回命令清单；应实际推进到生成文件、预览或导出这一步。
