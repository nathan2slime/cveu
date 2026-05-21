const TEX_REPLACEMENTS: readonly [string, string][] = [
  ["\\", "\\textbackslash{}"],
  ["&", "\\&"],
  ["%", "\\%"],
  ["$", "\\$"],
  ["#", "\\#"],
  ["_", "\\_"],
  ["{", "\\{"],
  ["}", "\\}"],
  ["~", "\\textasciitilde{}"],
  ["^", "\\textasciicircum{}"],
];

const BOLD_OPEN = "\x00BOLDOPEN\x00";
const BOLD_CLOSE = "\x00BOLDCLOSE\x00";
const ITALIC_OPEN = "\x00ITOPEN\x00";
const ITALIC_CLOSE = "\x00ITCLOSE\x00";
const CODE_OPEN = "\x00CODEOPEN\x00";
const CODE_CLOSE = "\x00CODECLOSE\x00";
const LINK_OPEN = "\x00LINKOPEN\x00";
const LINK_MID = "\x00LINKMID\x00";
const LINK_CLOSE = "\x00LINKCLOSE\x00";

export function texEscape(text: string): string {
  let out = text;
  for (const [from, to] of TEX_REPLACEMENTS) {
    out = out.replaceAll(from, to);
  }
  return out;
}

function replaceInline(text: string): string {
  let out = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, url: string) => {
    return `${LINK_OPEN}${url}${LINK_MID}${label}${LINK_CLOSE}`;
  });
  out = out.replace(/`([^`]+)`/g, (_match, code: string) => `${CODE_OPEN}${code}${CODE_CLOSE}`);
  out = out.replace(/\*\*(.+?)\*\*/g, (_match, inner: string) => `${BOLD_OPEN}${inner}${BOLD_CLOSE}`);
  out = out.replace(/\*([^*]+)\*/g, (_match, inner: string) => `${ITALIC_OPEN}${inner}${ITALIC_CLOSE}`);
  out = texEscape(out);
  out = out
    .replaceAll(BOLD_OPEN, "\\textbf{")
    .replaceAll(BOLD_CLOSE, "}")
    .replaceAll(ITALIC_OPEN, "\\textit{")
    .replaceAll(ITALIC_CLOSE, "}")
    .replaceAll(CODE_OPEN, "\\texttt{")
    .replaceAll(CODE_CLOSE, "}")
    .replaceAll(LINK_OPEN, "\\href{")
    .replaceAll(LINK_MID, "}{")
    .replaceAll(LINK_CLOSE, "}");
  return out.replace(/(\\href\{[^}]*\})|\//g, (match, href: string | undefined) => href ?? `${match}\\allowbreak{}`);
}

export function mdToTex(text: string): string {
  if (!text.trim()) return "";

  let body = text.replaceAll("\r\n", "\n");
  const codeBlocks: string[] = [];
  body = body.replace(/^[ \t]*```[^\n]*\n([\s\S]*?)\n[ \t]*```[ \t]*$/gm, (_match, code: string) => {
    codeBlocks.push(code);
    return `\x00CODEBLK${codeBlocks.length - 1}\x00`;
  });

  const out: string[] = [];
  const para: string[] = [];
  const bullets: string[][] = [];
  let mode: "none" | "para" | "bullets" = "none";

  const flushPara = (): void => {
    if (para.length > 0) {
      const joined = para.filter(Boolean).join(" ");
      if (joined) {
        out.push(replaceInline(joined));
        out.push("");
      }
      para.length = 0;
    }
    if (mode === "para") mode = "none";
  };

  const flushBullets = (): void => {
    if (bullets.length > 0) {
      out.push("\\begin{itemize}");
      for (const lines of bullets) {
        const joined = lines.filter(Boolean).join(" ");
        out.push(`  \\item ${replaceInline(joined)}`);
      }
      out.push("\\end{itemize}");
      out.push("");
      bullets.length = 0;
    }
    if (mode === "bullets") mode = "none";
  };

  for (const raw of body.split("\n")) {
    const stripped = raw.trim();
    if (!stripped) {
      flushPara();
      flushBullets();
    } else if (stripped.startsWith("- ")) {
      flushPara();
      bullets.push([stripped.slice(2).trim()]);
      mode = "bullets";
    } else if (mode === "bullets") {
      bullets.at(-1)?.push(stripped);
    } else {
      para.push(stripped);
      mode = "para";
    }
  }

  flushPara();
  flushBullets();
  while (out.at(-1) === "") out.pop();

  let rendered = out.join("\n");
  codeBlocks.forEach((code, index) => {
    rendered = rendered.replaceAll(`\x00CODEBLK${index}\x00`, `\\begin{verbatim}\n${code}\n\\end{verbatim}`);
  });
  return rendered;
}
