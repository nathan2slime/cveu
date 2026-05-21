export type MarkdownText = string;

export interface Personal {
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly email: string;
  readonly phone?: string;
  readonly github?: string;
  readonly linkedin: string;
  readonly portfolio?: string;
  readonly summary: MarkdownText;
  readonly epigraph?: string;
  readonly epigraphAttribution?: string;
}

export interface Position {
  readonly title: string;
  readonly start: Date;
  readonly end?: Date;
  readonly location?: string;
  readonly remote: boolean;
  readonly description: MarkdownText;
  readonly keywords: readonly string[];
}

export interface Company {
  readonly name: string;
  readonly displayName?: string;
  readonly oneLiner?: string;
  readonly url?: string;
  readonly positions: readonly Position[];
  readonly hidden: boolean;
}

export interface Education {
  readonly institution: string;
  readonly degree: string;
  readonly field?: string;
  readonly start?: Date;
  readonly end?: Date;
}

export interface Language {
  readonly name: string;
  readonly proficiency: string;
}

export interface OpenSourceProject {
  readonly name: string;
  readonly repo: string;
  readonly tagline: string;
  readonly description: MarkdownText;
  readonly keywords: readonly string[];
  readonly order: number;
  readonly language?: string;
  readonly stars?: number;
  readonly lastCommit?: Date;
  readonly url?: string;
}

export interface CV {
  readonly personal: Personal;
  readonly companies: readonly Company[];
  readonly education: readonly Education[];
  readonly languages: readonly Language[];
  readonly skills: readonly string[];
  readonly certifications: readonly string[];
  readonly openSource: readonly OpenSourceProject[];
}

interface PersonalInput {
  readonly name: string;
  readonly title: string;
  readonly location: string;
  readonly email: string;
  readonly phone?: string;
  readonly github?: string;
  readonly linkedin: string;
  readonly portfolio?: string;
  readonly summary: MarkdownText;
  readonly epigraph?: string;
  readonly epigraphAttribution?: string;
}

interface PositionInput {
  readonly title: string;
  readonly start: Date;
  readonly end?: Date;
  readonly location?: string;
  readonly remote?: boolean;
  readonly description: MarkdownText;
  readonly keywords?: readonly string[];
}

interface CompanyInput {
  readonly name: string;
  readonly displayName?: string;
  readonly oneLiner?: string;
  readonly url?: string;
  readonly positions: readonly Position[];
  readonly hidden?: boolean;
}

interface EducationInput {
  readonly institution: string;
  readonly degree: string;
  readonly field?: string;
  readonly start?: Date;
  readonly end?: Date;
}

interface OpenSourceProjectInput {
  readonly name: string;
  readonly repo: string;
  readonly tagline: string;
  readonly description: MarkdownText;
  readonly keywords?: readonly string[];
  readonly order?: number;
  readonly language?: string;
  readonly stars?: number;
  readonly lastCommit?: Date;
  readonly url?: string;
}

export function date(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

export function dedentStrip(value: string): string {
  const lines = value.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n");
  while (lines.length > 0 && lines[0]?.trim() === "") lines.shift();
  while (lines.length > 0 && lines.at(-1)?.trim() === "") lines.pop();

  const indents = lines
    .filter((line) => line.trim() !== "")
    .map((line) => line.match(/^ */)?.[0].length ?? 0);
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(minIndent)).join("\n").trim();
}

export function personal(input: PersonalInput): Personal {
  assertEmail(input.email);
  return Object.freeze({
    name: input.name,
    title: input.title,
    location: input.location,
    email: input.email,
    ...(input.phone ? { phone: input.phone } : {}),
    ...(input.github ? { github: assertHttpUrl(input.github) } : {}),
    linkedin: assertHttpUrl(input.linkedin),
    ...(input.portfolio ? { portfolio: assertHttpUrl(input.portfolio) } : {}),
    summary: dedentStrip(input.summary),
    ...(input.epigraph ? { epigraph: input.epigraph } : {}),
    ...(input.epigraphAttribution ? { epigraphAttribution: input.epigraphAttribution } : {}),
  });
}

export function position(input: PositionInput): Position {
  if (input.end && input.end < input.start) {
    throw new Error(`Position ${JSON.stringify(input.title)}: end ${isoDate(input.end)} before start ${isoDate(input.start)}`);
  }
  return freezeClean({
    ...input,
    remote: input.remote ?? false,
    description: dedentStrip(input.description),
    keywords: Object.freeze([...(input.keywords ?? [])]),
  });
}

export function company(input: CompanyInput): Company {
  return Object.freeze({
    name: input.name,
    ...(input.displayName ? { displayName: input.displayName } : {}),
    ...(input.oneLiner ? { oneLiner: input.oneLiner } : {}),
    ...(input.url ? { url: assertHttpUrl(input.url) } : {}),
    hidden: input.hidden ?? false,
    positions: Object.freeze([...input.positions]),
  });
}

export function education(input: EducationInput): Education {
  return freezeClean(input);
}

export function language(name: string, proficiency: string): Language {
  return Object.freeze({ name, proficiency });
}

export function openSourceProject(input: OpenSourceProjectInput): OpenSourceProject {
  return Object.freeze({
    name: input.name,
    repo: input.repo,
    tagline: input.tagline,
    description: dedentStrip(input.description),
    keywords: Object.freeze([...(input.keywords ?? [])]),
    order: input.order ?? 100,
    ...(input.language ? { language: input.language } : {}),
    ...(input.stars !== undefined ? { stars: input.stars } : {}),
    ...(input.lastCommit ? { lastCommit: input.lastCommit } : {}),
    ...(input.url ? { url: assertHttpUrl(input.url) } : {}),
  });
}

export function cv(input: CV): CV {
  return freezeClean({
    personal: input.personal,
    companies: Object.freeze([...input.companies]),
    education: Object.freeze([...input.education]),
    languages: Object.freeze([...input.languages]),
    skills: Object.freeze([...input.skills]),
    certifications: Object.freeze([...input.certifications]),
    openSource: Object.freeze([...input.openSource]),
  });
}

export function companyLabel(company: Company): string {
  return company.displayName ?? company.name;
}

export function latestEnd(company: Company): Date {
  return new Date(Math.max(...company.positions.map((item) => item.end?.getTime() ?? Date.now())));
}

export function earliestStart(company: Company): Date {
  return new Date(Math.min(...company.positions.map((item) => item.start.getTime())));
}

export function derivedUrl(project: OpenSourceProject): string {
  return project.url ?? `https://github.com/${project.repo}`;
}

export function withOpenSource(cvData: CV, openSource: readonly OpenSourceProject[]): CV {
  return cv({ ...cvData, openSource });
}

export function isoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function assertEmail(value: string): void {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    throw new Error(`invalid email: ${value}`);
  }
}

function assertHttpUrl(value: string): string {
  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`invalid HTTP URL: ${value}`);
  }
  return url.toString();
}

function freezeClean<T extends object>(value: T): T {
  const entries = Object.entries(value).filter(([, item]) => item !== undefined);
  return Object.freeze(Object.fromEntries(entries)) as T;
}
