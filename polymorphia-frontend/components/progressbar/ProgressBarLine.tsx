import "./index.css";
import { ProgressBarLineProps } from "@/components/progressbar/types";

export default function ProgressBarLine({
  width,
  position,
  lineFill,
}: ProgressBarLineProps) {
  return (
    <div
      className="progressbar-line"
      style={{
        top: `${position}%`,
        height: `${width}`,
        transform: `translateY(25%)`,
      }}
    >
      <div style={{ height: `${lineFill}%` }} />
    </div>
  );
}
