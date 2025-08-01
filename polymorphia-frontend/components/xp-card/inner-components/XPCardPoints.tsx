import { XPCardPointsProps } from "@/components/xp-card/inner-components/types";
import "./index.css";

export default function XPCardPoints({
  points,
  isSumVisible = false,
  isXPVisible = true,
  hasChest = false,
}: XPCardPointsProps) {
  return (
    <div className="xp-card-points">
      <h1>
        {points} {isXPVisible && "xp"}
      </h1>
      {isSumVisible && <h2>Suma</h2>}
      {hasChest && (
        <div className="absolute bottom-0 right-0 mr-2 text-xl">
          <span className="material-symbols">featured_seasonal_and_gifts</span>
        </div>
      )}
    </div>
  );
}
