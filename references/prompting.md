# Prompting Strategy

这份参考文件说明 `slidev-ppt-generator` 应如何处理“工作流规则”和“本次风格要求”的边界。

## 分层原则

- `SKILL.md` 负责固定规则
- 用户请求负责本次变量

不要把每次都可能变化的审美偏好写死进 skill。

## 应放在 skill 里的内容

- 必须使用 Slidev 项目工作流
- 依赖安装在项目目录，不安装到全局
- 先生成 `slides.md`，再预览、再导出
- 导出前进行溢出、密度、层级检查
- 避免空洞目录页、占位 bullet、连续口号页
- 一页一个主结论

这些是质量下限和执行路径，应该稳定存在。

## 应由用户请求决定的内容

- 中文还是英文
- 主题和受众
- 页数范围
- 是否导出 PDF / PPTX / HTML
- 更偏 `formal` / `executive` / `technical` / `launch`
- 是否更像发布会、客户介绍、内部分享、架构说明

这些是一次任务内的变量，不应硬编码在 skill 中。

## 语言策略

- 默认使用 `auto`，跟随用户当前消息主语言
- 用户明确要求英文时，整份 deck 使用英文
- 用户明确要求中文时，整份 deck 使用中文
- 不要默认改成英文，也不要把中英文混在同一页
- 如果必须保留英文专有名词，确保其余术语在全稿中保持一致

## 推荐请求模板

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

## 生成时的目标

- 让 skill 保证“不会很差”
- 让 prompt 决定“这次要像什么”
- 优先得到稳定、专业、可讲的 deck，再逐步增加视觉个性
