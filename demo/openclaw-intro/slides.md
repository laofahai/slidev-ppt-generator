---
theme: default
title: OpenClaw
info: OpenClaw intro deck demo
class: text-slate-100
colorSchema: dark
highlighter: shiki
lineNumbers: false
transition: fade-out
fonts:
  sans: 'Noto Sans SC'
  mono: 'JetBrains Mono'
layout: cover
background: '#09111f'
---

<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_34%),radial-gradient(circle_at_80%_18%,_rgba(34,197,94,0.16),_transparent_24%),linear-gradient(160deg,#09111f_0%,#0f172a_45%,#020617_100%)]"></div>
<div class="relative h-full flex flex-col justify-between">
<div class="flex items-center justify-between text-sm uppercase tracking-[0.35em] text-sky-200/70">
<span>OpenClaw</span>
<span>Self-hosted AI Gateway</span>
</div>
<div class="space-y-6">
<div class="inline-flex items-center rounded-full border border-sky-300/25 bg-white/5 px-4 py-1 text-sm text-sky-100/80">
私有部署 · 多 Agent · Skills 生态
</div>
<h1 class="max-w-4xl text-6xl font-black leading-[1.02] tracking-tight !text-white">
让 AI 从一个聊天窗口
<br>
变成一套可控的工作系统
</h1>
<p class="max-w-3xl text-xl leading-8 text-slate-300">
OpenClaw 不是“再来一个机器人”，而是把飞书、Telegram、WhatsApp、浏览器自动化、知识检索和多 Agent 协作接到同一个本地网关里。
</p>
</div>
<div class="flex items-end justify-between text-sm text-slate-400">
<div class="space-y-1">
<div>演示主题：OpenClaw 产品介绍</div>
<div>定位：个人 AI 基础设施 / 团队级自动化入口</div>
</div>
<div class="text-right">
<div class="text-sky-200">docs.openclaw.ai</div>
<div>github.com/openclaw/openclaw</div>
</div>
</div>
</div>

---
layout: default
---

<div class="grid h-full grid-cols-[1.1fr_0.9fr] gap-10">
<div class="flex flex-col justify-center">
<div class="mb-4 text-sm uppercase tracking-[0.25em] text-sky-300/70">Why Now</div>
<h1 class="text-4xl font-black leading-tight text-white">大多数 AI 工具都很强，但它们没有真正进入你的工作流。</h1>
<div class="mt-8 space-y-4 text-lg leading-8 text-slate-300">
<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
它们只能在单一窗口回答问题，不能稳定接入你的渠道、文件、任务和长期记忆。
</div>
<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
一旦你需要跨平台、跨场景、跨时间连续工作，普通聊天机器人就开始失效。
</div>
</div>
</div>
<div class="grid content-center gap-4">
<div class="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-6">
<div class="text-sm uppercase tracking-[0.22em] text-rose-200/70">Cloud AI</div>
<div class="mt-3 text-2xl font-bold text-white">回答问题</div>
<div class="mt-3 text-slate-300">强，但离你的真实工具链很远。</div>
</div>
<div class="rounded-3xl border border-sky-400/20 bg-sky-500/10 p-6">
<div class="text-sm uppercase tracking-[0.22em] text-sky-200/70">OpenClaw</div>
<div class="mt-3 text-2xl font-bold text-white">接管工作流</div>
<div class="mt-3 text-slate-300">把渠道、工具、记忆和任务编排放进同一个本地控制面。</div>
</div>
</div>
</div>

---
layout: default
---

<div class="grid h-full grid-cols-[0.9fr_1.1fr] gap-10">
<div class="flex flex-col justify-center">
<div class="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-300/70">Definition</div>
<div class="text-7xl font-black text-white">OpenClaw</div>
<div class="mt-4 text-2xl text-slate-300">是一套自托管 AI 网关</div>
</div>
<div class="grid content-center gap-5">
<div class="rounded-2xl border border-white/10 bg-white/5 p-6 text-lg leading-8 text-slate-200">
它让你在任何常用聊天渠道里，调用同一套 AI Agent、Skills、浏览器自动化和本地知识能力。
</div>
<div class="grid grid-cols-2 gap-4">
<div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
<div class="text-sm uppercase tracking-[0.2em] text-sky-200/70">入口</div>
<div class="mt-3 text-lg font-bold text-white">飞书 / Telegram / WhatsApp / Discord</div>
<div class="mt-3 text-sm leading-6 text-slate-300">用户不用学习新的客户端，只需在现有沟通入口里继续发消息。</div>
</div>
<div class="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
<div class="text-sm uppercase tracking-[0.2em] text-emerald-200/70">能力</div>
<div class="mt-3 text-lg font-bold text-white">Agent / Skills / Browser / Memory</div>
<div class="mt-3 text-sm leading-6 text-slate-300">把模型推理、执行工具、知识检索和自动化能力统一到同一条调用链里。</div>
</div>
</div>
</div>
</div>

---
layout: default
---

<div class="grid h-full grid-cols-2 gap-8">
<div class="rounded-3xl border border-white/10 bg-white/5 p-8">
<div class="mb-4 text-sm uppercase tracking-[0.24em] text-rose-200/70">Without OpenClaw</div>
<h2 class="text-2xl font-black text-white">工具很多，但状态分散</h2>
<ul class="mt-6 space-y-4 text-lg text-slate-300">
<li>数据在第三方平台之间漂移</li>
<li>每个渠道都要重新配置机器人</li>
<li>自动化、知识库、提醒、搜索彼此割裂</li>
<li>AI 无法形成长期工作上下文</li>
</ul>
</div>
<div class="rounded-3xl border border-sky-300/20 bg-[linear-gradient(160deg,rgba(14,165,233,0.14),rgba(15,23,42,0.8))] p-8">
<div class="mb-4 text-sm uppercase tracking-[0.24em] text-sky-100/80">With OpenClaw</div>
<h2 class="text-2xl font-black text-white">一个网关，统一你的 AI 能力面</h2>
<ul class="mt-6 space-y-4 text-lg text-slate-100">
<li>消息渠道统一接入</li>
<li>Agent 能力和工具统一调度</li>
<li>Skills 可扩展，可审计，可替换</li>
<li>上下文、记忆和自动化持续沉淀</li>
</ul>
</div>
</div>

---
layout: default
---

<div class="h-full rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8">
<div class="mb-6 flex items-end justify-between">
<div>
<div class="text-sm uppercase tracking-[0.25em] text-sky-300/70">Architecture</div>
<h1 class="mt-3 text-4xl font-black text-white">四层结构，把“聊天”升级成系统能力</h1>
</div>
<div class="text-right text-sm text-slate-400">渠道层 → 网关层 → Agent 层 → Skill / Tool 层</div>
</div>
<div class="grid grid-cols-4 gap-4 text-left">
<div class="rounded-2xl bg-slate-950/70 p-5">
<div class="text-xs uppercase tracking-[0.22em] text-slate-400">Channels</div>
<div class="mt-3 text-lg font-bold text-white">飞书 / Telegram / WhatsApp</div>
<div class="mt-3 text-sm leading-6 text-slate-300">负责消息接入、身份映射、回话保持与最终投递。</div>
</div>
<div class="rounded-2xl bg-sky-950/70 p-5">
<div class="text-xs uppercase tracking-[0.22em] text-sky-300/70">Gateway</div>
<div class="mt-3 text-lg font-bold text-white">统一路由与控制平面</div>
<div class="mt-3 text-sm leading-6 text-slate-200">处理会话、调度、权限、服务生命周期与运行状态观测。</div>
</div>
<div class="rounded-2xl bg-emerald-950/70 p-5">
<div class="text-xs uppercase tracking-[0.22em] text-emerald-300/70">Agents</div>
<div class="mt-3 text-lg font-bold text-white">main / mem / governance</div>
<div class="mt-3 text-sm leading-6 text-slate-200">多 Agent 分工协作，适配不同任务域与不同响应风格。</div>
</div>
<div class="rounded-2xl bg-indigo-950/70 p-5">
<div class="text-xs uppercase tracking-[0.22em] text-indigo-300/70">Skills & Tools</div>
<div class="mt-3 text-lg font-bold text-white">搜索 / 浏览器 / 文档 / 备份</div>
<div class="mt-3 text-sm leading-6 text-slate-200">把检索、执行与自动化能力装进同一条工作流。</div>
</div>
</div>
<div class="mt-6 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-slate-300">
核心区别：OpenClaw 的价值不在“模型换得有多快”，而在于它把渠道、状态、工具和执行环境统一成了一个可持续运行的系统。
</div>
</div>

---
layout: default
---

<div class="grid h-full grid-cols-[0.9fr_1.1fr] gap-8">
<div class="flex flex-col justify-center">
<div class="text-sm uppercase tracking-[0.24em] text-sky-300/70">Execution Flow</div>
<h1 class="mt-3 text-4xl font-black text-white">一条消息，如何变成真实动作？</h1>
<div class="mt-6 text-lg leading-8 text-slate-300">
OpenClaw 的优势在于它不止给答案，而是把“理解、检索、执行、回传”做成了一条可重复、可审计的执行链。
</div>
</div>
<div class="grid gap-4">
<div class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
<div class="text-xs uppercase tracking-[0.22em] text-slate-400">01 Input</div>
<div class="mt-2 text-lg font-bold text-white">消息进入既有渠道</div>
<div class="mt-2 text-sm leading-6 text-slate-300">例如在飞书中发一句“帮我做一个 OpenClaw 介绍 PPT”。</div>
</div>
<div class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
<div class="text-xs uppercase tracking-[0.22em] text-slate-400">02 Routing</div>
<div class="mt-2 text-lg font-bold text-white">Gateway 选择 Agent 与 Skill</div>
<div class="mt-2 text-sm leading-6 text-slate-300">根据任务意图、上下文和可用能力，决定走哪个 Agent 和哪组工具。</div>
</div>
<div class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
<div class="text-xs uppercase tracking-[0.22em] text-slate-400">03 Action</div>
<div class="mt-2 text-lg font-bold text-white">执行搜索、读写文件、浏览器或脚本</div>
<div class="mt-2 text-sm leading-6 text-slate-300">不止回答问题，还可以创建文件、运行命令、导出产物。</div>
</div>
<div class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
<div class="text-xs uppercase tracking-[0.22em] text-slate-400">04 Delivery</div>
<div class="mt-2 text-lg font-bold text-white">结果回传到原渠道</div>
<div class="mt-2 text-sm leading-6 text-slate-300">最终结果和文件路径会回到用户原来的聊天界面，而不是散落在不同终端里。</div>
</div>
</div>
</div>

---
layout: default
---

<div class="grid h-full grid-cols-[1fr_1fr] gap-8">
<div class="rounded-3xl border border-white/10 bg-white/5 p-8">
<div class="text-sm uppercase tracking-[0.24em] text-sky-300/70">Capability Surface</div>
<h2 class="mt-3 text-3xl font-black text-white">不是“会聊天”，而是“能干活”。</h2>
<div class="mt-8 grid gap-4 text-left text-lg">
<div class="rounded-2xl bg-slate-950/60 px-4 py-4">
<div class="font-bold text-white">网页搜索与事实核查</div>
<div class="mt-1 text-sm text-slate-400">实时信息获取、验证和整理。</div>
</div>
<div class="rounded-2xl bg-slate-950/60 px-4 py-4">
<div class="font-bold text-white">文档读写与本地知识检索</div>
<div class="mt-1 text-sm text-slate-400">对 markdown、项目文件和知识库做持续加工。</div>
</div>
<div class="rounded-2xl bg-slate-950/60 px-4 py-4">
<div class="font-bold text-white">浏览器自动化与页面操作</div>
<div class="mt-1 text-sm text-slate-400">适合登录后台、抓页面、完成重复操作。</div>
</div>
<div class="rounded-2xl bg-slate-950/60 px-4 py-4">
<div class="font-bold text-white">Cron / Heartbeat / 系统巡检</div>
<div class="mt-1 text-sm text-slate-400">让 AI 从被动响应变成主动执行。</div>
</div>
<div class="rounded-2xl bg-slate-950/60 px-4 py-4">
<div class="font-bold text-white">Skills 组合与任务编排</div>
<div class="mt-1 text-sm text-slate-400">按业务场景装配能力，而不是写死一个机器人。</div>
</div>
</div>
</div>
<div class="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_30%),rgba(2,6,23,0.88)] p-8">
<div class="text-sm uppercase tracking-[0.24em] text-emerald-300/70">What This Means</div>
<h2 class="mt-3 text-3xl font-black text-white">同一条消息，可以触发一整套执行链。</h2>
<div class="mt-8 space-y-4 text-lg leading-8 text-slate-200">
<div>“帮我整理竞品” → 搜索 → 读文档 → 汇总 → 输出</div>
<div>“帮我做 PPT” → 生成 Slidev → 初始化依赖 → 导出 PDF</div>
<div>“每周提醒我检查” → 写入任务 → 定时触发 → 反馈状态</div>
<div>“帮我巡检系统” → 读日志 → 调工具 → 输出异常项</div>
</div>
</div>
</div>

---
layout: default
---

<div class="grid h-full grid-cols-[1.05fr_0.95fr] gap-8">
<div class="rounded-3xl border border-white/10 bg-white/5 p-8">
<div class="text-sm uppercase tracking-[0.24em] text-sky-300/70">Core Modules</div>
<h1 class="mt-3 text-4xl font-black text-white">最值得讲清楚的四个模块</h1>
<div class="mt-8 grid grid-cols-2 gap-4 text-left">
<div class="rounded-2xl bg-slate-950/60 p-5">
<div class="text-lg font-bold text-white">Gateway</div>
<div class="mt-2 text-sm leading-6 text-slate-300">OpenClaw 的控制核心，负责统一入口、连接状态和执行生命周期。</div>
</div>
<div class="rounded-2xl bg-slate-950/60 p-5">
<div class="text-lg font-bold text-white">Agents</div>
<div class="mt-2 text-sm leading-6 text-slate-300">不同角色的 AI 助手，按任务域拆分职责，而不是让一个大模型包办一切。</div>
</div>
<div class="rounded-2xl bg-slate-950/60 p-5">
<div class="text-lg font-bold text-white">Skills</div>
<div class="mt-2 text-sm leading-6 text-slate-300">像安装插件一样接入能力，适合搜索、备份、PPT、知识库等任务。</div>
</div>
<div class="rounded-2xl bg-slate-950/60 p-5">
<div class="text-lg font-bold text-white">Memory</div>
<div class="mt-2 text-sm leading-6 text-slate-300">把长期偏好、项目状态和历史决策沉淀下来，避免每次从零开始。</div>
</div>
</div>
</div>
<div class="flex flex-col justify-center rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(56,189,248,0.12),rgba(15,23,42,0.85))] p-8">
<div class="text-sm uppercase tracking-[0.24em] text-sky-200/80">Why It Matters</div>
<div class="mt-5 text-3xl font-black leading-tight text-white">这四个模块组合起来，才形成“能长期工作”的 AI 系统。</div>
<div class="mt-6 space-y-4 text-lg leading-8 text-slate-200">
<div>没有 Gateway，能力就分散。</div>
<div>没有 Agents，角色就混乱。</div>
<div>没有 Skills，扩展就困难。</div>
<div>没有 Memory，工作就无法持续。</div>
</div>
</div>
</div>

---
layout: default
---

<div class="grid h-full grid-cols-[0.95fr_1.05fr] gap-8">
<div class="flex flex-col justify-center">
<div class="text-sm uppercase tracking-[0.24em] text-sky-300/70">Use Cases</div>
<h1 class="mt-3 text-4xl font-black text-white">真正有价值的，不是“能接几个渠道”，而是“能持续承担什么角色”。</h1>
</div>
<div class="grid gap-4">
<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
<div class="text-lg font-bold text-white">开发协作</div>
<div class="mt-2 text-slate-300">代码生成、问题排查、文档梳理、环境巡检。</div>
</div>
<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
<div class="text-lg font-bold text-white">个人助理</div>
<div class="mt-2 text-slate-300">待办提醒、周期任务、知识回顾、摘要生成。</div>
</div>
<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
<div class="text-lg font-bold text-white">治理与运营</div>
<div class="mt-2 text-slate-300">制度文档、周报、流程检查、配置审计。</div>
</div>
<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
<div class="text-lg font-bold text-white">知识中台</div>
<div class="mt-2 text-slate-300">把散落的 markdown、数据库、脚本和外部搜索拼成一体。</div>
</div>
</div>
</div>

---
layout: default
---

<div class="grid h-full grid-cols-[1fr_1fr] gap-8">
<div class="rounded-3xl border border-white/10 bg-white/5 p-8">
<div class="text-sm uppercase tracking-[0.24em] text-sky-300/70">Why Local-first</div>
<h2 class="mt-3 text-3xl font-black text-white">为什么“本地优先”是它最重要的商业价值？</h2>
<div class="mt-8 space-y-5 text-lg leading-8 text-slate-300">
<div>
<div class="font-bold text-white">隐私与边界清晰</div>
<div>消息、文件、凭据和自动化流程都在你的控制域里。</div>
</div>
<div>
<div class="font-bold text-white">工具链可替换</div>
<div>模型、渠道、Skill、浏览器执行器都能按需要替换，不被单一 SaaS 锁死。</div>
</div>
<div>
<div class="font-bold text-white">适合持续经营</div>
<div>它更像一套内部工作基础设施，而不是一个短期试用的 AI 玩具。</div>
</div>
</div>
</div>
<div class="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(2,6,23,0.88))] p-8">
<div class="text-sm uppercase tracking-[0.24em] text-emerald-300/70">Best Fit</div>
<h2 class="mt-3 text-3xl font-black text-white">它最适合谁？</h2>
<div class="mt-8 grid gap-4 text-left">
<div class="rounded-2xl bg-black/20 p-4">
<div class="font-bold text-white">开发者与技术负责人</div>
<div class="mt-1 text-sm text-slate-300">需要一套可编排、可扩展、可观测的 AI 工具链。</div>
</div>
<div class="rounded-2xl bg-black/20 p-4">
<div class="font-bold text-white">运营 / 管理 / 产品团队</div>
<div class="mt-1 text-sm text-slate-300">希望把总结、搜索、周报、巡检和提醒统一起来。</div>
</div>
<div class="rounded-2xl bg-black/20 p-4">
<div class="font-bold text-white">对数据边界敏感的组织</div>
<div class="mt-1 text-sm text-slate-300">需要在自有环境里部署 AI，而不是把关键流程交给外部平台。</div>
</div>
</div>
</div>
</div>

---
layout: center
class: text-center
---

<div class="text-sm uppercase tracking-[0.28em] text-sky-300/70">Takeaway</div>
<div class="mt-8 text-6xl font-black leading-tight text-white">
OpenClaw 的真正价值，
<br>
是把 AI 变成你自己的基础设施。
</div>
<div class="mx-auto mt-8 max-w-3xl text-xl leading-8 text-slate-300">
它让消息入口、任务调度、能力扩展和本地记忆出现在同一个控制平面中。
</div>

---
layout: end
---

<div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_80%_22%,_rgba(14,165,233,0.12),_transparent_24%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]"></div>
<div class="relative h-full flex flex-col justify-between">
<div class="text-sm uppercase tracking-[0.3em] text-sky-200/70">Get Started</div>
<div>
<h1 class="text-5xl font-black leading-tight text-white">现在就开始，把 AI 接进你的真实工作流。</h1>
<div class="mt-8 grid grid-cols-2 gap-4 text-left">
<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
<div class="text-sm uppercase tracking-[0.2em] text-slate-400">Docs</div>
<div class="mt-3 text-xl font-bold text-white">docs.openclaw.ai</div>
</div>
<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
<div class="text-sm uppercase tracking-[0.2em] text-slate-400">GitHub</div>
<div class="mt-3 text-xl font-bold text-white">github.com/openclaw/openclaw</div>
</div>
</div>
</div>
<div class="flex items-end justify-between text-sm text-slate-400">
<div>关键词：Self-hosted / Multi-agent / Skills / Local-first</div>
<div class="text-sky-200">EXFOLIATE! EXFOLIATE!</div>
</div>
</div>
