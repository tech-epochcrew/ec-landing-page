"use client";

import { useRef, useEffect } from "react";
import type { IHeroSectionProps } from "@/types";
import { VideoController } from "@/lib/VideoController";

/**
 * Full-screen hero section with a reversing video background.
 *
 * SRP  — renders hero UI; delegates all video-playback logic to VideoController.
 * DIP  — depends on IHeroSectionProps and IVideoController abstractions,
 *         not on concrete data or playback implementations.
 * ISP  — only the data it truly needs arrives through IHeroSectionProps.
 * Polymorphism — any IVideoController implementation can be swapped in
 *                without touching this component.
 */
export default function HeroSection({ content, id, className }: IHeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const controller: import("@/types").IVideoController = new VideoController(videoRef);
    return controller.setup();
  }, []);

  return (
    <header id={id} className={`hero${className ? ` ${className}` : ""}`}>
      <video
        ref={videoRef}
        className="hero-video-bg"
        src="/background.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <div className="hero-overlay" />

      <div className="hero-body">
        <div className="hero-body-content">
          <h1 className="hero-title">{content.title}</h1>
          <button className="hero-launch-btn">{content.ctaLabel}</button>
        </div>
      </div>

      <div className="hero-divider" />

      <div className="hero-info-bar">
        <div className="hero-info-left">
          <span className="hero-info-label">{content.infoLabel}</span>
          <ul className="hero-info-bullets">
            {content.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="hero-info-right">
          {content.navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="hero-feature">
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
