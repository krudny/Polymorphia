import { XPCardUngradedProps } from "@/components/xp-card/components/types";
import "./index.css";

export default function XPCardUngraded({ ungraded }: XPCardUngradedProps) {
  return (
    <div className="xp-card-points">
      <h1>{ungraded}</h1>
      <h2>Nieocenionych</h2>
    </div>
  );
}
