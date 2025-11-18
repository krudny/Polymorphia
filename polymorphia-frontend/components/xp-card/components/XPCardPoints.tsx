import { XPCardPointsProps } from "@/components/xp-card/components/types";
import "./index.css";
import clsx from "clsx";
import { colorVariants } from "@/components/xp-card/XPCard";

export default function XPCardPoints({
  points,
  isSumLabelVisible = false,
  isXPLabelVisible = true,
  hasChest = false,
  shouldGreyOutReward = false,
  color,
}: XPCardPointsProps) {
  return (
    <div
      className={clsx(
        "xp-card-points",
        colorVariants({ color }).backgroundSecondary(),
        `${color !== "gray" && "text-primary-dark"}`
      )}
    >
      <h1>
        {points !== null ? points : "-"} {isXPLabelVisible && "xp"}
      </h1>
      {isSumLabelVisible && <h2>Suma</h2>}
      {hasChest && (
        <div
          className={clsx("xp-card-points-has-chest", {
            "text-gray-400": shouldGreyOutReward,
          })}
        >
          <span className="material-symbols">trophy</span>
        </div>
      )}
    </div>
  );
}
