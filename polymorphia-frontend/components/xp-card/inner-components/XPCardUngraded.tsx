import { XPCardUngradedProps } from "@/components/xp-card/inner-components/types";

export default function XPCardUngraded({ ungraded }: XPCardUngradedProps) {
  return (
    <div className="xp-card-points">
      <h1>{ungraded}</h1>
      <h2>Nieocenionych</h2>
    </div>
  );
}
