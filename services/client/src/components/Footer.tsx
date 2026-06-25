import type { IFooterProps, IFooterSection, ISocialLink, ILink } from "@/types";

/**
 * Renders a footer link column — works with any ILink[] (Polymorphism / LSP).
 * IFooterLink, INavLink, and ISocialLink are all substitutable here
 * because they all satisfy the ILink contract.
 */
function FooterColumn({ section }: { section: IFooterSection }) {
  return (
    <div className="footer-col">
      <span className="footer-col-label">{section.title}</span>
      {section.links.map((link: ILink) => (
        <a key={link.label} href={link.href} className="footer-link">
          {link.label}
        </a>
      ))}
    </div>
  );
}

/** Renders a single social-media badge. */
function SocialBadge({ link }: { link: ISocialLink }) {
  return (
    <a href={link.href} aria-label={link.ariaLabel} className="footer-social-link">
      {link.label}
    </a>
  );
}

/**
 * Site footer.
 *
 * SRP  — renders footer UI only; zero content hardcoded here.
 * DIP  — depends on IFooterProps (abstraction); content is injected by page.tsx.
 * OCP  — add a new section or social to IFooterContent without modifying this component.
 * Polymorphism — FooterColumn accepts ILink[], so any link subtype (IFooterLink,
 *               INavLink) can appear in any column without casting.
 */
export default function Footer({ content }: IFooterProps) {
  const year = new Date().getFullYear();
  const [brandFirst, brandAccent] = content.brandName.split(" ");

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/api/favicon" alt={`${content.brandName} logo`} />
              <span>
                {brandFirst}<span className="logo-accent">{brandAccent}</span>
              </span>
            </div>
            <p className="footer-tagline">{content.tagline}</p>
          </div>

          <div className="footer-links">
            {content.sections.map((section) => (
              <FooterColumn key={section.title} section={section} />
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            © {year} {content.brandName}. All rights reserved.
          </span>
          <div className="footer-socials">
            {content.socialLinks.map((link) => (
              <SocialBadge key={link.label} link={link} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
