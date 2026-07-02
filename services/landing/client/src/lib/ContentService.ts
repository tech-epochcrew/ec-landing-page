import type {
  IContentProvider,
  IHeroContent,
  IContactContent,
  IEngineContent,
  IFooterContent,
  IModelContent,
  IPhasesContent,
  IFeedbackFormContent,
  INavigationProvider,
} from "@/types";
import { navigationService } from "./NavigationService";

/**
 * Single source of truth for all page copy / content data.
 *
 * SRP  — one class, one responsibility: page content strings and data.
 * DIP  — constructor accepts INavigationProvider (an abstraction), not
 *         the concrete NavigationService.  Swap the implementation in
 *         tests without changing this class.
 * OCP  — extend by subclassing; content methods are virtual by design.
 * Encapsulation — private constructor; data returned from each method is
 *                 a fresh object (no shared mutable references).
 */
export class ContentService implements IContentProvider {
  private static instance: ContentService;

  private constructor(private readonly nav: INavigationProvider) {}

  /**
   * Pass a custom INavigationProvider for testing;
   * omit to use the default navigationService singleton.
   */
  static getInstance(nav: INavigationProvider = navigationService): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService(nav);
    }
    return ContentService.instance;
  }

  getHeroContent(): IHeroContent {
    return {
      title: "Agentic Crew Automating Corporate Empires",
      infoLabel: "EpochCrew • Agentic AI",
      bullets: [
        "The ghost crew will run multiple empires.",
        "Killing traditional white-collar desk work completely forever.",
        "Launching storefront brands with zero departments.",
        "Training of crew will be done by epoch.",
      ],
      navLinks: this.nav.getNavLinks(),
    };
  }

  getContactContent(): IContactContent {
    return {
      imageSrc: "/contact.jpg",
      imageAlt: "Contact",
      height: 900,
    };
  }

  getEngineContent(): IEngineContent {
    return {
      videoSrc: "/The_Engine_in_Motion.mp4",
      label: "EpochCrew • In Motion",
      caption: "The engine behind the crew, always running.",
    };
  }

  getFooterContent(): IFooterContent {
    return {
      brandName: "Epoch Crew",
      tagline:
        "The crew you’ll never meet — an agentic AI system that runs corporate empires while you sleep.",
      email: "hello@epochcrew.com",
      socialLinks: [
        { href: "#", label: "X",         ariaLabel: "Follow on X"         },
        { href: "#", label: "Instagram", ariaLabel: "Follow on Instagram" },
        { href: "#", label: "LinkedIn",  ariaLabel: "Connect on LinkedIn" },
      ],
    };
  }

  getModelContent(): IModelContent {
    return {
      label: "The Model",
      titleLines: ["Shared services.", "Powered by AI."],
      intro:
        "Traditional companies duplicate every department at every company they build. Epoch Crew runs a single, central set of departments — one multi-agent brain that serves every business under its umbrella, eliminating redundancy at scale.",
      cards: [
        {
          id: "manufacturing",
          titleLines: ["Manufacturing"],
          text: "Product development, technology, and design. The agents that build and maintain everything each child company delivers to the market.",
          tag: "Build",
        },
        {
          id: "marketing",
          titleLines: ["Marketing & Sales"],
          text: "Campaigns, content, SEO, and conversion — centrally orchestrated across every brand from a single department with no duplication.",
          tag: "Grow",
        },
        {
          id: "support",
          titleLines: ["Customer Support"],
          text: "Query handling, complaint resolution, and retention — one support infrastructure serving all companies from a single point of truth.",
          tag: "Retain",
        },
        {
          id: "compliance",
          titleLines: ["Regulatory Compliance"],
          text: "Finance, legal, tax, and government compliance — unified across the entire conglomerate, with a single human in oversight per regulation.",
          tag: "Protect",
        },
      ],
    };
  }

  getPhasesContent(): IPhasesContent {
    return {
      label: "The Vision",
      titleLines: ["Conglomerate", "that compounds."],
      body: "Each new company added to Epoch Crew gets the full department infrastructure at near-zero marginal cost. The agents already exist. The brain is already running. You are simply adding a new storefront.",
      phases: [
        {
          num: "Phase I",
          title: "Build the Engine",
          text: "Construct and validate the multi-agent AI system before any child company launches. If the agents do not work, nothing works — this is the only priority at the start.",
        },
        {
          num: "Phase II",
          title: "Validate the Model",
          text: "Launch the first child company. Run it entirely on AI agents. Hit benchmarks across all four departments and confirm the Shared Services model holds in practice.",
        },
        {
          num: "Phase III",
          title: "Scale Companies",
          text: "Add more child companies under EC. Each new company shares the same infrastructure. Marginal cost drops with every addition while compound value continues to rise.",
        },
        {
          num: "Phase IV",
          title: "Own the Fuel",
          text: "Train a proprietary in-house LLM. Gradually shift all agents from third-party API providers to the internal model, eliminating the single point of external dependency.",
        },
        {
          num: "Phase V",
          title: "LLM as a Product",
          text: "Open the in-house model as an API service for other businesses. The infrastructure becomes a formal child company — the AWS within the Amazon. Self-sufficient and compounding.",
        },
      ],
    };
  }

  getFeedbackFormContent(): IFeedbackFormContent {
    return {
      label: "We’re building in public",
      titleLines: ["Tell us what you think."],
      body: "Epoch Crew is early stage — ideation and planning. If you have questions, ideas, or want to follow along, we want to hear from you.",
      testimonials: [
        {
          quote: "The four-department model instantly clicked — it's the clearest framing I've seen for how an AI-run company could actually operate.",
          name: "Marta Kovacs",
          company: "Nextlevel Studio",
        },
        {
          quote: "Early, honest, and ambitious. The kind of vision doc that makes you want to follow the build in public.",
          name: "Daniel Reyes",
          company: "Solaris Digital",
        },
        {
          quote: "Refreshing to see a team share the roadmap this openly at such an early stage. Excited to see phase one ship.",
          name: "Lena Fischer",
          company: "Aura",
        },
      ],
    };
  }
}

export const contentService = ContentService.getInstance();
