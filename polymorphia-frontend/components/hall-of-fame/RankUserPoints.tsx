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

interface RankUserPointsProps {
  separators?: boolean;
  titleSize?: "xs" | "sm" | "md" | "lg" | "xl";
  xpSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function RankUserPoints({
  separators = false,
  titleSize = "md",
  xpSize = "xl",
}: RankUserPointsProps) {
  const items = [
    ["Laboratoria", 40],
    ["Kartkówki", 20],
    ["Projekt", 60],
    ["Bonusy", 15.2],
  ];

  return (
    <div className="w-full h-full grid grid-cols-4 sm:gap-1 px-2">
      {items.map(([item, xp], i) => (
        <div
          className={`flex-col-centered min-h-24 my-auto ${
            separators && i !== items.length - 1
              ? "sm:border-r-[1px] border-[#212121]"
              : ""
          }`}
          key={i}
        >
          <h2 className={headerVariant({ size: titleSize })}>{item}</h2>
          <h1
            className={`${xpSize === "lg" || xpSize === "xl" ? "mt-3" : ""} ${headerVariant({ size: xpSize })}`}
          >
            {xp} xp
          </h1>
        </div>
      ))}
    </div>
  );
}
