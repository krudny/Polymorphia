import "./index.css";
import { ProgressBarLineProps } from "@/components/progressbar/types";

export default function ProgressBarLine({
  size,
  position,
  lineFill,
  isHorizontal,
}: ProgressBarLineProps) {
  return (
    <div
      className={`progressbar-line ${isHorizontal ? "progressbar-line-horizontal" : "progressbar-line-vertical"}`}
      style={{
        ...(isHorizontal
          ? { width: `${size}`, left: `calc(${position}% + 16px)` }
          : { height: `${size}`, top: `calc(${position}% + 16px)` }),
      }}
    >
      <div
        className="progressbar-line-fill"
        style={
          isHorizontal
            ? { width: `${lineFill}%`, height: "100%" }
            : { height: `${lineFill}%`, width: "100%" }
        }
      />
    </div>
  );
}
