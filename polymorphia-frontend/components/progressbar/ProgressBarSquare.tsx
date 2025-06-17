import { SquareFillCalc } from "@/components/progressbar/ProgressBarUtil";
import "../../styles/progressbar.css";

export default function ProgressBarSquare({
  squareFill,
  position,
}: {
  squareFill: number;
  position: number;
}) {
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
