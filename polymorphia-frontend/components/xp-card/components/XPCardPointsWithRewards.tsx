import { XPCardPointsProps } from "@/components/xp-card/components/types";
import clsx from "clsx";
import { colorVariants } from "@/components/xp-card/XPCard";

export default function XPCardPointsWithRewards({
  points,
  isSumLabelVisible = false,
  isXPLabelVisible = true,
  hasChest = false,
  color,
}: XPCardPointsProps) {
  return (
    <div className="w-full h-full flex items-center justify-end bg-green-300">
      {hasChest && (
        <div className="w-fit px-4 flex-col-centered">
          <span className="material-symbols text-4xl">trophy</span>
        </div>
      )}
      <div
        className={clsx(
          "aspect-square h-full flex-col-centered",
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
