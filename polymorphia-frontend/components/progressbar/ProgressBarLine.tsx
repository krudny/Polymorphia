import { ProgressBarLineProps } from "@/interfaces/progressbar/ProgressBarInterfaces";
import "../../styles/progressbar.css";

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
