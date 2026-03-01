/**
 * Badge — Pill tag for skills, project categories, statuses
 */

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "success" | "warning" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-secondary text-content-secondary border border-border",
  outline: "bg-transparent border border-accent text-accent",
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  info:    "bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-0.5 text-label-sm font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
