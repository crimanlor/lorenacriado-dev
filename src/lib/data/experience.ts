/**
 * Static Data — Experience & Education
 */

import type { Experience, Education } from "@/domain/types";
import { asUrl, asISODate } from "@/domain/types";

export const experienceData: ReadonlyArray<Experience> = [
  {
    id: "exp-001",
    company: "TechCorp Global",
    role: "Senior Full-Stack Engineer",
    startDate: asISODate("2022-03-01"),
    description:
      "Lideré la arquitectura y el desarrollo de una plataforma SaaS multi-tenant para más de 200 clientes enterprise en Europa.",
    highlights: [
      "Reduje los tiempos de respuesta de la API en un 60% mediante optimización de consultas y estrategias de caché",
      "Migré el monolito a microservicios, aumentando la frecuencia de despliegue de mensual a diaria",
      "Mentoricé a un equipo de 4 ingenieros junior y establecí los estándares de revisión de código",
      "Entregué una librería de componentes accesible adoptada por 3 equipos de producto internos",
    ],
    technologies: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Docker"],
    companyUrl: asUrl("https://techcorp.example.com"),
  },
  {
    id: "exp-002",
    company: "StartupXYZ",
    role: "Full-Stack Engineer",
    startDate: asISODate("2020-06-01"),
    endDate: asISODate("2022-02-28"),
    description:
      "Me incorporé como empleada número 8 y ayudé a crecer al equipo de ingeniería y al producto desde el MVP hasta la Serie A.",
    highlights: [
      "Construí la funcionalidad central de colaboración en tiempo real que se convirtió en el diferenciador clave del producto",
      "Implementé un pipeline de tests end-to-end que redujo la tasa de escape de bugs en un 40%",
      "Integré un sistema de pagos de terceros que procesaba más de 500.000 € mensuales",
    ],
    technologies: ["React", "Express", "MongoDB", "WebSocket", "Stripe", "Heroku"],
    companyUrl: asUrl("https://startupxyz.example.com"),
  },
  {
    id: "exp-003",
    company: "DigitalAgency",
    role: "Frontend Developer",
    startDate: asISODate("2018-09-01"),
    endDate: asISODate("2020-05-31"),
    description:
      "Desarrollé aplicaciones web responsive y accesibles para clientes de los sectores financiero, sanitario y e-commerce.",
    highlights: [
      "Entregué más de 15 proyectos de cliente en plazo con una puntuación media de satisfacción de 4,8/5",
      "Impulsé la adopción de estándares de accesibilidad — todos los proyectos se entregaron cumpliendo WCAG 2.1 AA",
      "Introduje presupuestos de rendimiento automatizados que redujeron el tiempo medio de carga de página en un 35%",
    ],
    technologies: ["React", "TypeScript", "Sass", "Jest", "Webpack"],
    companyUrl: asUrl("https://digitalagency.example.com"),
  },
];

export const educationData: ReadonlyArray<Education> = [
  {
    id: "edu-001",
    institution: "Universidad Complutense de Madrid",
    degree: "Grado",
    field: "Ingeniería Informática",
    startDate: asISODate("2014-09-01"),
    endDate: asISODate("2018-06-30"),
    description:
      "Especialización en ingeniería del software, algoritmos y sistemas distribuidos. Proyecto final: almacén de clave-valor distribuido con protocolo de consenso.",
  },
  {
    id: "edu-002",
    institution: "Online — Coursera / AWS Training",
    degree: "Certificaciones Profesionales",
    field: "Arquitectura Cloud",
    startDate: asISODate("2021-01-01"),
    endDate: asISODate("2021-12-31"),
    description:
      "AWS Certified Developer – Associate. Meta Front-End Developer Professional Certificate.",
  },
];
