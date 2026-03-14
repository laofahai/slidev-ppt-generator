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

# Slidev PPT Generator

Generate `slides.md` using the standard Slidev workflow, then preview, build, and export within an existing or new Slidev project.

## When to Use

- User explicitly mentions `Slidev`
- User wants `slides.md`, Markdown slides, or a locally previewable presentation
- User wants to turn a Markdown outline into a previewable or exportable Slidev presentation
- User wants to export `PDF`, `PPTX`, or build static HTML

## When NOT to Use

- User wants an editable native PPTX and does not accept image-based Slidev PPTX export
- User wants a Jobs-style, minimalist tech-feel, 9:16 vertical, single-HTML presentation
- User only needs a single HTML landing page or long-form article, not the Slidev workflow
- User has no local Node/npm environment, and the current task does not allow installing dependencies

## Directory Structure

- `scripts/generate.js`
  Generate a basic `slides.md` from a given topic
- `scripts/export.js`
  Export `pdf` / `pptx` / `png` from within a Slidev project directory
- `templates/tech-share.md`
  Tech-share template reference
- `examples/demo-slides.md`
  Example slides
- `references/presentation-design.md`
  Presentation design and layout rules; must be consulted when generating a formal deck

## Standard Workflow

### 1. Confirm Output Target

Confirm the following information first. If the user has not provided everything, fill in the minimum necessary defaults:

1. Topic
2. Style: `tech` / `product` / `report`
3. Page count range
4. Language: `auto` / `zh` / `en`
5. Final deliverable: preview, HTML, PDF, PPTX
6. Tone: `formal` / `executive` / `technical` / `launch`
7. Official theme preference: auto-detect, or user-specified `default` / `seriph` / `apple-basic`

If the user just says "make a PPT", use these defaults:

- Style: `tech`
- Pages: `10`
- Language: `auto`
- Output: Generate `slides.md` first, then ask whether to export
- Tone: `formal`
- Theme: auto-detect

Language rules:

- If the user explicitly requests English, the entire deck should be in English
- If the user explicitly requests Chinese, the entire deck should be in Chinese
- If the user does not specify, default to the primary language of the user's current message
- Keep titles, body text, export prompts, and error messages in the same language; avoid mixing languages
- Do not generate bilingual pages unless the user explicitly requests it

### 2. Check or Initialize Slidev Project

Prefer reusing an existing Slidev project. If the user does not specify a directory, default to `~/slidev-ppt`.

Check whether the project exists:

```bash
ls ~/slidev-ppt/package.json ~/slidev-ppt/slides.md
```

If it does not exist, initialize it. Prefer using the in-repo script to auto-create a local project and install project-level dependencies along with official themes:

```bash
node scripts/init-project.js --dir ~/slidev-ppt
```

If the user explicitly requests PDF/PPTX export later, initialize with export dependencies included:

```bash
node scripts/init-project.js --dir ~/slidev-ppt --with-export-deps
```

Equivalent manual setup:

```bash
npm init slidev@latest ~/slidev-ppt
cd ~/slidev-ppt
npm install
```

The init script installs these official themes by default for the skill to auto-select:

- `@slidev/theme-default`
- `@slidev/theme-seriph`
- `@slidev/theme-apple-basic`
- `@slidev/theme-bricks`
- `@slidev/theme-shibainu`

`export.js` will automatically install `playwright-chromium` in the current project directory if export dependencies are missing. Do not install it globally.

If the final target includes `PDF` or `PPTX`, prefer initializing the project with export dependencies upfront rather than waiting for an export error:

```bash
node scripts/init-project.js --dir ~/slidev-ppt --with-export-deps
```

### 3. Generate or Update slides.md

Use the script to generate baseline content, then refine according to user needs:

```bash
node scripts/generate.js \
  --topic "OpenClaw Introduction" \
  --style tech \
  --tone technical \
  --pages 10 \
  --author "Your Name" \
  --output ~/slidev-ppt/slides.md
```

If the user provides an existing outline, do not overwrite directly; read the existing `slides.md` first, then modify on top of it.

### 4. Preview

Run in the Slidev project directory:

```bash
npx slidev slides.md
```

If the project already provides custom scripts, you can also use the project's own `npm run dev`.

### 5. Export

Navigate to the Slidev project directory, then run the export script. If the current directory does not yet have local Slidev dependencies, the script will automatically initialize the project directory and install project-level dependencies:

```bash
node /path/to/slidev-ppt-generator/scripts/export.js --format pdf --output presentation.pdf
```

Or use the Slidev CLI directly:

```bash
npx slidev export --format pdf --output presentation.pdf
npx slidev export --format pptx --output presentation.pptx
npx slidev build --out dist
```

## Execution Requirements

- Prefer working within an existing Slidev project; do not create temporary directories everywhere
- Confirm the output path before generating to avoid overwriting the user's existing `slides.md`
- Export tasks must be executed in a project directory that contains Slidev dependencies
- If dependencies are missing, clearly tell the user what is missing; do not assume global tools are installed
- If the user needs a formal deliverable, check the generated result at least once before exporting

