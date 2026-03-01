/**
 * HeroSection — Above-the-fold introduction
 *
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getProfile } from "@/lib/data";

export async function HeroSection() {
  const profile = await getProfile();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[calc(100vh-4rem)] flex items-center pt-16 overflow-hidden"
    >
      {/* Background gradient mesh — decorative */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-brand-300/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-section-lg w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Availability badge */}
            {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
              <span
                className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                aria-hidden="true"
              />
              <span className="text-label-sm text-green-700 dark:text-green-400">
                Disponible para nuevas oportunidades
              </span>
            </div> */}

            {/* Main heading */}
            <div className="space-y-3">
              <p className="text-label-lg text-accent uppercase tracking-widest">
                Hola 👋🏻, soy
              </p>
              <h1
                id="hero-heading"
                className="text-display-xl text-content leading-none"
              >
                {profile.name}
              </h1>
              <p className="text-display-sm text-content-secondary">
                {profile.title}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-body-xl text-content-secondary max-w-prose-lg">
              {profile.tagline}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-content-tertiary">
              <MapPin size={16} aria-hidden="true" />
              <span className="text-body-sm">{profile.location}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight size={18} aria-hidden="true" />}
                  aria-label="Ver mi portfolio de proyectos"
                >
                  <Link href="/projects">Ver mi trabajo</Link>
              </Button>

              {profile.resumeUrl && (
                <Button
                  size="lg"
                  variant="outline"
                  leftIcon={<Download size={18} aria-hidden="true" />}
                  aria-label="Descargar el currículum de Lorena en PDF"
                >
                  <a href={profile.resumeUrl} download>
                    Descargar CV
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              {/* Glow ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/40 to-brand-300/20 blur-2xl scale-110"
              />
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-surface shadow-glow">
                <Image
                  src={profile.avatarUrl}
                  alt={`Foto de ${profile.name}`}
                  fill
                  sizes="(max-width: 1024px) 288px, 320px"
                  className="object-cover"
                  priority    // LCP image — load immediately
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
