import { tv } from "tailwind-variants";

export const equipmentVariants = tv({
  slots: {
    lockedText: "",
    badgeContainer: "",
  },
  variants: {
    size: {
      sm: {
        lockedText: "text-4xl",
        badgeContainer: "text-xl w-7",
      },
      md: {
        lockedText: "text-5xl",
        badgeContainer: "text-2xl w-9",
      },
      lg: {
        lockedText: "text-7xl",
        badgeContainer: "text-3xl w-10",
      },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});
