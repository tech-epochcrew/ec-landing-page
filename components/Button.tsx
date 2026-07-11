import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  outline:
    "border border-on-overlay/30 text-on-overlay hover:bg-on-overlay/10",
  ghost: "text-on-overlay hover:bg-on-overlay/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

/** Shared class string so other components can reuse the button look. */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** When provided, the button renders as a link. */
  href?: string;
  children: ReactNode;
} & ComponentProps<"button">;

/**
 * Reusable button used across the landing page. Renders a `<Link>` when `href`
 * is set, otherwise a `<button>`. All colors come from design tokens.
 */
export function Button({
  variant,
  size,
  className,
  href,
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (href) {
    return (
      <Link
        {...(rest as ComponentProps<typeof Link>)}
        href={href}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
