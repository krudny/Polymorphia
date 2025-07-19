"use client";

import { useParams } from "next/navigation";
import { EventSectionType } from "@/components/course/event-section/types";
import { MarkdownProvider } from "@/components/providers/markdown/MarkdownContext";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";

export default function EventView() {
  const params = useParams();
  const eventId = Number(params.eventId);
  const eventSectionType = params.eventSectionType as EventSectionType;

  return (
    <MarkdownProvider gradableEventId={eventId}>
      <div className="w-full relative flex flex-col flex-1 mx-auto">
        <div className="fixed right-5 bottom-5 lg:hidden">
          <SpeedDialMobile
            eventSectionType={eventSectionType}
            gradableEventId={eventId}
          />
        </div>
        <div className="right-5 bottom-5 hidden lg:fixed lg:block">
          <SpeedDialDesktop
            eventSectionType={eventSectionType}
            gradableEventId={eventId}
          />
        </div>
        <div className="max-w-[1200px] w-full h-full flex-col-centered flex-1 mx-auto my-10">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
