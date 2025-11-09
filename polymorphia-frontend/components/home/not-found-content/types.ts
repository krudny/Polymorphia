import { RefObject } from "react";

export interface NotFoundContentProps {
  titleRef?: RefObject<HTMLDivElement | null>;
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  rerouteTo?: string;
}
