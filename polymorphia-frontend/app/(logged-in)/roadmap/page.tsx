"use client";

import { useEffect, useState } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import ProgressBar from "@/components/progressbar/ProgressBar";
import XPCard from "@/components/xp-card/XPCard";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ProgressBarElement from "@/components/progressbar/ProgressBarElement";
import Loading from "@/components/loading";
import { useMediaQuery } from "react-responsive";
import RoadmapModals from "@/app/(logged-in)/roadmap/RoadmapModals";
import "./styles.css";
import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";
import { useRoadmap } from "@/hooks/course/useRoadmap";
import XPCardChest from "@/components/xp-card/components/XPCardChest";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";

export default function Roadmap() {
  const { setTitle } = useTitle();
  const [selectedEvent, setSelectedEvent] = useState<
    StudentGradableEventResponseDTO | undefined
  >(undefined);
  const wrapperRef = useFadeInAnimate();
  const { data: roadmap, isLoading } = useRoadmap();
  const isXL = useMediaQuery({ minWidth: 1280 });
  const isMd = useMediaQuery({ minWidth: 768 });
  const isSm = useMediaQuery({ minWidth: 400 });

  useEffect(() => {
    setTitle("Roadmapa");
  }, [setTitle]);

  if (isLoading || !roadmap) {
    return <Loading />;
  }

  const handleClick = (gradableEvent: StudentGradableEventResponseDTO) => {
    setSelectedEvent(gradableEvent);
  };

  const cards = roadmap.map((gradableEvent) => {
    const { name, topic, id, gainedXp, isLocked, hasReward } = gradableEvent;
    const color = gainedXp ? "green" : "silver";
    const rightComponent = hasReward ? (
      <XPCardChest />
    ) : (
      <XPCardPoints
        points={gainedXp}
        isSumLabelVisible={true}
        hasChest={true}
        color="gray"
      />
    );

    return (
      <XPCard
        title={name}
        subtitle={topic}
        key={id}
        color={color}
        size={isXL ? "md" : isMd ? "sm" : "xs"}
        forceWidth={true}
        isLocked={isLocked}
        onClick={() => handleClick(gradableEvent)}
        rightComponent={rightComponent}
      />
    );
  });

  const cardHeightWithGap = isXL ? 8 : isMd ? 6.5 : isSm ? 9 : 7;
  const totalHeight = `${cards.length * cardHeightWithGap}rem`;

  return (
    <>
      <div ref={wrapperRef} style={{ height: totalHeight }} className="roadmap">
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
