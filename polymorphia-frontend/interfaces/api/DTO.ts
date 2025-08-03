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

interface BaseReward {
  id: number;
  rewardType: RewardType;
  name: string;
  imageUrl: string;
  orderIndex: number;
  // add description + event section name it impacts?
}

export type BaseRewardResponseDTO = BaseItemResponseDTO | BaseChestResponseDTO;

interface RewardAssignmentDetails {
  id: number;
  receivedDate: string;
}

export type RewardAssignmentDetailsResponseDTO =
  | ItemAssignmentDetailsResponseDTO
  | ChestAssignmentDetailsResponseDTO;

interface AssignedReward<Base, Details> {
  base: Base;
  details: Details;
}

export type AssignedRewardResponseDTO =
  | AssignedItemResponseDTO
  | AssignedChestResponseDTO;

interface EquipmentReward<Base, Details> {
  base: Base;
  details: Details[];
}

export type EquipmentRewardResponseDTO =
  | EquipmentItemResponseDTO
  | EquipmentChestResponseDTO;

// Items
export type ItemType = "FLAT_BONUS" | "PERCENTAGE_BONUS";

interface BaseItem extends BaseReward {
  rewardType: "ITEM";
  itemType: ItemType;
  bonusText: string;
  limit: number;
}

export type FlatBonusItemBehavior =
  | "ONE_EVENT_TRIGGERED"
  | "MULTIPLE_EVENTS_INSTANT";

export interface BaseFlatBonusItemResponseDTO extends BaseItem {
  itemType: "FLAT_BONUS";
  xp: string;
  behavior: FlatBonusItemBehavior;
}

export interface BasePercentageBonusItemResponseDTO extends BaseItem {
  itemType: "PERCENTAGE_BONUS";
  percentage: number;
}

export type BaseItemResponseDTO =
  | BaseFlatBonusItemResponseDTO
  | BasePercentageBonusItemResponseDTO;

/*
  Those interfaces above look very weird at the first glance
  but I think that this is the best approach for handling this in TS
  to avoid casting and still have type safety. Look at the example:

  function handleItem(item: BaseItemResponseDTO) {
    if (item.type === "FLAT_BONUS") {
      const behavior = item.behavior;
      // do sth
    } else {
      const percentage = item.percentage;
      // do sth
    }
  }

  It works without any warnings :D
*/

export interface ItemAssignmentDetailsResponseDTO
  extends RewardAssignmentDetails {
  xp?: string; // undefined if item hasn't been 'used' yet
}

export type AssignedItemResponseDTO = AssignedReward<
  BaseItemResponseDTO,
  ItemAssignmentDetailsResponseDTO
>;

export type EquipmentItemResponseDTO = EquipmentReward<
  BaseItemResponseDTO,
  ItemAssignmentDetailsResponseDTO
>;

// Chests
export type ChestBehavior = "ALL" | "ONE_OF_MANY";

export interface BaseChestResponseDTO extends BaseReward {
  rewardType: "CHEST";
  behaviorText: string;
  behavior: ChestBehavior;
  chestItems: BaseItemResponseDTO[];
}

export interface ChestAssignmentDetailsResponseDTO
  extends RewardAssignmentDetails {
  openedDate?: string; // undefined if chest hasn't been opened yet
  receivedItems?: AssignedItemResponseDTO[]; // undefined if chest hasn't been opened yet
}

export type AssignedChestResponseDTO = AssignedReward<
  BaseChestResponseDTO,
  ChestAssignmentDetailsResponseDTO
>;

export type EquipmentChestResponseDTO = EquipmentReward<
  BaseChestResponseDTO,
  ChestAssignmentDetailsResponseDTO
>;

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
  createdDate: string;
  modifiedDate: string;
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
