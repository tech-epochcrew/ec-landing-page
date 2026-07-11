/**
 * Tiny className joiner. Filters out falsy values so components can write
 * conditional classes like `cn("base", isActive && "active")` without pulling
 * in an extra dependency.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
