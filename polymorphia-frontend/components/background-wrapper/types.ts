import { ReactNode } from "react";

export interface BackgroundWrapperProps {
  children?: ReactNode;
  className?: string;
  forceTheme?: "light" | "dark";
}
