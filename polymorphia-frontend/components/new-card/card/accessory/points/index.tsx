import { clsx } from "clsx";
import { NewCardPointsAccessoryProps } from "@/components/new-card/card/accessory/points/types";
import "./index.css";
import { colorVariants } from "@/components/new-card/card";
import { NewCardModes } from "@/components/new-card/types";

export default function NewCardPointsAccessory({
  mode,
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
        backgroundColor !== "gray" && "text-primary-dark",
        mode === NewCardModes.NORMAL ? "gap-3" : "gap-1"
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
            "absolute  flex-centered",
            mode === NewCardModes.NORMAL
              ? "bottom-3 right-3"
              : "bottom-2 right-2",
            shouldGrayOutReward && "text-neutral-400"
          )}
        >
          <span
            className={clsx(
              "material-symbols leading-none",
              mode === NewCardModes.NORMAL ? "text-2xl" : "text-lg"
            )}
          >
            trophy
          </span>
        </div>
      )}
    </div>
  );
}
