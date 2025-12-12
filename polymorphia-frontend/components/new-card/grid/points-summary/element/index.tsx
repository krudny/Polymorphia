import { NewPointsSummaryElementProps } from "@/components/new-card/grid/points-summary/element/types";
import { getPointsSummaryElementStyles } from "@/components/new-card/grid/points-summary/element/metrics";
import clsx from "clsx";

export default function NewPointsSummaryElement({
  bonus,
  mode,
}: NewPointsSummaryElementProps) {
  return (
    <div
      className={clsx("flex-centered bg-purple-300 w-full h-full")}
      style={getPointsSummaryElementStyles({ mode })}
    >
      {bonus.gainedXp} xp
    </div>
  );
}
