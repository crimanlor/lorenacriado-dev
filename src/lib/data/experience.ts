/**
 * Static Data — Experience & Education
 */

import type { Experience, Education, VolunteerExperience } from "@/domain/types";
import { asUrl, asISODate } from "@/domain/types";

export const experienceData: ReadonlyArray<Experience> = [
  {
    id: "exp-001",
    company: "DigitalResponse",
    role: "Technical Consultant",
    startDate: asISODate("2025-02-01"),
    description:
      "Transformo necesidades de negocio en soluciones técnicas, desarrollando y optimizando funcionalidades para mejorar la experiencia del cliente y la eficiencia de los procesos.",
    highlights: [
      "Colaboro con negocio para implementar mejoras en la plataforma, enfocándome en la escalabilidad, el rendimiento y la accesibilidad.",
      "Contribuyo a la automatización y centralización de flujos de trabajo, reduciendo tareas manuales y optimizando la operativa interna.",
      "Elaboro y mantengo documentación funcional y técnica de aplicaciones, configuraciones y procesos, promoviendo la transversalidad del conocimiento dentro del equipo.",
      "Brindo soporte en la gestión de reportes de usuarios, análisis de incidencias y configuración de plataformas, asegurando la estabilidad y calidad del servicio.",
      "Gestiono y mantengo la web corporativa, participando en la toma de decisiones técnicas y funcionales sobre su evolución y mejoras."
    ],
    technologies: ["Vue.js", "TypeScript", "Python", "Flask", "MongoDB", "Redis", "Docker", "WordPress"],
    companyUrl: asUrl("https://www.digitalresponse.es/"),
  },
  {
    id: "exp-002",
    company: "DigitalResponse",
    role: "Email Developer",
    startDate: asISODate("2021-11-01"),
    endDate: asISODate("2025-02-01"),
    description:
      "Guié al equipo de maquetación del proyecto Customer Journeys de CaixaBank, aplicando metodologías ágiles para optimizar los procesos colaborativos y mejorar la comunicación entre equipos, logrando un aumento del 25% en la productividad en un periodo de 6 meses.",
    highlights: [
      "Contribuí al desarrollo y automatización de promociones e hiperpersonalizaciones mediante la implementación de soluciones con JavaScript, reduciendo en un 30% el tiempo de ejecución de las campañas.",
      "Promoví la creación y estandarización de documentación de Procedimientos Operativos Estándar (SOP), mejorando los procesos de onboarding y reduciendo riesgos en la transferencia de conocimiento."
    ],
    technologies: ["HTML/CSS", "Javascript"],
    companyUrl: asUrl("https://www.digitalresponse.es/"),
  },
  {
    id: "exp-003",
    company: "Nokues",
    role: "Full Stack Developer",
    startDate: asISODate("2021-03-01"),
    endDate: asISODate("2021-10-31"),
    description:
      "Participé en el desarrollo de una aplicación web aplicando Test Driven Development (TDD), contribuyendo a mejorar la calidad del producto, la experiencia de usuario y la satisfacción del cliente en un 40%.",
    highlights: [
      "Formé parte de un equipo autogestionado bajo metodología Scrum, participando en el desarrollo iterativo del MVP mediante ciclos de diseño, desarrollo y validación del producto.",
      "Contribuí a la optimización de la experiencia de usuario y los flujos de trabajo, logrando un incremento del 35% en la eficiencia de los procesos.",
    ],
    technologies: ["Nuxt.js", "TypeScript", "Javascript", "Symfony", "PHP", "AWS", "Docker"],
    companyUrl: asUrl("https://lanzadera.es/proyecto/nokues/"),
  },
];

export const volunteerData: ReadonlyArray<VolunteerExperience> = [
  {
    id: "vol-001",
    organization: "SomosCoders",
    role: "Colaboradora y mentora",
    startDate: asISODate("2022-01-01"),
    description:
      "Colaboro con SomosCoders, asociación que promueve la inclusión tecnológica y el acceso a la programación para personas de grupos subrepresentados.",
    highlights: [
      "Imparto talleres introductorios de programación web orientados a personas sin conocimientos previos.",
      "Acompaño a participantes en sus primeros pasos en el mundo tech, ofreciendo mentoría individualizada.",
      "Contribuyo a la generación de materiales formativos y recursos de aprendizaje para la comunidad.",
    ],
    organizationUrl: asUrl("https://somoscoders.org"),
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
