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

export interface KnowledgeBaseRelatedRewardResponseDTO {
  id: number;
  orderIndex: number;
  name: string;
  imageUrl: string;
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

interface BaseRewardResponseDTOWithType<
  T extends RewardType,
  R extends BaseReward,
> {
  rewardType: T;
  reward: R;
}

export type RewardResponseDTO =
  | ItemResponseDTOWithType
  | ChestResponseDTOWithType;

// Rewards: Items
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

type ItemResponseDTOWithType = BaseRewardResponseDTOWithType<
  "ITEM",
  ItemResponseDTO
>;

// Rewards: Chests
export type ChestBehavior = "ALL" | "ONE_OF_MANY";

export interface BaseChest extends BaseReward {
  behaviorText: string;
  behavior: ChestBehavior;
  chestItems: ItemResponseDTO[];
}

export type ChestResponseDTO = BaseChest;

type ChestResponseDTOWithType = BaseRewardResponseDTOWithType<
  "CHEST",
  ChestResponseDTO
>;

// Reward Assignment Details
export interface BaseRewardAssignmentDetails {
  id: number;
  receivedDate: string;
  usedDate?: string;
  isUsed: boolean;
}

export interface ItemAssignmentDetailsResponseDTO
  extends BaseRewardAssignmentDetails {
  gainedXp?: string; // undefined if item hasn't been used
}

export interface ChestAssignmentDetailsResponseDTO
  extends BaseRewardAssignmentDetails {
  receivedItems?: AssignedItemResponseDTO[]; // undefined if chest hasn't been opened (used)
}

// Assigned Rewards
interface BaseAssignedReward<B, D> {
  base: B;
  details: D;
}

interface BaseAssignedRewardResponseDTOWithType<
  T extends RewardType,
  B extends BaseReward,
  D extends BaseRewardAssignmentDetails,
> {
  rewardType: T;
  assignedReward: BaseAssignedReward<B, D>;
}

export type AssignedRewardResponseDTO =
  | AssignedItemResponseDTOWithType
  | AssignedChestResponseDTOWithType;

// Assigned Rewards: Items
export type AssignedItemResponseDTO = BaseAssignedReward<
  ItemResponseDTO,
  ItemAssignmentDetailsResponseDTO
>;

type AssignedItemResponseDTOWithType = BaseAssignedRewardResponseDTOWithType<
  "ITEM",
  ItemResponseDTO,
  ItemAssignmentDetailsResponseDTO
>;

// Assigned Rewards: Chests
export interface AssignedChestResponseDTO {
  base: ChestResponseDTO;
  details: ChestAssignmentDetailsResponseDTO;
}

type AssignedChestResponseDTOWithType = BaseAssignedRewardResponseDTOWithType<
  "CHEST",
  ChestResponseDTO,
  ChestAssignmentDetailsResponseDTO
>;

// Equipment
export interface EquipmentItemResponseDTO {
  base: ItemResponseDTO;
  details: ItemAssignmentDetailsResponseDTO[];
}

export interface EquipmentChestResponseDTO {
  base: ChestResponseDTO;
  details: ChestAssignmentDetailsResponseDTO;
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
  hasReward: boolean;
  isLocked: boolean;
}

export interface InstructorGradableEventResponseDTO
  extends BaseGradableEventResponseDTO {
  ungraded: number;
}

// Points Summary
export interface PointsSummaryResponseDTO {
  gained: PointsSummaryDetailsResponseDTO;
  flatBonus: PointsSummaryDetailsResponseDTO;
  percentageBonus: PointsSummaryDetailsResponseDTO;
  total: PointsSummaryDetailsResponseDTO;
}

export interface PointsSummaryDetailsResponseDTO {
  title: string;
  gainedXp: string;
  assignedItems: AssignedItemResponseDTO[];
}

// Markdown
export interface MarkdownResponseDTO {
  markdown: string;
}

// Grade
export interface GradeResponseDTO {
  details?: GradeDetailsResponseDTO;
  criteria: CriterionResponseDTO[];
}

export interface GradeDetailsResponseDTO {
  id: number;
  comment?: string;
}

export interface CriterionResponseDTO {
  id: number;
  name: string;
  maxXp: string;
  assignableRewards: CriterionAssignableRewardResponseDTO[];
  criterionGrade?: CriterionGradeResponseDTO;
}

export interface CriterionAssignableRewardResponseDTO {
  reward: RewardResponseDTO;
  maxAmount: number;
}

export interface CriterionGradeResponseDTO {
  id: number;
  gainedXp: string;
  assignedRewards: AssignedRewardResponseDTO[];
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
