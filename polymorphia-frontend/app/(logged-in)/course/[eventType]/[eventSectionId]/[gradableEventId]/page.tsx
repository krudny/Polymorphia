"use client";

import { MarkdownProvider } from "@/components/providers/markdown/MarkdownContext";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";

export default function GradableEventView() {
  const wrapperRef = useFadeInAnimate();

  return (
    <MarkdownProvider>
      <div className="gradable-event" ref={wrapperRef}>
        <div className="gradable-event-speed-dial-mobile">
          <SpeedDialMobile />
        </div>
        <div className="gradable-event-speed-dial-desktop">
          <SpeedDialDesktop />
        </div>
        <div className="gradable-event-markdown-wrapper">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
