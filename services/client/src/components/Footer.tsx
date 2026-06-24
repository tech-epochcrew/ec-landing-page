export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    {
      label: "Product",
      items: [
        { label: "Home",    href: "/" },
        { label: "About",   href: "/#about" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      label: "Company",
      items: [
        { label: "Mission", href: "#" },
        { label: "Team",    href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      label: "Legal",
      items: [
        { label: "Privacy", href: "#" },
        { label: "Terms",   href: "#" },
      ],
    },
  ];

  const socials = [
    { label: "X",         href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn",  href: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/api/favicon" alt="EpochCrew logo" />
              <span>Epoch<span className="logo-accent">Crew</span></span>
            </div>
            <p className="footer-tagline">
              The crew you&apos;ll never meet — an agentic AI system that runs
              corporate empires while you sleep.
            </p>
          </div>

          <div className="footer-links">
            {links.map(({ label, items }) => (
              <div key={label} className="footer-col">
                <span className="footer-col-label">{label}</span>
                {items.map(({ label: name, href }) => (
                  <a key={name} href={href} className="footer-link">
                    {name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            © {year} EpochCrew. All rights reserved.
          </span>
          <div className="footer-socials">
            {socials.map(({ label, href }) => (
              <a key={label} href={href} className="footer-social-link">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
