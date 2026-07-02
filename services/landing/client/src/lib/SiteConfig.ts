import type { ISiteConfig } from "@/types";

/**
 * Singleton that owns every site-wide constant.
 *
 * SRP  — one class, one reason to change: branding/meta values.
 * Encapsulation — private constructor; mutating the instance externally
 *                 is impossible because every field is readonly.
 */
export class SiteConfig implements ISiteConfig {
  private static instance: SiteConfig;

  readonly name = "Epoch Crew";
  readonly tagline = "The crew you'll never meet";
  readonly description = "Build Smarter with AI-Powered Tools";
  readonly themeColor = "#050505";
  readonly faviconUrl = "/api/favicon";

  private constructor() {}

  static getInstance(): SiteConfig {
    if (!SiteConfig.instance) {
      SiteConfig.instance = new SiteConfig();
    }
    return SiteConfig.instance;
  }
}

export const siteConfig = SiteConfig.getInstance();
