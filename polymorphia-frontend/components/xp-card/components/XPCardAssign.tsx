import { XPCardAssignProps } from "@/components/xp-card/components/types";
import "./index.css";

export default function XPCardAssign({
  currentAssigned,
  maxAssigned,
  increment,
  decrement,
}: XPCardAssignProps) {
  return (
    <div className="w-full flex-1 flex-col-centered bg-secondary-gray">
      <h1>
        {currentAssigned} / {maxAssigned}
      </h1>
      <div className="w-4/5 flex justify-between -mb-2">
        <div
          className="w-8 h-8 rounded flex-col-centered select-none hover:bg-primary-gray"
          onClick={increment}
        >
          <span className="material-symbols text-2xl">add</span>
        </div>
        <div
          className="w-8 h-8 rounded flex-col-centered select-none hover:bg-primary-gray"
          onClick={decrement}
        >
          <span className="material-symbols text-2xl">remove</span>
        </div>
      </div>
    </div>
  );
}
