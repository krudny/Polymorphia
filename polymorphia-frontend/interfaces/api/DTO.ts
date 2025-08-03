// Login
export interface LoginDto {
  email: string;
  password: string;
}

// Hall of Fame
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

// User Details
//TODO: handle which one is optional
export interface UserDetailsDTO {
  studentName: string;
  animalName: string;
  evolutionStage: string;
  group: string;
  imageUrl: string;
  position: number;
}

// Knowledge Base
export type KnowledgeBaseType = "evolution-stage" | "item" | "chest";

export interface KnowledgeBaseRelatedRewardResponseDTO {
  id: number;
  orderIndex: number;
  name: string;
  imageUrl: string;
}

export interface KnowledgeBaseResponseDTO {
  type: KnowledgeBaseType;
  id: number;
  orderIndex: number;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  relatedRewards?: KnowledgeBaseRelatedRewardResponseDTO[];
}

// Items
// Contains general information about the item (without any assignment details)
export interface BaseItemResponseDTO {
  id: number;
  name: string;
  bonusText: string;
  imageUrl: string;
}

// Contains only the data related to assignment of the item
export interface ItemAssignmentDetailsResponseDTO {
  id: number;
  receivedDate: string;
  xp?: string; // undefined if item hasn't been 'used' yet
}

// Meant to be used as complete information about the item
// and the assignment of the item to the animal.
export interface AssignedItemResponseDTO {
  item: BaseItemResponseDTO;
  assignmentDetails: ItemAssignmentDetailsResponseDTO;
}

// Meant to be used as a "stack" of items. It allows to:
// - avoid sending repeated data over the network
//   (simple mapping to AssignedItemResponseDTO)
// - send information about "locked" item
//   (when someone hasn't received this item yet)
export interface EquipmentItemResponseDTO {
  base: BaseItemResponseDTO;
  assignmentDetails: ItemAssignmentDetailsResponseDTO[];
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

export interface EquipmentChestResponseDTO {
  assignedChest: AssignedChestResponseDTO;
  receivedItems?: AssignedItemResponseDTO[]; // if chest has been opened
  chestItems?: BaseItemResponseDTO[]; // if chest hasn't been opened yet
}

// Course
export type EventType = "assignment" | "project" | "test";

export interface EventSectionResponseDTO {
  id: number;
  type: EventType;
  name: string;
  orderIndex: number;
}

export interface GradableEventResponseDTO {
  id: number;
  type: EventType;
  name: string;
  topic?: string;
  gainedXp: string;
  orderIndex: number;
}

// Points Summary
export interface PointsSummaryBonusResponseDTO {
  xp: string;
  percentage?: number;
  assignedItems: AssignedItemResponseDTO[];
}

export interface PointsSummaryResponseDTO {
  gainedXp: string;
  flatBonus: PointsSummaryBonusResponseDTO;
  percentageBonus: PointsSummaryBonusResponseDTO;
  totalXp: string;
}

// Markdown
export interface MarkdownResponseDTO {
  markdown: string;
}

// Rewards
export interface CriterionGradeResponseDTO {
  id: number;
  xp: string;
  assignedChests: AssignedChestResponseDTO[];
}

export interface CriterionResponseDTO {
  id: number;
  name: string;
  maxXp: string;
  criterionGrade?: CriterionGradeResponseDTO;
}

export interface GradeResponseDTO {
  id: number;
  // additional info, currently not needed
}

export interface RewardResponseDTO {
  grade?: GradeResponseDTO;
  criteria: CriterionResponseDTO[]; // technically they should be a part of the grade but I think this will be a better interface for frontend
}

// Project Variant
export interface ProjectVariantResponseDTO {
  id: number;
  name: string;
  categoryName: string;
  shortCode: string;
  imageUrl: string;
  // currently without description
}
