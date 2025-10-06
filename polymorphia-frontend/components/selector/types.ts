export interface SelectorProps {
  options: SelectorOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  padding?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export interface SelectorOption {
  value: string;
  label: string;
}
