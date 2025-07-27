"use client";

import { useEffect } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import ProgressBar from "@/components/progressbar/ProgressBar";
import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";
import { useFadeInAnimate } from "@/animations/FadeIn";
import ProgressBarElement from "@/components/progressbar/ProgressBarElement";

export default function Roadmap() {
  const { setTitle } = useTitle();
  const wrapperRef = useFadeInAnimate();

  useEffect(() => {
    setTitle("Roadmapa");
  }, [setTitle]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="w-[55rem] h-[2500px] mb-40 mx-auto flex-col-centered mt-32"
      >
        <ProgressBar
          minXP={0}
          currentXP={27}
          maxXP={100}
          numSquares={20}
          segmentSizes={Array.from({ length: 39 }, (_, i) =>
            i % 2 === 0 ? 0 : +(100 / 19).toFixed(8)
          )}
          isHorizontal={false}
          upperElement={
            <ProgressBarElement
              elements={Array.from({ length: 20 }, (_, i) => (
                <XPCard
                  title={`Laboratorium ${i}`}
                  subtitle="Interfejsy i mapy"
                  key={i}
                  color={i < 6 ? "green" : "silver"}
                  size="md"
                  component={<XPCardPoints points="3.7" isSumVisible={true} />}
                />
              ))}
              isUpper={true}
              isHorizontal={false}
            />
          }
          lowerElement={
            <ProgressBarElement
              elements={Array.from({ length: 20 }, (_, i) => (
                <XPCard
                  title={`Laboratorium ${i}`}
                  subtitle="Interfejsy i mapy"
                  key={i}
                  color={i < 6 ? "green" : "silver"}
                  size="md"
                  component={<XPCardPoints points="3.7" isSumVisible={true} />}
                />
              ))}
              isUpper={false}
              isHorizontal={false}
            />
          }
        />
      </div>
    </>
  );
}
