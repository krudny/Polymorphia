import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/DTO";

export interface EquipmentSectionWrapperProps {
  items: EquipmentItemResponseDTO[];
  chests: EquipmentChestResponseDTO[];
}

export type EquipmentSectionType = "item" | "chest";

export interface EquipmentSectionProps {
  type: EquipmentSectionType;
  data: EquipmentItemResponseDTO[] | EquipmentChestResponseDTO[];
}
