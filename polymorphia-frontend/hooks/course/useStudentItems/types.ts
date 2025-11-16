import { EquipmentItemResponseDTO } from "@/interfaces/api/equipment";
import { QueryObserverResult, RefetchOptions } from "@tanstack/query-core";

export interface UseStudentItems {
  data: EquipmentItemResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<EquipmentItemResponseDTO[], Error>>;
}
