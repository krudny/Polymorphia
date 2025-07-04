import { tv } from "tailwind-variants";

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

interface UserPointsProps {
  separators?: boolean;
  titleSize?: "xs" | "sm" | "md" | "lg" | "xl";
  xpSize?: "xs" | "sm" | "md" | "lg" | "xl";
  xpDetails: Record<string, number>;
}

export default function UserPoints({
  separators = false,
  titleSize = "md",
  xpSize = "xl",
  xpDetails,
}: UserPointsProps) {
  const items = Object.entries(xpDetails);

  return (
    <div className="w-full h-full grid grid-cols-4 sm:gap-1 lg:px-2">
      {items.map(([item, xp], i) => (
        <div
          className={`flex-col-centered min-h-fit lg:min-h-24 my-auto ${
            separators && i !== items.length - 1
              ? "sm:border-r-[1px] border-primary-dark dark:border-secondary-light"
              : ""
          }`}
          key={i}
        >
          <h2 className={headerVariant({ size: titleSize })}>{item}</h2>
          <h1
            className={`${xpSize === "lg" || xpSize === "xl" ? "mt-3" : ""} ${headerVariant({ size: xpSize })}`}
          >
            {xp.toFixed(2)}
          </h1>
        </div>
      ))}
    </div>
  );
}
