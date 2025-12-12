import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { XPCardColor } from "../xp-card/types";
import clsx from "clsx";

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

// Important: from largest to smallest!
export const NewCardModes = {
  NORMAL: "NORMAL",
  COMPACT: "COMPACT",
} as const;

export type NewCardMode = (typeof NewCardModes)[keyof typeof NewCardModes];

export interface NewCardProps {
  mode: NewCardMode;
  title: string;
  subtitle?: string;
  leftComponent?: (mode: NewCardMode, color: XPCardColor) => ReactNode;
  rightComponent?: (mode: NewCardMode, color: XPCardColor) => ReactNode;
  onClick?: () => void;
  color: XPCardColor;
  sizeBonus?: number;
}

interface BaseCardMetrics {
  height: number;
  baseMinWidth: number;
  baseMaxWidth: number;
  widthStep: number;
  textClassName: string;
}

interface EvaluatedCardMetrics {
  height: number;
  minWidth: number;
  maxWidth: number;
  textClassName: string;
}

export const CARD_METRICS: Record<NewCardMode, BaseCardMetrics> = {
  [NewCardModes.NORMAL]: {
    height: 170,
    baseMinWidth: 210,
    baseMaxWidth: 290,
    widthStep: 170,
    textClassName: "text-4xl",
  },
  [NewCardModes.COMPACT]: {
    height: 100,
    baseMinWidth: 140,
    baseMaxWidth: 260,
    widthStep: 100,
    textClassName: "text-2xl",
  },
};

interface GetCardMetricsProps {
  mode: NewCardMode;
  stepCount: number;
}

export function getCardMetrics({
  mode,
  stepCount,
}: GetCardMetricsProps): EvaluatedCardMetrics {
  return {
    height: CARD_METRICS[mode].height,
    minWidth:
      CARD_METRICS[mode].baseMinWidth +
      stepCount * CARD_METRICS[mode].widthStep,
    maxWidth:
      CARD_METRICS[mode].baseMaxWidth +
      stepCount * CARD_METRICS[mode].widthStep,
    textClassName: CARD_METRICS[mode].textClassName,
  };
}

export function getCardStepCount({
  leftComponent,
  rightComponent,
  sizeBonus,
}: Pick<NewCardProps, "leftComponent" | "rightComponent" | "sizeBonus">) {
  return (
    (leftComponent !== undefined ? 1 : 0) +
    (rightComponent !== undefined ? 1 : 0) +
    (sizeBonus ?? 0)
  );
}

interface GetCardClassNameProps {
  cardMetrics: EvaluatedCardMetrics;
}

function getCardClassName({ cardMetrics }: GetCardClassNameProps) {
  return `${cardMetrics.textClassName} h-[${cardMetrics.height}px] min-w-0 max-w-[${cardMetrics.maxWidth}px]`;
}

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
