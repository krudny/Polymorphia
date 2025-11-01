import { EquipmentChestResponseDTO } from "@/interfaces/api/equipment";

export interface UseStudentChest {
  data: EquipmentChestResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
