import { PointsSummaryElementProps } from "@/components/course/event-section/points-summary/types";
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
        <h1>{bonus.title}</h1>
      </div>
      <h2>{bonus.data.xp} xp</h2>
    </div>
  );
}
