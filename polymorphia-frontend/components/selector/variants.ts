import { tv } from "tailwind-variants";

export const selectorVariants = tv({
  slots: {
    container: "selector-container",
    button: "selector",
    value: "",
    arrow: "selector-arrow",
    dropdown: "selector-dropdown",
    option: "selector-option",
  },
  variants: {
    size: {
      xs: {
        value: "text-xs",
        option: "text-xs",
      },
      sm: {
        value: "text-sm",
        option: "text-sm",
      },
      md: {
        value: "text-base",
        option: "text-base",
      },
      lg: {
        value: "text-lg",
        option: "text-lg",
      },
      xl: {
        value: "text-xl",
        option: "text-xl",
      },
      "2xl": {
        value: "text-2xl",
        option: "text-2xl",
      },
      "3xl": {
        value: "text-3xl",
        option: "text-3xl",
      },
      "4xl": {
        value: "text-4xl",
        option: "text-4xl",
      },
    },
    padding: {
      none: {
        button: "p-0",
        option: "p-0",
      },
      xs: {
        button: "px-2 py-1",
        option: "px-2 py-1.5",
      },
      sm: {
        button: "px-3 py-1.5",
        option: "px-3 py-2",
      },
      md: {
        button: "px-4 py-2.5",
        option: "px-4 py-2.5",
      },
      lg: {
        button: "px-5 py-3",
        option: "px-5 py-3",
      },
      xl: {
        button: "px-6 py-4",
        option: "px-6 py-4",
      },
      "2xl": {
        button: "px-8 py-5",
        option: "px-8 py-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
    padding: "md",
  },
});
