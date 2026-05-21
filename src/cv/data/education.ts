import { date, education } from "../models.ts";

export const EDUCATION = [
  education({
    institution: "Descomplica Faculdade Digital",
    degree: "Bacharelado",
    field: "Engenharia de Software",
    start: date(2026, 1, 1),
    end: date(2027, 12, 1),
  }),
  education({
    institution: "UniFacema",
    degree: "Curso Superior de Tecnologia (CST)",
    field: "Tecnologia da Informação",
    start: date(2023, 7, 1),
    end: date(2025, 12, 1),
  }),
  education({
    institution: "IFMA - Instituto Federal do Maranhão",
    degree: "Ensino Médio Profissionalizante",
    field: "Tecnologia da Informação",
    start: date(2018, 2, 1),
    end: date(2021, 5, 1),
  }),
] as const;
