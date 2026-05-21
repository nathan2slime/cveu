import { language } from "../models.ts";

export const LANGUAGES = [
  language({ pt: "Português", en: "Portuguese" }, { pt: "Nativo ou Bilíngue", en: "Native or Bilingual" }),
  language({ pt: "Inglês", en: "English" }, { pt: "Profissional", en: "Professional Working Proficiency" }),
] as const;
