"use client";

import MarkdownViewer from "@/components/markdown-viewer";
import { useQuery } from "@tanstack/react-query";
import { BetterEventSectionService } from "@/app/(logged-in)/course/BetterEventSectionService";
import { useParams } from "next/navigation";
import Loading from "@/components/loading/Loading";
import SpeedDial from "@/components/speed-dial";
import { EventSectionType } from "@/components/course/event-section/types";
import { useScaleShow } from "@/animations/General";

export default function EventView() {
  const params = useParams();
  const eventId = Number(params.eventId);
  const eventSectionType = params.eventSectionType as EventSectionType;

  const { data, isLoading, error } = useQuery({
    queryKey: ["markdown", eventId],
    queryFn: () => BetterEventSectionService.getMarkdown(Number(eventId)),
  });

  const containerRef = useScaleShow(!isLoading);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <div>Nie można pobrać markdown</div>;
  }

  return (
    <div
      className="w-full relative flex flex-col flex-1 mx-auto"
      ref={containerRef}
    >
      <div className="fixed right-10 bottom-10">
        <SpeedDial eventId={eventId} eventSectionType={eventSectionType} />
      </div>
      <div className="max-w-[1200px] mx-auto my-10">
        <MarkdownViewer markdown={data.markdown} />
      </div>
    </div>
  );
}