## Design Requirements

- Do not produce "hollow title page + generic slogan + placeholder bullet" template decks
- One page, one main conclusion. Prefer a compact 8-14 page deck rather than splitting synonymous content across many empty pages
- Every deck should first establish a clear visual direction, then execute layouts; do not just apply the default black-on-white template
- The cover page must include a clear title, subtitle, and context positioning; it cannot just be stacked text
- Body pages should prioritize one of the following structures:
  - Problem / Cost / Opportunity
  - Architecture / Layers / Data Flow
  - Scenario / Role / Result
  - Comparison / Advantage / Action Recommendation
- Include at least 1 page with genuine information density (architecture page), 1 scenario page, and 1 value comparison page
- Avoid information-free "What is X?" standalone title pages unless the next page immediately follows up with a core conclusion
- Avoid multiple consecutive pages with just a single slogan; limit tagline pages to 1-2 at most
- Copy should be specific -- use real nouns, platform names, module names, capability names; avoid filling everything with abstract adjectives
- If the topic is tech or product-related, prioritize making the content look like a "ready-to-present" formal share, not an AI auto-summary
- Prefer native Markdown structures and Slidev layouts; do not abuse raw HTML for formatting convenience
- Prefer Markdown tables; only consider HTML tables when Markdown tables clearly cannot express the content
- If HTML tables are necessary, write the complete structure: `<table><thead>...<tbody>...</tbody></table>`; never place `<tr>` directly under `<table>`
- For information comparison, prefer card grids, two-column layouts, or Markdown tables; do not cram an entire page into a single dense HTML table

Before generating a formal presentation, you must read [references/presentation-design.md](references/presentation-design.md) and follow its density control, hierarchy, whitespace, and overflow rules.

## Style Parameters

Style parameters should be determined by the current task, not hard-coded into the skill. Before generating, determine or fill in which style this deck best matches:

- `formal`
  Suitable for formal introductions, client communication, general company overviews. Visually restrained, stable structure, minimal decoration.
- `executive`
  Suitable for management reporting, proposal presentations, decision materials. Emphasizes conclusions, comparisons, and action recommendations.
- `technical`
  Suitable for tech shares, architecture walkthroughs, product capability descriptions. Allows higher information density, but hierarchy must be controlled.
- `launch`
  Suitable for launches, keynotes, brand-style presentations. Stronger visual impact is acceptable, but information clarity must not be sacrificed.

If the user does not specify, default to `formal`.
If the user explicitly says "minimalist tech feel" or "more like a keynote", switch to `launch`.
If the user explicitly says "architecture talk" or "tech share", prefer `technical`.

## Official Theme Selection

Prefer official themes; do not invent custom themes first. Recommended mapping:

- `technical` -> `default`
- `formal` -> `apple-basic`
- `executive` -> `seriph`
- `launch` -> `apple-basic`

Only consider these when the user explicitly requests something more playful or visually experimental:

- `bricks`
- `shibainu`

If the user directly specifies a theme name, prioritize the user's request; otherwise the skill should auto-select based on the mapping above.

Do not search the web to "choose a theme". The official theme mapping is stable enough -- just follow the mapping directly.

## Language Parameter

Language parameters should also be determined by the current task, not hard-coded into the skill:

- `auto`
  Default value. Follow the primary language of the user's current message.
- `zh`
  Generate a Chinese deck. Suitable for Chinese reports, Chinese documentation, Chinese client communication.
- `en`
  Generate an English deck. Suitable for English introductions, international team communication, external-facing materials.

If the user does not explicitly specify a language, do not force English; prefer `auto`.

## Post-Generation Checklist

After completing `slides.md`, perform at least one round of layout self-review:

1. Are there any hollow title pages?
2. Does any page carry multiple main conclusions?
3. Does any single page have more than 6 main blocks?
4. Are there obviously long paragraphs or overly tall cards?
5. Do the last page, architecture page, or two-column pages have overflow risk?
6. Is there mixed-language text or inconsistent terminology translation?
7. Is there non-standard HTML, especially table structures missing `<thead>` / `<tbody>`?

If delivering PDF/PPTX, prefer exporting PDF first to check layout, then continue exporting other formats.

## Common Errors and Handling

### Slidev Not Found

Run in the target project directory:

```bash
npx slidev --version
```

If it fails, the project does not have Slidev dependencies installed. Complete the Slidev project initialization or dependency installation first.

### Export Failure

Check the following first:

1. Is the current directory a Slidev project directory?
2. Is `playwright-chromium` installed?
3. Can `slides.md` start successfully in preview mode?

### Invalid Theme or Page Count

`generate.js` only accepts:

- Style: `tech` / `product` / `report`
- Pages: integer >= `3`

## Expected Behavior After Triggering

When the user says "help me make a PPT about OpenClaw introduction", execute in this order:

1. Confirm topic, style, page count, output target
2. Check whether a Slidev project exists
3. Generate or update `slides.md`
4. Provide preview method
5. When the user requests export, then execute export

Do not just return a list of commands; actually push forward to the step of generating files, previewing, or exporting.
