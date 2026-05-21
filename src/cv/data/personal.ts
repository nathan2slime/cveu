import { personal } from "../models.ts";

export const PERSONAL = personal({
  name: "Francisco Cajlon Jhonathan Moura Batista",
  title: { pt: "Engenheiro de Software", en: "Software Engineer" },
  location: { pt: "Caxias, Maranhão", en: "Caxias, Maranhão, Brazil" },
  email: "nathan3boss@gmail.com",
  github: "https://github.com/nathan2slime",
  linkedin: "https://www.linkedin.com/in/jhonathan-moura/",
  summary: {
    pt: `
      Engenheiro de Software com atuação desde 2021 em desenvolvimento front-end e full-stack, com passagens por software houses, estúdios de jogos, e-commerce e varejo. Tenho formação técnica e superior em **Tecnologia da Informação** e curso Bacharelado em **Engenharia de Software**, atuando principalmente com **TypeScript** e **React**.
    `,
    en: `
      Software Engineer working in front-end and full-stack development since 2021, with experience across software houses, game studios, e-commerce, and retail. I have technical and higher education in **Information Technology** and am pursuing a Bachelor's degree in **Software Engineering**, working mainly with **TypeScript** and **React**.
    `,
  },
});
