import { clsx } from "clsx";
import { NewCardPointsAccessoryProps } from "@/components/new-card/card/accessory/points/types";
import "./index.css";
import { colorVariants } from "@/components/new-card/card";

export default function NewCardPointsAccessory({
  points,
  isSumLabelVisible = false,
  isXPLabelVisible = true,
  hasChest = false,
  shouldGrayOutReward = false,
  backgroundColor,
}: NewCardPointsAccessoryProps) {
  const displayXp = points ?? "-";

  return (
    <div
      className={clsx(
        "w-full h-full flex-col-centered relative",
        colorVariants({ color: backgroundColor }).backgroundSecondary(),
        backgroundColor !== "gray" && "text-primary-dark"
      )}
    >
      <h1>
        {displayXp}
        {isXPLabelVisible && " xp"}
      </h1>

      {isSumLabelVisible && <h2>Suma</h2>}

      {hasChest && (
        <div
          className={clsx(
            "absolute bottom-1 right-1 flex-centered",
            shouldGrayOutReward && "text-neutral-400"
          )}
        >
          <span className="material-symbols text-xl leading-none">trophy</span>
        </div>
      )}
    </div>
  );
}
