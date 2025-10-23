export interface SelectorProps {
  options: SelectorOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  padding?: "xs" | "sm" | "base" | "md" | "lg" | "xl" | "2xl";
  centeredPlaceholder?: boolean;
  centeredOptions?: boolean;
}

export interface SelectorOption {
  value: string;
  label: string;
}
