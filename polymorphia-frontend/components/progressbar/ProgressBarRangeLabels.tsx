import "./index.css";
import { ProgressBarRangeLabelsProps } from "@/components/progressbar/types";
import clsx from "clsx";

export default function ProgressBarRangeLabels({
  minXP,
  currentXP,
  maxXP,
  isHorizontal = true,
}: ProgressBarRangeLabelsProps) {
  const getLabelProps = (position: string) => ({
    style: isHorizontal ? { left: position } : { top: position },
    className: clsx(
      "progressbar-range-label",
      isHorizontal
        ? "-translate-x-1/2 -translate-y-1/4"
        : "translate-x-1/2 -translate-y-1/2"
    ),
  });

  return (
    <div className="progressbar-range-container">
      <div {...getLabelProps("0")}>
        <span>{minXP} xp</span>
      </div>
      {currentXP && (
        <div {...getLabelProps("50%")}>
          <span className="!text-4xl">{currentXP} xp</span>
        </div>
      )}
      <div {...getLabelProps("100%")}>
        <span>{maxXP} xp</span>
      </div>
    </div>
  );
}
