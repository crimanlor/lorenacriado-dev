/**
 * Contact Page — /contact
 *
 * Renders the ContactSection with additional context.
 */

import type { Metadata } from "next";
import type React from "react";
import { ContactSection } from "@/components/features/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lorena Criado Manzaneque — available for full-stack engineering roles and interesting projects.",
};

const ContactSectionComponent =
  ContactSection as unknown as React.ComponentType;

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section
        className="pt-32 pb-section-sm bg-surface border-b border-border"
        aria-labelledby="contact-page-heading"
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-label-md text-accent uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h1
            id="contact-page-heading"
            className="text-display-lg text-content mb-4"
          >
            Contact
          </h1>
          <p className="text-body-xl text-content-secondary max-w-prose-lg">
            I&apos;d love to hear about your project, team, or just say hello.
          </p>
        </div>
      </section>

      <ContactSectionComponent />
    </>
  );
}
