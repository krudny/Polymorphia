import React from 'react';
import {ButtonWithBorderProps, VariantProps} from "@/interfaces/button/ButtonInterfaces";
import clsx from "clsx";
import {tv} from "tailwind-variants";

const buttonWithBorder = tv({
  base: "button-with-border",
  variants: {
    size: {
      sm: "text-xl px-6 py-1",
      md: "text-3xl px-8 py-2",
      lg: "text-4xl px-10 py-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default function ButtonWithBorder({text, onClick, className, size = "md"}: ButtonWithBorderProps & VariantProps) {
  return (
      <button onClick={onClick} className={clsx(buttonWithBorder({ size }), className)}>
        {text}
      </button>
  );
}