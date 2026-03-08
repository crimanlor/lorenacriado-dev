/**
 * Static Data — Profile
 */

import type { Profile } from "@/domain/types";
import { asUrl } from "@/domain/types";

export const profileData: Profile = {
  name: "Lorena Criado",
  title: "Full-Stack Developer",
  tagline:
    "Desarrollo software escalable y accesible, enfocada en la optimización de procesos y la creación de documentación técnica eficiente. Colaboro activamente con la comunidad tecnológica a través de iniciativas de inclusión y educación.",
  bio: `Desarrolladora Full Stack con experiencia en el desarrollo de soluciones digitales escalables, priorizando la experiencia de usuario y la calidad del software mediante procesos de QA.

Actualmente trabajo como Technical Consultant en DigitalResponse, donde participo en la transformación de requerimientos de negocio en implementaciones técnicas que mejoran la experiencia de usuario, automatizan flujos de trabajo y optimizan procesos internos.

Contribuyo a la generación de documentación funcional y técnica de sistemas internos, fomentando la mantenibilidad y la transferencia de conocimiento entre equipos.

Continúo desarrollando mis habilidades en desarrollo de aplicaciones web con el objetivo de crear productos digitales escalables, que conecten con las personas.

Colaboro activamente con SomosCoders, apoyando iniciativas de inclusión tecnológica.`,
  location: "Barcelona, España",
  avatarUrl: asUrl("/images/lorenacriado.jpg"),
  resumeUrl: asUrl("/resume.pdf"),
  social: [
    {
      platform: "github",
      url: asUrl("https://github.com/crimanlor"),
      label: "GitHub",
    },
    {
      platform: "linkedin",
      url: asUrl("https://linkedin.com/in/lorena-criado"),
      label: "LinkedIn",
    },
    {
      platform: "email",
      url: asUrl("mailto:criado.manzaneque@gmail.com"),
      label: "Email",
    },
  ],
};
