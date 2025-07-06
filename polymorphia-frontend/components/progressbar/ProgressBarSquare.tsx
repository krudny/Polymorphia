import { SquareFillCalc } from "@/components/progressbar/ProgressBarUtil";
import "./progressbar.css";
import { ProgressBarSquareProps } from "@/components/progressbar/types";

export default function ProgressBarSquare({
  squareFill,
  position,
}: ProgressBarSquareProps) {
  return (
    <>
      <div className="progressbar-square" style={{ left: `${position}%` }}>
        <div
          className="bg-primary-gray dark:bg-primary-dark"
          style={{
            transform: "rotate(45deg)",
            transformOrigin: "center center",
          }}
        />
      </div>

      <div className="progressbar-square" style={{ left: `${position}%` }}>
        <div
          className="bg-primary-dark dark:bg-secondary-light dark:scale-105"
          style={{
            transform: "rotate(45deg)",
            transformOrigin: "center center",
            clipPath: SquareFillCalc(squareFill),
          }}
        />
      </div>
    </>
  );
}
