"use client";

import { useEffect, useRef, useState } from "react";
import type { IEngineSectionProps } from "@/types";

const SPEEDS = [0.5, 1, 1.5, 2] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Full-width video player shown directly below the hero.
 *
 * SRP  — renders the video and its transport controls; all state is
 *         local UI state driven straight off the native HTMLMediaElement.
 * DIP  — all display values arrive through IEngineSectionProps.
 * LSP  — honours the shared ISectionProps contract like every other section.
 */
export default function EngineSection({ content, id = "engine", className }: IEngineSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    // The browser can finish reading metadata before this effect attaches
    // its listener (local files load fast); if so, read it directly.
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onLoadedMetadata();

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const changeSpeed = (next: (typeof SPEEDS)[number]) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = next;
    setSpeed(next);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = Number(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <section id={id} className={`engine-section${className ? ` ${className}` : ""}`}>
      <div className="engine-caption">
        <span className="section-label">{content.label}</span>
        <p>{content.caption}</p>
      </div>

      <div className="engine-player">
        <video
          ref={videoRef}
          className="engine-video"
          src={content.videoSrc}
          playsInline
          preload="metadata"
          onClick={togglePlay}
        />

        {!isPlaying && (
          <button type="button" className="engine-play-overlay" onClick={togglePlay} aria-label="Play video">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        <div className="engine-controls">
          <button type="button" className="engine-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <span className="engine-time">{formatTime(currentTime)} / {formatTime(duration)}</span>

          <input
            type="range"
            className="engine-seek"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={seek}
            aria-label="Seek"
            style={{
              background: `linear-gradient(to right, var(--text-primary) ${
                duration ? (currentTime / duration) * 100 : 0
              }%, var(--border-subtle) 0%)`,
            }}
          />

          <div className="engine-speeds" aria-label="Playback speed">
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                className={`engine-speed-btn${s === speed ? " engine-speed-btn-active" : ""}`}
                onClick={() => changeSpeed(s)}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
