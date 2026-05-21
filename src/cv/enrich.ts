import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

import { type OpenSourceProject, date } from "./models.ts";
import { PROJECT_ROOT } from "./render.ts";

const CACHE_PATH = resolve(PROJECT_ROOT, "src/cv/data/_oss_metrics.json");
const CACHE_TTL_SECONDS = 24 * 60 * 60;

interface Metric {
  readonly stars: number;
  readonly language: string | null;
  readonly last_commit: string;
}

interface CacheFile {
  readonly fetched_at: string;
  readonly repos: Record<string, Metric>;
}

function now(): Date {
  return new Date();
}

function loadCache(): CacheFile | undefined {
  if (!existsSync(CACHE_PATH)) return undefined;
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8")) as CacheFile;
  } catch {
    return undefined;
  }
}

function cacheIsFresh(cache: CacheFile): boolean {
  const fetchedAt = Date.parse(cache.fetched_at);
  if (Number.isNaN(fetchedAt)) return false;
  return (now().getTime() - fetchedAt) / 1000 < CACHE_TTL_SECONDS;
}

function fetchOne(repo: string): Metric {
  const gh = spawnSync("which", ["gh"], { encoding: "utf8" });
  if (gh.status !== 0) throw new Error("gh CLI not found. Install with: brew install gh");

  const proc = spawnSync(
    "gh",
    ["api", `repos/${repo}`, "--jq", "{stars: .stargazers_count, language: .language, pushed_at: .pushed_at}"],
    { encoding: "utf8" },
  );
  if (proc.status !== 0) throw new Error(`gh api failed for ${repo}: ${proc.stderr.trim()}`);

  const payload = JSON.parse(proc.stdout) as { stars?: number; language?: string | null; pushed_at?: string | null };
  const lastCommit = payload.pushed_at ? payload.pushed_at.slice(0, 10) : now().toISOString().slice(0, 10);
  return {
    stars: Number(payload.stars ?? 0),
    language: payload.language ?? null,
    last_commit: lastCommit,
  };
}

export function refresh(repos: readonly string[]): CacheFile {
  const metrics: Record<string, Metric> = {};
  for (const repo of repos) {
    metrics[repo] = fetchOne(repo);
    const metric = metrics[repo];
    console.error(`  ${repo}: ★ ${metric.stars}  ·  ${metric.language ?? "n/a"}  ·  pushed ${metric.last_commit}`);
  }
  const cache: CacheFile = { fetched_at: now().toISOString(), repos: metrics };
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
  return cache;
}

export function loadOrRefresh(repos: readonly string[], force = false): CacheFile {
  const cache = loadCache();
  if (cache && !force && cacheIsFresh(cache)) return cache;
  if (force || !cache) return refresh(repos);
  try {
    return refresh(repos);
  } catch (error) {
    console.error(`warning: refresh failed (${String(error)}); using stale cache`);
    return cache;
  }
}

export function enrichProjects(
  projects: readonly OpenSourceProject[],
  options: { readonly forceRefresh?: boolean } = {},
): readonly OpenSourceProject[] {
  if (projects.length === 0) return projects;
  const cache = loadOrRefresh(
    projects.map((project) => project.repo),
    options.forceRefresh ?? false,
  );

  return projects.map((project) => {
    const metric = cache.repos[project.repo];
    if (!metric) return project;
    const [year, month, day] = metric.last_commit.split("-").map(Number);
    const language = project.language ?? metric.language ?? undefined;
    const lastCommit = year && month && day ? date(year, month, day) : undefined;
    if (language && lastCommit) return Object.freeze({ ...project, stars: metric.stars, language, lastCommit });
    if (language) return Object.freeze({ ...project, stars: metric.stars, language });
    if (lastCommit) return Object.freeze({ ...project, stars: metric.stars, lastCommit });
    return Object.freeze({ ...project, stars: metric.stars });
  });
}
