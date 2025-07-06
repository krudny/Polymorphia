export interface ButtonWithBorderProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export type VariantProps = {
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  forceDark?: boolean;
};
