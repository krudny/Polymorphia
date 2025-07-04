export type ChestBehavior = "ALL" | "ONE_OF_MANY";

export interface ItemResponseDTO {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  limit: number;
  textBonus: string;
  eventSectionId: number;
  chestIds: number[];
  textBehavior: string;
}

export interface EvolutionStageResponseDto {
  id: number;
  name: string;
  description: string;
  minXp: number;
  grade: number;
  imageUrl: string;
  courseId: number;
  gradingText: string;
}

export interface ChestResponseDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  behavior: ChestBehavior;
  courseId: number;
  itemIds: number[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface EquipmentItemResponseDTO {
  itemId: number;
  itemName: string;
  itemBonus: string;
  imageUrl: string;
  quantity: number;
  items: EquipmentReceivedItemResponseDTO[];
}

export interface EquipmentReceivedItemResponseDTO {
  itemId: number;
  receivedDate: string;
  bonusXp: string;
}

export interface EquipmentChestResponseDTO {
  chestId: number;
  chestName: string;
  behavior: ChestBehavior;
  imageUrl: string;
  openedDate: string | undefined;
  items: EquipmentChestItemsResponseDTO[];
}

export interface EquipmentChestItemsResponseDTO {
  itemId: number;
  itemName: string;
  imageUrl: string;
  bonusXp?: string;
}

export interface HallOfFameResponseDTO {
  content: HallOfFameRecordDTO[];
  page: {
    pageNumber: number;
    totalPages: number;
  };
}

export interface HallOfFameRecordDTO {
  userDetails: UserDetailsDTO;
  xpDetails: Record<string, number>;
}

export interface UserDetailsDTO {
  studentName: string;
  animalName: string;
  evolutionStage: string;
  group: string;
  imageUrl: string;
  position: number;
}
