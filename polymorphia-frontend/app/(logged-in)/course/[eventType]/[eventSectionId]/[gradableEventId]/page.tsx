"use client";

import { MarkdownProvider } from "@/components/providers/markdown/MarkdownContext";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useEventParams } from "@/hooks/useEventParams";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";

export default function GradableEventView() {
  const wrapperRef = useFadeInAnimate();
  const { eventType } = useEventParams();

  return (
    <MarkdownProvider>
      <div className="gradable-event" ref={wrapperRef}>
        <div className="gradable-event-speed-dial-mobile">
          <SpeedDialMobile type={eventType} />
        </div>
        <div className="gradable-event-speed-dial-desktop">
          <SpeedDialDesktop type={eventType} />
        </div>
        <div className="gradable-event-markdown-wrapper">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
