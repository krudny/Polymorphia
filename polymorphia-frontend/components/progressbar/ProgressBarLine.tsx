import "./progressbar.css";
import { ProgressBarLineProps } from "@/components/progressbar/types";

export default function ProgressBarLine({
  width,
  position,
  lineFill,
}: ProgressBarLineProps) {
  return (
    <div
      className="progressbar-line"
      style={{ left: `${position}%`, width: `${width}` }}
    >
      <div style={{ width: `${lineFill}%` }} />
    </div>
  );
}
