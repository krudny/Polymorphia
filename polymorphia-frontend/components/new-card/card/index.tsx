import { tv } from "tailwind-variants";
import clsx from "clsx";
import { NewCardProps } from "@/components/new-card/card/types";
import {
  getCardMetrics,
  getCardStepCount,
  getCardStyles,
} from "@/components/new-card/card/metrics";
import { NewCardModes } from "../types";
import "./index.css";

export const colorVariants = tv({
  slots: {
    borderPrimary: "",
    borderSecondary: "",
    backgroundPrimary: "",
    backgroundSecondary: "",
  },
  variants: {
    color: {
      gold: {
        borderPrimary: "border-b-8 border-amber-400",
        borderSecondary: "border-b-4 border-amber-300",
        backgroundPrimary: "bg-amber-400",
        backgroundSecondary: "bg-amber-300",
      },
      silver: {
        borderPrimary: "border-b-8 border-slate-400",
        borderSecondary: "border-b-4 border-slate-300",
        backgroundPrimary: "bg-slate-400",
        backgroundSecondary: "bg-slate-300",
      },
      bronze: {
        borderPrimary: "border-b-8 border-amber-800",
        borderSecondary: "border-b-4 border-amber-700",
        backgroundPrimary: "bg-amber-800",
        backgroundSecondary: "bg-amber-600",
      },
      green: {
        borderPrimary: "border-b-8 border-primary-success",
        borderSecondary: "border-b-4 border-secondary-success",
        backgroundPrimary: "bg-primary-success",
        backgroundSecondary: "bg-secondary-success",
      },
      sky: {
        borderPrimary: "border-b-8 border-primary-sky",
        borderSecondary: "border-b-4 border-secondary-sky",
        backgroundPrimary: "bg-primary-sky",
        backgroundSecondary: "bg-secondary-sky",
      },
      gray: {
        borderPrimary: "border-b-8 border-primary-gray",
        borderSecondary:
          "border-b-4 border-secondary-gray dark:border-primary-dark",
        backgroundPrimary: "bg-primary-gray",
        backgroundSecondary: "bg-secondary-gray dark:bg-secondary-dark",
      },
    },
  },
});

export default function NewCard({
  mode,
  title,
  subtitle,
  leftComponent,
  rightComponent,
  color,
  sizeBonus,
  onClick,
  isLocked,
}: NewCardProps) {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={clsx(
        "relative w-full flex box-content drop-shadow-sm transition-all overflow-hidden bg-neutral-50 dark:bg-primary-dark",
        !isLocked
          ? colorVariants({ color }).borderPrimary()
          : colorVariants({ color: "gray" }).borderPrimary(),
        onClick && !isLocked
          ? "cursor-pointer hover:drop-shadow-xl"
          : "select-none",
        mode === NewCardModes.NORMAL ? "rounded-xl" : "rounded-lg",
        mode === NewCardModes.NORMAL
          ? "[&_h1]:text-4xl [&_h2]:text-2xl"
          : "[&_h1]:text-2xl [&_h2]:text-lg"
      )}
      style={getCardStyles({
        cardMetrics: getCardMetrics({
          mode,
          stepCount: getCardStepCount({
            leftComponent,
            rightComponent,
            sizeBonus,
          }),
        }),
      })}
    >
      <div
        className={clsx(
          "flex flex-1 flex-row w-full",
          isLocked && "grayscale filter"
        )}
      >
        {leftComponent && (
          <div className="aspect-square flex-centered h-full shrink-0 bg-green-200">
            {leftComponent(mode, color)}
          </div>
        )}
        <div
          className={clsx(
            "flex flex-col justify-center h-full px-5 min-w-0 flex-1",
            mode === NewCardModes.NORMAL ? "gap-3" : "gap-1"
          )}
        >
          <h1 className="truncate">{title}</h1>
          {subtitle && <h2 className="truncate">{subtitle}</h2>}
        </div>
        {rightComponent && (
          <div className="aspect-square flex-centered h-full shrink-0 bg-green-200">
            {rightComponent(mode, color)}
          </div>
        )}
      </div>
      {isLocked && (
        <div className="absolute inset-0 z-10 bg-secondary-gray/70 dark:bg-primary-dark/80 flex-col-centered">
          <span
            className={clsx(
              "material-symbols text-primary-dark",
              mode === NewCardModes.NORMAL ? "text-6xl" : "text-5xl"
            )}
          >
            lock
          </span>
        </div>
      )}
    </div>
  );
}
