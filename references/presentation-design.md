# Presentation Design Notes

This reference file constrains `slidev-ppt-generator` to produce output that looks like a real presentation -- not "auto-summary + default black-on-white."

## Goals

- Each slide conveys exactly one main conclusion
- Text should be concise and precise; avoid piling up explanatory paragraphs
- Use grids, whitespace, and hierarchy to organize information
- Prioritize speakability over flashiness
- Content must never overflow beyond the screen edges

## Core Rules

### 1. One Idea Per Slide

- Each slide must carry only one central proposition
- If a slide tries to cover "definition + architecture + value" at the same time, split it
- Titles must read like conclusions, not like table-of-contents entries

Good titles:

- `Why chatbots cannot sustain continuous work`
- `Four layers that make AI actually execute`
- `Local-first is not a tech preference -- it is boundary control`

Bad titles:

- `What is OpenClaw`
- `Core Features`
- `System Overview`

### 2. Control Text Density

- Keep continuous body text on a single slide to roughly 40-60 CJK characters (or ~2-3 short English sentences)
- Each card should contain at most 2-3 lines of body text
- Limit a single slide to no more than 6 primary blocks
- Lists should have 3-5 items; if more, split across two slides or group them

### 3. Establish Visual Hierarchy

- Title font size must be noticeably larger than body text
- Keep only one dominant visual focal point per slide
- Use low-contrast, muted colors for auxiliary labels, annotations, and source notes
- Do not give every block the same font size and weight

### 4. Whitespace First

- Reserve at least 8%-10% safe margin on all sides
- Maintain consistent spacing between cards
- Important content needs breathing room around it
- Never pad text just to "fill the screen"

### 5. Choose Appropriate Slidev Layouts

Prefer:

- `cover`
- `default`
- `center`
- `end`

Use only when the content naturally fits:

- `two-cols`
- `image-left`
- `image-right`
- `fact`

Do not overuse layouts. Most high-quality slides only need `default` + custom grids.

### 6. Preferred Content Structures

Prefer these proven structures:

- Problem / Consequence / Turning point
- Compare two sides + decision conclusion
- Four-layer architecture / Three-stage flow / Five capabilities
- Audience / Scenario / Benefit
- Module breakdown / Responsibility boundaries / Execution results

### 7. Overflow Control

- When a title exceeds two lines, rewrite the title first instead of blindly shrinking the font
- In two-column layouts, column heights must be roughly equal; avoid one side full and the other empty
- Footer notes, sources, and footnotes must not push primary content off screen
- Closing slides are especially prone to overflow: do not combine a large title, two big cards, long footnotes, and a tagline on one slide

### 8. Slidev-Specific Recommendations

- When using inline HTML, keep the structure simple and avoid deeply nested elements
- Use consistent `gap`, `p-*`, `rounded-*` utilities to form a uniform style
- Use `max-w-*` to control paragraph width and prevent overly wide lines
- If text length is unpredictable, consider `AutoFitText`, but prefer rewriting the copy first
- Prefer Markdown tables over hand-written raw HTML tables
- If you must use an HTML table, always include `thead` and `tbody` to avoid Vue/Vite export warnings
- For comparison slides, prefer two-column cards or 2x2/3x2 grids over full-screen large tables

## Post-Generation Checklist

After finishing `slides.md`, run at least these checks:

1. Are there any empty slides that have only a title and almost no information?
2. Does any slide carry more than one core proposition?
3. Are there more than 5 parallel modules crammed onto a single slide?
4. Are any paragraphs too wide, making them hard to read?
5. Does the last slide overflow, feel cramped, or have too many footnotes?
6. Do architecture slides actually explain structure, or merely list nouns?

## Recommended Output Style

- Do not chase flashy animations
- Aim for stability, professionalism, and speakability
- Use a visual system that is restrained yet distinctive
- The deck should look like it was made by someone experienced, not auto-generated
