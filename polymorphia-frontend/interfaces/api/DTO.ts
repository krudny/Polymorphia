// export interface EvolutionStageResponseDto {
//   id: number;
//   name: string;
//   description: string;
//   minXp: number;
//   grade: number;
//   imageUrl: string;
//   courseId: number;
//   gradingText: string;
// }

// export interface ItemResponseDTO {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   limit: number;
//   textBonus: string;
//   eventSectionId: number;
//   chestIds: number[];
//   textBehavior: string;
// }

// export interface ChestResponseDto {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   behavior: ChestBehavior;
//   courseId: number;
//   itemIds: number[];
// }

export interface LoginDto {
  email: string;
  password: string;
}

// export interface EquipmentItemResponseDTO {
//   itemId: number;
//   itemName: string;
//   itemBonus: string;
//   imageUrl: string;
//   quantity: number;
//   items: EquipmentReceivedItemResponseDTO[];
// }

// export interface EquipmentReceivedItemResponseDTO {
//   itemId: number;
//   receivedDate: string;
//   bonusXp: string;
// }

// export interface EquipmentChestResponseDTO {
//   chestId: number;
//   chestName: string;
//   behavior: ChestBehavior;
//   imageUrl: string;
//   openedDate: string | undefined;
//   items: EquipmentChestItemsResponseDTO[];
// }

// export interface EquipmentChestItemsResponseDTO {
//   itemId: number;
//   itemName: string;
//   imageUrl: string;
//   bonusXp?: string;
// }

export interface HallOfFameResponseDTO {
  content: HallOfFameRecordDTO[];
  page: {
    pageNumber: number;
    totalPages: number;
  };
}

export interface HallOfFameRecordDTO {
  userDetails: UserDetailsDTO;
  xpDetails: Record<string, string>;
}

//TODO: handle which one is optional
export interface UserDetailsDTO {
  studentName: string;
  animalName: string;
  evolutionStage: string;
  group: string;
  imageUrl: string;
  position: number;
}

// Knowledge base
export type KnowledgeBaseSlideType = "evolution-stage" | "item" | "chest";

export interface KnowledgeBaseSlideRelatedRewardResponseDTO {
  id: number;
  name: string;
  imageUrl: string;
}

export interface KnowledgeBaseSlideResponseDTO {
  type: KnowledgeBaseSlideType;
  id: number;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  relatedRewards?: KnowledgeBaseSlideRelatedRewardResponseDTO[];
}

// Items
export interface BaseItemResponseDTO {
  id: number;
  name: string;
  bonusText: string;
  imageUrl: string;
}

export interface AssignedItemResponseDTO {
  id: number;
  item: BaseItemResponseDTO;
  receivedDate: string;
  xp?: number; // undefined if item hasn't been 'used' yet
}

export interface EquipmentItemResponseDTO {
  assignedItems: AssignedItemResponseDTO[];
}

// Chests
export type ChestBehavior = "ALL" | "ONE_OF_MANY";

export interface BaseChestResponseDTO {
  id: number;
  name: string;
  behaviorText: string;
  behavior: ChestBehavior;
  imageUrl: string;
}

export interface AssignedChestResponseDTO {
  id: number;
  chest: BaseChestResponseDTO;
  receivedDate: string;
  openedDate?: string; // undefined if chest hasn't been opened yet
}

interface EquipmentChestResponseDTO {
  assignedChest: AssignedChestResponseDTO;
  receivedItems?: AssignedItemResponseDTO[]; // if chest has been opened
  chestContent?: BaseItemResponseDTO[]; // if chest hasn't been opened yet
}

// Course
export type EventType = "assignment" | "project" | "test";

export interface EventSectionResponseDTO {
  id: number;
  type: EventType;
  name: string;
  order_index: number;
}

export interface GradableEventResponseDTO {
  id: number;
  type: EventType;
  name: string;
  topic?: string;
  gainedXp: number;
  order_index: number;
}

// Points Summary
export interface PointsSummaryBonusResponseDTO {
  xp: number;
  percentage?: number;
  assignedItems: AssignedItemResponseDTO[];
}

export interface PointsSummaryResponseDTO {
  gainedXp: number;
  flatBonus: PointsSummaryBonusResponseDTO;
  percentageBonus: PointsSummaryBonusResponseDTO;
  totalXp: number;
}

// Markdown
export interface MarkdownResponseDTO {
  markdown: string;
}
