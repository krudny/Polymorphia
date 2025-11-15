import { tv } from "tailwind-variants";
import clsx from "clsx";
import { ProgressBarTextLabelsProps } from "@/components/progressbar/types";
import "./index.css";

const textLabelsStyles = tv({
  base: "",
  variants: {
    size: {
      xs: "text-xl",
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default function ProgressBarTextLabels({
  textLabels,
  size,
  isHorizontal = true,
  className,
}: ProgressBarTextLabelsProps) {
  return (
    <div
      className={clsx(
        `progressbar-text-container ${isHorizontal ? "w-full min-h-16" : "h-full min-w-14"} ${className}`
      )}
    >
      {textLabels.map((label, i) => {
        const positionStyle = isHorizontal
          ? {
              left: `${(i / (textLabels.length - 1)) * 100}%`,
              transform: `translateX(-50%)`,
            }
          : {
              top: `${(i / (textLabels.length - 1)) * 100}%`,
              transform: `translateX(-50%) translateY(-50%)`,
            };

        return (
          <div
            key={i}
            className="progressbar-text-label"
            style={{
              ...positionStyle,
            }}
          >
            <span className={clsx(textLabelsStyles({ size }))}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
