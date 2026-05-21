import { company, date, position } from "../models.ts";

export const COMPANIES = [
  company({
    name: "Grupo Casas Bahia",
    oneLiner: "Varejo e e-commerce",
    positions: [
      position({
        title: "Engenheiro de Software II",
        start: date(2026, 4, 1),
        location: "São Paulo, São Paulo",
        remote: true,
        description: ``,
        keywords: ["React", "TypeScript", "Ant Design", "GitFlow", "Unit testing"],
      }),
      position({
        title: "Desenvolvedor Front-end",
        start: date(2025, 8, 1),
        end: date(2026, 3, 1),
        location: "São Paulo, São Paulo",
        remote: true,
        description: `
          - Modernizei produtos digitais da tribo de Logística, incluindo os produtos de Estoque Virtual, Cross-docking e Margem de Segurança de estoque.
          - Desenvolvi telas e fluxos com **React**, **TypeScript** e **Ant Design**, mantendo documentação técnica e cobertura com **testes unitários**.
          - Apoiei a qualidade técnica do time com revisão de código, refinamentos e alinhamentos com áreas de produto.
          - Conduzi um estudo de arquitetura para o portal de logística, propondo **micro front-ends** com **Module Federation** em **React**.
        `,
        keywords: ["React", "TypeScript", "Ant Design", "Module Federation", "Micro front-ends", "GitFlow"],
      }),
    ],
  }),
  company({
    name: "AllEasy",
    oneLiner: "Consultoria de desenvolvimento de software",
    positions: [
      position({
        title: "Desenvolvedor Front-end",
        start: date(2025, 8, 1),
        end: date(2026, 3, 1),
        location: "São Paulo, São Paulo",
        remote: true,
        description: `
          - Prestei consultoria em desenvolvimento front-end, contribuindo para a implementação e evolução de soluções para o cliente.
          - Desenvolvi interfaces com **React** e **TypeScript**, aplicando **TDD** quando adequado ao fluxo de entrega.
          - Participei de reuniões técnicas, refinamentos e revisões de código seguindo padrões de **GitFlow**.
        `,
        keywords: ["React", "TypeScript", "TDD", "GitFlow"],
      }),
    ],
  }),
  company({
    name: "Maxbot",
    oneLiner: "Plataforma omnichannel de atendimento ao cliente",
    positions: [
      position({
        title: "Desenvolvedor Front-end",
        start: date(2025, 1, 1),
        end: date(2025, 8, 1),
        location: "Viçosa, Minas Gerais",
        remote: true,
        description: `
          - Evoluí a nova versão de uma plataforma omnichannel de atendimento ao cliente com **Next.js**, **React** e **Node.js**.
          - Implementei **i18n** para suporte a múltiplos idiomas e melhoria da experiência em diferentes mercados.
          - Desenvolvi dashboards e telas de métricas para acompanhamento de atendimentos, indicadores e performance operacional.
          - Integrei interfaces com serviços em **PHP**, mantendo fluxo de versionamento com **Git Flow** e revisão de código.
        `,
        keywords: ["Next.js", "React", "Node.js", "i18n", "PHP", "Git Flow"],
      }),
    ],
  }),
  company({
    name: "Hypn Tech",
    oneLiner: "Sistema de pagamentos B2B para recompensas corporativas",
    positions: [
      position({
        title: "Desenvolvedor Front-end",
        start: date(2025, 3, 1),
        end: date(2025, 7, 1),
        location: "São Paulo, São Paulo",
        remote: true,
        description: `
          - Atuei como principal desenvolvedor front-end de um sistema de pagamentos B2B para recompensas corporativas.
          - Estruturei o produto com **Next.js**, **React**, **Tailwind CSS**, **Turborepo** e **Node.js**.
          - Integrei APIs **REST** e mantive comunicação consistente entre interface, serviços e regras de negócio.
          - Criei bibliotecas de componentes reutilizáveis com **React** e **Tailwind CSS**, apoiando consistência visual e produtividade do time.
          - Mantive fluxo de desenvolvimento com **Git Trunk**, revisões de código e uso diário de GitHub.
        `,
        keywords: ["Next.js", "React", "Tailwind CSS", "Turborepo", "Node.js", "REST", "Git Trunk"],
      }),
    ],
  }),
  company({
    name: "Madpine Studios",
    oneLiner: "Estúdio de jogos e produtos digitais",
    positions: [
      position({
        title: "Engenheiro de Software",
        start: date(2022, 10, 1),
        end: date(2025, 4, 1),
        location: "Caxias, Maranhão",
        remote: true,
        description: `
          - Desenvolvi aplicações web com **Next.js** e **React**, integrando APIs **GraphQL** e **REST** e experiências 3D com **Three.js**.
          - Criei e mantive APIs com **NestJS**, **Node.js**, **TypeScript** e **PostgreSQL**, atuando em integrações, regras de negócio e persistência de dados.
          - Estruturei bibliotecas de componentes orientadas a sistema de design, promovendo reutilização e consistência entre produtos.
          - Apoiei esteiras de **CI/CD** e ambientes em **Azure**, **GitHub** e **AWS**.
        `,
        keywords: ["Next.js", "React", "GraphQL", "REST", "Three.js", "NestJS", "Node.js", "TypeScript", "PostgreSQL", "Azure", "AWS"],
      }),
    ],
  }),
  company({
    name: "FireGecko Studio",
    oneLiner: "Estúdio de jogos e experiências web",
    positions: [
      position({
        title: "Desenvolvedor Front-end",
        start: date(2024, 4, 1),
        end: date(2024, 11, 1),
        remote: true,
        description: `
          - Liderei o front-end do site Space Mavericks, mantendo a experiência digital conectada ao universo do jogo.
          - Integrei **Unity Web Embed** ao projeto em **Next.js**, criando um minigame que simulava a jogabilidade real.
          - Desenvolvi integrações com **Web3** e **Three.js**, além de funcionalidades com **Next.js 14**, **Docker**, **Turborepo**, **Turbopack** e **Tailwind CSS**.
          - Apoiei implantação e operação em produção com infraestrutura na **Azure**.
        `,
        keywords: ["Next.js", "Unity Web Embed", "Web3", "Three.js", "Docker", "Turborepo", "Turbopack", "Tailwind CSS", "Azure"],
      }),
    ],
  }),
  company({
    name: "MyPharma",
    oneLiner: "E-commerce e soluções para farmácias",
    positions: [
      position({
        title: "Desenvolvedor Full-stack",
        start: date(2023, 5, 1),
        end: date(2023, 10, 1),
        remote: true,
        description: `
          - Desenvolvi e evoluí aplicações de e-commerce com **React**, **Next.js** e **Node.js**.
          - Sustentei microsserviços e integrações assíncronas com **RabbitMQ**, **Redis** e **MongoDB**.
          - Integrei APIs **REST** em aplicações web, atuando com metodologias ágeis, **Git Flow** e **GitHub Actions**.
          - Implementei testes unitários e de integração, documentação técnica e rotinas de sustentação dos sistemas.
        `,
        keywords: ["React", "Next.js", "Node.js", "RabbitMQ", "Redis", "MongoDB", "REST", "GitHub Actions"],
      }),
    ],
  }),
  company({
    name: "Puzzl Software House",
    oneLiner: "Software house",
    positions: [
      position({
        title: "Desenvolvedor Flutter",
        start: date(2022, 7, 1),
        end: date(2022, 11, 1),
        location: "Rio de Janeiro, Rio de Janeiro",
        remote: true,
        description: `
          - Desenvolvi funcionalidades com **Flutter** e **Dart**, integrando APIs **GraphQL** em aplicações desktop.
          - Mantive fluxo de versionamento com **Git Flow** e revisões de código como parte do processo de qualidade.
          - Implementei testes unitários, testes de integração, componentes e documentação no **Storybook**.
        `,
        keywords: ["Flutter", "Dart", "GraphQL", "Git Flow", "Storybook"],
      }),
      position({
        title: "Desenvolvedor Front-end",
        start: date(2021, 4, 1),
        end: date(2022, 7, 1),
        location: "Rio de Janeiro, Rio de Janeiro",
        remote: true,
        description: `
          - Desenvolvi interfaces e componentes com **React**, **Angular**, **Stencil.js**, **Redux**, **Valtio** e **Sass**.
          - Integrei APIs **GraphQL** e **REST** em diferentes produtos, mantendo versionamento com **Git Flow**.
          - Implementei testes unitários, testes de integração, componentes reutilizáveis e documentação no **Storybook**.
        `,
        keywords: ["React", "Angular", "Stencil.js", "Redux", "Valtio", "Sass", "GraphQL", "REST", "Storybook"],
      }),
    ],
  }),
  company({
    name: "Verzel Soluções em Sistemas",
    oneLiner: "Software house",
    positions: [
      position({
        title: "Desenvolvedor Full-stack",
        start: date(2021, 3, 1),
        end: date(2021, 4, 1),
        location: "São Paulo, São Paulo",
        remote: true,
        description: `
          - Sustentei e evoluí microsserviços com **Node.js**, **Python**, **Flask**, **Django** e **MySQL**.
          - Implementei funções sem servidor com **AWS Lambda** e integrações com APIs internas e externas.
          - Desenvolvi aplicações web e móveis com **React** e **React Native**, usando Git, **Bitbucket** e **GitHub** no versionamento.
          - Adotei **Git Flow**, revisões de código, testes unitários e testes de integração.
        `,
        keywords: ["Node.js", "Python", "Flask", "Django", "MySQL", "AWS Lambda", "React", "React Native", "Bitbucket", "GitHub"],
      }),
    ],
  }),
  company({
    name: "Klutch Tecnologia",
    oneLiner: "Software house",
    positions: [
      position({
        title: "Estagiário Front-end",
        start: date(2021, 2, 1),
        end: date(2021, 3, 1),
        location: "Salvador, Bahia",
        remote: true,
        description: `
          - Sustentei e evoluí projetos front-end com **Vue.js**, **Vuex**, **CSS**, **Sass** e **TypeScript**, mantendo versionamento no **GitLab**.
          - Participei de rotinas ágeis com **Scrum** e **Kanban**, seguindo fluxo de **Git Trunk**.
        `,
        keywords: ["Vue.js", "Vuex", "CSS", "Sass", "TypeScript", "GitLab", "Scrum", "Kanban", "Git Trunk"],
      }),
    ],
  }),
] as const;
