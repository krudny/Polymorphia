import React from 'react';
import {ButtonWithBorderProps, VariantProps} from "@/interfaces/button/ButtonInterfaces";
import clsx from "clsx";
import {tv} from "tailwind-variants";
import "../../styles/general.css"

const buttonWithBorder = tv({
  base: "button-with-border",
  variants: {
    size: {
      sm: "text-xl px-6 py-1",
      md: "text-3xl px-8 py-2",
      lg: "text-4xl px-10 py-3",
    },
    isActive: {
      true: "bg-neutral-800 text-neutral-300"
    }
  },
  defaultVariants: {
    size: "md",
  },
});

export default function ButtonWithBorder({text, onClick, className, size = "md", isActive}: ButtonWithBorderProps & VariantProps) {
  return (
      <button onClick={onClick} className={clsx(buttonWithBorder({ size, isActive }), className)}>
        {text}
      </button>
  );
}