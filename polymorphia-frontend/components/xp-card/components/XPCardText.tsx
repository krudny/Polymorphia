import "./index.css";
import clsx from "clsx";
import {colorVariants} from "@/components/xp-card/XPCard";
import {ReactNode} from "react";
import {XPCardTextProps} from "@/components/xp-card/components/types";

export default function XPCardText({
  topText,
  bottomText,
  color,
}: XPCardTextProps): ReactNode {
  return (
    <div
      className={clsx(
        "xp-card-text",
        colorVariants({ color }).backgroundSecondary()
      )}
    >
      <h1>{topText}</h1>
      <h2>{bottomText}</h2>
    </div>
  );
}
