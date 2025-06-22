import React from "react";
import {
  ButtonWithBorderProps,
  VariantProps,
} from "@/interfaces/button/ButtonInterfaces";
import clsx from "clsx";
import { tv } from "tailwind-variants";
import "../../styles/general.css";

const buttonWithBorder = tv({
  base: "button-with-border",
  variants: {
    size: {
      sm: "text-xl px-6 py-1",
      md: "text-3xl px-8 py-2",
      lg: "text-4xl px-10 py-3",
    },
    isActive: {
      true: "pointer-events-none",
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
  isActive,
  forceDark,
}: ButtonWithBorderProps & VariantProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        buttonWithBorder({ size, isActive, forceDark })
      )}
    >
      {text}
    </button>
  );
}
