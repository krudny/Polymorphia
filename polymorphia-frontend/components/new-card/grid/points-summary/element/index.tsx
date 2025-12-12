import { NewPointsSummaryElementProps } from "@/components/new-card/grid/points-summary/element/types";
import { getPointsSummaryElementClassName } from "@/components/new-card/grid/points-summary/element/metrics";
import clsx from "clsx";

export default function NewPointsSummaryElement({
  bonus,
  mode,
}: NewPointsSummaryElementProps) {
  return (
    <div
      className={clsx(
        "flex-centered bg-purple-300 w-full h-full",
        getPointsSummaryElementClassName({ mode })
      )}
    >
      {bonus.gainedXp} xp
    </div>
  );
}
