import type { INavLink, INavigationProvider } from "@/types";

/**
 * Single source of truth for navigation links.
 *
 * SRP  — one class, one responsibility: nav-link data.
 * OCP  — add or reorder links here without touching any component.
 * Encapsulation — internal array is private; getNavLinks() returns a
 *                 defensive copy so callers cannot mutate the stored data.
 */
export class NavigationService implements INavigationProvider {
  private static instance: NavigationService;

  private readonly links: readonly INavLink[] = [
    { href: "/",         label: "Home"    },
    { href: "/#about",   label: "About"   },
    { href: "/#contact", label: "Contact" },
  ];

  private constructor() {}

  static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService();
    }
    return NavigationService.instance;
  }

  getNavLinks(): INavLink[] {
    return [...this.links];
  }
}

export const navigationService = NavigationService.getInstance();
