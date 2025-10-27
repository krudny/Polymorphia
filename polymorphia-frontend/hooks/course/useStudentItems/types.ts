import { EquipmentItemResponseDTO } from "@/interfaces/api/equipment";

export interface UseStudentItems {
  data: EquipmentItemResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
