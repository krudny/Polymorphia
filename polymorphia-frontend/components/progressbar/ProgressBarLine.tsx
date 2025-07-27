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
          ? { width: `${size}`, left: `${position}%` }
          : { height: `${size}`, top: `${position}%` }),
        transform: `${isHorizontal ? "translateX(25%)" : "translateY(25%)"}`,
      }}
    >
      <div style={{ height: `${lineFill}%` }} />
    </div>
  );
}
