import React from "react";
import { ButtonWithBorderProps, VariantProps } from "@/components/button/types";
import clsx from "clsx";
import { tv } from "tailwind-variants";
import "./index.css";

const buttonWithBorder = tv({
  base: "button-with-border",
  variants: {
    size: {
      sm: "text-xl px-6 py-1",
      base: "text-2xl px-7 py-1",
      md: "text-3xl px-8 py-2",
      lg: "text-4xl px-10 py-3",
    },
    isActive: {
      false: "pointer-events-none",
      true: "",
    },
    forceDark: {
      true: "button-with-border-dark",
      false: "button-with-border-dark button-with-border-light",
    },
  },
  defaultVariants: {
    size: "md",
    forceDark: false,
  },
});

export default function ButtonWithBorder({
  text,
  onClick,
  className,
  size = "md",
  isActive = true,
  forceDark,
  icon,
}: ButtonWithBorderProps & VariantProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        buttonWithBorder({ size, isActive, forceDark }),
        icon && "button-use-flex",
        className
      )}
    >
      {icon && <span className="material-symbols">{icon}</span>}
      {text}
    </button>
  );
}
