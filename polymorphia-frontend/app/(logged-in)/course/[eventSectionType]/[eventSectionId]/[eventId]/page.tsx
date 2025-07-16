"use client";

import { useParams } from "next/navigation";
import SpeedDial from "@/components/speed-dial";
import { EventSectionType } from "@/components/course/event-section/types";
import { MarkdownProvider } from "@/components/providers/markdown/MarkdownContext";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";

export default function EventView() {
  const params = useParams();
  const eventId = Number(params.eventId);
  const eventSectionType = params.eventSectionType as EventSectionType;

  return (
    <MarkdownProvider eventId={eventId}>
      <div className="w-full relative flex flex-col flex-1 mx-auto">
        <div className="fixed right-10 bottom-10">
          <SpeedDial eventId={eventId} eventSectionType={eventSectionType} />
        </div>
        <div className="max-w-[1200px] w-full h-full flex-col-centered flex-1 mx-auto my-10 z-[50]">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
