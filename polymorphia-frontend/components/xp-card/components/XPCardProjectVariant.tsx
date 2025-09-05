import { ReactNode } from "react";
import { XPCardProjectVariantProps } from "@/components/xp-card/components/types";
import "./index.css";
import { colorVariants } from "@/components/xp-card/XPCard";

export default function XPCardProjectVariant({
  shortCode,
  color,
}: XPCardProjectVariantProps): ReactNode {
  return (
    <div
      className={`${colorVariants({ color }).backgroundSecondary()} xp-card-project-variant`}
    >
      <p>{shortCode}</p>
    </div>
  );
}
