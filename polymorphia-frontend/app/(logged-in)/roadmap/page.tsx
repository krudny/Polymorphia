"use client";

import { useEffect, useState } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import ProgressBar from "@/components/progressbar/ProgressBar";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ProgressBarElement from "@/components/progressbar/ProgressBarElement";
import Loading from "@/components/loading";
import { useMediaQuery } from "react-responsive";
import RoadmapModals from "@/app/(logged-in)/roadmap/RoadmapModals";
import "./styles.css";
import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";
import { useRoadmap } from "@/hooks/course/useRoadmap";
import RoadmapCard from "@/app/(logged-in)/roadmap/RoadmapCard";

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

  const cards = roadmap.map((gradableEvent) => (
    <RoadmapCard gradableEvent={gradableEvent} onCardClicked={handleClick} />
  ));

  const cardHeightWithGap = isXL ? 8 : isMd ? 6.5 : isSm ? 9 : 7;
  const totalHeight = `${roadmap.length * cardHeightWithGap}rem`;

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
        selectedGradableEvent={selectedEvent}
        setSelectedGradableEvent={setSelectedEvent}
      />
    </>
  );
}
