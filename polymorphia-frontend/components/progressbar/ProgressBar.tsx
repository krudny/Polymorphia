import ProgressBarLine from "@/components/progressbar/ProgressBarLine";
import {
  FillsCalc,
  isProgressBarInputValid,
} from "@/components/progressbar/ProgressBarUtil";
import toast from "react-hot-toast";
import "./index.css";
import { ProgressBarProps } from "@/components/progressbar/types";
import ProgressBarSquare from "@/components/progressbar/ProgressBarSquare";

export default function ProgressBar(props: ProgressBarProps) {
  console.log(props);
  if (!isProgressBarInputValid(props)) {
    toast.error("Invalid progress bar config");
    return null;
  }

  const {
    minXP = 0,
    currentXP = 5.5,
    maxXP = 100,
    numSquares = 2,
    segmentSizes,
    upperElement,
    lowerElement,
    isHorizontal = true,
  } = props;

  const scaledCurrentXP = ((currentXP - minXP) / (maxXP - minXP)) * 100;
  const fills = FillsCalc(0, 100, scaledCurrentXP, segmentSizes);

  return (
    <div
      className={`${isHorizontal ? "progressbar-horizontal" : "progressbar-vertical"}`}
    >
      {upperElement && (
        <div className="progressbar-label-container">{upperElement}</div>
      )}

      <div
        className={`${isHorizontal ? "progressbar-container-horizontal" : "progressbar-container-vertical"}`}
      >
        {Array.from({ length: numSquares - 1 }, (_, index) => {
          const size = `calc((100% - ${(numSquares - 1) * 2}rem) / ${numSquares - 1})`;
          return (
            <ProgressBarLine
              key={index}
              position={(index / (numSquares - 1)) * 100}
              size={size}
              lineFill={fills[2 * index + 1]}
              isHorizontal={isHorizontal}
            />
          );
        })}

        {Array.from({ length: numSquares }).map((_, index) => (
          <ProgressBarSquare
            key={index}
            squareFill={fills[2 * index]}
            position={(index / (numSquares - 1)) * 100}
            isHorizontal={isHorizontal}
          />
        ))}
      </div>

      {lowerElement && (
        <div className="progressbar-label-container">{lowerElement}</div>
      )}
    </div>
  );
}
