import { XPCardAssignProps } from "@/components/xp-card/components/types";
import "./index.css";
import { colorVariants } from "@/components/xp-card/XPCard";

export default function XPCardAssign({
  currentAssigned,
  maxAssigned,
  increment,
  decrement,
  color,
}: XPCardAssignProps) {
  return (
    <div
      className={`xp-card-assign ${colorVariants({ color }).backgroundSecondary()}`}
    >
      <h1>
        {currentAssigned} / {maxAssigned}
      </h1>
      <div className="xp-card-assign-wrapper">
        <div className="xp-card-assign-button" onClick={increment}>
          <span>add</span>
        </div>
        <div className="xp-card-assign-button" onClick={decrement}>
          <span>remove</span>
        </div>
      </div>
    </div>
  );
}
