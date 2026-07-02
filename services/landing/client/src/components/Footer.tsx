import type { IFooterProps, ISocialLink } from "@/types";

/** Renders a single social-media link. */
function SocialLink({ link }: { link: ISocialLink }) {
  return (
    <a href={link.href} aria-label={link.ariaLabel} className="footer-social-link" target="_blank" rel="noopener">
      {link.label}
    </a>
  );
}

/**
 * Site footer.
 *
 * SRP  — renders footer UI only; zero content hardcoded here.
 * DIP  — depends on IFooterProps (abstraction); content is injected by page.tsx.
 * OCP  — add a new social link to IFooterContent without modifying this component.
 */
export default function Footer({ content }: IFooterProps) {
  const year = new Date().getFullYear();
  const [brandFirst, brandAccent] = content.brandName.split(" ");

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-wordmark">
              {brandFirst} <span className="logo-accent">{brandAccent}</span>
            </div>
            <a href={`mailto:${content.email}`} className="footer-email">
              {content.email}
            </a>
          </div>

          <div className="footer-socials">
            {content.socialLinks.map((link) => (
              <SocialLink key={link.label} link={link} />
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            © {year} {content.brandName} — {content.tagline}
          </span>
          <span className="footer-copyright">All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
