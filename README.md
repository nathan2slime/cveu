# cv

Jhonathan's _Curriculum Vitae_ as code.

Generated PDFs:

- `render/cv.pdf`, default Portuguese build
- `render/cv-pt.pdf`, explicit Portuguese build
- `render/cv-en.pdf`, English build

## Stack

Bun, TypeScript, LaTeX, tectonic 0.16+ (XeLaTeX), newtxtext (Times-like serif).

## Commands

```bash
bun install
bun run build
bun run build:en
bun run build:all
bun run tex
bun run tex:all
bun run lint
bun run refresh-metrics
```

Language flags are also available directly:

```bash
bun run cv build --lang pt
bun run cv build --lang en
bun run cv build --all
```
