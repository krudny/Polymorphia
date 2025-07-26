import { XPCardPointsProps } from "@/components/xp-card/inner-components/types";
import "./index.css";

export default function XPCardPoints({
  points,
  isSumVisible = false,
  isXPVisible = true,
}: XPCardPointsProps) {
  return (
    <div className="xp-card-points">
      <h1>
        {points} {isXPVisible && <span>xp</span>}
      </h1>
      {isSumVisible && <h2>Suma</h2>}
    </div>
  );
}
