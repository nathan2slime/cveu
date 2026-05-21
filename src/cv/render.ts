import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { mdToTex, texEscape } from "./markdown.ts";
import {
  type CV,
  type Company,
  type Education,
  type OpenSourceProject,
  type Personal,
  type Position,
  companyLabel,
  derivedUrl,
  earliestStart,
  latestEnd,
} from "./models.ts";

export const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const TEMPLATES_DIR = resolve(PROJECT_ROOT, "templates");

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"] as const;

export function fmtMonthYear(value: Date): string {
  return `${MONTHS[value.getUTCMonth()]} ${value.getUTCFullYear()}`;
}

export function fmtDateRange(start: Date, end?: Date): string {
  return `${fmtMonthYear(start)} -- ${end ? fmtMonthYear(end) : "Presente"}`;
}

export function fmtYearRange(start?: Date, end?: Date): string {
  const startYear = start ? String(start.getUTCFullYear()) : "";
  const endYear = end ? String(end.getUTCFullYear()) : "Presente";
  return startYear && endYear ? `${startYear} -- ${endYear}` : startYear || endYear;
}

export function fmtPositionLocale(position: Position): string {
  const bits: string[] = [];
  if (position.location) bits.push(position.location);
  if (position.remote) bits.push("Remote");
  return bits.join(" · ");
}

export function sortCompanies(companies: readonly Company[]): Company[] {
  return companies
    .filter((company) => !company.hidden)
    .toSorted((left, right) => {
      const latestDelta = latestEnd(right).getTime() - latestEnd(left).getTime();
      if (latestDelta !== 0) return latestDelta;
      return earliestStart(right).getTime() - earliestStart(left).getTime();
    });
}

export function contactStrip(personal: Personal): string {
  const parts = [texEscape(personal.location)];
  if (personal.phone) parts.push(texEscape(personal.phone));
  parts.push(`\\href{mailto:${personal.email}}{${texEscape(personal.email)}}`);
  if (personal.github) parts.push(`\\href{${personal.github}}{${texEscape(stripProto(personal.github))}}`);
  parts.push(`\\href{${personal.linkedin}}{${texEscape(stripProto(personal.linkedin))}}`);
  if (personal.portfolio) parts.push(`\\href{${personal.portfolio}}{${texEscape(stripProto(personal.portfolio))}}`);
  return parts.join(" \\quad\\textperiodcentered\\quad ");
}

export function stripProto(url: string): string {
  let out = url;
  for (const prefix of ["https://", "http://"] as const) {
    if (out.startsWith(prefix)) {
      out = out.slice(prefix.length);
      break;
    }
  }
  if (out.startsWith("www.")) out = out.slice(4);
  return out.replace(/\/+$/, "");
}

export function renderTex(cv: CV): string {
  const lines: string[] = [readFileSync(resolve(TEMPLATES_DIR, "preamble.tex.j2"), "utf8").trimEnd(), "\\begin{document}", ""];

  lines.push(`\\cvheader{${texEscape(cv.personal.name)}}{${texEscape(cv.personal.title)}}{${contactStrip(cv.personal)}}`, "");
  lines.push("\\section*{Resumo}");
  lines.push(mdToTex(cv.personal.summary), "");

  lines.push("\\section*{Experiência}");
  sortCompanies(cv.companies).forEach((company, index) => {
    if (index > 0) lines.push("\\cvcompanybreak");
    lines.push(`\\cvcompanyhead{${texEscape(companyLabel(company))}}{${texEscape(company.oneLiner ?? "")}}`);
    for (const pos of company.positions) {
      lines.push(`\\cvposition{${texEscape(pos.title)}}{${fmtDateRange(pos.start, pos.end)}}{${texEscape(fmtPositionLocale(pos))}}`);
      lines.push(mdToTex(pos.description));
      if (pos.keywords.length > 0) lines.push(`\\cvkeywords{${texEscape(pos.keywords.join(" · "))}}`);
    }
  });
  lines.push("");

  if (cv.skills.length > 0) {
    lines.push("\\section*{Principais competências}");
    lines.push(`\\noindent{\\small ${texEscape(cv.skills.join(" · "))}}\\par`, "");
  }

  if (cv.openSource.length > 0) {
    lines.push("\\section*{Open Source}");
    sortProjects(cv.openSource).forEach((project) => {
      const url = derivedUrl(project);
      lines.push(`\\cvossheader{${texEscape(project.name)}}{${ossBadge(project)}}{\\href{${url}}{${texEscape(stripProto(url))}}}`);
      lines.push(`\\noindent\\textit{${texEscape(project.tagline)}}\\par`);
      lines.push(mdToTex(project.description));
      if (project.keywords.length > 0) lines.push(`\\cvkeywords{${texEscape(project.keywords.join(" · "))}}`);
    });
    lines.push("");
  }

  lines.push("\\needspace{10\\baselineskip}");
  lines.push("\\section*{Formação acadêmica}");
  cv.education.forEach((item) => lines.push(renderEducation(item)));
  lines.push("");

  if (cv.certifications.length > 0) {
    lines.push("\\needspace{6\\baselineskip}");
    lines.push("\\section*{Certificações}");
    cv.certifications.forEach((item) => lines.push(`\\noindent ${texEscape(item)}\\par`));
    lines.push("");
  }

  lines.push("\\needspace{3\\baselineskip}");
  lines.push("\\section*{Idiomas}");
  cv.languages.forEach((item) => lines.push(`\\cvlanguagerow{${texEscape(item.name)}}{${texEscape(item.proficiency)}}`));
  lines.push("");

  if (cv.personal.epigraph) {
    lines.push(
      `\\cvepigraph{${texEscape(cv.personal.epigraph)}}{${texEscape(cv.personal.epigraphAttribution ?? "")}}`,
      "",
    );
  }

  lines.push("\\end{document}", "");
  return lines.join("\n");
}

function sortProjects(projects: readonly OpenSourceProject[]): OpenSourceProject[] {
  return projects.toSorted((left, right) => left.order - right.order);
}

function ossBadge(project: OpenSourceProject): string {
  const parts: string[] = [];
  if (project.stars !== undefined) parts.push(`· $\\bigstar$\\,${project.stars}`);
  if (project.language) parts.push(`· ${texEscape(project.language)}`);
  return parts.join(" ");
}

function renderEducation(item: Education): string {
  const degree = item.field ? `${item.degree} -- ${item.field}` : item.degree;
  return `\\cveducation{${texEscape(item.institution)}}{${texEscape(degree)}}{${fmtYearRange(item.start, item.end)}}`;
}
