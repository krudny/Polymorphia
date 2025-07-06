import { ModalProps } from "../../../components/modal/types";

export type EventSectionType = "assignment" | "test" | "project";

export interface EventSectionShortResponseDto {
  id: number;
  name: string;
  eventSectionType: EventSectionType;
  hidden?: boolean;
  priority: number;
}

export interface EventSectionResponseDto {
  name: string;
  gainedXp: number;
  flatBonus: BonusDto;
  percentageBonus: BonusDto;
  totalXp: number;
}

export interface BonusDto {
  xp: number;
  percentage?: number;
  items: BonusItemDto[];
}

export interface BonusItemDto {
  id: number;
  assignedItemId: number;
  assignedChestId: number;
  name: string;
  imageUrl: string;
  receivedDate: string;
  xp: number;
  percentage?: number;
}

export interface GradableEventShortResponseDto {
  id: number;
  name: string;
  topic?: string;
  gainedXp?: number;
  hidden?: boolean;
}

export interface GradableEventShortResponseDtoPage {
  content: GradableEventShortResponseDto[];
  page: {
    totalPages: number;
  };
}

export interface GradableEventResponseDto {
  id: number;
  name: string;
  maxXp: number;
  grade?: GradeResponseDto;
}

export interface TestResponseDto extends GradableEventResponseDto {
  hidden: boolean;
  topic?: string;
}

export interface AssignmentResponseDto extends GradableEventResponseDto {
  infoUrl: string;
  topic?: string;
  submission: AssignmentSubmissionResponseDto;
  hidden: boolean;
}

export interface AssignmentSubmissionResponseDto {
  containsExtraAssignment: boolean;
  prUrl?: string;
  extraAssignmentPrUrl?: string;
  createdDate?: string;
  modifiedDate?: string;
}

export interface GradeResponseDto {
  createdDate: string;
  modifiedDate: string;
  gainedXp: number;
  chests: EventChestResponseDto[];
}

export interface EventChestResponseDto {
  id: number;
  assignedChestId: number;
  name: string;
  imageUrl: string;
  opened: boolean;
  receivedDate: string;
}

export interface EventSection {
  id: number;
  type: EventSectionType;
  name: string;
  gainedXp: string; // "1.2"
  bonuses: BonusInfo[];
  totalXp: string; // "1.2"
}

export interface GradableEventCore {
  id: number;
  name: string;
  topic?: string;
  gainedXp?: string; // "1.2", undefined if there is no grade
  hidden?: boolean;
}

export interface GradableEventCoreResponse {
  data: GradableEventCore[];
  page: {
    totalPages: number;
  };
}

export interface SectionViewProps {
  eventSectionId: number;
  eventSectionType: EventSectionType;
}

export interface BonusInfo {
  name: string;
  bonusXp: string; // "1.2"
  bonusPercentage?: string; // "10"
  items: BonusInfoItem[];
}

export interface BonusInfoItem {
  assignedId: number;
  item: {
    id: number;
    name: string;
    imageUrl: string;
  };
  receivedDate: string; // "12.06.2026"
  bonusXp: string; // "1.2"
  bonusPercentage?: string; // "10"
}

export interface GradableEvent {
  id: number;
  name: string;
  maxXp: string; // "1.2"
  hidden?: boolean;
  grade?: Grade;
}

export type Test = GradableEvent;

export interface Grade {
  gainedXp: string; // "1.2"
  chests: GradeChest[];
}

export interface GradeChest {
  assignedId: number;
  chest: {
    id: number;
    name: string;
    imageUrl: string;
    opened: boolean;
  };
}

export interface RewardsInfoProps {
  grade?: Grade;
  maxXp: string;
}

export interface TestDetailsModalProps
  extends Omit<ModalProps, "title" | "isDataPresented" | "children"> {
  eventSectionId: number;
  selectedGradableEventId: number | null;
}
