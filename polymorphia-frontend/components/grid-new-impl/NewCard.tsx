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
  wide?: boolean;
}

export const newCardSizes: Record<
  NewCardMode,
  {
    height: { value: number; className: string };
    width: Record<0 | 1 | 2, { min: number; max: number; className: string }>;
    className: string;
  }
> = {
  NORMAL: {
    height: {
      value: 170,
      className: "h-[170px]",
    },
    width: {
      0: {
        min: 210,
        max: 310,
        className: "min-w-0 max-w-[310px]",
      },
      1: { min: 380, max: 480, className: "min-w-0 max-w-[480px]" },
      2: { min: 550, max: 650, className: "min-w-0 max-w-[650px]" },
    },
    className: "text-4xl",
  },
  COMPACT: {
    height: {
      value: 100,
      className: "h-[100px]",
    },
    width: {
      0: {
        min: 140,
        max: 260,
        className: "min-w-0 max-w-[260px]",
      },
      1: { min: 240, max: 360, className: "min-w-0 max-w-[360px]" },
      2: { min: 340, max: 460, className: "min-w-0 max-w-[460px]" },
    },
    className: "text-2xl",
  },
};

export default function NewCard({
  mode,
  title,
  subtitle,
  leftComponent,
  rightComponent,
  color,
  wide,
}: NewCardProps) {
  const accessories: 0 | 1 | 2 = Math.min(
    (leftComponent !== undefined ? 1 : 0) +
      (rightComponent !== undefined ? 1 : 0) +
      (wide ? 1 : 0),
    2
  ) as 0 | 1 | 2;

  return (
    <div
      className={clsx(
        "w-full flex flex-row bg-amber-100",
        newCardSizes[mode].width[accessories].className,
        newCardSizes[mode].height.className,
        newCardSizes[mode].className,
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
