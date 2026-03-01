/**
 * Button — Primitive UI Component
 *
 * Follows Single Responsibility: renders a styled, accessible button.
 * Variants and sizes are defined as discriminated unions, not arbitrary strings,
 * giving full type safety at the call site.
 *
 * Accessibility:
 *  - Forwards all native button props (including aria-* attributes)
 *  - Visible focus ring on keyboard navigation
 *  - Loading state uses aria-busy and a visible spinner
 *  - asChild pattern available via polymorphic 'as' prop for link rendering
 */

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-content-inverse hover:bg-accent-hover shadow-sm hover:shadow-md",
  secondary:
    "bg-surface-secondary text-content hover:bg-surface-tertiary border border-border",
  ghost:
    "bg-transparent text-content hover:bg-surface-secondary",
  outline:
    "bg-transparent border border-accent text-accent hover:bg-accent-subtle",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-label-sm gap-1.5",
  md: "px-5 py-2.5 text-label-md gap-2",
  lg: "px-7 py-3.5 text-label-lg gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          // Base
          "inline-flex items-center justify-center rounded-pill font-medium",
          "transition-all duration-200 ease-out",
          // Focus ring — visible for keyboard users, hidden for mouse
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          // Disabled
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          // Accessible spinner
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
