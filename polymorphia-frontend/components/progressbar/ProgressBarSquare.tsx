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
          className="bg-neutral-400"
          style={{
            transform: "rotate(45deg)",
            transformOrigin: "center center",
          }}
        />
      </div>

      <div className="progressbar-square" style={{ left: `${position}%` }}>
        <div
          className="bg-neutral-800"
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
