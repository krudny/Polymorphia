import { XPCardPointsProps } from "@/components/xp-card/components/types";
import clsx from "clsx";
import { colorVariants } from "@/components/xp-card/XPCard";
import "./index.css";

export default function XPCardPointsWithRewards({
  points,
  isSumLabelVisible = false,
  isXPLabelVisible = true,
  hasChest = false,
  color,
}: XPCardPointsProps) {
  return (
    <div className="xp-card-points-with-rewards">
      {hasChest && (
        <div className="xp-card-points-with-rewards-chest">
          <span>trophy</span>
        </div>
      )}
      <div
        className={clsx(
          "xp-card-points-with-rewards-points",
          colorVariants({ color }).backgroundSecondary(),
          `${color !== "gray" && "text-primary-dark"}`
        )}
      >
        <h1>
          {points || "-"} {isXPLabelVisible && "xp"}
        </h1>
        {isSumLabelVisible && <h2>Suma</h2>}
      </div>
    </div>
  );
}
