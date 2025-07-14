"use client";

import MarkdownViewer from "@/components/markdown-viewer";
import { useQuery } from "@tanstack/react-query";
import { BetterEventSectionService } from "@/app/(logged-in)/course/[eventSectionType]/BetterEventSectionService";
import { useParams } from "next/navigation";
import Loading from "@/components/loading/Loading";
import { useSpeedDialItemsFactory } from "@/app/(logged-in)/course/[eventSectionType]/[eventSectionId]/[eventId]/util";
import SpeedDial from "@/components/speed-dial";

export default function Page() {
  const params = useParams();
  const eventId = Number(params.eventId);
  const eventSectionType = String(params.eventSectionType);
  const eventSectionId = Number(params.eventSectionId);
  const speedDialItems = useSpeedDialItemsFactory(eventSectionType, eventId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["markdown", eventSectionId, eventId],
    queryFn: () =>
      BetterEventSectionService.getMarkdown(
        Number(eventSectionId),
        Number(eventId)
      ),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <div>Nie można pobrać markdown</div>;
  }

  return (
    <div className="w-full flex flex-col mx-auto">
      <div className="fixed right-10 bottom-10">
        <SpeedDial items={speedDialItems} />
      </div>
      <div className="max-w-[1200px] mx-auto my-10">
        <MarkdownViewer content={data.markdown} />
      </div>
    </div>
  );
}
