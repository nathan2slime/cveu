import { company, date, position } from "../models.ts";

export const COMPANIES = [
  company({
    name: "Grupo Casas Bahia",
    oneLiner: { pt: "Varejo e e-commerce", en: "Retail and e-commerce" },
    positions: [
      position({
        title: { pt: "Engenheiro de Software II", en: "Software Engineer II" },
        start: date(2026, 4, 1),
        location: { pt: "São Paulo, São Paulo", en: "São Paulo, São Paulo, Brazil" },
        remote: true,
        description: {
          pt: `
            - Atuando na evolução dos produtos digitais da tribo de Logística em diferentes times.
            - Apoio decisões de arquitetura, refinamentos técnicos e revisão de código para manter consistência entre os produtos da área.
          `,
          en: `
            - Working on the evolution of digital products for the Logistics team across different departments.
            - Took on greater technical responsibility for digital logistics products, focusing on Virtual Inventory, Cross-docking, and Safety Stock flows.
          `,
        },
        keywords: ["React", "TypeScript", "Ant Design", "Module Federation", "Micro front-ends", "GitFlow", "Unit testing"],
      }),
      position({
        title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
        start: date(2025, 8, 1),
        end: date(2026, 3, 1),
        location: { pt: "São Paulo, São Paulo", en: "São Paulo, São Paulo, Brazil" },
        remote: true,
        description: {
          pt: `
            - Desenvolvi telas e fluxos com React, TypeScript e Ant Design para produtos digitais da tribo de Logística.
            - Modernizei interfaces de Estoque Virtual, Cross-docking e Margem de Segurança, apoiando a evolução operacional da área.
            - Mantive documentação técnica, cobertura com testes unitários e fluxo de desenvolvimento seguindo GitFlow.
          `,
          en: `
            - Built screens and user flows with React, TypeScript, and Ant Design for digital logistics products.
            - Modernized Virtual Inventory, Cross-docking, and Safety Stock interfaces, supporting the area's operational evolution.
            - Maintained technical documentation, unit test coverage, and a GitFlow-based development workflow.
          `,
        },
        keywords: ["React", "TypeScript", "Ant Design", "Module Federation", "Micro front-ends", "GitFlow"],
      }),
    ],
  }),
  company({
    name: "AllEasy",
    oneLiner: { pt: "Consultoria de desenvolvimento de software", en: "Software development consulting" },
    positions: [
      position({
        title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
        start: date(2025, 8, 1),
        end: date(2026, 3, 1),
        location: { pt: "São Paulo, São Paulo", en: "São Paulo, São Paulo, Brazil" },
        remote: true,
        description: {
          pt: `
            - Prestei consultoria em desenvolvimento front-end, contribuindo para a implementação e evolução de soluções para o cliente.
            - Desenvolvi interfaces com React e TypeScript, aplicando TDD quando adequado ao fluxo de entrega.
            - Participei de reuniões técnicas, refinamentos e revisões de código seguindo padrões de GitFlow.
          `,
          en: `
            - Provided front-end development consulting, contributing to the implementation and evolution of client solutions.
            - Built interfaces with React and TypeScript, applying TDD when appropriate for the delivery flow.
            - Joined technical meetings, refinements, and code reviews following GitFlow standards.
          `,
        },
        keywords: ["React", "TypeScript", "TDD", "GitFlow"],
      }),
    ],
  }),
  company({
    name: "Maxbot",
    oneLiner: { pt: "Plataforma omnichannel de atendimento ao cliente", en: "Omnichannel customer service platform" },
    positions: [
      position({
        title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
        start: date(2025, 1, 1),
        end: date(2025, 8, 1),
        location: { pt: "Viçosa, Minas Gerais", en: "Viçosa, Minas Gerais, Brazil" },
        remote: true,
        description: {
          pt: `
            - Evoluí a nova versão de uma plataforma omnichannel de atendimento ao cliente com Next.js, React e Node.js.
            - Implementei i18n para suporte a múltiplos idiomas e melhoria da experiência em diferentes mercados.
            - Desenvolvi dashboards e telas de métricas para acompanhamento de atendimentos, indicadores e performance operacional.
            - Integrei interfaces com serviços em PHP, mantendo fluxo de versionamento com Git Flow e revisão de código.
          `,
          en: `
            - Evolved the new version of an omnichannel customer service platform with Next.js, React, and Node.js.
            - Implemented i18n to support multiple languages and improve the experience across different markets.
            - Built dashboards and metrics screens to track conversations, indicators, and operational performance.
            - Integrated interfaces with PHP services while keeping Git Flow versioning and code review practices.
          `,
        },
        keywords: ["Next.js", "React", "Node.js", "i18n", "PHP", "Git Flow"],
      }),
    ],
  }),
  company({
    name: "Hypn Tech",
    oneLiner: { pt: "Sistema de pagamentos B2B para recompensas corporativas", en: "B2B payments system for corporate rewards" },
    positions: [
      position({
        title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
        start: date(2025, 3, 1),
        end: date(2025, 7, 1),
        location: { pt: "São Paulo, São Paulo", en: "São Paulo, São Paulo, Brazil" },
        remote: true,
        description: {
          pt: `
            - Atuei como principal desenvolvedor front-end de um sistema de pagamentos B2B para recompensas corporativas.
            - Estruturei o produto com Next.js, React, Tailwind CSS, Turborepo e Node.js.
            - Integrei APIs REST e mantive comunicação consistente entre interface, serviços e regras de negócio.
            - Criei bibliotecas de componentes reutilizáveis com React e Tailwind CSS, apoiando consistência visual e produtividade do time.
            - Mantive fluxo de desenvolvimento com Git Trunk, revisões de código e uso diário de GitHub.
          `,
          en: `
            - Worked as the main front-end developer for a B2B payments system for corporate rewards.
            - Structured the product with Next.js, React, Tailwind CSS, Turborepo, and Node.js.
            - Integrated REST APIs and kept consistent communication between interface, services, and business rules.
            - Created reusable component libraries with React and Tailwind CSS, improving visual consistency and team productivity.
            - Maintained a Git Trunk workflow with code reviews and daily GitHub usage.
          `,
        },
        keywords: ["Next.js", "React", "Tailwind CSS", "Turborepo", "Node.js", "REST", "Git Trunk"],
      }),
    ],
  }),
  company({
    name: "Madpine Studios",
    oneLiner: { pt: "Estúdio de jogos e produtos digitais", en: "Game studio and digital products" },
    positions: [
      position({
        title: { pt: "Engenheiro de Software", en: "Software Engineer" },
        start: date(2022, 10, 1),
        end: date(2025, 4, 1),
        location: { pt: "Caxias, Maranhão", en: "Caxias, Maranhão, Brazil" },
        remote: true,
        description: {
          pt: `
            - Desenvolvi aplicações web com Next.js e React, integrando APIs GraphQL e REST e experiências 3D com Three.js.
            - Criei e mantive APIs com NestJS, Node.js, TypeScript e PostgreSQL, atuando em integrações, regras de negócio e persistência de dados.
            - Estruturei bibliotecas de componentes orientadas a sistema de design, promovendo reutilização e consistência entre produtos.
            - Apoiei esteiras de CI/CD e ambientes em Azure, GitHub e AWS.
          `,
          en: `
            - Built web applications with Next.js and React, integrating GraphQL and REST APIs plus 3D experiences with Three.js.
            - Created and maintained APIs with NestJS, Node.js, TypeScript, and PostgreSQL, working on integrations, business rules, and data persistence.
            - Structured design-system-oriented component libraries, promoting reuse and consistency across products.
            - Supported CI/CD pipelines and environments on Azure, GitHub, and AWS.
          `,
        },
        keywords: ["Next.js", "React", "GraphQL", "REST", "Three.js", "NestJS", "Node.js", "TypeScript", "PostgreSQL", "Azure", "AWS"],
      }),
    ],
  }),
  company({
    name: "FireGecko Studio",
    oneLiner: { pt: "Estúdio de jogos e experiências web", en: "Game studio and web experiences" },
    positions: [
      position({
        title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
        start: date(2024, 4, 1),
        end: date(2024, 11, 1),
        remote: true,
        description: {
          pt: `
            - Liderei o front-end do site Space Mavericks, mantendo a experiência digital conectada ao universo do jogo.
            - Integrei Unity Web Embed ao projeto em Next.js, criando um minigame que simulava a jogabilidade real.
            - Desenvolvi integrações com Web3 e Three.js, além de funcionalidades com Next.js 14, Docker, Turborepo, Turbopack e Tailwind CSS.
            - Apoiei implantação e operação em produção com infraestrutura na Azure.
          `,
          en: `
            - Led the front-end of the Space Mavericks website, keeping the digital experience connected to the game's universe.
            - Integrated Unity Web Embed into a Next.js project, creating a minigame that simulated the real gameplay.
            - Built Web3 and Three.js integrations, along with features using Next.js 14, Docker, Turborepo, Turbopack, and Tailwind CSS.
            - Supported production deployment and operations with Azure infrastructure.
          `,
        },
        keywords: ["Next.js", "Unity Web Embed", "Web3", "Three.js", "Docker", "Turborepo", "Turbopack", "Tailwind CSS", "Azure"],
      }),
    ],
  }),
  company({
    name: "MyPharma",
    oneLiner: { pt: "E-commerce e soluções para farmácias", en: "E-commerce and solutions for pharmacies" },
    positions: [
      position({
        title: { pt: "Desenvolvedor Full-stack", en: "Full-stack Developer" },
        start: date(2023, 5, 1),
        end: date(2023, 10, 1),
        remote: true,
        description: {
          pt: `
            - Desenvolvi e evoluí aplicações de e-commerce com React, Next.js e Node.js.
            - Sustentei microsserviços e integrações assíncronas com RabbitMQ, Redis e MongoDB.
            - Integrei APIs REST em aplicações web, atuando com metodologias ágeis, Git Flow e GitHub Actions.
            - Implementei testes unitários e de integração, documentação técnica e rotinas de sustentação dos sistemas.
          `,
          en: `
            - Built and evolved e-commerce applications with React, Next.js, and Node.js.
            - Maintained microservices and asynchronous integrations with RabbitMQ, Redis, and MongoDB.
            - Integrated REST APIs into web applications while working with agile methods, Git Flow, and GitHub Actions.
            - Implemented unit and integration tests, technical documentation, and system support routines.
          `,
        },
        keywords: ["React", "Next.js", "Node.js", "RabbitMQ", "Redis", "MongoDB", "REST", "GitHub Actions"],
      }),
    ],
  }),
  company({
    name: "Puzzl Software House",
    oneLiner: "Software house",
    positions: [
      position({
        title: { pt: "Desenvolvedor Flutter", en: "Flutter Developer" },
        start: date(2022, 7, 1),
        end: date(2022, 11, 1),
        location: { pt: "Rio de Janeiro, Rio de Janeiro", en: "Rio de Janeiro, Rio de Janeiro, Brazil" },
        remote: true,
        description: {
          pt: `
            - Desenvolvi funcionalidades com Flutter e Dart, integrando APIs GraphQL em aplicações desktop.
            - Mantive fluxo de versionamento com Git Flow e revisões de código como parte do processo de qualidade.
            - Implementei testes unitários, testes de integração, componentes e documentação no Storybook.
          `,
          en: `
            - Built features with Flutter and Dart, integrating GraphQL APIs in desktop applications.
            - Maintained a Git Flow versioning process and code reviews as part of the quality workflow.
            - Implemented unit tests, integration tests, components, and Storybook documentation.
          `,
        },
        keywords: ["Flutter", "Dart", "GraphQL", "Git Flow", "Storybook"],
      }),
      position({
        title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
        start: date(2021, 4, 1),
        end: date(2022, 7, 1),
        location: { pt: "Rio de Janeiro, Rio de Janeiro", en: "Rio de Janeiro, Rio de Janeiro, Brazil" },
        remote: true,
        description: {
          pt: `
            - Desenvolvi interfaces e componentes com React, Angular, Stencil.js, Redux, Valtio e Sass.
            - Integrei APIs GraphQL e REST em diferentes produtos, mantendo versionamento com Git Flow.
            - Implementei testes unitários, testes de integração, componentes reutilizáveis e documentação no Storybook.
          `,
          en: `
            - Built interfaces and components with React, Angular, Stencil.js, Redux, Valtio, and Sass.
            - Integrated GraphQL and REST APIs across different products while maintaining Git Flow versioning.
            - Implemented unit tests, integration tests, reusable components, and Storybook documentation.
          `,
        },
        keywords: ["React", "Angular", "Stencil.js", "Redux", "Valtio", "Sass", "GraphQL", "REST", "Storybook"],
      }),
    ],
  }),
  company({
    name: "Verzel Soluções em Sistemas",
    oneLiner: "Software house",
    positions: [
      position({
        title: { pt: "Desenvolvedor Full-stack", en: "Full-stack Developer" },
        start: date(2021, 3, 1),
        end: date(2021, 4, 1),
        location: { pt: "São Paulo, São Paulo", en: "São Paulo, São Paulo, Brazil" },
        remote: true,
        description: {
          pt: `
            - Sustentei e evoluí microsserviços com Node.js, Python, Flask, Django e MySQL.
            - Implementei funções sem servidor com AWS Lambda e integrações com APIs internas e externas.
            - Desenvolvi aplicações web e móveis com React e React Native, usando Git, Bitbucket e GitHub no versionamento.
            - Adotei Git Flow, revisões de código, testes unitários e testes de integração.
          `,
          en: `
            - Maintained and evolved microservices with Node.js, Python, Flask, Django, and MySQL.
            - Implemented serverless functions with AWS Lambda and integrations with internal and external APIs.
            - Built web and mobile applications with React and React Native, using Git, Bitbucket, and GitHub for version control.
            - Adopted Git Flow, code reviews, unit tests, and integration tests.
          `,
        },
        keywords: ["Node.js", "Python", "Flask", "Django", "MySQL", "AWS Lambda", "React", "React Native", "Bitbucket", "GitHub"],
      }),
    ],
  }),
  company({
    name: "Klutch Tecnologia",
    oneLiner: "Software house",
    positions: [
      position({
        title: { pt: "Estagiário Front-end", en: "Front-end Intern" },
        start: date(2021, 2, 1),
        end: date(2021, 3, 1),
        location: { pt: "Salvador, Bahia", en: "Salvador, Bahia, Brazil" },
        remote: true,
        description: {
          pt: `
            - Sustentei e evoluí projetos front-end com Vue.js, Vuex, CSS, Sass e TypeScript, mantendo versionamento no GitLab.
            - Participei de rotinas ágeis com Scrum e Kanban, seguindo fluxo de Git Trunk.
          `,
          en: `
            - Maintained and evolved front-end projects with Vue.js, Vuex, CSS, Sass, and TypeScript, keeping version control in GitLab.
            - Participated in agile routines with Scrum and Kanban, following a Git Trunk workflow.
          `,
        },
        keywords: ["Vue.js", "Vuex", "CSS", "Sass", "TypeScript", "GitLab", "Scrum", "Kanban", "Git Trunk"],
      }),
    ],
  }),
] as const;
