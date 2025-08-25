import clsx from "clsx";
import { tv } from "tailwind-variants";
import "./index.css";
import { XPCardProps, XPCardVariantProps } from "@/components/xp-card/types";

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
        borderSecondary: "border-b-4 border-secondary-gray",
        backgroundPrimary: "bg-primary-gray",
        backgroundSecondary: "bg-secondary-gray dark:bg-secondary-dark",
      },
    },
  },
});

const xpCard = tv({
  base: "xp-card",
  variants: {
    size: {
      xs: "xp-card-xs",
      sm: "xp-card-sm",
      md: "xp-card-md",
      lg: "xp-card-lg",
      hofDesktop: "xp-card-hall-of-fame-desktop",
      projectGroup: "xp-card-project-group",
    },
    forceWidth: {
      true: "xp-card-force-width",
      false: "",
    },
    isLocked: {
      true: "xp-card-locked",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    color: "none",
    forceWidth: false,
    isLocked: false,
  },
});

export default function XPCard({
                                 title,
                                 subtitle,
                                 leftComponent,
                                 rightComponent,
                                 onClick,
                                 size,
                                 color,
                                 forceWidth,
                                 isLocked,
                               }: XPCardProps & XPCardVariantProps) {
  return (
    <div
      className={clsx(
        xpCard({ size, forceWidth }),
        colorVariants({ color }).borderPrimary(),
        onClick && "xp-card-hover",
        isLocked && "pointer-events-none border-none",
      )}
      onClick={onClick}
    >
      {isLocked && (
        <div className="xp-card-locked">
          <span className="material-symbols">lock</span>
        </div>
      )}
      {leftComponent && (
        <div className="xp-card-component xp-card-left-component">
          {leftComponent}
        </div>
      )}
      <div className="xp-card-middle">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      {rightComponent && (
        <div className="xp-card-component xp-card-right-component">
          {rightComponent}
        </div>
      )}
    </div>
  );
}
