import { ReactNode } from "react";
import { XPCardProjectVariantProps } from "@/components/xp-card/components/types";
import "./index.css";

export default function XPCardProjectVariant({
  shortCode,
}: XPCardProjectVariantProps): ReactNode {
  return (
    <div className="xp-card-project-variant">
      <p>{shortCode}</p>
    </div>
  );
}
