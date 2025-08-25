import { XPCardUngradedProps } from "@/components/xp-card/components/types";
import "./index.css";
import clsx from "clsx";
import { colorVariants } from "@/components/xp-card/XPCard";

export default function XPCardUngraded({
  ungraded,
  color,
}: XPCardUngradedProps) {
  return (
    <div
      className={clsx(
        "xp-card-ungraded",
        colorVariants({ color }).backgroundSecondary()
      )}
    >
      <h1>{ungraded}</h1>
      <h2>Nieocenionych</h2>
    </div>
  );
}
