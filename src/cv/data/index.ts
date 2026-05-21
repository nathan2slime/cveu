import { cv } from "../models.ts";
import { CERTIFICATIONS } from "./certifications.ts";
import { EDUCATION } from "./education.ts";
import { COMPANIES } from "./experience.ts";
import { LANGUAGES } from "./languages.ts";
import { OPEN_SOURCE_PROJECTS } from "./open_source.ts";
import { PERSONAL } from "./personal.ts";
import { SKILLS } from "./skills.ts";

export function buildCv() {
  return cv({
    personal: PERSONAL,
    companies: COMPANIES,
    education: EDUCATION,
    languages: LANGUAGES,
    skills: SKILLS,
    certifications: CERTIFICATIONS,
    openSource: OPEN_SOURCE_PROJECTS,
  });
}
