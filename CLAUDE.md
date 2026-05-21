# CLAUDE.md

Operating manual for this repo. Read this before editing.

## What This Repo Is

A TypeScript representation of Jhonathan's professional life that renders to a single PDF (`render/cv.pdf`) via LaTeX and `tectonic`. The data is the source of truth, the TypeScript renderer is the layout, and the Bun CLI is the entry point.

## Hard Rules

- No em-dashes (U+2014). Anywhere. Use commas, colons, parentheses, or two sentences. En-dashes (U+2013) inside numeric ranges are fine.
- Use verb-led CV prose: "Built", "Led", "Migrated", "Owned", "Refactored", "Mentored".
- Put impact first. Lead with what shipped and what changed because of it.
- Do not invent technologies. Only list stacks evidenced by the data or directly supplied by Jhonathan.
- Do not leak internal product, project, or tool names for current or active employers. Generalize internal names.
- Do not create remote artifacts unless explicitly asked. No `git push`, no `gh release create`, no tags.
- Do not add commentary or attribution to commits.

## Daily Loop

When the user asks for a change:

1. Identify the owning file. Most content changes live under `src/cv/data/`. Visual changes usually touch `templates/preamble.tex.j2` or `src/cv/render.ts`.
2. Make the smallest correct edit.
3. If the change is visual, build and inspect `render/cv.pdf` before claiming it is done.
4. Tell Jhonathan in one sentence what changed and where.

## Project Layout

```text
src/cv/
  models.ts                 typed CV data constructors and validation
  markdown.ts               Markdown subset to LaTeX converter
  render.ts                 CV data to LaTeX source
  build.ts                  tectonic invocation and render paths
  enrich.ts                 gh API plus JSON cache for OSS metrics
  cli.ts                    build, tex, lint, refresh-metrics, watch
  data/
    personal.ts
    experience.ts
    companies/<name>.ts
    education.ts
    languages.ts
    open_source.ts
    _oss_metrics.json

templates/
  preamble.tex.j2           typography, macros, margins, colors

render/                     generated output, gitignored
```

## Commands

```bash
bun install
bun run build               # render/cv.pdf
bun run build -- --watch    # rebuild on save
bun run tex                 # render/cv.tex only
bun run lint                # chronology and overlap warnings
bun run refresh-metrics     # GitHub stars and language cache
bun run check               # TypeScript typecheck
```

## Where To Edit

| Request | File |
|---|---|
| Add or edit a job description | `src/cv/data/companies/<name>.ts` |
| Add or rename a company | `src/cv/data/companies/<name>.ts` plus `src/cv/data/experience.ts` |
| Hide a company from the render | `hidden: true` on the company |
| Edit profile summary, contact, headline, epigraph | `src/cv/data/personal.ts` |
| Edit education or languages | `src/cv/data/education.ts`, `src/cv/data/languages.ts` |
| Add or edit OSS projects | `src/cv/data/open_source.ts` |
| Reorder OSS projects | set `order` on the project |
| Refresh OSS star counts | `bun run refresh-metrics` |
| Margins, fonts, colors, section macro style | `templates/preamble.tex.j2` |
| Section ordering or block-level layout | `src/cv/render.ts` |
| New Markdown syntax | `src/cv/markdown.ts` |

## Authoring Data

Data files use constructors from `src/cv/models.ts`. Use `date(year, month, day)` instead of raw `Date` construction. Multiline Markdown strings are dedented automatically.

```ts
import { company, date, position } from "../../models.ts";

export const NEXTCORP = company({
  name: "NextCorp",
  oneLiner: "What they do, and where",
  url: "https://nextcorp.io",
  positions: [
    position({
      title: "Staff Software Engineer",
      start: date(2027, 1, 1),
      location: "Berlin, Germany",
      remote: true,
      description: `
        Lead with impact. One short framing sentence, then bullets:

        - **Built X.** Concrete artifacts, named systems, measurable outcomes.
        - **Owned Y.** More impact.
      `,
      keywords: ["Python", "FastAPI", "K3s"],
    }),
  ],
});
```

## Markdown Subset

Supported in descriptions and summaries:

- Paragraphs separated by blank lines.
- Single newlines collapse to spaces.
- `- bullet` lists with continuation lines.
- `**bold**`, `*italic*`, `` `code` ``, `[text](url)`.
- Fenced code blocks.
- `/` becomes a soft break opportunity outside URLs.

Unsupported: nested lists, headings, tables, HTML, inline math.

## Releases

Use this only when Jhonathan explicitly asks for a release:

```bash
gh release create vX.Y.Z --generate-notes
```

Do not attach `render/cv.pdf` manually. The release workflow builds and uploads the PDF.
