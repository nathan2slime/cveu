#!/usr/bin/env bun

import { readdirSync, statSync, watch } from "node:fs";
import { basename, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

import { compilePdf, writeTex } from "./build.ts";
import { buildCv } from "./data/index.ts";
import { enrichProjects, refresh } from "./enrich.ts";
import { type CV, type Locale, companyLabel, withOpenSource } from "./models.ts";
import { PROJECT_ROOT } from "./render.ts";

type Command = "build" | "tex" | "refresh-metrics" | "lint" | "help";
type RenderTarget = { readonly locale: Locale; readonly basename: string };

const LOCALES = ["pt", "en"] as const;

function loadCvWithMetrics(forceRefresh = false): CV {
  const cvData = buildCv();
  return withOpenSource(cvData, enrichProjects(cvData.openSource, { forceRefresh }));
}

function main(argv: readonly string[]): void {
  const [rawCommand = "help", ...args] = argv;
  try {
    switch (rawCommand) {
      case "build":
        commandBuild(args);
        break;
      case "tex":
        commandTex(args);
        break;
      case "refresh-metrics":
        commandRefreshMetrics();
        break;
      case "lint":
        commandLint();
        break;
      case "help":
      case "--help":
      case "-h":
        printHelp();
        break;
      default:
        throw new Error(`unknown command: ${rawCommand}`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

function commandBuild(args: readonly string[]): void {
  if (args.includes("--watch") || args.includes("-w")) {
    watchLoop(args.filter((arg) => arg !== "--watch" && arg !== "-w"));
    return;
  }
  const cvData = loadCvWithMetrics(false);
  for (const target of renderTargets(args)) {
    const pdf = compilePdf(cvData, target);
    console.log(`wrote ${pdf}`);
  }
}

function commandTex(args: readonly string[]): void {
  const cvData = loadCvWithMetrics(false);
  for (const target of renderTargets(args)) {
    const texPath = writeTex(cvData, target);
    console.log(`wrote ${texPath}`);
  }
}

function commandRefreshMetrics(): void {
  const cvData = buildCv();
  const repos = cvData.openSource.map((project) => project.repo);
  if (repos.length === 0) {
    console.error("no open-source projects to refresh");
    return;
  }
  refresh(repos);
  console.log(`refreshed metrics for ${repos.length} repos`);
}

function commandLint(): void {
  const cvData = buildCv();
  const problems: string[] = [];
  const warnings: string[] = [];
  const today = new Date();

  for (const company of cvData.companies) {
    for (const position of company.positions) {
      if (position.start > today) warnings.push(`${companyLabel(company)} / ${position.title}: start ${isoDate(position.start)} is in the future`);
      if (position.end && position.end > today) {
        warnings.push(`${companyLabel(company)} / ${position.title}: end ${isoDate(position.end)} is in the future`);
      }
    }

    const sortedPositions = company.positions.toSorted((left, right) => left.start.getTime() - right.start.getTime());
    for (let index = 1; index < sortedPositions.length; index += 1) {
      const previous = sortedPositions[index - 1];
      const current = sortedPositions[index];
      if (previous?.end && current && current.start < previous.end) {
        warnings.push(
          `${companyLabel(company)}: ${JSON.stringify(current.title)} starts ${isoDate(current.start)} before ${JSON.stringify(previous.title)} ended ${isoDate(previous.end)}`,
        );
      }
    }
  }

  warnings.forEach((warning) => console.error(`warning: ${warning}`));
  problems.forEach((problem) => console.error(`error: ${problem}`));
  if (problems.length > 0) {
    process.exitCode = 1;
    return;
  }
  console.log(`ok (${cvData.companies.length} companies, ${cvData.openSource.length} OSS projects)`);
}

function watchLoop(buildArgs: readonly string[]): void {
  const watchDirs = [resolve(PROJECT_ROOT, "templates"), resolve(PROJECT_ROOT, "src/cv")];
  const relevantSuffixes = new Set([".ts", ".j2", ".json"]);
  let timer: NodeJS.Timeout | undefined;
  let changed = new Set<string>();

  const buildOnce = (reason: string): void => {
    const timestamp = new Date().toTimeString().slice(0, 8);
    const start = performance.now();
    console.log(color("cyan", `[${timestamp}] -> ${reason}`));
    const proc = spawnSync(process.execPath, ["run", resolve(PROJECT_ROOT, "src/cv/cli.ts"), "build", ...buildArgs], {
      cwd: PROJECT_ROOT,
      encoding: "utf8",
    });
    const elapsed = ((performance.now() - start) / 1000).toFixed(1);
    const doneTimestamp = new Date().toTimeString().slice(0, 8);
    if (proc.status === 0) {
      console.log(color("green", `[${doneTimestamp}] ${(proc.stdout.trim() || "wrote render/cv.pdf")}  (${elapsed}s)`));
    } else {
      console.error(color("red", `[${doneTimestamp}] ${(proc.stderr || proc.stdout).trim()}`));
    }
  };

  buildOnce("initial build");
  console.log(color("yellow", `watching ${watchDirs.map((dir) => basename(dir)).join(", ")} (Ctrl+C to stop)`));

  const watchers = watchDirs.flatMap((dir) => watchTree(dir, (filename) => {
    if (!isRelevant(filename, relevantSuffixes)) return;
    changed.add(basename(filename));
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const reason = [...changed].sort().join(", ");
      changed = new Set<string>();
      buildOnce(reason);
    }, 300);
  }));

  process.on("SIGINT", () => {
    watchers.forEach((item) => item.close());
    console.log(color("yellow", "\nstopped"));
    process.exit(0);
  });
}

function renderTargets(args: readonly string[]): readonly RenderTarget[] {
  const explicit = parseLocaleSelection(args);
  if (!explicit) return [{ locale: "pt", basename: "cv" }];
  if (explicit === "all") {
    return LOCALES.map((locale) => ({ locale, basename: `cv-${locale}` }));
  }
  return [{ locale: explicit, basename: `cv-${explicit}` }];
}

function parseLocaleSelection(args: readonly string[]): Locale | "all" | undefined {
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--all") return "all";
    if (arg === "--pt") return "pt";
    if (arg === "--en") return "en";
    if (arg?.startsWith("--lang=")) return parseLocale(arg.slice("--lang=".length));
    if (arg === "--lang") {
      const value = args[index + 1];
      if (!value) throw new Error("--lang requires pt, en, or all");
      return parseLocale(value);
    }
  }
  return undefined;
}

function parseLocale(value: string): Locale | "all" {
  if (value === "all") return "all";
  if (value === "pt" || value === "en") return value;
  throw new Error(`unsupported language: ${value}. Use pt, en, or all`);
}

function watchTree(root: string, onChange: (filename: string) => void): ReturnType<typeof watch>[] {
  const watchers: ReturnType<typeof watch>[] = [];
  for (const dir of listDirectories(root)) {
    watchers.push(
      watch(dir, (_event, filename) => {
        if (filename) onChange(resolve(dir, filename.toString()));
      }),
    );
  }
  return watchers;
}

function listDirectories(root: string): string[] {
  const dirs = [root];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) dirs.push(...listDirectories(path));
  }
  return dirs;
}

function isRelevant(path: string, suffixes: ReadonlySet<string>): boolean {
  return suffixes.has(path.slice(path.lastIndexOf("."))) && statExists(path);
}

function statExists(path: string): boolean {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

function isoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function color(name: "cyan" | "green" | "red" | "yellow", value: string): string {
  const codes = { cyan: 36, green: 32, red: 31, yellow: 33 } as const;
  return `\u001B[${codes[name]}m${value}\u001B[0m`;
}

function printHelp(): void {
  console.log(`Usage: cv <command>

Commands:
  build [--watch]       Render render/cv.pdf in Portuguese
  build --lang en       Render render/cv-en.pdf
  build --all           Render render/cv-pt.pdf and render/cv-en.pdf
  tex [--lang pt|en]    Write TeX source for one language
  tex --all             Write render/cv-pt.tex and render/cv-en.tex
  refresh-metrics       Refresh GitHub OSS metrics cache
  lint                  Validate chronology and data warnings
`);
}

main(process.argv.slice(2));
