"use client";

import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import Loading from "@/components/loading/Loading";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import renderCard from "@/views/course/instructor/pick-group/RenderCard";
import { useScaleShow } from "@/animations/ScaleShow";
import { useRef } from "react";

export default function PickGroupView() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { data: projectGroups, isLoading } = useQuery({
    queryKey: ["projectGroups"],
    queryFn: () => EventSectionService.getRandomProjectGroups(),
  });

  const containerRef = useScaleShow(!isLoading);

  if (isLoading || !projectGroups) {
    return <Loading />;
  }

  const cards = projectGroups.map((projectGroup) =>
    renderCard(projectGroup, () => {})
  );

  return (
    <SectionView ref={containerRef}>
      <div className="flex flex-col lg:flex-col-centered flex-1 gap-x-10 overflow-hidden 2xl:px-10 bg-red-400">
        <div
          className="max-w-full flex-1 lg:flex-0 lg:min-h-[600px] lg:w-4xl 2xl:w-7xl bg-green-500"
          ref={wrapperRef}
        >
          <XPCardGrid containerRef={wrapperRef} cards={cards} maxColumns={2} />
        </div>
      </div>
    </SectionView>
  );
}
