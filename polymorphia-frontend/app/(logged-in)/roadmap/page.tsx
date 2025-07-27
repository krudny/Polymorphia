"use client";

import { useEffect } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import ProgressBar from "@/components/progressbar/ProgressBar";
import XPCard from "@/components/xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";
import { useFadeInAnimate } from "@/animations/FadeIn";

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
          // upperTextLabels={[
          //   "Jajo",
          //   "Pisklak",
          //   "Podlot",
          //   "Żółtodziób",
          //   "Nieopierzony Odkrywca",
          //   "Samodzielny Zwierzak",
          //   "Majestatyczna Bestia",
          //   "Władca Polymorphii",
          //   "Majestatyczna Bestia",
          //   "Władca Polymorphii",
          // ]}
          // bottomTextLabels={[
          //   "Jajo",
          //   "Pisklak",
          //   "Podlot",
          //   "Żółtodziób",
          //   "Nieopierzony Odkrywca",
          //   "Samodzielny Zwierzak",
          //   "Majestatyczna Bestia",
          //   "Władca Polymorphii",
          //   "Majestatyczna Bestia",
          //   "Władca Polymorphii",
          // ]}
        />
      </div>
      {/*<div className="w-[1400px] min-h-screen mb-96 bg-yellow-200 mx-auto flex-col-centered mt-20">*/}
      {/*  <ProgressBar*/}
      {/*    minXP={0}*/}
      {/*    currentXP={27}*/}
      {/*    maxXP={100}*/}
      {/*    numSquares={10}*/}
      {/*    segmentSizes={[*/}
      {/*      0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0,*/}
      {/*      10,*/}
      {/*    ]}*/}
      {/*    isHorizontal={true}*/}
      {/*    upperTextLabels={[*/}
      {/*      "Jajo",*/}
      {/*      "Pisklak",*/}
      {/*      "Podlot",*/}
      {/*      "Żółtodziób",*/}
      {/*      "Nieopierzony Odkrywca",*/}
      {/*      "Samodzielny Zwierzak",*/}
      {/*      "Majestatyczna Bestia",*/}
      {/*      "Władca Polymorphii",*/}
      {/*      "Majestatyczna Bestia",*/}
      {/*      "Władca Polymorphii",*/}
      {/*    ]}*/}
      {/*    // bottomTextLabels={[*/}
      {/*    //   "Jajo",*/}
      {/*    //   "Pisklak",*/}
      {/*    //   "Podlot",*/}
      {/*    //   "Żółtodziób",*/}
      {/*    //   "Nieopierzony Odkrywca",*/}
      {/*    //   "Samodzielny Zwierzak",*/}
      {/*    //   "Majestatyczna Bestia",*/}
      {/*    //   "Władca Polymorphii",*/}
      {/*    //   "Majestatyczna Bestia",*/}
      {/*    //   "Władca Polymorphii",*/}
      {/*    // ]}*/}
      {/*  />*/}
      {/*</div>*/}
    </>
  );
}
