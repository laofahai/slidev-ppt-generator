# Prompting Strategy

This reference file explains how `slidev-ppt-generator` should handle the boundary between "workflow rules" and "per-request style requirements."

这份参考文件说明 `slidev-ppt-generator` 应如何处理"工作流规则"和"本次风格要求"的边界。

## Layering Principle / 分层原则

- `SKILL.md` owns the fixed rules
- The user request owns the per-task variables

Do not hard-code aesthetic preferences that may change with every request into the skill.

- `SKILL.md` 负责固定规则
- 用户请求负责本次变量

不要把每次都可能变化的审美偏好写死进 skill。

## What Belongs in the Skill / 应放在 skill 里的内容

- Must use the Slidev project workflow
- Install dependencies in the project directory, never globally
- Generate `slides.md` first, then preview, then export
- Run overflow, density, and hierarchy checks before exporting
- Avoid hollow table-of-contents slides, placeholder bullets, and consecutive slogan slides
- One main conclusion per slide

These define the quality floor and the execution path; they should remain stable.

- 必须使用 Slidev 项目工作流
- 依赖安装在项目目录，不安装到全局
- 先生成 `slides.md`，再预览、再导出
- 导出前进行溢出、密度、层级检查
- 避免空洞目录页、占位 bullet、连续口号页
- 一页一个主结论

这些是质量下限和执行路径，应该稳定存在。

## What the User Request Should Decide / 应由用户请求决定的内容

- Chinese or English
- Topic and audience
- Slide count range
- Whether to export PDF / PPTX / HTML
- Leaning toward `formal` / `executive` / `technical` / `launch`
- Whether it resembles a launch event, client introduction, internal sharing, or architecture briefing

These are per-task variables and should not be hard-coded in the skill.

- 中文还是英文
- 主题和受众
- 页数范围
- 是否导出 PDF / PPTX / HTML
- 更偏 `formal` / `executive` / `technical` / `launch`
- 是否更像发布会、客户介绍、内部分享、架构说明

这些是一次任务内的变量，不应硬编码在 skill 中。

## Language Strategy / 语言策略

- Default to `auto`, following the primary language of the user's current message
- When the user explicitly requests English, the entire deck should be in English
- When the user explicitly requests Chinese, the entire deck should be in Chinese
- Do not default to English, and do not mix Chinese and English on the same slide
- If English proper nouns must be retained, ensure all other terminology remains consistent throughout the deck

- 默认使用 `auto`，跟随用户当前消息主语言
- 用户明确要求英文时，整份 deck 使用英文
- 用户明确要求中文时，整份 deck 使用中文
- 不要默认改成英文，也不要把中英文混在同一页
- 如果必须保留英文专有名词，确保其余术语在全稿中保持一致

## Official Theme Strategy / 官方主题策略

Let the skill choose from official themes first, rather than inventing new ones on the fly:

优先让 skill 从官方主题中选择，而不是临时发明新主题：

- `technical` -> `default`
- `formal` -> `apple-basic`
- `executive` -> `seriph`
- `launch` -> `apple-basic`

Only consider `bricks` or `shibainu` when the user explicitly wants a stronger personality.

Do not treat "search the web for a better theme" as a default step. For formal introduction decks, just pick the official theme per the mapping above.

只有在用户明确追求更强个性时，再考虑 `bricks` 或 `shibainu`。

不要把"去网上搜哪个主题更好"当成默认步骤。对正式介绍类 deck，直接按映射选官方主题即可。

## Structural Generation Constraints / 结构生成约束

- Prefer native Slidev Markdown syntax whenever possible
- For comparisons, prefer Markdown tables or card grids
- Avoid raw HTML tables; if you must use one, always include complete `thead` / `tbody`
- Avoid large, dense tables on a single slide -- this usually makes the deck look worse, not more professional

- 尽量用 Slidev Markdown 原生写法
- 对比信息优先用 Markdown table 或卡片网格
- 避免原始 HTML table；若必须使用，必须写完整 `thead` / `tbody`
- 避免一页内出现过大的密集表格，这通常会让 deck 看起来更丑而不是更专业

## Recommended Request Templates / 推荐请求模板

### English

```text
Create a Slidev deck about OpenClaw.
Requirements:
- Language: English
- Tone: formal
- Length: 10-12 slides
- Deliverables: generate slides.md and export both PDF and PPTX
- Focus: architecture, workflow, use cases, and why local-first matters
```

### 中文

```text
帮我用 Slidev 做一个关于 OpenClaw 介绍的 PPT。
要求：
- 语言：中文
- 风格：technical
- 页数：10-12 页
- 交付：生成 slides.md，并导出 PDF 和 PPTX
- 重点：讲清楚架构、工作流、适用场景和本地优先价值
```

## Generation Goals / 生成时的目标

- Let the skill guarantee "it won't be bad"
- Let the prompt decide "what it should look like this time"
- Prioritize a stable, professional, speakable deck first, then gradually add visual personality

- 让 skill 保证"不会很差"
- 让 prompt 决定"这次要像什么"
- 优先得到稳定、专业、可讲的 deck，再逐步增加视觉个性
