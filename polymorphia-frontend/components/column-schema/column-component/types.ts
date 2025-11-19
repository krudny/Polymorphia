import { ReactNode } from "react";

export interface ColumnComponentProps {
  topComponent: () => ReactNode;
  mainComponent: () => ReactNode;
  hidden?: boolean;
}
