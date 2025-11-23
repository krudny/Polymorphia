import { tv } from "tailwind-variants";
import { UserPointsProps } from "@/components/user-points/types";
import "./index.css";
import { Sizes } from "@/interfaces/general";
import clsx from "clsx";

const headerVariant = tv({
  base: "transition-all",
  variants: {
    size: {
      xs: "text-xl",
      sm: "text-2xl",
      md: "text-4xl",
      lg: "text-5xl",
      xl: "text-6xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default function UserPoints({
  separators = false,
  titleSize = "md",
  xpSize = Sizes.XL,
  xpDetails,
}: UserPointsProps) {
  const items = Object.entries(xpDetails);
  const columns = Math.max(1, Math.min(4, items.length));

  return (
    <div className={clsx("user-points", `grid-cols-${columns}`)}>
      {items.map(([item, xp], i) => (
        <div
          className={`user-point ${separators && i !== items.length - 1 ? "user-point-separators" : ""}`}
          key={i}
        >
          <h2 className={headerVariant({ size: titleSize })}>{item}</h2>
          <h1
            className={`${xpSize === "lg" || xpSize === "xl" ? "mt-3" : ""} ${headerVariant({ size: xpSize })}`}
          >
            {xp}
          </h1>
        </div>
      ))}
    </div>
  );
}
