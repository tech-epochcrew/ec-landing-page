"use client";

import { useState, useEffect } from "react";
import type { INavbarProps } from "@/types";

export default function Navbar({ brandName, tagline, logoUrl, id, className }: INavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [first, accent] = brandName.split(" ");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cls = ["navbar", scrolled ? "navbar--scrolled" : "", className].filter(Boolean).join(" ");

  return (
    <nav id={id} className={cls}>
      <div className="navbar-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoUrl} alt={`${brandName} logo`} className="navbar-logo-img" />
        <span className="logo-name">
          {first}<span className="logo-accent">{accent}</span>
        </span>
      </div>
      <p className="navbar-tagline">{tagline}</p>
    </nav>
  );
}
