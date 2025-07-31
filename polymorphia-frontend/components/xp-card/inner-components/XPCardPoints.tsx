import { XPCardPointsProps } from "@/components/xp-card/inner-components/types";
import "./index.css";

export default function XPCardPoints({
  points,
  isSumLabelVisible = false,
  isXPLabelVisible = true,
}: XPCardPointsProps) {
  return (
    <div className="xp-card-points">
      <h1>
        {points} {isXPLabelVisible && <span>xp</span>}
      </h1>
      {isSumLabelVisible && <h2>Suma</h2>}
    </div>
  );
}
