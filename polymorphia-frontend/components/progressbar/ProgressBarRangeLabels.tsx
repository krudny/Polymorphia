import "./progressbar.css";
import { ProgressBarRangeLabelsProps } from "@/components/progressbar/types";

export default function ProgressBarRangeLabels({
  minXP,
  currentXP,
  maxXP,
}: ProgressBarRangeLabelsProps) {
  return (
    <div className="progressbar-range-container">
      <div className="progressbar-range-label left-0">
        <span>{minXP} xp</span>
      </div>

      <div className="progressbar-range-label left-1/2 -top-2">
        <span className="!text-4xl">{currentXP} xp</span>
      </div>

      <div className="progressbar-range-label left-full">
        <span>{maxXP} xp</span>
      </div>
    </div>
  );
}
