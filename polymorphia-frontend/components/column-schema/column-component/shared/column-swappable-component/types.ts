import { TargetRequestDTO, TargetResponseDTO } from "@/interfaces/api/target";
import { ReactNode } from "react";

export interface ColumnSwappableComponentProps<T> {
  data: T | undefined;
  isDataLoading: boolean;
  isDataError: boolean;
  renderComponent: (data: T, key: string) => ReactNode;
  renderDataErrorComponent: () => ReactNode;
  renderEmptyDataErrorComponent?: () => ReactNode;
  minHeightClassName: string;
  className?: string;
  selectedTarget: TargetResponseDTO | TargetRequestDTO | null;
}
