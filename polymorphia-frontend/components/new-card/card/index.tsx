import { tv } from "tailwind-variants";
import clsx from "clsx";
import { NewCardProps } from "@/components/new-card/card/types";
import {
  getCardClassName,
  getCardMetrics,
  getCardStepCount,
} from "@/components/new-card/card/metrics";

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
}: NewCardProps) {
  return (
    <div
      className={clsx(
        "w-full flex flex-row bg-amber-100",
        getCardClassName({
          cardMetrics: getCardMetrics({
            mode,
            stepCount: getCardStepCount({
              leftComponent,
              rightComponent,
              sizeBonus,
            }),
          }),
        }),
        colorVariants({ color }).borderPrimary()
      )}
    >
      {leftComponent && (
        <div className="aspect-square flex-centered h-full shrink-0 bg-green-200">
          {leftComponent(mode, color)}
        </div>
      )}
      <div className="flex flex-col justify-center h-full px-5 min-w-0 flex-1">
        <h1 className="truncate">{title}</h1>
        {subtitle && <h2 className="truncate">{subtitle}</h2>}
      </div>
      {rightComponent && (
        <div className="aspect-square flex-centered h-full shrink-0 bg-green-200">
          {rightComponent(mode, color)}
        </div>
      )}
    </div>
  );
}
