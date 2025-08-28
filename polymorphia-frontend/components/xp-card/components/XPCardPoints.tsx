import { XPCardPointsProps } from "@/components/xp-card/components/types";
import "./index.css";
import clsx from "clsx";
import { colorVariants } from "@/components/xp-card/XPCard";

export default function XPCardPoints({
                                       points,
                                       isSumLabelVisible = false,
                                       isXPLabelVisible = true,
                                       hasChest = false,
                                       color,
                                     }: XPCardPointsProps) {
  return (
    <div
      className={clsx(
        "xp-card-points",
        colorVariants({ color }).backgroundSecondary(),
      )}
    >
      <h1>
        {points || "-"} {isXPLabelVisible && "xp"}
      </h1>
      {isSumLabelVisible && <h2>Suma</h2>}
      {hasChest && (
        <div className="absolute bottom-0 right-0 mr-2 mb-2 text-xl">
          <span className="material-symbols">featured_seasonal_and_gifts</span>
        </div>
      )}
    </div>
  );
}
