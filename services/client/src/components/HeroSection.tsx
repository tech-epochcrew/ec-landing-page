"use client";

import { useRef, useEffect } from "react";
type VideoWithVFC = HTMLVideoElement & {
  requestVideoFrameCallback: (cb: () => void) => number;
  cancelVideoFrameCallback: (id: number) => void;
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const vfc = video as VideoWithVFC;
    const hasVFC = "requestVideoFrameCallback" in video;
    let rafId: number | null = null;
    let reversing = false;

    const step = () => {
      if (!reversing) return;
      video.currentTime = Math.max(0, video.currentTime - 1 / 30);
      if (video.currentTime <= 0) {
        reversing = false;
        video.play();
        return;
      }
      if (hasVFC) {
        vfc.requestVideoFrameCallback(step);
      } else {
        rafId = requestAnimationFrame(step);
      }
    };

    const handleEnded = () => { reversing = true; step(); };
    video.addEventListener("ended", handleEnded);
    return () => {
      reversing = false;
      video.removeEventListener("ended", handleEnded);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="hero">
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

      {/* Main body: title bottom-left */}
      <div className="hero-body">
        <div className="hero-body-content">
          <h1 className="hero-title">
            Agentic Crew Automating<br />Corporate Empires
          </h1>
          <button className="hero-launch-btn">
            Launch App
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="hero-divider" />

      {/* Info bar */}
      <div className="hero-info-bar">
        <div className="hero-info-left">
          <span className="hero-info-label">EpochCrew • Agentic AI</span>
          <ul className="hero-info-bullets">
            <li>The ghost crew will run multiple empires.</li>
            <li>Killing traditional white-collar desk work completely forever.</li>
            <li>Launching storefront brands with zero departments.</li>
            <li>Training of crew will be done by epoch.</li>
          </ul>
        </div>
        <div className="hero-info-right">
          {[
            { label: "Home",    href: "/" },
            { label: "About",   href: "/#about" },
            { label: "Contact", href: "/#contact" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="hero-feature">
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
