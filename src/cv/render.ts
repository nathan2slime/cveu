import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { mdToTex, texEscape } from "./markdown.ts";
import {
  type CV,
  type Company,
  type Education,
  type Locale,
  type OpenSourceProject,
  type Personal,
  type Position,
  companyLabel,
  derivedUrl,
  earliestStart,
  latestEnd,
  localize,
} from "./models.ts";

export const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const TEMPLATES_DIR = resolve(PROJECT_ROOT, "templates");

const TEXT = {
  pt: {
    months: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    present: "Presente",
    remote: "Remoto",
    keywords: "Palavras-chave",
    sections: {
      summary: "Resumo",
      experience: "Experiência",
      skills: "Principais competências",
      openSource: "Código aberto",
      education: "Formação acadêmica",
      certifications: "Certificações",
      languages: "Idiomas",
    },
  },
  en: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    present: "Present",
    remote: "Remote",
    keywords: "Keywords",
    sections: {
      summary: "Summary",
      experience: "Experience",
      skills: "Core Skills",
      openSource: "Open Source",
      education: "Education",
      certifications: "Certifications",
      languages: "Languages",
    },
  },
} as const;

export interface RenderOptions {
  readonly locale?: Locale;
}

export function fmtMonthYear(value: Date, locale: Locale = "pt"): string {
  return `${TEXT[locale].months[value.getUTCMonth()]} ${value.getUTCFullYear()}`;
}

export function fmtDateRange(start: Date, end?: Date, locale: Locale = "pt"): string {
  return `${fmtMonthYear(start, locale)} -- ${end ? fmtMonthYear(end, locale) : TEXT[locale].present}`;
}

export function fmtYearRange(start?: Date, end?: Date, locale: Locale = "pt"): string {
  const startYear = start ? String(start.getUTCFullYear()) : "";
  const endYear = end ? String(end.getUTCFullYear()) : TEXT[locale].present;
  return startYear && endYear ? `${startYear} -- ${endYear}` : startYear || endYear;
}

export function fmtPositionLocale(position: Position, locale: Locale = "pt"): string {
  const bits: string[] = [];
  if (position.location) bits.push(localize(position.location, locale));
  if (position.remote) bits.push(TEXT[locale].remote);
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

export function contactStrip(personal: Personal, locale: Locale = "pt"): string {
  const parts = [texEscape(localize(personal.location, locale))];
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

export function renderTex(cv: CV, options: RenderOptions = {}): string {
  const locale = options.locale ?? "pt";
  const text = TEXT[locale];
  const lines: string[] = [readFileSync(resolve(TEMPLATES_DIR, "preamble.tex.j2"), "utf8").trimEnd(), "\\begin{document}", ""];

  lines.push(`\\cvheader{${texEscape(cv.personal.name)}}{${texEscape(localize(cv.personal.title, locale))}}{${contactStrip(cv.personal, locale)}}`, "");
  lines.push(`\\section*{${text.sections.summary}}`);
  lines.push(mdToTex(localize(cv.personal.summary, locale)), "");

  lines.push(`\\section*{${text.sections.experience}}`);
  sortCompanies(cv.companies).forEach((company, index) => {
    if (index > 0) lines.push("\\cvcompanybreak");
    lines.push(`\\cvcompanyhead{${texEscape(companyLabel(company, locale))}}{${texEscape(company.oneLiner ? localize(company.oneLiner, locale) : "")}}`);
    for (const pos of company.positions) {
      lines.push(`\\cvposition{${texEscape(localize(pos.title, locale))}}{${fmtDateRange(pos.start, pos.end, locale)}}{${texEscape(fmtPositionLocale(pos, locale))}}`);
      lines.push(mdToTex(localize(pos.description, locale)));
      if (pos.keywords.length > 0) lines.push(`\\cvkeywords{${texEscape(text.keywords)}}{${texEscape(pos.keywords.join(" · "))}}`);
    }
  });
  lines.push("");

  if (cv.skills.length > 0) {
    lines.push(`\\section*{${text.sections.skills}}`);
    lines.push(`\\noindent{\\small ${texEscape(cv.skills.join(" · "))}}\\par`, "");
  }

  if (cv.openSource.length > 0) {
    lines.push(`\\section*{${text.sections.openSource}}`);
    sortProjects(cv.openSource).forEach((project) => {
      const url = derivedUrl(project);
      lines.push(`\\cvossheader{${texEscape(project.name)}}{${ossBadge(project)}}{\\href{${url}}{${texEscape(stripProto(url))}}}`);
      lines.push(`\\noindent\\textit{${texEscape(localize(project.tagline, locale))}}\\par`);
      lines.push(mdToTex(localize(project.description, locale)));
      if (project.keywords.length > 0) lines.push(`\\cvkeywords{${texEscape(text.keywords)}}{${texEscape(project.keywords.join(" · "))}}`);
    });
    lines.push("");
  }

  lines.push("\\needspace{10\\baselineskip}");
  lines.push(`\\section*{${text.sections.education}}`);
  cv.education.forEach((item) => lines.push(renderEducation(item, locale)));
  lines.push("");

  if (cv.certifications.length > 0) {
    lines.push("\\needspace{6\\baselineskip}");
    lines.push(`\\section*{${text.sections.certifications}}`);
    cv.certifications.forEach((item) => lines.push(`\\noindent ${texEscape(localize(item, locale))}\\par`));
    lines.push("");
  }

  lines.push("\\needspace{3\\baselineskip}");
  lines.push(`\\section*{${text.sections.languages}}`);
  cv.languages.forEach((item) => lines.push(`\\cvlanguagerow{${texEscape(localize(item.name, locale))}}{${texEscape(localize(item.proficiency, locale))}}`));
  lines.push("");

  if (cv.personal.epigraph) {
    lines.push(
      `\\cvepigraph{${texEscape(localize(cv.personal.epigraph, locale))}}{${texEscape(cv.personal.epigraphAttribution ? localize(cv.personal.epigraphAttribution, locale) : "")}}`,
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

function renderEducation(item: Education, locale: Locale): string {
  const degree = item.field ? `${localize(item.degree, locale)} -- ${localize(item.field, locale)}` : localize(item.degree, locale);
  return `\\cveducation{${texEscape(item.institution)}}{${texEscape(degree)}}{${fmtYearRange(item.start, item.end, locale)}}`;
}
