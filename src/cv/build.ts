import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

import { type CV } from "./models.ts";
import { PROJECT_ROOT, renderTex } from "./render.ts";

export const RENDER_DIR = resolve(PROJECT_ROOT, "render");

export class TectonicMissingError extends Error {}

function ensureTectonic(): string {
  const proc = spawnSync("which", ["tectonic"], { encoding: "utf8" });
  const path = proc.stdout.trim();
  if (proc.status !== 0 || !path) {
    throw new TectonicMissingError("tectonic not found on PATH. Install with: brew install tectonic");
  }
  return path;
}

export function writeTex(cv: CV): string {
  mkdirSync(RENDER_DIR, { recursive: true });
  const texPath = resolve(RENDER_DIR, "cv.tex");
  writeFileSync(texPath, renderTex(cv), "utf8");
  return texPath;
}

export function compilePdf(cv: CV): string {
  const tectonic = ensureTectonic();
  const texPath = writeTex(cv);
  const proc = spawnSync(tectonic, ["--keep-logs", "--outdir", RENDER_DIR, texPath], {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
  });

  if (proc.status !== 0) {
    const logPath = resolve(RENDER_DIR, "cv.log");
    const log = existsSync(logPath) ? readFileSync(logPath, { encoding: "utf8" }).slice(-2000) : "";
    throw new Error(`tectonic failed:\n${proc.stderr}\n${proc.stdout}\n--- cv.log tail ---\n${log}`);
  }

  const pdfPath = resolve(RENDER_DIR, "cv.pdf");
  if (!existsSync(pdfPath)) {
    throw new Error(`tectonic returned 0 but ${pdfPath} not present`);
  }
  return pdfPath;
}
