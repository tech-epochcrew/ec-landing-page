// ─── Base Link Interface (LSP foundation) ─────────────────────────────────────

/** Minimal link contract; all link types extend this (Liskov Substitution). */
export interface ILink {
  href: string;
  label: string;
}

// ─── Derived Link Interfaces (Open/Closed — extend without modifying ILink) ───

export interface INavLink extends ILink {
  isExternal?: boolean;
}

/** Social-media link carries an explicit aria-label for accessibility. */
export interface ISocialLink extends ILink {
  ariaLabel: string;
}

// ─── Section / Component Prop Interfaces (ISP — small, focused contracts) ─────

/** Minimal props every page section can accept. */
export interface ISectionProps {
  id?: string;
  className?: string;
}

export interface INavbarProps extends ISectionProps {
  brandName: string;
  tagline: string;
  logoUrl: string;
}

export interface IHeroSectionProps extends ISectionProps {
  content: IHeroContent;
}

export interface IContactSectionProps extends ISectionProps {
  content: IContactContent;
}

export interface IEngineSectionProps extends ISectionProps {
  content: IEngineContent;
}

export interface IFooterProps {
  content: IFooterContent;
}

export interface IModelSectionProps extends ISectionProps {
  content: IModelContent;
}

export interface IPhasesSectionProps extends ISectionProps {
  content: IPhasesContent;
}

export interface IFeedbackFormSectionProps extends ISectionProps {
  content: IFeedbackFormContent;
  onSubmit?: (data: IFeedbackPayload) => Promise<void>;
}

// ─── Content Shape Interfaces ──────────────────────────────────────────────────

export interface IHeroContent {
  title: string;
  infoLabel: string;
  bullets: string[];
  navLinks: INavLink[];
}

export interface IContactContent {
  imageSrc: string;
  imageAlt: string;
  height: number;
}

export interface IEngineContent {
  videoSrc: string;
  label: string;
  caption: string;
}

export interface IFooterContent {
  brandName: string;
  tagline: string;
  email: string;
  socialLinks: ISocialLink[];
}

export interface IModelCard {
  id: string;
  titleLines: string[];
  text: string;
  tag: string;
}

export interface IModelContent {
  label: string;
  titleLines: string[];
  intro: string;
  cards: IModelCard[];
}

export interface IPhase {
  num: string;
  title: string;
  text: string;
}

export interface IPhasesContent {
  label: string;
  titleLines: string[];
  body: string;
  phases: IPhase[];
}

export interface ITestimonial {
  quote: string;
  name: string;
  company: string;
}

export interface IFeedbackFormContent {
  label: string;
  titleLines: string[];
  body: string;
  testimonials: ITestimonial[];
}

export interface IFeedbackPayload {
  name: string;
  email: string;
  message: string;
}

// ─── Site Configuration Interface ─────────────────────────────────────────────

export interface ISiteConfig {
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly themeColor: string;
  readonly faviconUrl: string;
}

// ─── Service / Provider Interfaces (Dependency Inversion) ─────────────────────

/** Abstraction for anything that can supply navigation links. */
export interface INavigationProvider {
  getNavLinks(): INavLink[];
}

/** Abstraction for anything that can supply page-level content. */
export interface IContentProvider {
  getHeroContent(): IHeroContent;
  getContactContent(): IContactContent;
  getEngineContent(): IEngineContent;
  getFooterContent(): IFooterContent;
  getModelContent(): IModelContent;
  getPhasesContent(): IPhasesContent;
  getFeedbackFormContent(): IFeedbackFormContent;
}

/** Abstraction for video-playback controllers. */
export interface IVideoController {
  /** Attaches listeners and returns a cleanup function (for useEffect). */
  setup(): () => void;
}
