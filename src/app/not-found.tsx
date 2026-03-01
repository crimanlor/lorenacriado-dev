/**
 * 404 Not Found Page
 *
 * Custom not-found boundary for Next.js 14 App Router.
 * Shown when notFound() is called or a route doesn't match.
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4"
      role="main"
      aria-labelledby="not-found-heading"
    >
      <div className="text-center space-y-6 max-w-md">
        <p
          className="text-display-2xl font-bold text-accent"
          aria-hidden="true"
        >
          404
        </p>
        <h1
          id="not-found-heading"
          className="text-display-sm text-content"
        >
          Página no encontrada
        </h1>
        <p className="text-body-lg text-content-secondary">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link href="/" aria-label="Volver a la página principal">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<ArrowLeft size={18} aria-hidden="true" />}
          >
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
