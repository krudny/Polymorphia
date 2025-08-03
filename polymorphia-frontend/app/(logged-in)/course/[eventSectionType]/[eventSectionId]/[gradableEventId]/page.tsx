"use client";

import { useParams } from "next/navigation";
import { EventSectionType } from "@/components/course/event-section/types";
import { MarkdownProvider } from "@/components/providers/markdown/MarkdownContext";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";

export default function GradableEventView() {
  const params = useParams();
  const gradableEventId = Number(params.gradableEventId);
  const eventSectionType = params.eventSectionType as EventSectionType;
  const wrapperRef = useFadeInAnimate();

  return (
    <MarkdownProvider gradableEventId={gradableEventId}>
      <div className="gradable-event" ref={wrapperRef}>
        <div className="gradable-event-speed-dial-mobile">
          <SpeedDialMobile
            eventSectionType={eventSectionType}
            gradableEventId={gradableEventId}
          />
        </div>
        <div className="gradable-event-speed-dial-desktop">
          <SpeedDialDesktop
            eventSectionType={eventSectionType}
            gradableEventId={gradableEventId}
          />
        </div>
        <div className="gradable-event-markdown-wrapper">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
