"use client";

import { useParams } from "next/navigation";
import { EventType } from "@/interfaces/api/DTO";
import { MarkdownProvider } from "@/components/providers/markdown/MarkdownContext";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "../../../EventSectionService";
import { useEffect } from "react";

export default function GradableEventView() {
  const params = useParams();
  const eventSectionId = Number(params.eventSectionId);
  const gradableEventId = Number(params.gradableEventId);
  const eventSectionType = params.eventSectionType as EventType;

  const wrapperRef = useFadeInAnimate();

  const { setTitle } = useTitle();

  const { data: eventSection } = useQuery({
    queryKey: ["eventSections", eventSectionId],
    queryFn: () => EventSectionService.getEventSection(eventSectionId),
  });

  useEffect(() => {
    setTitle(eventSection?.name ?? "");
  }, [eventSection]);

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
