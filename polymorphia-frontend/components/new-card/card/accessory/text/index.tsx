import { clsx } from "clsx";
import { NewCardTextAccessoryProps } from "@/components/new-card/card/accessory/text/types";
import "./index.css";
import { colorVariants } from "@/components/new-card/card";

export default function NewCardTextAccessory({
  backgroundColor,
  topText,
  bottomText,
  additionalView,
}: NewCardTextAccessoryProps) {
  return (
    <div
      className={clsx(
        "w-full h-full flex-col-centered relative",
        colorVariants({ color: backgroundColor }).backgroundSecondary(),
        backgroundColor !== "gray" && "text-primary-dark"
      )}
    >
      {topText && <h1>{topText}</h1>}
      {bottomText && <h2>{bottomText}</h2>}
      {additionalView}
    </div>
  );
}
