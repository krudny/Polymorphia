import { NewPointsSummaryElementProps } from "@/components/new-card/grid/points-summary/element/types";
import { getPointsSummaryElementStyles } from "@/components/new-card/grid/points-summary/element/metrics";
import clsx from "clsx";
import { SquareMousePointer } from "lucide-react";
import { NewCardModes } from "@/components/new-card/types";

export default function NewPointsSummaryElement({
  bonus,
  mode,
  onClick,
  inline,
  isDesktop,
}: NewPointsSummaryElementProps) {
  return (
    <div
      className={clsx(
        "w-full flex text-shadow-sm gap-1",
        inline
          ? "flex-row justify-end items-end gap-5"
          : "flex-col justify-center items-end h-full",
        onClick && "cursor-pointer hover:text-shadow-lg"
      )}
      style={getPointsSummaryElementStyles({ mode })}
    >
      <div className="flex flex-row items-center gap-4">
        {onClick && <SquareMousePointer className="text-neutral-500" />}
        <h1
          className={clsx(
            "text-nowrap",
            !inline && (mode === NewCardModes.NORMAL ? "text-5xl" : "text-3xl"),
            inline && (mode === NewCardModes.NORMAL ? "text-7xl" : "text-5xl")
          )}
        >
          {bonus.title}
        </h1>
      </div>
      <h2
        className={clsx(
          "text-nowrap",
          mode === NewCardModes.NORMAL ? "text-7xl" : "text-5xl"
        )}
      >
        {bonus.gainedXp} xp
      </h2>
    </div>
  );
}
