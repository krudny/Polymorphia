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

// Rewards
export type RewardType = "ITEM" | "CHEST";

export interface BaseReward {
  id: number;
  name: string;
  // description: string;
  imageUrl: string;
  orderIndex: number;
}

export interface BaseRewardAssignmentDetails {
  id: number;
  receivedDate: string;
  usedDate?: string;
  isUsed: boolean;
}

export type RewardResponseDTO =
  | ItemResponseDTOWithType
  | ChestResponseDTOWithType;

export type AssignedRewardResponseDTO =
  | AssignedItemResponseDTOWithType
  | AssignedChestResponseDTOWithType;

// Items
export type ItemBonusType = "FLAT_BONUS" | "PERCENTAGE_BONUS";

export interface BaseItem extends BaseReward {
  itemBonusType: ItemBonusType;
  bonusText: string;
  limit: number;
  isLimitReached: boolean;
  // add event section name it impacts?
}

export type FlatBonusItemBehavior =
  | "ONE_EVENT_TRIGGERED"
  | "MULTIPLE_EVENTS_INSTANT";

export interface BaseFlatBonusItem extends BaseItem {
  itemBonusType: "FLAT_BONUS";
  xp: string;
  behavior: FlatBonusItemBehavior;
}

export interface BasePercentageBonusItem extends BaseItem {
  itemBonusType: "PERCENTAGE_BONUS";
  percentage: number;
}

export type ItemResponseDTO = BaseFlatBonusItem | BasePercentageBonusItem;

interface ItemResponseDTOWithType {
  rewardType: "ITEM";
  reward: ItemResponseDTO;
}

export interface ItemAssignmentDetails extends BaseRewardAssignmentDetails {
  xp?: string; // undefined if item hasn't been used
}

export interface AssignedItemResponseDTO {
  base: ItemResponseDTO;
  details: ItemAssignmentDetails;
}

interface AssignedItemResponseDTOWithType {
  rewardType: "ITEM";
  assignedReward: AssignedItemResponseDTO;
}

// Chests
export type ChestBehavior = "ALL" | "ONE_OF_MANY";

export interface BaseChest extends BaseReward {
  behaviorText: string;
  behavior: ChestBehavior;
  chestItems: ItemResponseDTO[];
}

export type ChestResponseDTO = BaseChest;

interface ChestResponseDTOWithType {
  rewardType: "CHEST";
  reward: ChestResponseDTO;
}

export interface ChestAssignmentDetails extends BaseRewardAssignmentDetails {
  receivedItems?: AssignedItemResponseDTO[]; // undefined if chest hasn't been opened (used)
}

export interface AssignedChestResponseDTO {
  base: ChestResponseDTO;
  details: ChestAssignmentDetails;
}

interface AssignedChestResponseDTOWithType {
  rewardType: "CHEST";
  assignedReward: AssignedChestResponseDTO;
}

// Equipment
export interface EquipmentItemResponseDTO {
  base: ItemResponseDTO;
  details: ItemAssignmentDetails[];
}

export interface EquipmentChestResponseDTO {
  base: ChestResponseDTO;
  details: ChestAssignmentDetails;
}

// Course
export type EventType = "assignment" | "project" | "test";

export interface EventSectionResponseDTO {
  id: number;
  type: EventType;
  name: string;
  orderIndex: number;
}

export interface BaseGradableEventResponseDTO {
  id: number;
  type: EventType;
  name: string;
  topic?: string;
  orderIndex: number;
}

export interface StudentGradableEventResponseDTO
  extends BaseGradableEventResponseDTO {
  gainedXp?: string;
  hasChest: boolean;
  isLocked: boolean;
}

export interface InstructorGradableEventResponseDTO
  extends BaseGradableEventResponseDTO {
  ungradedCount: number;
}

// Points Summary
export interface PointsSummaryDetailsResponseDTO {
  title: string;
  xp: string;
  assignedItems: AssignedItemResponseDTO[];
}

export interface PointsSummaryResponseDTO {
  gained: PointsSummaryDetailsResponseDTO;
  flatBonus: PointsSummaryDetailsResponseDTO;
  percentageBonus: PointsSummaryDetailsResponseDTO;
  total: PointsSummaryDetailsResponseDTO;
}

// Markdown
export interface MarkdownResponseDTO {
  markdown: string;
}

// Grade
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

export interface GradeDetailsResponseDTO {
  id: number;
  comment?: string;
}

export interface GradeResponseDTO {
  details?: GradeDetailsResponseDTO;
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
