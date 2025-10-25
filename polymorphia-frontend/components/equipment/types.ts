import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";

export interface EquipmentSectionWrapperProps {
  items: EquipmentItemResponseDTO[];
  chests: EquipmentChestResponseDTO[];
}

export type EquipmentSectionType = "item" | "chest";

export interface EquipmentSectionProps {
  type: EquipmentSectionType;
  data: EquipmentItemResponseDTO[] | EquipmentChestResponseDTO[];
}

export interface OpenedChestButtonsProps {
  chestData: EquipmentChestResponseDTO;
}
