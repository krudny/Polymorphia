"use client";

import { useEffect } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import ProgressBar from "@/components/progressbar/ProgressBar";

export default function Roadmap() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Roadmapa");
  }, [setTitle]);

  return (
    <div className="w-fit min-h-screen mb-96 bg-yellow-200 mx-auto flex-col-centered mt-20">
      <ProgressBar
        minXP={0}
        currentXP={27}
        maxXP={100}
        numSquares={10}
        segmentSizes={[
          0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10,
        ]}
        horizontal={false}
        bottomTextLabels={[
          "Jajo",
          "Pisklak",
          "Podlot",
          "Żółtodziób",
          "Nieopierzony Odkrywca",
          "Samodzielny Zwierzak",
          "Majestatyczna Bestia",
          "Władca Polymorphii",
          "Majestatyczna Bestia",
          "Władca Polymorphii",
        ]}
      />
    </div>
  );
}
