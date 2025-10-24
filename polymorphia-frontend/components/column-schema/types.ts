import { ReactNode } from "react";

export interface ColumnSchemaProps {
  columns: number;
  components: ColumnComponent[][];
}

export interface ColumnComponent {
  component: ReactNode;
  forceFullHeight?: boolean;
}
