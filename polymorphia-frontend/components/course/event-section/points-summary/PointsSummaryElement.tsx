import { PointsSummaryElementProps } from "@/interfaces/course/event-section/PointsSummaryInterfaces";
import "./index.css";
import clsx from "clsx";
import { SquareMousePointer } from "lucide-react";

export default function PointsSummaryElement({
  bonus,
  onClick,
  horizontal = false,
}: PointsSummaryElementProps) {
  return (
    <div
      className={clsx(
        "points-summary-element",
        horizontal
          ? "points-summary-element-horizontal"
          : "points-summary-element-vertical",
        onClick && "points-summary-element-hover"
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "points-summary-element-header",
          onClick && "points-summary-element-header-offset"
        )}
      >
        {onClick && <SquareMousePointer className="text-neutral-500" />}
        <h1>{bonus.name}</h1>
      </div>
      <h2>{bonus.bonusXp}</h2>
    </div>
  );
}
