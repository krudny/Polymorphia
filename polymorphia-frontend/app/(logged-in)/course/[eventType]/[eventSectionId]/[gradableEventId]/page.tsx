"use client";

import { MarkdownProvider } from "@/providers/markdown/MarkdownContext";
import SpeedDialEventDesktop from "@/components/speed-dial/event/SpeedDialEventDesktop";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useEventParams } from "@/hooks/general/useEventParams";
import { ViewTypes } from "@/interfaces/general";
import SpeedDialEventMobile from "@/components/speed-dial/event/SpeedDialEventMobile";

export default function GradableEventMarkdownView() {
  const wrapperRef = useFadeInAnimate();
  const { eventType } = useEventParams();

  return (
    <MarkdownProvider>
      <div className="gradable-event" ref={wrapperRef}>
        <div className="gradable-event-speed-dial-mobile">
          <SpeedDialEventMobile
            eventType={eventType}
            viewType={ViewTypes.MARKDOWN}
          />
        </div>
        <div className="gradable-event-speed-dial-desktop">
          <SpeedDialEventDesktop
            eventType={eventType}
            viewType={ViewTypes.MARKDOWN}
          />
        </div>
        <div className="gradable-event-markdown-wrapper">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
