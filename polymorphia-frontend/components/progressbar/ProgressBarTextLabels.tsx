import { tv } from "tailwind-variants";
import clsx from "clsx";
import { ProgressBarTextLabelsProps } from "@/components/progressbar/types";
import "./index.css";

const textLabelsStyles = tv({
  base: "",
  variants: {
    size: {
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default function ProgressBarTextLabels({
  textLabels,
  size,
}: ProgressBarTextLabelsProps) {
  return (
    <div className="progressbar-text-container">
      {textLabels.map((label, i) => (
        <div
          key={i}
          className="progressbar-text-label"
          style={{
            top: `${(i / (textLabels.length - 1)) * 100}%`,
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <span className={clsx(textLabelsStyles({ size }))}>{label}</span>
        </div>
      ))}
    </div>
  );
}
