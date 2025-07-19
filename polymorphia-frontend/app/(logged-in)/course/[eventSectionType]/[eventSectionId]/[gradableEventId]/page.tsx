"use client";

import { useParams } from "next/navigation";
import { EventSectionType } from "@/components/course/event-section/types";
import { MarkdownProvider } from "@/components/providers/markdown/MarkdownContext";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";

export default function EventView() {
  const params = useParams();
  const gradableEventId = Number(params.gradableEventId);
  const eventSectionType = params.eventSectionType as EventSectionType;

  return (
    <MarkdownProvider gradableEventId={gradableEventId}>
      <div className="w-full relative flex flex-col flex-1 mx-auto z-20">
        <div className="fixed block right-5 bottom-5 lg:hidden z-[999]">
          <SpeedDialMobile
            eventSectionType={eventSectionType}
            gradableEventId={gradableEventId}
          />
        </div>
        <div className="right-5 bottom-5 hidden lg:fixed lg:block z-[999]">
          <SpeedDialDesktop
            eventSectionType={eventSectionType}
            gradableEventId={gradableEventId}
          />
        </div>
        <div className="max-w-[1200px] w-full h-full flex-col-centered flex-1 mx-auto my-10 -z-50">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
