import {
  EquipmentChestResponseDTO,
  EquipmentItemResponseDTO,
} from "@/interfaces/api/equipment";

export const EquipmentSectionTypes = {
  ITEM: "ITEM",
  CHEST: "CHEST",
};

export type EquipmentSectionType =
  (typeof EquipmentSectionTypes)[keyof typeof EquipmentSectionTypes];

export interface EquipmentSectionProps {
  type: EquipmentSectionType;
  data: EquipmentItemResponseDTO[] | EquipmentChestResponseDTO[];
  columns: number;
}
