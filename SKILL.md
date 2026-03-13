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
- `references/presentation-design.md`
  作用：演示文稿设计与排版规则，生成正式 deck 时必须参考

## 标准工作流

### 1. 确认输出目标

先确认以下信息，如果用户没给全，就按最少必要信息补齐：

1. 主题
2. 风格：`tech` / `product` / `report`
3. 页数范围
4. 语言：`auto` / `zh` / `en`
5. 最终交付：预览、HTML、PDF、PPTX
6. 表达风格：`formal` / `executive` / `technical` / `launch`
7. 官方主题偏好：自动判断，或用户明确指定 `default` / `seriph` / `apple-basic`

如果用户只说“做一个 PPT”，默认：

- 风格：`tech`
- 页数：`10`
- 语言：`auto`
- 输出：先生成 `slides.md`，再询问是否要导出
- 表达风格：`formal`
- 主题：自动判断

语言规则：

- 如果用户明确要求英文，整份 deck 用英文
- 如果用户明确要求中文，整份 deck 用中文
- 如果用户没指定，默认跟随用户当前消息主语言
- 标题、正文、导出提示、错误提示尽量保持同一语言，不要中英混杂
- 除非用户明确要求双语，否则不要生成双语页

### 2. 检查或初始化 Slidev 项目

优先复用已有 Slidev 项目。若用户未指定目录，默认使用 `~/slidev-ppt`。

检查项目是否存在：

```bash
ls ~/slidev-ppt/package.json ~/slidev-ppt/slides.md
```

若不存在，则初始化。优先使用仓库内脚本自动创建本地项目并安装项目内依赖与官方主题：

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

初始化脚本默认安装这些官方主题，供 skill 自动选择：

- `@slidev/theme-default`
- `@slidev/theme-seriph`
- `@slidev/theme-apple-basic`
- `@slidev/theme-bricks`
- `@slidev/theme-shibainu`

`export.js` 会在当前项目目录缺少导出依赖时自动安装 `playwright-chromium`，不要装到全局环境。

### 3. 生成或更新 slides.md

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

## 设计要求

- 不要产出“空洞目录页 + 泛化口号 + 占位 bullet”式模板稿
- 一页只讲一个主结论，优先做 8-14 页的紧凑 deck，而不是把同义内容拆成很多空页
- 每份 deck 都要先确定一个清晰视觉方向，再落版式；不要直接套默认黑底白字模板
- 封面页必须包含明确标题、副标题和场景定位，不能只是标题堆字
- 正文页优先使用以下结构之一：
  - 问题 / 代价 / 机会
  - 架构 / 分层 / 数据流
  - 场景 / 角色 / 结果
  - 对比 / 优势 / 行动建议
- 至少包含 1 页真正有信息密度的架构页，1 页场景页，1 页价值对比页
- 避免无信息的“什么是 X？”单独大标题页，除非下一页立刻承接核心结论
- 避免连续多页只有一句口号；金句页最多 1-2 页
- 文案要具体，尽量使用真实名词、平台名、模块名、能力名，不要全是抽象形容词
- 如果主题偏技术或产品介绍，优先让内容看起来像“能去讲”的正式分享，而不是 AI 自动摘要

生成正式演示稿前，必须阅读 [references/presentation-design.md](references/presentation-design.md)，并按其中的密度控制、层级、留白和溢出控制规则执行。

## 风格参数

风格参数应由当前任务决定，而不是写死在 skill 里。生成前先判断或补齐这次 deck 更接近哪一种：

- `formal`
  适合正式介绍、客户沟通、通用公司介绍。视觉克制、结构稳定、少装饰。
- `executive`
  适合管理层汇报、方案陈述、决策材料。强调结论、对比和行动建议。
- `technical`
  适合技术分享、架构讲解、产品能力说明。允许更高信息密度，但必须控制层级。
- `launch`
  适合发布、宣讲、品牌型演示。可以更强视觉冲击，但不能牺牲信息清晰度。

如果用户没有指定，默认使用 `formal`。  
如果用户明确说“极简科技感”“更像发布会”，再切到 `launch`。  
如果用户明确说“讲架构”“技术分享”，优先 `technical`。

## 官方主题选择

优先使用官方主题，不要先发明自定义主题。推荐映射：

- `technical` -> `default`
- `formal` -> `apple-basic`
- `executive` -> `seriph`
- `launch` -> `apple-basic`

只有当用户明确要求更俏皮、更强视觉实验时，才考虑：

- `bricks`
- `shibainu`

如果用户直接指定主题名，优先满足用户要求；否则由 skill 按上面的映射自动判断。

## 语言参数

语言参数同样应由当前任务决定，而不是写死在 skill 里：

- `auto`
  默认值。跟随用户当前消息主语言。
- `zh`
  生成中文 deck，适合中文汇报、中文文档沉淀、中文客户沟通。
- `en`
  生成英文 deck，适合英文介绍、国际团队沟通、对外材料。

如果用户没有明确指定语言，不要强制英文；优先遵循 `auto`。

## 生成后检查

完成 `slides.md` 之后，至少做一轮版式自检：

1. 是否存在空洞标题页
2. 是否有页面承担多个主结论
3. 是否有单页元素超过 6 个主块
4. 是否有明显超长段落或卡片过高
5. 最后一页、架构页、双栏页是否存在溢出风险
6. 是否出现中英混杂、术语翻译前后不一致

如果要交付 PDF/PPTX，优先先导出 PDF 检查版式，再继续导出其他格式。

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
