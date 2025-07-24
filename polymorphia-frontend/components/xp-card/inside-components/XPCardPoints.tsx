import { XPCardPointsProps } from "@/components/xp-card/inside-components/types";
import "./index.css";

export default function XPCardPoints({
  points,
  isSumVisible = false,
}: XPCardPointsProps) {
  return (
    <div className="xp-card-points">
      <h1>{points} xp</h1>
      {isSumVisible && <h2>SUMA</h2>}
    </div>
  );
}
