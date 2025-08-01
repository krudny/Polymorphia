"use client";

import { useEffect, useState } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import ProgressBar from "@/components/progressbar/ProgressBar";
import XPCard from "@/components/xp-card/XPCard";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ProgressBarElement from "@/components/progressbar/ProgressBarElement";
import { useQuery } from "@tanstack/react-query";
import { RoadmapService } from "@/app/(logged-in)/roadmap/RoadmapService";
import Loading from "@/components/loading/Loading";
import { useMediaQuery } from "react-responsive";
import RoadmapModals from "@/app/(logged-in)/roadmap/RoadmapModals";
import { getCardComponent } from "@/shared/card/getCardComponent";
import { GradableEventResponseDTO } from "@/app/(logged-in)/course/EventSectionService";

export default function Roadmap() {
  const { setTitle } = useTitle();
  const [selectedEvent, setSelectedEvent] = useState<
    GradableEventResponseDTO | undefined
  >(undefined);
  const wrapperRef = useFadeInAnimate();
  const isXL = useMediaQuery({ minWidth: 1280 });
  const isMd = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    setTitle("Roadmapa");
  }, [setTitle]);

  const { data, isLoading } = useQuery({
    queryKey: ["roadmap"],
    queryFn: () => RoadmapService.getRoadmapData(),
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  const handleClick = (gradableEvent: GradableEventResponseDTO) => {
    console.log("click", gradableEvent);
    setSelectedEvent(gradableEvent);
  };

  const cards = data.map((gradableEvent) => {
    const { name, topic, id, gainedXp, isLocked, hasChest } = gradableEvent;

    return (
      <XPCard
        title={name}
        subtitle={topic}
        key={id}
        color={gainedXp > 0 ? "green" : "silver"}
        size={isXL ? "md" : isMd ? "sm" : "xs"}
        forceWidth={true}
        isLocked={isLocked}
        onClick={() => handleClick(gradableEvent)}
        component={getCardComponent(gainedXp, hasChest)}
      />
    );
  });

  return (
    <>
      <div
        ref={wrapperRef}
        className=" w-[17rem] min-[400px]:w-[20rem] md:w-[44rem] h-[2300px] xl:w-[57rem] xl:h-[2500px] mx-auto flex-col-centered py-24 2xl:py-32"
      >
        <ProgressBar
          minXP={0}
          currentXP={27}
          maxXP={100}
          numSquares={cards?.length ?? 0}
          segmentSizes={Array.from({ length: cards.length * 2 - 1 }, (_, i) =>
            i % 2 === 0 ? 0 : 100 / (cards.length - 1)
          )}
          isHorizontal={false}
          upperElement={
            <ProgressBarElement
              elements={cards ?? []}
              alternate={isMd}
              isUpper={true}
              isHorizontal={false}
            />
          }
          lowerElement={
            isMd ? (
              <ProgressBarElement
                elements={cards ?? []}
                alternate={isMd}
                isUpper={false}
                isHorizontal={false}
              />
            ) : undefined
          }
        />
      </div>
      <RoadmapModals
        gradableEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    </>
  );
}
