import { EquipmentChestResponseDTO } from "@/interfaces/api/equipment";
import { QueryObserverResult, RefetchOptions } from "@tanstack/query-core";

export interface UseStudentChest {
  data: EquipmentChestResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<EquipmentChestResponseDTO[], Error>>;
}
