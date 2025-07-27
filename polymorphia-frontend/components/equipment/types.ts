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

// export interface ItemData {
//   itemId: number;
//   title: string;
//   subtitle: string;
//   imageUrl: string;
//   quantity: number;
//   items: Item[];
// }

// export interface ChestData {
//   chestId: number;
//   title: string;
//   subtitle: string;
//   imageUrl: string;
//   behavior: ChestBehavior;
//   openedDate: string | undefined;
//   items: Item[];
// }

// export interface Item {
//   itemId: number;
//   title: string;
//   subtitle: string;
//   imageUrl: string;
//   bonusXp?: string;
// }
