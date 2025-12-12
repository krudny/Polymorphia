import { clsx } from "clsx";
import { NewCardPointsAccessoryProps } from "@/components/new-card/card/accessory/points/types";
import "./index.css";
import { NewCardModes } from "@/components/new-card/types";
import NewCardTextAccessory from "../text";

export default function NewCardPointsAccessory({
  mode,
  points,
  isSumLabelVisible = false,
  isXPLabelVisible = true,
  hasChest = false,
  shouldGrayOutReward = false,
  backgroundColor,
}: NewCardPointsAccessoryProps) {
  const topText = (points ?? "-") + (isXPLabelVisible ? " xp" : "");
  const bottomText = isSumLabelVisible ? "Suma" : undefined;
  const additionalView = hasChest ? (
    <div
      className={clsx(
        "absolute  flex-centered",
        mode === NewCardModes.NORMAL ? "bottom-3 right-3" : "bottom-2 right-2",
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
  ) : undefined;

  return (
    <NewCardTextAccessory
      topText={topText}
      bottomText={bottomText}
      additionalView={additionalView}
      backgroundColor={backgroundColor}
    />
  );
}
