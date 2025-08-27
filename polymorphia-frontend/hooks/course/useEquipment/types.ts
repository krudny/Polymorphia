import { EquipmentChestResponseDTO, EquipmentItemResponseDTO } from "@/interfaces/api/equipment";

export interface UseEquipment {
  items: EquipmentItemResponseDTO[] | undefined;
  chests: EquipmentChestResponseDTO[] | undefined;
  isLoading: boolean;
  error: Error | null;
}