import type { RefObject } from "react";
import type { IVideoController } from "@/types";

/** Extends HTMLVideoElement with the non-standard requestVideoFrameCallback API. */
type VideoWithVFC = HTMLVideoElement & {
  requestVideoFrameCallback(cb: () => void): number;
  cancelVideoFrameCallback(id: number): void;
};

/**
 * Encapsulates forward-then-reverse video-loop behaviour.
 *
 * SRP  — owns exactly one concern: video playback control.
 * Encapsulation — private mutable state (isReversing, rafId) is hidden
 *                 behind the clean IVideoController interface.
 * DIP  — consumers program to IVideoController, not this class.
 * OCP  — swap reverse speed or stepping strategy by subclassing;
 *         the setup() lifecycle contract stays fixed.
 */
export class VideoController implements IVideoController {
  private isReversing = false;
  private rafId: number | null = null;

  constructor(private readonly videoRef: RefObject<HTMLVideoElement>) {}

  /** Attaches the "ended" listener; returns a teardown for useEffect. */
  setup(): () => void {
    const video = this.videoRef.current;
    if (!video) return () => {};

    const handleEnded = () => this.startReverse(video);
    video.addEventListener("ended", handleEnded);

    return () => {
      this.isReversing = false;
      video.removeEventListener("ended", handleEnded);
      if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    };
  }

  private startReverse(video: HTMLVideoElement): void {
    this.isReversing = true;
    this.tick(video)();
  }

  /**
   * Returns a self-scheduling step function.
   * Arrow-function wrapper ensures `this` is always the controller instance,
   * even when passed as a callback to requestVideoFrameCallback / rAF.
   */
  private tick = (video: HTMLVideoElement): (() => void) => {
    const step = () => {
      if (!this.isReversing) return;

      video.currentTime = Math.max(0, video.currentTime - 1 / 30);

      if (video.currentTime <= 0) {
        this.isReversing = false;
        this.rafId = null;
        video.play();
        return;
      }

      if ("requestVideoFrameCallback" in video) {
        (video as VideoWithVFC).requestVideoFrameCallback(step);
      } else {
        this.rafId = requestAnimationFrame(step);
      }
    };
    return step;
  };
}
