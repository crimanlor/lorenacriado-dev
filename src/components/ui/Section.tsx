/**
 * Section — Layout container for page sections
 *
 * Enforces consistent vertical rhythm and max-width across all sections.
 * The `id` prop is used for anchor navigation links.
 */

import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Visual container width */
  width?: "default" | "narrow" | "wide" | "full";
  /** Vertical padding scale */
  spacing?: "sm" | "md" | "lg" | "xl";
  /** Background variant */
  bg?: "default" | "secondary" | "accent";
  as?: keyof JSX.IntrinsicElements;
}

const widthClasses = {
  narrow:  "max-w-prose-lg",
  default: "max-w-content",
  wide:    "max-w-7xl",
  full:    "max-w-none",
};

const spacingClasses = {
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
  xl: "py-section-xl",
};

const bgClasses = {
  default:   "bg-surface",
  secondary: "bg-surface-secondary",
  accent:    "bg-accent-subtle",
};

export function Section({
  children,
  id,
  className,
  width = "default",
  spacing = "lg",
  bg = "default",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(spacingClasses[spacing], bgClasses[bg], className)}
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", widthClasses[width])}>
        {children}
      </div>
    </Tag>
  );
}

/**
 * SectionHeader — Consistent heading block for sections
 */
interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-label-md text-accent uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-display-md text-content mb-4">{heading}</h2>
      {subheading && (
        <p className="text-body-lg text-content-secondary">{subheading}</p>
      )}
    </div>
  );
}
