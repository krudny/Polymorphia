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
    <>
      <div className="w-fit h-[1800px] mb-40 bg-yellow-200 mx-auto flex-col-centered mt-20">
        <ProgressBar
          minXP={0}
          currentXP={27}
          maxXP={100}
          numSquares={10}
          segmentSizes={[
            0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0,
            10,
          ]}
          isHorizontal={false}
          upperTextLabels={[
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
      <div className="w-[1400px] min-h-screen mb-96 bg-yellow-200 mx-auto flex-col-centered mt-20">
        <ProgressBar
          minXP={0}
          currentXP={27}
          maxXP={100}
          numSquares={10}
          segmentSizes={[
            0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0,
            10,
          ]}
          isHorizontal={true}
          upperTextLabels={[
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
    </>
  );
}
