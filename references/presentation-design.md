# Presentation Design Notes

This reference file constrains `slidev-ppt-generator` to produce output that looks like a real presentation -- not "auto-summary + default black-on-white."

这份参考文件用于约束 `slidev-ppt-generator` 生成更像正式演示稿，而不是"自动摘要 + 默认黑底白字"。

## Goals / 目标

- Each slide conveys exactly one main conclusion
- Text should be concise and precise; avoid piling up explanatory paragraphs
- Use grids, whitespace, and hierarchy to organize information
- Prioritize speakability over flashiness
- Content must never overflow beyond the screen edges

- 一页只传达一个主结论
- 文字少而准，不堆砌解释性段落
- 用网格、留白、层级来组织信息
- 先保证可讲，再追求花哨
- 不允许内容溢出屏幕边界

## Core Rules / 核心规则

### 1. One Idea Per Slide

- Each slide must carry only one central proposition
- If a slide tries to cover "definition + architecture + value" at the same time, split it
- Titles must read like conclusions, not like table-of-contents entries

- 每页只有一个中心命题
- 如果一个页面同时在讲"定义 + 架构 + 价值"，拆页
- 标题必须像结论，而不是像目录项

Good titles / 好标题：

- `Why chatbots cannot sustain continuous work` / `为什么聊天机器人无法承担持续工作`
- `Four layers that make AI actually execute` / `四层结构，才让 AI 真正能执行`
- `Local-first is not a tech preference -- it is boundary control` / `本地优先不是技术偏好，而是边界控制`

Bad titles / 差标题：

- `What is OpenClaw` / `什么是 OpenClaw`
- `Core Features` / `核心功能`
- `System Overview` / `系统介绍`

### 2. Control Text Density / 控制文字密度

- Keep continuous body text on a single slide to roughly 40-60 CJK characters (or ~2-3 short English sentences)
- Each card should contain at most 2-3 lines of body text
- Limit a single slide to no more than 6 primary blocks
- Lists should have 3-5 items; if more, split across two slides or group them

- 单页正文尽量不超过 40-60 个汉字的连续大段
- 每个卡片内部最多 2-3 行正文
- 一页元素数量尽量不超过 6 个主块
- 如果用列表，保持 3-5 项；超过就换成两页或分组

### 3. Establish Visual Hierarchy / 建立视觉层级

- Title font size must be noticeably larger than body text
- Keep only one dominant visual focal point per slide
- Use low-contrast, muted colors for auxiliary labels, annotations, and source notes
- Do not give every block the same font size and weight

- 标题字号必须明显高于正文
- 同一页只保留 1 个最大视觉焦点
- 辅助标签、注释、来源说明统一用低对比浅色
- 不要每个块都用同样的字体大小和粗细

### 4. Whitespace First / 留白优先

- Reserve at least 8%-10% safe margin on all sides
- Maintain consistent spacing between cards
- Important content needs breathing room around it
- Never pad text just to "fill the screen"

- 四周至少预留 8%-10% 的安全边距
- 卡片和卡片之间保持稳定间距
- 重要内容周围要有呼吸空间
- 不能为了"填满屏幕"去堆字

### 5. Choose Appropriate Slidev Layouts / 优先选择适合的 Slidev 布局

Prefer / 优先使用：

- `cover`
- `default`
- `center`
- `end`

Use only when the content naturally fits / 仅在内容天然适合时使用：

- `two-cols`
- `image-left`
- `image-right`
- `fact`

Do not overuse layouts. Most high-quality slides only need `default` + custom grids.

不要滥用布局。大多数高质量页面其实只需要 `default` + 自定义网格。

### 6. Preferred Content Structures / 内容页优先结构

Prefer these proven structures / 优先选择这些成熟结构：

- Problem / Consequence / Turning point -- 问题 / 后果 / 转折
- Compare two sides + decision conclusion -- 对比双方 + 决策结论
- Four-layer architecture / Three-stage flow / Five capabilities -- 四层架构 / 三段流程 / 五项能力
- Audience / Scenario / Benefit -- 人群 / 场景 / 收益
- Module breakdown / Responsibility boundaries / Execution results -- 模块拆解 / 职责边界 / 运行结果

### 7. Overflow Control / 溢出控制

- When a title exceeds two lines, rewrite the title first instead of blindly shrinking the font
- In two-column layouts, column heights must be roughly equal; avoid one side full and the other empty
- Footer notes, sources, and footnotes must not push primary content off screen
- Closing slides are especially prone to overflow: do not combine a large title, two big cards, long footnotes, and a tagline on one slide

- 标题超过两行时，先重写标题，不要盲目缩字
- 两栏页中，每栏内容高度必须接近，避免一边撑满一边空
- 页面底部说明、来源、脚注不得把主要内容顶出屏幕
- 结尾页尤其容易溢出：不要同时放大标题、两个大卡片、长脚注、口号

### 8. Slidev-Specific Recommendations / 对于 Slidev 的具体建议

- When using inline HTML, keep the structure simple and avoid deeply nested elements
- Use consistent `gap`, `p-*`, `rounded-*` utilities to form a uniform style
- Use `max-w-*` to control paragraph width and prevent overly wide lines
- If text length is unpredictable, consider `AutoFitText`, but prefer rewriting the copy first
- Prefer Markdown tables over hand-written raw HTML tables
- If you must use an HTML table, always include `thead` and `tbody` to avoid Vue/Vite export warnings
- For comparison slides, prefer two-column cards or 2x2/3x2 grids over full-screen large tables

- 使用内联 HTML 时，结构要简单，避免过深嵌套
- 用固定 `gap`、`p-*`、`rounded-*` 形成一致风格
- 用 `max-w-*` 控制段落宽度，避免横向过长
- 如果文本长度不可控，可考虑 `AutoFitText`，但优先先重写文案
- 优先使用 Markdown table，而不是手写原始 HTML table
- 如果必须使用 HTML table，必须包含 `thead` 和 `tbody`，避免 Vue/Vite 导出警告
- 对比类页面优先用两栏卡片或 2x2/3x2 网格，少用满屏大表格

## Post-Generation Checklist / 生成后的自检清单

After finishing `slides.md`, run at least these checks:

在完成 `slides.md` 后，至少做这几项检查：

1. Are there any empty slides that have only a title and almost no information? / 有没有"只有标题几乎没信息"的空页
2. Does any slide carry more than one core proposition? / 有没有某页承担了两个以上核心命题
3. Are there more than 5 parallel modules crammed onto a single slide? / 有没有超过 5 个并列模块还放在一页
4. Are any paragraphs too wide, making them hard to read? / 有没有段落横向过长导致难读
5. Does the last slide overflow, feel cramped, or have too many footnotes? / 最后一页是否溢出、挤压、脚注过多
6. Do architecture slides actually explain structure, or merely list nouns? / 架构页是否真的在讲结构，而不是只是在列名词

## Recommended Output Style / 本技能建议输出风格

- Do not chase flashy animations
- Aim for stability, professionalism, and speakability
- Use a visual system that is restrained yet distinctive
- The deck should look like it was made by someone experienced, not auto-generated

- 不追求花哨动效
- 追求稳定、专业、可讲
- 用"克制但有辨识度"的视觉系统
- 让 deck 看起来像有经验的人做的，而不是自动拼出来的
