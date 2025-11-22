import { ReactNode } from "react";

export interface ColumnSwappableComponentProps<T> {
  data: T | undefined;
  isDataLoading: boolean;
  isDataError: boolean;
  renderComponent: (data: T, key: string) => ReactNode;
  renderDataErrorComponent: () => ReactNode;
  minHeightClassName: string;
}
