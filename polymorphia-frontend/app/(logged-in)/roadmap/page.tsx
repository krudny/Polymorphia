"use client";

import { useEffect } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import ProgressBar from "@/components/progressbar/ProgressBar";
import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ProgressBarElement from "@/components/progressbar/ProgressBarElement";
import { useQuery } from "@tanstack/react-query";
import { RoadmapService } from "@/app/(logged-in)/roadmap/RoadmapService";
import XPCardChest from "@/components/xp-card/inner-components/XPCardChest";
import Loading from "@/components/loading/Loading";
import { useMediaQuery } from "react-responsive";

export default function Roadmap() {
  const { setTitle } = useTitle();
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

  const cards = data.map((item) => {
    return (
      <XPCard
        title={item.name}
        subtitle={item.topic}
        key={item.id}
        color={item.gainedXp > 0 ? "green" : "silver"}
        size={isXL ? "md" : isMd ? "sm" : "xs"}
        forceWidth={true}
        component={
          item.hasChest ? (
            <XPCardChest />
          ) : (
            <XPCardPoints
              points={item.gainedXp.toString()}
              isSumVisible={true}
            />
          )
        }
      />
    );
  });

  return (
    <>
      <div
        ref={wrapperRef}
        className="w-[17rem] min-[400px]:w-[20rem] md:w-[44rem] h-[2300px] xl:w-[57rem] xl:h-[2500px] mx-auto flex-col-centered mt-30"
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
    </>
  );
}
