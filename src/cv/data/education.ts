import { date, education } from "../models.ts";

export const EDUCATION = [
  education({
    institution: "Descomplica Faculdade Digital",
    degree: { pt: "Bacharelado", en: "Bachelor's Degree" },
    field: { pt: "Engenharia de Software", en: "Software Engineering" },
    start: date(2026, 1, 1),
    end: date(2027, 12, 1),
  }),
  education({
    institution: "UniFacema",
    degree: { pt: "Curso Superior de Tecnologia (CST)", en: "Associate Degree" },
    field: { pt: "Tecnologia da Informação", en: "Information Technology" },
    start: date(2023, 7, 1),
    end: date(2025, 12, 1),
  }),
  education({
    institution: "IFMA - Instituto Federal do Maranhão",
    degree: { pt: "Ensino Médio Profissionalizante", en: "Technical High School" },
    field: { pt: "Tecnologia da Informação", en: "Information Technology" },
    start: date(2018, 2, 1),
    end: date(2021, 5, 1),
  }),
] as const;
