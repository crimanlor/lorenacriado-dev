/**
 * Card — Composable surface container
 *
 * Uses a compound component pattern (Card + Card.Header + Card.Body + Card.Footer)
 * for maximum flexibility with minimal prop drilling.
 */

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Enables hover lift animation — use for interactive cards */
  hoverable?: boolean;
}

function Card({ children, className, hoverable = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card bg-surface border border-border shadow-card-rest",
        "transition-all duration-300 ease-out",
        hoverable && "hover:shadow-card-hover hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 pb-0", className)}>{children}</div>;
}

function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-6 pb-6 pt-0 flex items-center gap-3", className)}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body   = CardBody;
Card.Footer = CardFooter;

export { Card };
