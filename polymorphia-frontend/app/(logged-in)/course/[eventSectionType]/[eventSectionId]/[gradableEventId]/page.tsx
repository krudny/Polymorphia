"use client";

import { useParams } from "next/navigation";
import { EventSectionType } from "@/components/course/event-section/types";
import { MarkdownProvider } from "@/components/providers/markdown/MarkdownContext";
import SpeedDialMobile from "@/components/speed-dial/SpeedDialMobile";
import SpeedDialDesktop from "@/components/speed-dial/SpeedDialDesktop";
import MarkdownWrapper from "@/components/markdown/MarkdownWrapper";
import { useFadeInAnimate } from "@/animations/FadeIn";

export default function EventView() {
  const params = useParams();
  const gradableEventId = Number(params.gradableEventId);
  const eventSectionType = params.eventSectionType as EventSectionType;
  const wrapperRef = useFadeInAnimate();

  return (
    <MarkdownProvider gradableEventId={gradableEventId}>
      <div
        className="w-full relative flex flex-col flex-1 mx-auto z-20"
        ref={wrapperRef}
      >
        <div className="fixed block right-2 bottom-3 md:right-5 md:bottom-5 xl:hidden z-[999]">
          <SpeedDialMobile
            eventSectionType={eventSectionType}
            gradableEventId={gradableEventId}
          />
        </div>
        <div className="right-5 bottom-5 hidden lg:fixed xl:block z-[999]">
          <SpeedDialDesktop
            eventSectionType={eventSectionType}
            gradableEventId={gradableEventId}
          />
        </div>
        <div className="p-7 md:px-24 md:py-12 w-full h-full flex-col-centered flex-1 md:mx-auto 2xl:max-w-[1300px]">
          <MarkdownWrapper />
        </div>
      </div>
    </MarkdownProvider>
  );
}
