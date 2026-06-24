export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/api/favicon" alt="EpochCrew logo" className="navbar-logo-img" />
        <span className="logo-name">Epoch<span className="logo-accent">Crew</span></span>
      </div>
      <p className="navbar-tagline">The crew you&apos;ll never meet</p>
    </nav>
  );
}
