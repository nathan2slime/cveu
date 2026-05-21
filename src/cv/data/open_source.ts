import { openSourceProject } from "../models.ts";

export const OPEN_SOURCE_PROJECTS = [
  openSourceProject({
    name: "@nathan3boss/ui",
    repo: "nathan2slime/ui",
    tagline: "Biblioteca de componentes React",
    description: `
      Biblioteca de UI para **React** construída com **Rslib**, **Panda CSS** e **TypeScript**, publicada como pacote npm e acompanhada por documentação própria.
    `,
    keywords: ["React", "TypeScript", "Rslib", "Panda CSS", "npm"],
    order: 1,
  }),
] as const;
