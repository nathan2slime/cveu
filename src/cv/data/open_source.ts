import { openSourceProject } from "../models.ts";

export const OPEN_SOURCE_PROJECTS = [
  openSourceProject({
    name: "@nathan3boss/ui",
    repo: "nathan2slime/ui",
    tagline: { pt: "Biblioteca de componentes React", en: "React component library" },
    description: {
      pt: `
        Biblioteca de UI para **React** construída com **Rslib**, **Panda CSS** e **TypeScript**, publicada como pacote npm e acompanhada por documentação própria.
      `,
      en: `
        UI library for **React** built with **Rslib**, **Panda CSS**, and **TypeScript**, published as an npm package and supported by its own documentation site.
      `,
    },
    keywords: ["React", "TypeScript", "Rslib", "Panda CSS", "npm"],
    order: 1,
  }),
  openSourceProject({
    name: "@nathan3boss/exval",
    repo: "nathan2slime/exval",
    tagline: { pt: "Builders de validação para Express", en: "Validation builders for Express" },
    description: {
      pt: `
        Pacote npm com builders composáveis de middleware para validar **body**, **params** e **query** em aplicações **Express**. Mantém o núcleo independente de biblioteca e fornece adapters para **Zod**, **Yup** e **class-transformer**.
      `,
      en: `
        npm package with composable middleware builders for validating **body**, **params**, and **query** in **Express** applications. Keeps the core library-agnostic and ships adapters for **Zod**, **Yup**, and **class-transformer**.
      `,
    },
    keywords: ["Express", "TypeScript", "Validation", "Zod", "Yup", "class-transformer", "npm"],
    order: 2,
  }),
  openSourceProject({
    name: "apl-dashi",
    repo: "nathan2slime/apl-dashi",
    tagline: { pt: "API NestJS com infraestrutura local completa", en: "NestJS API with a complete local infrastructure" },
    description: {
      pt: `
        API backend com **NestJS**, **Prisma**, **PostgreSQL**, **Redis** e storage S3-compatible com **MinIO**. Inclui autenticação por sessão, upload de arquivos, paginação, health checks, documentação com Swagger/Scalar e stack Docker Compose com observabilidade.
      `,
      en: `
        Backend API with **NestJS**, **Prisma**, **PostgreSQL**, **Redis**, and S3-compatible storage with **MinIO**. Includes session authentication, file uploads, pagination, health checks, Swagger/Scalar documentation, and a Docker Compose observability stack.
      `,
    },
    keywords: ["NestJS", "Prisma", "PostgreSQL", "Redis", "MinIO", "Docker Compose", "Swagger"],
    order: 3,
  }),
  openSourceProject({
    name: "apl-atani",
    repo: "nathan2slime/apl-atani",
    tagline: { pt: "API NestJS para upload e entrega de assets", en: "NestJS API for asset upload and delivery" },
    description: {
      pt: `
        API construída com **NestJS** integrada ao **MinIO** para upload e entrega de assets, com estrutura de aplicação TypeScript, Prisma e ambiente local conteinerizado.
      `,
      en: `
        API built with **NestJS** and integrated with **MinIO** for asset upload and delivery, using a TypeScript application structure, Prisma, and a containerized local environment.
      `,
    },
    keywords: ["NestJS", "TypeScript", "MinIO", "S3", "Prisma", "Docker"],
    order: 4,
  }),
  openSourceProject({
    name: "apl-katawa-rbac",
    repo: "nathan2slime/apl-katawa-rbac",
    tagline: { pt: "CRM com controle de acesso baseado em RBAC", en: "CRM with RBAC-based access control" },
    description: {
      pt: `
        CRM em TypeScript com controle de acesso baseado em papéis, organizado como monorepo com apps e packages, automação de desenvolvimento e ambiente local com Docker Compose.
      `,
      en: `
        TypeScript CRM with role-based access control, organized as a monorepo with apps and packages, development automation, and a local Docker Compose environment.
      `,
    },
    keywords: ["TypeScript", "CRM", "RBAC", "Turborepo", "Docker"],
    order: 5,
  }),
  openSourceProject({
    name: "earth",
    repo: "nathan2slime/earth",
    tagline: { pt: "Interface para imagens da Terra pelo DSCOVR", en: "Interface for DSCOVR Earth imagery" },
    description: {
      pt: `
        Aplicação TypeScript para visualizar imagens naturais da Terra capturadas pela câmera EPIC a bordo do satélite DSCOVR.
      `,
      en: `
        TypeScript application for viewing natural-color images of Earth captured by the EPIC camera onboard the DSCOVR spacecraft.
      `,
    },
    keywords: ["TypeScript", "Next.js", "Node", "React"],
    order: 6,
  }),
  openSourceProject({
    name: "otemae",
    repo: "nathan2slime/otemae",
    tagline: { pt: "Busca de animes com integração à API Jikan", en: "Anime search with Jikan API integration" },
    description: {
      pt: `
        Aplicação web para busca de animes, sinopses e informações relacionadas, integrada à API Jikan e publicada em produção na Vercel.
      `,
      en: `
        Web application for searching anime titles, synopses, and related information, integrated with the Jikan API and deployed to production on Vercel.
      `,
    },
    keywords: ["TypeScript", "Jikan API", "React", "Sass","Vercel"],
    order: 7,
  }),
] as const;
