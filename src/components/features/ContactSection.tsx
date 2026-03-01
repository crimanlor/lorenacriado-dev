/**
 * ContactSection — Call-to-action / contact info
 *
 * Shows availability status, preferred contact methods, and social links.
 * Server Component — no form state (a real form would be a Client Component
 * or a Server Action in the /app/contact page).
 */

import { Mail, Linkedin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getProfile, getContactInfo } from "@/lib/data";

const availabilityConfig = {
  "available":       { label: "Open to opportunities",   color: "text-green-600 dark:text-green-400",  bg: "bg-green-100 dark:bg-green-900/30" },
  "open-to-offers":  { label: "Open to the right offer", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  "not-available":   { label: "Not available",           color: "text-red-600 dark:text-red-400",       bg: "bg-red-100 dark:bg-red-900/30" },
};

export async function ContactSection() {
  const [profile, contact] = await Promise.all([
    getProfile(),
    getContactInfo(),
  ]);

  const availability = availabilityConfig[contact.availability];

  return (
    <Section id="contact" bg="secondary" spacing="lg">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <SectionHeader
          eyebrow="Contact"
          heading="Let's Work Together"
          subheading="I'm always interested in new challenges, impactful projects, and great teams."
          align="center"
        />

        {/* Availability status */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-pill ${availability.bg}`}>
          <span className={`h-2 w-2 rounded-full animate-pulse ${availability.color.replace("text-", "bg-")}`} aria-hidden="true" />
          <span className={`text-label-md ${availability.color}`}>
            {availability.label}
          </span>
        </div>

        {/* Contact buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={`mailto:${contact.email}`}
            aria-label={`Send an email to ${contact.email}`}
          >
            <Button
              size="lg"
              variant="primary"
              leftIcon={<Mail size={18} aria-hidden="true" />}
            >
              Send an Email
            </Button>
          </a>

          {profile.social.find((s) => s.platform === "linkedin") && (
            <a
              href={profile.social.find((s) => s.platform === "linkedin")!.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Lorena on LinkedIn"
            >
              <Button
                size="lg"
                variant="outline"
                leftIcon={<Linkedin size={18} aria-hidden="true" />}
              >
                LinkedIn
              </Button>
            </a>
          )}
        </div>

        {/* Email address (visible, copyable) */}
        <p className="text-body-sm text-content-secondary">
          Or reach me directly at{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
          >
            {contact.email}
          </a>
        </p>
      </div>
    </Section>
  );
}
