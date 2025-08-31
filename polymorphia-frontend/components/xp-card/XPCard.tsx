import clsx from "clsx";
import { tv } from "tailwind-variants";
import Image from "next/image";
import "./index.css";
import { XPCardProps, XPCardVariantProps } from "@/components/xp-card/types";

const xpCard = tv({
  base: "xp-card",
  variants: {
    size: {
      xs: "xp-card-xs",
      sm: "xp-card-sm",
      md: "xp-card-md",
      lg: "xp-card-lg",
      hofDesktop: "xp-card-hall-of-fame-desktop",
    },
    color: {
      gold: "border-b-6 border-amber-400",
      silver: "border-b-6 border-slate-400",
      bronze: "border-b-6 border-amber-800",
      green: "border-b-6 border-green-600",
      none: "border-0",
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
  component,
  image,
  onClick,
  size,
  color,
  forceWidth,
  isLocked,
}: XPCardProps & XPCardVariantProps) {
  return (
    <div
      className={clsx(
        xpCard({ size, color, forceWidth }),
        onClick && "xp-card-hover",
        isLocked && "pointer-events-none border-none"
      )}
      onClick={onClick}
    >
      {image && (
        <div className="xp-card-image">
          <Image src={image.url} alt={image.alt} fill />
        </div>
      )}
      {isLocked && (
        <div className="xp-card-locked">
          <span className="material-symbols">lock</span>
        </div>
      )}
      <div className="xp-card-middle">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="xp-card-component">{component}</div>
    </div>
  );
}
